// =========================================================
// AI FDE Training — Google auth layer (auth.js)
// =========================================================
//
// Uses Google Identity Services (GIS). Two pieces work together:
//
//   1. One Tap (google.accounts.id) — a frictionless identity prompt.
//      It only proves *who* the user is; it does NOT grant Drive access.
//   2. The OAuth token model (google.accounts.oauth2.initTokenClient) —
//      this is what actually yields an access token with the
//      `drive.appdata` scope so drive-sync.js can read/write the
//      hidden appData file.
//
// One Tap is the gentle entry point; selecting an account there triggers
// a (usually silent) Drive token request. A persistent "Sign in to sync"
// button drives the same token flow explicitly.
//
// NOTE: only a public CLIENT ID is needed — never a client secret.
// The token never leaves the browser and is not persisted.

// ----- CONFIG: set this after creating an OAuth client (see README) -----
const GOOGLE_CLIENT_ID =
  "824161474805-qln4gs4k0i8hfeqaa43b8s7vsev0agtc.apps.googleusercontent.com";
// ------------------------------------------------------------------------

const SCOPES = "https://www.googleapis.com/auth/drive.appdata email profile";

// Shared with drive-sync.js via the common global script scope.
let accessToken = null;
let tokenClient = null;

let currentProfile = null;
let authHandlers = { onSignedIn() {}, onSignedOut() {}, onError() {} };

// Remember that the user *chose* to sync, so we only attempt a silent
// token restore on future loads (never pop consent unprompted).
const INTENT_KEY = "fde_gsync_intent";

function gisReady() {
  return (
    typeof google !== "undefined" &&
    google.accounts &&
    google.accounts.oauth2 &&
    GOOGLE_CLIENT_ID &&
    GOOGLE_CLIENT_ID !== "PUT_CLIENT_ID_HERE"
  );
}

// Low-level: request an access token. `prompt` is "" for silent,
// "consent" to force the account chooser / scope grant. Resolves with
// the token or rejects with the GIS error object.
function getToken(prompt) {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error("token client not initialised"));
      return;
    }
    tokenClient.callback = (resp) => {
      if (resp.error) {
        reject(resp);
        return;
      }
      accessToken = resp.access_token;
      resolve(resp.access_token);
    };
    // Fires when the user closes the popup or it cannot be shown.
    tokenClient.error_callback = (err) => reject(err);
    try {
      tokenClient.requestAccessToken({ prompt });
    } catch (e) {
      reject(e);
    }
  });
}

// Used by drive-sync.js when a Drive call returns 401. Silent refresh.
function refreshToken() {
  return getToken("");
}

async function fetchProfile() {
  const r = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: "Bearer " + accessToken },
  });
  if (!r.ok) throw new Error("userinfo " + r.status);
  return r.json(); // { email, name, picture, ... }
}

// Shared completion path for every sign-in entry point. Tries silent
// first (returning, already-consented users), falls back to an explicit
// consent prompt the first time.
async function completeSignIn() {
  try {
    try {
      await getToken("");
    } catch {
      await getToken("consent");
    }
    currentProfile = await fetchProfile();
    localStorage.setItem(INTENT_KEY, "1");
    authHandlers.onSignedIn(currentProfile);
  } catch (err) {
    authHandlers.onError(err);
  }
}

// ---------- Public API (window.fdeAuth) ----------

function initAuth(handlers) {
  authHandlers = Object.assign(authHandlers, handlers || {});
  if (!gisReady()) {
    // GIS blocked/offline, or client ID not configured yet. The app keeps
    // working in pure-localStorage mode; just no sync UI affordance fires.
    authHandlers.onSignedOut();
    return;
  }

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: SCOPES,
    callback: () => {}, // replaced per-request by getToken()
  });

  // One Tap: identity entry point. On account selection we immediately
  // run the (usually silent) Drive token flow.
  try {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: () => completeSignIn(),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  } catch (e) {
    /* One Tap unavailable — the button still works. */
  }

  // Attempt a silent restore for users who synced before.
  if (localStorage.getItem(INTENT_KEY) === "1") {
    getToken("")
      .then(async () => {
        currentProfile = await fetchProfile();
        authHandlers.onSignedIn(currentProfile);
      })
      .catch(() => {
        // Couldn't restore silently — show the One Tap nudge instead.
        authHandlers.onSignedOut();
        promptOneTap();
      });
  } else {
    authHandlers.onSignedOut();
    promptOneTap();
  }
}

// Show the One Tap prompt (no-op if unavailable or already signed in).
function promptOneTap() {
  if (!gisReady() || accessToken) return;
  try {
    google.accounts.id.prompt();
  } catch (e) {
    /* ignore */
  }
}

// Explicit "Sign in to sync" button → force the chooser/consent.
function signIn() {
  if (!gisReady()) {
    authHandlers.onError(new Error("Google sign-in is not configured."));
    return;
  }
  completeSignIn();
}

function signOut() {
  if (accessToken && gisReady()) {
    try {
      google.accounts.oauth2.revoke(accessToken, () => {});
    } catch (e) {
      /* ignore */
    }
  }
  accessToken = null;
  currentProfile = null;
  localStorage.removeItem(INTENT_KEY);
  authHandlers.onSignedOut();
}

function isSignedIn() {
  return !!accessToken;
}

function getProfile() {
  return currentProfile;
}

// True once GIS has loaded and a real client ID is configured. Used by the
// UI to hide the sync affordance entirely when sync isn't set up.
function isAvailable() {
  return gisReady();
}

window.fdeAuth = {
  initAuth,
  signIn,
  signOut,
  promptOneTap,
  isSignedIn,
  getProfile,
  isAvailable,
};
