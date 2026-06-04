// =========================================================
// AI FDE Training — Google Drive appData sync (drive-sync.js)
// =========================================================
//
// Stores a single hidden file, `progress.json`, in the per-user
// appDataFolder. The user never sees it in their normal Drive view.
// Drive's REST endpoints support CORS, so these calls run directly
// from the static page — no backend, no proxy.
//
// Depends on the global `accessToken` and `refreshToken()` from auth.js.

const FILE_NAME = "progress.json";

// Wrapper that adds the auth header and retries once on token expiry (401).
async function driveFetch(url, opts = {}) {
  opts.headers = Object.assign({}, opts.headers, {
    Authorization: "Bearer " + accessToken,
  });
  let r = await fetch(url, opts);
  if (r.status === 401) {
    await refreshToken();
    opts.headers.Authorization = "Bearer " + accessToken;
    r = await fetch(url, opts);
  }
  return r;
}

// Build an Error that includes Google's actual reason/message from the
// response body, so 403s are diagnosable (insufficientPermissions vs
// accessNotConfigured, etc.) instead of an empty "403 ()".
async function driveError(label, r) {
  let detail = "";
  try {
    const body = await r.json();
    const e = body && body.error;
    if (e) {
      const reason = e.errors && e.errors[0] && e.errors[0].reason;
      detail = " — " + (reason ? reason + ": " : "") + (e.message || "");
    }
  } catch (_) {
    /* non-JSON body */
  }
  return new Error(label + ": " + r.status + detail);
}

async function findFileId() {
  const url =
    "https://www.googleapis.com/drive/v3/files" +
    "?spaces=appDataFolder" +
    "&q=name='" +
    FILE_NAME +
    "'" +
    "&fields=files(id,name,modifiedTime)";
  const r = await driveFetch(url);
  if (!r.ok) throw await driveError("Drive list failed", r);
  const d = await r.json();
  return d.files && d.files[0] ? d.files[0].id : null;
}

async function pullRemote() {
  const id = await findFileId();
  if (!id) return null;
  const r = await driveFetch(
    "https://www.googleapis.com/drive/v3/files/" + id + "?alt=media"
  );
  if (!r.ok) throw await driveError("Drive get failed", r);
  return r.json();
}

async function pushRemote(progress) {
  const id = await findFileId();
  const metadata = id ? {} : { name: FILE_NAME, parents: ["appDataFolder"] };
  const body = new FormData();
  body.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  body.append(
    "file",
    new Blob([JSON.stringify(progress)], { type: "application/json" })
  );
  const base = "https://www.googleapis.com/upload/drive/v3/files";
  const url = id
    ? base + "/" + id + "?uploadType=multipart"
    : base + "?uploadType=multipart";
  const r = await driveFetch(url, { method: id ? "PATCH" : "POST", body });
  if (!r.ok) throw await driveError("Drive upload failed", r);
  return r.json();
}
