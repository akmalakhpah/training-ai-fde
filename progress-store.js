// =========================================================
// AI FDE Training — progress store (progress-store.js)
// =========================================================
//
// The single interface the app uses for progress. localStorage stays
// the fast, synchronous source of truth; Drive is a sync layer behind it
// that never blocks the UI.
//
// Normalized progress object (what lives in Drive's progress.json):
//   { version, updatedAt, data: { completed: ["week-1", ...] } }
//
// Merge strategy: UNION of completed weeks (additive — a week completed on
// any device stays completed). updatedAt is whole-object metadata.

const PROGRESS_VERSION = 1;
const COMPLETED_KEY = "fde_progress_v1"; // existing key — array of completed IDs
const UPDATED_AT_KEY = "fde_progress_updated_at"; // new — last local write (ms)

const PUSH_DEBOUNCE_MS = 2000;
const RETRY_MS = 15000;

let pushTimer = null;
let status = "idle"; // idle | syncing | synced | error | offline
let onRemoteUpdate = () => {};
let onStatusChange = () => {};

function setStatus(s) {
  status = s;
  try {
    onStatusChange(s);
  } catch (e) {
    /* ignore UI errors */
  }
}

// ---------- Local: synchronous, instant ----------

function readCompleted() {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
  } catch {
    return [];
  }
}

function localUpdatedAt() {
  return parseInt(localStorage.getItem(UPDATED_AT_KEY) || "0", 10);
}

function readProgress() {
  return {
    version: PROGRESS_VERSION,
    updatedAt: localUpdatedAt(),
    data: { completed: readCompleted() },
  };
}

function writeLocal(completedArr, updatedAt) {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedArr));
  localStorage.setItem(UPDATED_AT_KEY, String(updatedAt));
}

// Called by the app whenever the user toggles a week. Writes locally and
// instantly, then schedules a debounced push if signed in.
function writeCompleted(arr) {
  writeLocal(arr, Date.now());
  schedulePush();
}

// ---------- Drive: debounced, non-blocking ----------

function signedIn() {
  return window.fdeAuth && window.fdeAuth.isSignedIn();
}

function schedulePush() {
  if (!signedIn()) return; // logged out / offline → local only
  setStatus("syncing");
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    doPush().catch(() => {});
  }, PUSH_DEBOUNCE_MS);
}

async function doPush() {
  if (!signedIn()) return;
  try {
    setStatus("syncing");
    await pushRemote(readProgress());
    setStatus("synced");
  } catch (e) {
    // Network failures must not throw into the UI. Log and retry later.
    console.warn("[sync] push failed; will retry", e);
    setStatus(navigator.onLine ? "error" : "offline");
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => doPush().catch(() => {}), RETRY_MS);
  }
}

// Full sync on sign-in: pull remote, UNION-merge with local, write the
// merged result back to localStorage, push if remote was missing anything,
// then refresh the UI from localStorage.
async function syncOnSignIn() {
  if (!signedIn()) return;
  setStatus("syncing");
  try {
    const local = readProgress();
    let remote = null;
    try {
      remote = await pullRemote();
    } catch (e) {
      console.warn("[sync] pull failed; keeping local", e);
    }

    const localSet = new Set(local.data.completed);
    const remoteSet = new Set(remote ? remote.data.completed : []);
    const union = new Set([...localSet, ...remoteSet]);
    const unionArr = [...union];

    // union is a superset of both, so a size mismatch means that side was
    // missing entries.
    const changedLocal = union.size !== localSet.size;
    const changedRemote = !remote || union.size !== remoteSet.size;
    const updatedAt =
      changedLocal || changedRemote
        ? Date.now()
        : Math.max(local.updatedAt, remote ? remote.updatedAt : 0);

    if (changedLocal) {
      writeLocal(unionArr, updatedAt);
      onRemoteUpdate(unionArr); // refresh the running app from localStorage
    } else {
      localStorage.setItem(UPDATED_AT_KEY, String(updatedAt));
    }

    if (changedRemote) {
      await pushRemote({
        version: PROGRESS_VERSION,
        updatedAt,
        data: { completed: unionArr },
      });
    }

    setStatus("synced");
  } catch (e) {
    console.warn("[sync] initial sync failed", e);
    setStatus(navigator.onLine ? "error" : "offline");
  }
}

// When we come back online, flush any pending local state.
window.addEventListener("online", () => {
  if (signedIn()) schedulePush();
});
window.addEventListener("offline", () => {
  if (signedIn()) setStatus("offline");
});

window.progressStore = {
  readCompleted,
  writeCompleted,
  readProgress,
  syncOnSignIn,
  getStatus: () => status,
  setOnRemoteUpdate: (cb) => {
    onRemoteUpdate = cb || (() => {});
  },
  setOnStatusChange: (cb) => {
    onStatusChange = cb || (() => {});
  },
};
