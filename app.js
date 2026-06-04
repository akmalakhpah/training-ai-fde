// =========================================================
// AI FDE Training — App
// =========================================================

const STORAGE_KEY = "fde_progress_v1";
const FILTER_KEY = "fde_filter_v1";

const state = {
  route: { type: "home" },
  completed: loadCompleted(),
  search: "",
  phaseFilter: loadFilter(), // "all" | "p1" | "p2" | "p3" | "p4"
};

// ---------- Storage ----------

function loadCompleted() {
  // Reads synchronously from localStorage via the progress store (the
  // single storage interface). Drive sync, if any, happens behind it.
  return new Set(window.progressStore.readCompleted());
}

function saveCompleted() {
  // Writes locally and instantly, then schedules a debounced Drive push
  // when signed in. Never blocks the UI.
  window.progressStore.writeCompleted([...state.completed]);
}

function loadFilter() {
  return localStorage.getItem(FILTER_KEY) || "all";
}

function saveFilter() {
  localStorage.setItem(FILTER_KEY, state.phaseFilter);
}

function isCompleted(id) {
  return state.completed.has(id);
}

function toggleCompleted(id) {
  if (state.completed.has(id)) state.completed.delete(id);
  else state.completed.add(id);
  saveCompleted();
}

// ---------- Routing ----------

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash || hash === "home") return { type: "home" };
  if (hash === "philosophy") return { type: "philosophy" };
  if (hash === "assessment") return { type: "assessment" };
  if (hash === "landscape") return { type: "landscape" };
  if (hash === "glossary") return { type: "glossary" };
  if (hash.startsWith("week/")) {
    const num = parseInt(hash.split("/")[1], 10);
    if (!isNaN(num)) return { type: "week", num };
  }
  return { type: "home" };
}

function navigate(hash) {
  window.location.hash = hash;
}

window.addEventListener("hashchange", () => {
  state.route = parseHash();
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
  closeMobileSidebar();
});

// ---------- Icons ----------

const icons = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  book: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  code: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  ship: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l9-13 9 13"/><path d="M3 17h18"/><path d="M12 4v13"/></svg>`,
  scale: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16v6"/><path d="M8 16v6"/><path d="M12 2v20"/><path d="M16 6h6"/><path d="M2 6h6"/></svg>`,
  menu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  slides: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  external: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  lockLarge: `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  cloud: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  google: `<svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>`,
};

// ---------- Schedule helpers ----------

function weekIsUnlocked(weekNum) {
  return window.programSchedule ? window.programSchedule.isUnlocked(weekNum) : true;
}

function isInstructor() {
  return window.programSchedule ? window.programSchedule.isInstructor() : false;
}

// ---------- Utils ----------

function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Turn bare URLs and domains in already-rendered prose into clickable links
// that open in a new tab. Walks text nodes only, so existing anchors (nav),
// code samples, and HTML attributes are never touched.
function linkifyTextNodes(root) {
  if (!root) return;
  const LINK_RE =
    /(https?:\/\/[^\s<>"']+)|((?:[a-z0-9-]+\.)+(?:com|org|io|net|dev|ai|co)(?:\/[^\s<>"')]*)?)/gi;
  const SKIP = { A: 1, CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, BUTTON: 1, INPUT: 1 };

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim())
        return NodeFilter.FILTER_REJECT;
      for (let p = node.parentNode; p && p !== root; p = p.parentNode) {
        if (SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
      }
      return /(https?:\/\/|(?:[a-z0-9-]+\.)+(?:com|org|io|net|dev|ai|co))/i.test(
        node.nodeValue
      )
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const targets = [];
  let node;
  while ((node = walker.nextNode())) targets.push(node);

  targets.forEach((textNode) => {
    const text = textNode.nodeValue;
    LINK_RE.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0;
    let m;
    while ((m = LINK_RE.exec(text))) {
      let url = m[0];
      let trail = "";
      const tm = url.match(/[).,!?:]+$/); // keep trailing punctuation out of the link
      if (tm) {
        trail = tm[0];
        url = url.slice(0, -trail.length);
      }
      if (m.index > last)
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const a = document.createElement("a");
      a.href = /^https?:\/\//i.test(url) ? url : "https://" + url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = url;
      frag.appendChild(a);
      if (trail) frag.appendChild(document.createTextNode(trail));
      last = m.index + m[0].length;
    }
    if (last < text.length)
      frag.appendChild(document.createTextNode(text.slice(last)));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

// Post-render Markdown formatting passes. Like linkifyTextNodes, these walk
// text nodes in already-rendered prose, so content authored in data.js can use
// `inline code`, ```fenced blocks```, and [label](url) links without any render
// function knowing about markup. Nodes already inside a link/code/button are
// skipped so passes never double-process each other's output.
const FORMAT_SKIP = { A: 1, CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, BUTTON: 1, INPUT: 1, TEXTAREA: 1 };

function eachFormattableTextNode(root, contains, fn) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || node.nodeValue.indexOf(contains) === -1)
        return NodeFilter.FILTER_REJECT;
      for (let p = node.parentNode; p && p !== root; p = p.parentNode) {
        if (FORMAT_SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const targets = [];
  let node;
  while ((node = walker.nextNode())) targets.push(node);
  targets.forEach(fn);
}

// Replace the matches of `re` in `textNode` with elements built by `make`,
// preserving the surrounding text.
function replaceMatches(textNode, re, make) {
  const text = textNode.nodeValue;
  re.lastIndex = 0;
  if (!re.test(text)) return;
  re.lastIndex = 0;
  const frag = document.createDocumentFragment();
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last)
      frag.appendChild(document.createTextNode(text.slice(last, m.index)));
    frag.appendChild(make(m));
    last = m.index + m[0].length;
  }
  if (last < text.length)
    frag.appendChild(document.createTextNode(text.slice(last)));
  textNode.parentNode.replaceChild(frag, textNode);
}

function copyToClipboard(text, onDone) {
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      onDone(true);
    } catch (e) {
      onDone(false);
    }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => onDone(true),
      fallback
    );
  } else {
    fallback();
  }
}

function buildCodeBlock(code) {
  const pre = document.createElement("pre");
  pre.className = "code-block";

  const codeEl = document.createElement("code");
  codeEl.textContent = code.replace(/\n+$/, "");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "code-copy";
  btn.textContent = "Copy";
  btn.setAttribute("aria-label", "Copy code to clipboard");
  btn.addEventListener("click", () => {
    copyToClipboard(codeEl.textContent, (ok) => {
      btn.textContent = ok ? "Copied!" : "Failed";
      btn.classList.toggle("copied", ok);
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
      }, 1500);
    });
  });

  pre.appendChild(btn);
  pre.appendChild(codeEl);
  return pre;
}

// ```fenced code``` → <pre class="code-block"> with a copy button. Run first so
// the resulting <pre>/<code> shield their contents from the later passes.
function formatCodeBlocks(root) {
  const FENCE_RE = /```[ \t]*[\w+-]*\n?([\s\S]*?)```/g;
  eachFormattableTextNode(root, "```", (node) => {
    replaceMatches(node, FENCE_RE, (m) => buildCodeBlock(m[1]));
  });
}

// `inline code` → <code class="inline-code">
function formatInlineCode(root) {
  const INLINE_RE = /`([^`\n]+)`/g;
  eachFormattableTextNode(root, "`", (node) => {
    replaceMatches(node, INLINE_RE, (m) => {
      const c = document.createElement("code");
      c.className = "inline-code";
      c.textContent = m[1];
      return c;
    });
  });
}

// [label](url) → anchor. Internal (#/…) links navigate in place via the SPA
// router; everything else opens in a new tab.
function formatMarkdownLinks(root) {
  const LINK_RE = /\[([^\]]+)\]\(([^()\s]+)\)/g;
  eachFormattableTextNode(root, "](", (node) => {
    replaceMatches(node, LINK_RE, (m) => {
      const a = document.createElement("a");
      const url = m[2];
      a.textContent = m[1];
      if (url.startsWith("#")) {
        a.href = url;
        a.setAttribute("data-link", "");
      } else {
        a.href = /^(https?:\/\/|mailto:)/i.test(url)
          ? url
          : "https://" + url.replace(/^\/+/, "");
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      return a;
    });
  });
}

function phase(weekNum) {
  const w = courseData.weeks.find((w) => w.num === weekNum);
  if (!w) return null;
  return courseData.phases.find((p) => p.id === w.phaseId);
}

function phaseById(id) {
  return courseData.phases.find((p) => p.id === id);
}

function matchesSearch(week, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const haystack = [
    week.title,
    week.taughtClass,
    week.deliverable,
    week.assessment,
    ...week.objectives,
    ...week.selfPaced,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

// ---------- Render: sidebar ----------

function renderSidebar() {
  const filtered = courseData.weeks.filter((w) => {
    if (state.phaseFilter !== "all" && w.phaseId !== state.phaseFilter) return false;
    if (!matchesSearch(w, state.search)) return false;
    return true;
  });

  const total = courseData.weeks.length;
  const done = [...state.completed].filter((id) =>
    id.startsWith("week-")
  ).length;
  const pct = Math.round((done / total) * 100);

  // Group by phase
  const phaseGroups = courseData.phases.map((p) => ({
    phase: p,
    weeks: filtered.filter((w) => w.phaseId === p.id),
  }));

  const html = `
    <a href="#/home" class="sidebar-brand" data-link aria-label="Go to course home">
      <div class="brand-mark">FDE</div>
      <div class="brand-text">
        <span class="brand-title">AI FDE Training</span>
        <span class="brand-subtitle">12-week program</span>
      </div>
    </a>

    ${isInstructor() ? `<div class="instructor-banner" title="All weeks are unlocked for this browser. Visit any URL with ?instructor=0 to clear.">
      ${icons.lock} Instructor mode — all weeks unlocked
    </div>` : ""}

    <div class="sync-panel" id="sync-panel"></div>

    <div class="progress-card">
      <div class="progress-header">
        <span class="progress-label">Your progress</span>
        <span class="progress-count">${done} / ${total}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${pct}%"></div>
      </div>
    </div>

    <div class="search">
      <span class="search-icon">${icons.search}</span>
      <input
        type="search"
        id="search-input"
        placeholder="Search weeks…"
        value="${esc(state.search)}"
        aria-label="Search course content"
      />
    </div>

    <div class="phase-filter" role="group" aria-label="Filter by phase">
      <button class="chip ${state.phaseFilter === "all" ? "active" : ""}" data-filter="all">All</button>
      ${courseData.phases
        .map(
          (p) => `
        <button class="chip ${state.phaseFilter === p.id ? "active" : ""}" data-filter="${p.id}">P${p.num}</button>
      `
        )
        .join("")}
    </div>

    <div class="nav-section">
      <p class="nav-section-title">Overview</p>
      <a href="#/home" class="nav-link ${state.route.type === "home" ? "active" : ""}" data-link>
        <span class="week-num">·</span>
        <span class="label">Home</span>
      </a>
      <a href="#/philosophy" class="nav-link ${state.route.type === "philosophy" ? "active" : ""}" data-link>
        <span class="week-num">·</span>
        <span class="label">Philosophy & outcomes</span>
      </a>
    </div>

    ${phaseGroups
      .filter((g) => g.weeks.length > 0)
      .map(
        (g) => `
      <div class="nav-section">
        <p class="nav-section-title">Phase ${g.phase.num}: ${esc(g.phase.name)}</p>
        ${g.weeks
          .map((w) => {
            const id = `week-${w.num}`;
            const active = state.route.type === "week" && state.route.num === w.num;
            const done = isCompleted(id);
            const unlocked = weekIsUnlocked(w.num);
            const stateIcon = !unlocked
              ? `<span class="lock-mark" aria-label="Locked">${icons.lock}</span>`
              : `<span class="check" aria-label="Completed">${icons.check}</span>`;
            const lockTitle = !unlocked
              ? ` title="${esc(window.programSchedule.unlockCountdownLabel(w.num))} · ${esc(window.programSchedule.formatUnlockDate(w.num))}"`
              : "";
            return `
              <a href="#/week/${w.num}" class="nav-link ${active ? "active" : ""} ${done ? "completed" : ""} ${!unlocked ? "locked" : ""}" data-link${lockTitle}>
                <span class="week-num">${w.num}</span>
                <span class="label">${esc(w.title)}</span>
                ${stateIcon}
              </a>
            `;
          })
          .join("")}
      </div>
    `
      )
      .join("")}

    ${
      filtered.length === 0 && (state.search || state.phaseFilter !== "all")
        ? `<div class="empty-state">No weeks match.</div>`
        : ""
    }

    <div class="nav-section">
      <p class="nav-section-title">Reference</p>
      <a href="#/landscape" class="nav-link ${state.route.type === "landscape" ? "active" : ""}" data-link>
        <span class="week-num">·</span>
        <span class="label">Model landscape</span>
      </a>
      <a href="#/assessment" class="nav-link ${state.route.type === "assessment" ? "active" : ""}" data-link>
        <span class="week-num">·</span>
        <span class="label">Assessment & rubric</span>
      </a>
      <a href="#/glossary" class="nav-link ${state.route.type === "glossary" ? "active" : ""}" data-link>
        <span class="week-num">·</span>
        <span class="label">Glossary</span>
      </a>
    </div>
  `;

  document.getElementById("sidebar").innerHTML = html;

  // Wire up listeners
  document.getElementById("search-input").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderSidebar();
  });

  document.querySelectorAll(".chip[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.phaseFilter = btn.dataset.filter;
      saveFilter();
      renderSidebar();
    });
  });

  updateSyncPanel();
}

// ---------- Cloud sync UI ----------

// Renders the sign-in / sync-status panel into #sync-panel. Safe to call
// any time the auth or sync state changes; no-ops if the node isn't
// mounted yet. The app works fully without any of this.
function updateSyncPanel() {
  const el = document.getElementById("sync-panel");
  if (!el) return;

  const auth = window.fdeAuth;
  if (!auth) {
    el.innerHTML = "";
    return;
  }

  if (!auth.isSignedIn()) {
    // Hide the affordance entirely when sync isn't configured/available, so
    // there's no dead button. The app just runs in localStorage-only mode.
    if (!auth.isAvailable()) {
      el.innerHTML = "";
      return;
    }
    el.innerHTML = `
      <button class="sync-signin" id="sync-signin" title="Sync your progress across devices with Google">
        ${icons.google} Sign in to sync
      </button>
    `;
    const btn = document.getElementById("sync-signin");
    if (btn) btn.addEventListener("click", () => auth.signIn());
    return;
  }

  const profile = auth.getProfile() || {};
  const who = esc(profile.name || profile.email || "Signed in");
  const status = window.progressStore.getStatus();
  const statusMap = {
    syncing: { cls: "syncing", label: "Syncing…" },
    synced: { cls: "synced", label: "Synced" },
    error: { cls: "error", label: "Sync error — will retry" },
    offline: { cls: "error", label: "Offline — saved locally" },
    idle: { cls: "synced", label: "Synced" },
  };
  const s = statusMap[status] || statusMap.idle;
  const avatar = profile.picture
    ? `<img class="sync-avatar" src="${esc(profile.picture)}" alt="" referrerpolicy="no-referrer" />`
    : `<span class="sync-avatar sync-avatar-fallback">${icons.cloud}</span>`;

  el.innerHTML = `
    <div class="sync-account">
      ${avatar}
      <div class="sync-account-text">
        <span class="sync-who" title="${who}">${who}</span>
        <span class="sync-status">
          <span class="sync-dot ${s.cls}"></span>${s.label}
        </span>
      </div>
      <button class="sync-signout" id="sync-signout" title="Sign out (progress stays on this device)">Sign out</button>
    </div>
  `;
  const out = document.getElementById("sync-signout");
  if (out) out.addEventListener("click", () => auth.signOut());
}

// Wire the auth + sync modules to the app. Called once at startup.
function setupCloudSync() {
  if (!window.fdeAuth || !window.progressStore) return;

  // When a sign-in merge pulls in weeks completed elsewhere, adopt them
  // and re-render from localStorage.
  window.progressStore.setOnRemoteUpdate((completedArr) => {
    state.completed = new Set(completedArr);
    render();
  });

  // Reflect every sync-state change in the small status indicator.
  window.progressStore.setOnStatusChange(() => updateSyncPanel());

  const handlers = {
    onSignedIn: () => {
      updateSyncPanel();
      window.progressStore.syncOnSignIn();
    },
    onSignedOut: () => updateSyncPanel(),
    onError: (err) => {
      console.warn("[auth]", err);
      updateSyncPanel();
    },
  };

  // The GIS client loads async so it never blocks offline rendering. Wait
  // for it (up to ~8s), then init. If it never arrives (offline / blocked),
  // initAuth falls back to signed-out, localStorage-only mode.
  const start = Date.now();
  (function waitForGis() {
    const ready =
      typeof google !== "undefined" &&
      google.accounts &&
      google.accounts.oauth2;
    if (ready || Date.now() - start > 8000) {
      window.fdeAuth.initAuth(handlers);
    } else {
      setTimeout(waitForGis, 200);
    }
  })();
}

// ---------- Render: pages ----------

function renderHome() {
  const total = courseData.weeks.length;
  const done = [...state.completed].filter((id) => id.startsWith("week-")).length;

  return `
    <header class="page-header">
      <span class="eyebrow"><span class="eyebrow-dot"></span> Curriculum</span>
      <h1 class="page-title">${esc(courseData.meta.title)}</h1>
      <p class="page-subtitle">${esc(courseData.meta.subtitle)}</p>
    </header>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-xl);">
      <h2 class="section-title">Course overview</h2>
      ${courseData.philosophy.body.map((p) => `<p>${esc(p)}</p>`).join("")}
      <p style="margin-bottom: 0;">Over <strong>${esc(courseData.meta.duration)}</strong> across four phases, you'll move from production engineering foundations, through building reliable AI applications, into the FDE craft of scoping and customer communication, and finish with a real embedded capstone deployment. Every week ends in a shippable deliverable. <a href="#/philosophy" data-link>Read the full philosophy →</a></p>
    </div>

    <div class="bento">
      <div class="glass-card bento-item">
        <p class="bento-eyebrow">Duration</p>
        <p class="bento-value">${esc(courseData.meta.duration)}</p>
        <p class="bento-desc">Hybrid: taught class + self-paced build.</p>
      </div>
      <div class="glass-card bento-item">
        <p class="bento-eyebrow">Weekly load</p>
        <p class="bento-value">${esc(courseData.meta.commitment)}</p>
        <p class="bento-desc">Including the ~90 min class.</p>
      </div>
      <div class="glass-card bento-item">
        <p class="bento-eyebrow">Primary model</p>
        <p class="bento-value">Claude</p>
        <p class="bento-desc">With one self-paced landscape session.</p>
      </div>
      <div class="glass-card bento-item">
        <p class="bento-eyebrow">Your progress</p>
        <p class="bento-value">${done} <span style="color: var(--color-text-subtle); font-size: 1.25rem; font-weight: 500;">/ ${total} weeks</span></p>
        <p class="bento-desc">${done === 0 ? "Start with Week 1 to set up the production mindset." : done === total ? "All weeks complete — you're field-ready." : "Keep shipping. The capstone closes the loop in Weeks 11–12."}</p>
      </div>
      <div class="glass-card bento-item">
        <p class="bento-eyebrow">Format</p>
        <p class="bento-value" style="font-size: 1.25rem;">${esc(courseData.meta.classFormat)}</p>
        <p class="bento-desc">The class unblocks. The build is where you learn.</p>
      </div>
      <a href="#/week/0" data-link class="glass-card bento-item" style="text-decoration: none;">
        <p class="bento-eyebrow">Before you start</p>
        <p class="bento-value" style="font-size: 1.25rem;">Week 0 · Setup</p>
        <p class="bento-desc">Tooling, accounts, a public submission repo, and a calibration diagnostic.</p>
      </a>
    </div>

    <h2 class="section-title" style="margin-top: var(--space-2xl);">The four phases</h2>
    <div class="phase-grid">
      ${courseData.phases
        .filter((p) => p.num !== 0)
        .map(
          (p) => `
        <a href="#/week/${courseData.weeks.find((w) => w.phaseId === p.id).num}" data-link class="glass-card phase-card accent-${p.color}" style="text-decoration: none;">
          <div class="phase-card-head">
            <div class="phase-num">0${p.num}</div>
            <span class="phase-weeks">Weeks ${esc(p.weeks)}</span>
          </div>
          <h3 class="phase-name">${esc(p.name)}</h3>
          <p class="phase-focus">${esc(p.focus)}</p>
        </a>
      `
        )
        .join("")}
    </div>

    <div class="glass-card lg" style="margin-top: var(--space-xl);">
      <h2 class="section-title">Four muscles, every week</h2>
      <ol class="numbered-list">
        ${courseData.philosophy.muscles
          .map(
            (m, i) => `
          <li>
            <span class="num">${i + 1}</span>
            <span>${esc(m)}</span>
          </li>
        `
          )
          .join("")}
      </ol>
      <p style="margin: var(--space-md) 0 0; color: var(--color-text-muted); font-size: 0.95rem;">
        ${esc(courseData.philosophy.closer)}
      </p>
    </div>
  `;
}

function renderPhilosophy() {
  return `
    <header class="page-header">
      <span class="eyebrow"><span class="eyebrow-dot"></span> Foundations</span>
      <h1 class="page-title">${esc(courseData.philosophy.title)}</h1>
      <p class="page-subtitle">Why this course exists, who it's for, and what graduates can do.</p>
    </header>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-lg);">
      ${courseData.philosophy.body.map((p) => `<p>${esc(p)}</p>`).join("")}

      <h3 class="subhead">Four muscles run through every single week</h3>
      <ol class="numbered-list">
        ${courseData.philosophy.muscles
          .map(
            (m, i) => `
          <li>
            <span class="num">${i + 1}</span>
            <span>${esc(m)}</span>
          </li>
        `
          )
          .join("")}
      </ol>
      <p style="margin-top: var(--space-md);">${esc(courseData.philosophy.closer)}</p>
    </div>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-lg);">
      <h2 class="section-title">Target trainee</h2>
      <p>${esc(courseData.audience.target)}</p>

      <h3 class="subhead">By the end, a graduate can</h3>
      <ul>
        ${courseData.audience.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}
      </ul>
    </div>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-lg);">
      <h2 class="section-title">Prerequisites</h2>

      <h3 class="subhead">Knowledge to arrive with</h3>
      <ul>
        ${courseData.prerequisites.knowledge.map((k) => `<li>${esc(k)}</li>`).join("")}
      </ul>

      <h3 class="subhead">What the course builds</h3>
      <p>${esc(courseData.prerequisites.built)}</p>

      <h3 class="subhead">Environment & accounts (before Week 1)</h3>
      <ul>
        ${courseData.prerequisites.setup.map((s) => `<li>${esc(s)}</li>`).join("")}
      </ul>
    </div>

    <div class="glass-card lg content-block">
      <h2 class="section-title">Tooling & the role of Claude</h2>
      <p>${esc(courseData.tooling.intro)}</p>
      <ol>
        ${courseData.tooling.uses.map((u) => `<li>${esc(u)}</li>`).join("")}
      </ol>

      <h3 class="subhead">Model tiers</h3>
      <div class="tier-grid">
        ${courseData.tooling.tiers
          .map(
            (t) => `
          <div class="tier-card">
            <p class="tier-name">${esc(t.name)}</p>
            <p class="tier-desc">${esc(t.desc)}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <p style="margin-top: var(--space-md); font-size: 0.95rem; color: var(--color-text-muted);">
        ${esc(courseData.tooling.principle)}
      </p>
    </div>
  `;
}

function renderLockedWeek(week, p, prev, next) {
  const countdown = window.programSchedule.unlockCountdownLabel(week.num);
  const dateLabel = window.programSchedule.formatUnlockDate(week.num);
  const prevUnlocked = prev && weekIsUnlocked(prev.num);
  const nextUnlocked = next && weekIsUnlocked(next.num);

  return `
    <header class="page-header">
      <div class="week-meta">
        <span class="badge accent accent-${p.color}">Phase ${p.num} · ${esc(p.name)}</span>
        <span class="badge">Week ${week.num} of 12</span>
        <span class="badge locked-badge">${icons.lock} Locked</span>
      </div>
      <h1 class="page-title">${esc(week.title)}</h1>
    </header>

    <div class="lock-gate">
      <div class="lock-gate-icon">${icons.lockLarge}</div>
      <h2 class="lock-gate-title">${esc(countdown)}</h2>
      <p class="lock-gate-date">
        ${icons.calendar}
        <span>Available from <strong>${esc(dateLabel)}</strong></span>
      </p>
      <p class="lock-gate-body">
        This week's content opens at the start of Week ${week.num} of the program. In the
        meantime, keep shipping the current week's deliverable and revisit earlier material
        you'd like to strengthen.
      </p>

      <div class="lock-gate-actions">
        ${prev ? `<a class="lock-gate-btn" href="#/week/${prev.num}" data-link>${icons.arrowLeft} Back to Week ${prev.num}</a>` : ""}
        <a class="lock-gate-btn primary" href="#/home" data-link>Course home</a>
      </div>
    </div>

    <nav class="pager" aria-label="Week navigation">
      ${
        prev
          ? `<a href="#/week/${prev.num}" data-link class="pager-link prev">
              <span class="pager-eyebrow">${icons.arrowLeft} Previous · Week ${prev.num}${!prevUnlocked ? " · Locked" : ""}</span>
              <span class="pager-title">${esc(prev.title)}</span>
            </a>`
          : `<span class="pager-link disabled">
              <span class="pager-eyebrow">Start of course</span>
              <span class="pager-title">No previous week</span>
            </span>`
      }
      ${
        next
          ? `<a href="#/week/${next.num}" data-link class="pager-link next">
              <span class="pager-eyebrow">Next · Week ${next.num}${!nextUnlocked ? " · Locked" : ""} ${icons.arrowRight}</span>
              <span class="pager-title">${esc(next.title)}</span>
            </a>`
          : `<a href="#/assessment" data-link class="pager-link next">
              <span class="pager-eyebrow">Next ${icons.arrowRight}</span>
              <span class="pager-title">Assessment & graduation</span>
            </a>`
      }
    </nav>
  `;
}

function renderWeek(num) {
  const week = courseData.weeks.find((w) => w.num === num);
  if (!week) {
    return `<div class="glass-card lg">Week not found. <a href="#/home" data-link>Back to home</a>.</div>`;
  }
  const p = phaseById(week.phaseId);
  const id = `week-${week.num}`;
  const done = isCompleted(id);

  const prev = courseData.weeks.find((w) => w.num === num - 1);
  const next = courseData.weeks.find((w) => w.num === num + 1);

  if (!weekIsUnlocked(week.num)) {
    return renderLockedWeek(week, p, prev, next);
  }

  return `
    <header class="page-header">
      <div class="week-meta">
        <span class="badge accent accent-${p.color}">Phase ${p.num} · ${esc(p.name)}</span>
        <span class="badge">Week ${week.num} of 12</span>
      </div>
      <h1 class="page-title">${esc(week.title)}</h1>
    </header>

    <div class="section">
      <details class="collapsible" open>
        <summary>
          <div class="summary-icon">${icons.target}</div>
          <div style="flex: 1;">
            <span class="summary-eyebrow">Section</span>
            <span class="summary-title">Learning objectives</span>
          </div>
          <span class="chevron">${icons.chevron}</span>
        </summary>
        <div class="collapsible-body content-block">
          <ul>
            ${week.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}
          </ul>
        </div>
      </details>

      <details class="collapsible" open>
        <summary>
          <div class="summary-icon">${icons.book}</div>
          <div style="flex: 1;">
            <span class="summary-eyebrow">~90 minutes · live</span>
            <span class="summary-title">Taught class</span>
          </div>
          <span class="chevron">${icons.chevron}</span>
        </summary>
        <div class="collapsible-body content-block">
          ${week.taughtClass.split(/\n\n+/).map((para) => `<p>${esc(para.trim())}</p>`).join("")}
          <a class="slides-link" href="slides/week-${String(week.num).padStart(2, "0")}.html" target="_blank" rel="noopener">
            ${icons.slides}
            <span>Open class slides</span>
            ${icons.external}
          </a>
        </div>
      </details>

      <details class="collapsible">
        <summary>
          <div class="summary-icon">${icons.code}</div>
          <div style="flex: 1;">
            <span class="summary-eyebrow">6–9 hours · async</span>
            <span class="summary-title">Self-paced track</span>
          </div>
          <span class="chevron">${icons.chevron}</span>
        </summary>
        <div class="collapsible-body content-block">
          <ul>
            ${week.selfPaced
              .map((s) =>
                typeof s === "string"
                  ? `<li>${esc(s)}</li>`
                  : `<li><strong>${esc(s.title)}</strong>${
                      Array.isArray(s.points) && s.points.length
                        ? `<ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`
                        : ""
                    }</li>`
              )
              .join("")}
          </ul>
        </div>
      </details>

      <details class="collapsible">
        <summary>
          <div class="summary-icon">${icons.ship}</div>
          <div style="flex: 1;">
            <span class="summary-eyebrow">Ship this week</span>
            <span class="summary-title">Project deliverable</span>
          </div>
          <span class="chevron">${icons.chevron}</span>
        </summary>
        <div class="collapsible-body content-block">
          ${week.deliverable.split(/\n\n+/).map((para) => `<p>${esc(para.trim())}</p>`).join("")}
        </div>
      </details>

      <details class="collapsible">
        <summary>
          <div class="summary-icon">${icons.scale}</div>
          <div style="flex: 1;">
            <span class="summary-eyebrow">How you're judged</span>
            <span class="summary-title">Assessment</span>
          </div>
          <span class="chevron">${icons.chevron}</span>
        </summary>
        <div class="collapsible-body content-block">
          ${week.assessment.split(/\n\n+/).map((para) => `<p>${esc(para.trim())}</p>`).join("")}
        </div>
      </details>
    </div>

    <div style="margin-top: var(--space-xl);">
      <button class="complete-btn ${done ? "completed" : ""}" id="complete-btn">
        ${icons.check}
        ${done ? "Marked complete" : "Mark week complete"}
      </button>
    </div>

    <nav class="pager" aria-label="Week navigation">
      ${
        prev
          ? `<a href="#/week/${prev.num}" data-link class="pager-link prev">
              <span class="pager-eyebrow">${icons.arrowLeft} Previous · Week ${prev.num}</span>
              <span class="pager-title">${esc(prev.title)}</span>
            </a>`
          : `<span class="pager-link disabled">
              <span class="pager-eyebrow">Start of course</span>
              <span class="pager-title">No previous week</span>
            </span>`
      }
      ${
        next
          ? `<a href="#/week/${next.num}" data-link class="pager-link next">
              <span class="pager-eyebrow">Next · Week ${next.num} ${icons.arrowRight}</span>
              <span class="pager-title">${esc(next.title)}</span>
            </a>`
          : `<a href="#/assessment" data-link class="pager-link next">
              <span class="pager-eyebrow">Next ${icons.arrowRight}</span>
              <span class="pager-title">Assessment & graduation</span>
            </a>`
      }
    </nav>
  `;
}

function renderLandscape() {
  const ls = courseData.landscape;
  return `
    <header class="page-header">
      <span class="eyebrow"><span class="eyebrow-dot"></span> Between Phase 2 & 3</span>
      <h1 class="page-title">${esc(ls.title)}</h1>
      <p class="page-subtitle">${esc(ls.intro)}</p>
    </header>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-lg);">
      <h2 class="section-title">Objectives</h2>
      <ul>
        ${ls.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}
      </ul>
    </div>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-lg);">
      <h2 class="section-title">Self-learning tasks</h2>
      <ol>
        ${ls.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}
      </ol>
    </div>

    <div class="glass-card lg content-block">
      <h2 class="section-title">The takeaway</h2>
      <p>${esc(ls.closer)}</p>
    </div>
  `;
}

function renderAssessment() {
  const a = courseData.assessment;
  return `
    <header class="page-header">
      <span class="eyebrow"><span class="eyebrow-dot"></span> Evaluation</span>
      <h1 class="page-title">Assessment & graduation</h1>
      <p class="page-subtitle">${esc(a.intro)}</p>
    </header>

    <div class="glass-card lg content-block" style="margin-bottom: var(--space-lg);">
      <h2 class="section-title">Weekly assessment</h2>
      <p>Every deliverable is assessed on three questions:</p>
      <ol>
        ${a.weekly.map((q) => `<li>${esc(q)}</li>`).join("")}
      </ol>
    </div>

    <div class="section">
      <h2 class="section-title">Rubric (weekly & capstone)</h2>
      <table class="rubric-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Weight</th>
            <th>What is being judged</th>
          </tr>
        </thead>
        <tbody>
          ${a.rubric
            .map(
              (r) => `
            <tr>
              <td><strong>${esc(r.dim)}</strong></td>
              <td class="weight">${esc(r.weight)}</td>
              <td>${esc(r.desc)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="glass-card lg content-block" style="margin-top: var(--space-lg);">
      <h2 class="section-title">Graduation criteria</h2>
      <p>A trainee graduates as a deployable AI FDE when they have:</p>
      <ul>
        ${a.graduation.map((g) => `<li>${esc(g)}</li>`).join("")}
      </ul>
      <p style="margin-top: var(--space-md); color: var(--color-text-muted);">${esc(a.note)}</p>
    </div>
  `;
}

function renderGlossary() {
  const terms = [...courseData.glossary].sort((a, b) =>
    a.term.toLowerCase().localeCompare(b.term.toLowerCase())
  );

  return `
    <header class="page-header">
      <span class="eyebrow"><span class="eyebrow-dot"></span> Reference</span>
      <h1 class="page-title">Glossary</h1>
      <p class="page-subtitle">The short version of every term the course uses.</p>
    </header>

    <div class="search glossary-search">
      <span class="search-icon">${icons.search}</span>
      <input
        type="search"
        id="glossary-search"
        placeholder="Search ${terms.length} terms…"
        aria-label="Search glossary"
        autocomplete="off"
      />
    </div>

    <div class="glossary-grid" id="glossary-grid">
      ${terms
        .map(
          (g) => `
        <div class="glossary-item" data-search="${esc((g.term + " " + g.def).toLowerCase())}">
          <p class="glossary-term">${esc(g.term)}</p>
          <p class="glossary-def">${esc(g.def)}</p>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="empty-state" id="glossary-empty" hidden>No terms match.</div>
  `;
}

function wireGlossarySearch() {
  const input = document.getElementById("glossary-search");
  if (!input) return;
  const items = Array.from(document.querySelectorAll("#glossary-grid .glossary-item"));
  const empty = document.getElementById("glossary-empty");

  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    let visible = 0;
    items.forEach((el) => {
      const match = !q || el.dataset.search.includes(q);
      el.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  });
}

// ---------- Render orchestration ----------

function renderMain() {
  let html = "";
  switch (state.route.type) {
    case "home":
      html = renderHome();
      break;
    case "philosophy":
      html = renderPhilosophy();
      break;
    case "week":
      html = renderWeek(state.route.num);
      break;
    case "landscape":
      html = renderLandscape();
      break;
    case "assessment":
      html = renderAssessment();
      break;
    case "glossary":
      html = renderGlossary();
      break;
    default:
      html = renderHome();
  }

  const main = document.getElementById("main");
  main.innerHTML = `
    <button class="mobile-toggle" id="mobile-toggle" aria-label="Open navigation">
      ${icons.menu} Menu
    </button>
    ${html}
  `;

  // Format Markdown in rendered prose. Order matters: code blocks and inline
  // code first so their contents are shielded from the link passes that follow.
  formatCodeBlocks(main);
  formatInlineCode(main);
  formatMarkdownLinks(main);

  // Make bare URLs/domains in the rendered prose clickable (open in a new tab)
  linkifyTextNodes(main);

  // Mobile toggle
  const mt = document.getElementById("mobile-toggle");
  if (mt) {
    mt.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });
  }

  // Complete button
  const completeBtn = document.getElementById("complete-btn");
  if (completeBtn && state.route.type === "week") {
    completeBtn.addEventListener("click", () => {
      toggleCompleted(`week-${state.route.num}`);
      render();
    });
  }

  // Glossary search
  if (state.route.type === "glossary") {
    wireGlossarySearch();
  }
}

function render() {
  renderSidebar();
  renderMain();
}

function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("open");
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
  state.route = parseHash();
  render();
  setupCloudSync();
});
