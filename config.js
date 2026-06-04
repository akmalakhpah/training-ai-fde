// =========================================================
// Program configuration
// =========================================================
//
// Set `startDate` to the date Week 1 unlocks. Subsequent weeks unlock
// one week apart automatically (Week N unlocks at startDate + (N-1)*7 days).
//
// Format: ISO date "YYYY-MM-DD" — interpreted at 00:00 in the viewer's
// local timezone. Use a Monday for clean weekly cadence.
//
// Set to `null` to disable gating entirely (every week visible).
//
// Examples:
//   startDate: "2026-06-08"   // Mon 8 June 2026 — Week 1 unlocks then
//   startDate: null            // Gating off; all 12 weeks open
//
// Instructor override: append ?instructor=1 to any URL once. The flag
// persists in localStorage and bypasses every gate in that browser.
// To clear it, visit any URL with ?instructor=0.
//
window.programConfig = {
  startDate: "2026-06-08",   // Monday Week 1 unlocks
  weekDurationDays: 7,
};

// =========================================================
// Schedule helpers (do not edit unless you mean to)
// =========================================================

(function () {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("instructor")) {
      const v = params.get("instructor");
      if (v === "0" || v === "false") {
        localStorage.removeItem("fde_instructor");
      } else {
        localStorage.setItem("fde_instructor", "1");
      }
    }
  } catch (_) {
    // localStorage may be unavailable (private mode); fail silently.
  }
})();

window.programSchedule = {
  isInstructor() {
    try {
      return localStorage.getItem("fde_instructor") === "1";
    } catch (_) {
      return false;
    }
  },

  unlockDate(weekNum) {
    if (!window.programConfig.startDate) return null;
    const start = new Date(window.programConfig.startDate + "T00:00:00");
    if (isNaN(start.getTime())) return null;
    const offsetMs =
      (weekNum - 1) * window.programConfig.weekDurationDays * 24 * 3600 * 1000;
    return new Date(start.getTime() + offsetMs);
  },

  isUnlocked(weekNum) {
    if (this.isInstructor()) return true;
    const unlockAt = this.unlockDate(weekNum);
    if (!unlockAt) return true;
    return Date.now() >= unlockAt.getTime();
  },

  daysUntilUnlock(weekNum) {
    const unlockAt = this.unlockDate(weekNum);
    if (!unlockAt) return 0;
    const diffMs = unlockAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(diffMs / (24 * 3600 * 1000)));
  },

  hoursUntilUnlock(weekNum) {
    const unlockAt = this.unlockDate(weekNum);
    if (!unlockAt) return 0;
    const diffMs = unlockAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(diffMs / (3600 * 1000)));
  },

  formatUnlockDate(weekNum) {
    const d = this.unlockDate(weekNum);
    if (!d) return "";
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  unlockCountdownLabel(weekNum) {
    const days = this.daysUntilUnlock(weekNum);
    if (days === 0) {
      const hrs = this.hoursUntilUnlock(weekNum);
      if (hrs <= 1) return "Unlocks in under an hour";
      return `Unlocks in ${hrs} hours`;
    }
    if (days === 1) return "Unlocks tomorrow";
    return `Unlocks in ${days} days`;
  },
};
