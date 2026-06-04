// =========================================================
// Slide deck engine
// =========================================================

const icons = {
  prev: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  next: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  fullscreen: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
  exitFullscreen: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`,
  notes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>`,
  timer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/></svg>`,
  home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  help: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};

class SlideDeck {
  constructor() {
    this.slides = [...document.querySelectorAll(".slide")];
    this.current = 0;
    this.notesVisible = false;
    this.timer = null;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.autoAdvance = false;
    this.autoAdvanceSeconds = 45;
    this.init();
  }

  init() {
    if (this.slides.length === 0) {
      console.warn("No slides found.");
      return;
    }

    // Schedule gate: if this week is locked, replace the deck with a gate.
    const wn = parseInt(this.weekNum(), 10);
    if (wn && window.programSchedule && !window.programSchedule.isUnlocked(wn)) {
      this.renderGate(wn);
      return;
    }

    this.buildUI();
    this.bindKeys();
    this.bindClicks();
    this.bindCopy();
    this.bindFullscreenChange();

    // Restore slide from hash, if any
    const hashMatch = window.location.hash.match(/^#?s\/(\d+)/);
    const startAt = hashMatch ? Math.max(0, parseInt(hashMatch[1], 10) - 1) : 0;
    this.goTo(startAt);
  }

  renderGate(weekNum) {
    const countdown = window.programSchedule.unlockCountdownLabel(weekNum);
    const dateLabel = window.programSchedule.formatUnlockDate(weekNum);
    const deck = document.querySelector(".deck");
    if (!deck) return;
    deck.innerHTML = `
      <div class="slide active gate-slide">
        <div class="slide-content gate-content">
          <div class="gate-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <span class="eyebrow"><span class="eyebrow-dot"></span> Week ${weekNum} · Locked</span>
          <h1>${countdown}</h1>
          <p class="subtitle">These slides open at the start of Week ${weekNum} of the program.</p>
          <p class="gate-date-line">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Available from <strong>${dateLabel}</strong>
          </p>
          <a class="gate-back-btn" href="../index.html#/week/${weekNum}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to course
          </a>
        </div>
      </div>
    `;
  }

  buildUI() {
    // Progress bar
    const progress = document.createElement("div");
    progress.className = "progress-bar";
    progress.innerHTML = `<div class="progress-fill" id="progress-fill"></div>`;
    document.body.appendChild(progress);

    // Top left corner: back link
    const tl = document.createElement("div");
    tl.className = "top-corner left";
    tl.innerHTML = `
      <a class="corner-btn" href="../index.html#/week/${this.weekNum() || ""}" title="Back to course">
        ${icons.home}
        <span>Back to course</span>
      </a>
    `;
    document.body.appendChild(tl);

    // Top right corner: deck label + fullscreen
    const tr = document.createElement("div");
    tr.className = "top-corner right";
    tr.innerHTML = `
      <span class="deck-badge" id="deck-badge"></span>
      <button class="corner-btn" id="fs-btn" title="Toggle fullscreen (F)">
        ${icons.fullscreen}
        <span>Fullscreen</span>
      </button>
    `;
    document.body.appendChild(tr);

    const badge = document.getElementById("deck-badge");
    const deckTitle = document.body.dataset.deckTitle || "Class slides";
    badge.textContent = deckTitle;

    // Bottom controls
    const ctrl = document.createElement("div");
    ctrl.className = "controls";
    ctrl.innerHTML = `
      <button class="ctrl-btn" id="prev-btn" title="Previous slide (←)">${icons.prev}</button>
      <span class="counter" id="counter">1 / ${this.slides.length}</span>
      <button class="ctrl-btn" id="next-btn" title="Next slide (→)">${icons.next}</button>
      <span class="ctrl-divider"></span>
      <button class="ctrl-btn" id="timer-btn" title="Auto-advance every 45s (T)">${icons.timer}</button>
      <button class="ctrl-btn" id="notes-btn" title="Toggle speaker notes (N)">${icons.notes}</button>
      <button class="ctrl-btn" id="help-btn" title="Help (?)">${icons.help}</button>
    `;
    document.body.appendChild(ctrl);

    // Notes panel
    const notes = document.createElement("div");
    notes.className = "notes-panel";
    notes.innerHTML = `
      <p class="notes-eyebrow">Speaker notes — press N to hide</p>
      <div class="notes-content" id="notes-content"></div>
    `;
    document.body.appendChild(notes);

    // Timer display
    const tdisp = document.createElement("div");
    tdisp.className = "timer-display";
    tdisp.id = "timer-display";
    tdisp.textContent = "00:45";
    document.body.appendChild(tdisp);

    // Help overlay
    const help = document.createElement("div");
    help.className = "help-overlay";
    help.id = "help-overlay";
    help.innerHTML = `
      <div class="help-card" role="dialog" aria-labelledby="help-title">
        <h3 id="help-title">Keyboard shortcuts</h3>
        <dl>
          <dt>← / →</dt><dd>Previous / next slide</dd>
          <dt>Space</dt><dd>Next slide</dd>
          <dt>Home / End</dt><dd>Jump to first / last</dd>
          <dt>F</dt><dd>Toggle fullscreen</dd>
          <dt>N</dt><dd>Toggle speaker notes</dd>
          <dt>T</dt><dd>Toggle auto-advance timer</dd>
          <dt>Esc</dt><dd>Exit fullscreen / close notes</dd>
          <dt>?</dt><dd>Show this help</dd>
        </dl>
        <button class="help-card-close" id="help-close">Got it</button>
      </div>
    `;
    document.body.appendChild(help);

    // Wire UI
    document.getElementById("prev-btn").addEventListener("click", () => this.prev());
    document.getElementById("next-btn").addEventListener("click", () => this.next());
    document.getElementById("fs-btn").addEventListener("click", () => this.toggleFullscreen());
    document.getElementById("notes-btn").addEventListener("click", () => this.toggleNotes());
    document.getElementById("timer-btn").addEventListener("click", () => this.toggleAutoAdvance());
    document.getElementById("help-btn").addEventListener("click", () => this.toggleHelp(true));
    document.getElementById("help-close").addEventListener("click", () => this.toggleHelp(false));
    help.addEventListener("click", (e) => {
      if (e.target === help) this.toggleHelp(false);
    });
  }

  weekNum() {
    return document.body.dataset.weekNum;
  }

  bindKeys() {
    document.addEventListener("keydown", (e) => {
      // Ignore when typing in inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          this.next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          this.prev();
          break;
        case "Home":
          e.preventDefault();
          this.goTo(0);
          break;
        case "End":
          e.preventDefault();
          this.goTo(this.slides.length - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case "n":
        case "N":
          e.preventDefault();
          this.toggleNotes();
          break;
        case "t":
        case "T":
          e.preventDefault();
          this.toggleAutoAdvance();
          break;
        case "?":
          e.preventDefault();
          this.toggleHelp(true);
          break;
        case "Escape":
          if (document.getElementById("help-overlay").classList.contains("visible")) {
            this.toggleHelp(false);
          } else if (this.notesVisible) {
            this.toggleNotes();
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    });
  }

  bindClicks() {
    // Click left/right thirds of the slide area to navigate (but not on controls)
    const deck = document.querySelector(".deck");
    deck.addEventListener("click", (e) => {
      if (e.target.closest(".controls, .top-corner, .help-overlay, .notes-panel, .code-inline, .code-block, a, button")) return;
      const rect = deck.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = rect.width;
      if (x < w * 0.25) this.prev();
      else if (x > w * 0.75) this.next();
    });
  }

  bindCopy() {
    const deck = document.querySelector(".deck");
    if (!deck) return;

    // Every code element is click-to-copy. Hint it on hover.
    deck.querySelectorAll(".code-inline, .code-block").forEach((el) => {
      el.setAttribute("title", "Click to copy");
    });

    deck.addEventListener("click", (e) => {
      const code = e.target.closest(".code-inline, .code-block");
      if (!code) return;
      e.preventDefault();
      const text = code.textContent.trim();
      const done = () => this.flashCopied(code);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, () => this.fallbackCopy(text, done));
      } else {
        this.fallbackCopy(text, done);
      }
    });
  }

  fallbackCopy(text, done) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    } catch (err) {
      /* clipboard unavailable — silently ignore */
    }
  }

  flashCopied(el) {
    el.classList.add("copied");
    clearTimeout(el._copyTimer);
    el._copyTimer = setTimeout(() => el.classList.remove("copied"), 1100);

    let toast = document.getElementById("copy-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "copy-toast";
      toast.className = "copy-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = "Copied!";
    const r = el.getBoundingClientRect();
    toast.style.left = `${r.left + r.width / 2}px`;
    toast.style.top = `${r.top}px`;
    // Force reflow so the transition replays on rapid repeat clicks.
    void toast.offsetWidth;
    toast.classList.add("visible");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove("visible"), 1100);
  }

  bindFullscreenChange() {
    document.addEventListener("fullscreenchange", () => {
      const btn = document.getElementById("fs-btn");
      if (document.fullscreenElement) {
        btn.innerHTML = `${icons.exitFullscreen}<span>Exit</span>`;
      } else {
        btn.innerHTML = `${icons.fullscreen}<span>Fullscreen</span>`;
      }
    });
  }

  goTo(i) {
    this.current = Math.max(0, Math.min(this.slides.length - 1, i));
    this.slides.forEach((s, idx) => s.classList.toggle("active", idx === this.current));
    this.updateUI();
    history.replaceState(null, "", `#s/${this.current + 1}`);
  }

  next() {
    if (this.current < this.slides.length - 1) this.goTo(this.current + 1);
    else if (this.autoAdvance) this.toggleAutoAdvance(); // stop at end
  }

  prev() {
    if (this.current > 0) this.goTo(this.current - 1);
  }

  updateUI() {
    document.getElementById("counter").textContent = `${this.current + 1} / ${this.slides.length}`;
    const pct = ((this.current + 1) / this.slides.length) * 100;
    document.getElementById("progress-fill").style.width = `${pct}%`;
    document.getElementById("prev-btn").disabled = this.current === 0;
    document.getElementById("next-btn").disabled = this.current === this.slides.length - 1 && !this.autoAdvance;

    // Update notes
    const notes = this.slides[this.current].dataset.notes;
    const notesEl = document.getElementById("notes-content");
    if (notes && notes.trim()) {
      notesEl.innerHTML = notes
        .split(/\n\s*\n/)
        .map((p) => `<p>${this.escape(p.trim())}</p>`)
        .join("");
      notesEl.classList.remove("notes-empty");
    } else {
      notesEl.innerHTML = `<p class="notes-empty">No speaker notes for this slide.</p>`;
    }
  }

  escape(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  toggleNotes() {
    this.notesVisible = !this.notesVisible;
    document.body.classList.toggle("notes-visible", this.notesVisible);
    document.getElementById("notes-btn").classList.toggle("active", this.notesVisible);
  }

  toggleHelp(force) {
    const el = document.getElementById("help-overlay");
    if (force === true) el.classList.add("visible");
    else if (force === false) el.classList.remove("visible");
    else el.classList.toggle("visible");
  }

  toggleAutoAdvance() {
    this.autoAdvance = !this.autoAdvance;
    const btn = document.getElementById("timer-btn");
    const disp = document.getElementById("timer-display");
    btn.classList.toggle("active", this.autoAdvance);
    disp.classList.toggle("visible", this.autoAdvance);

    if (this.autoAdvance) {
      this.timerSeconds = this.autoAdvanceSeconds;
      disp.textContent = this.formatTime(this.timerSeconds);
      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        disp.textContent = this.formatTime(this.timerSeconds);
        if (this.timerSeconds <= 0) {
          if (this.current < this.slides.length - 1) {
            this.next();
            this.timerSeconds = this.autoAdvanceSeconds;
          } else {
            this.toggleAutoAdvance();
          }
        }
      }, 1000);
    } else {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SlideDeck();
});
