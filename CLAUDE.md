# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, dependency-free website for the **AI Forward Deployed Engineer (FDE) Training** — a 12-week hybrid course for fresh graduates. It has two surfaces:

1. **The course app** (`index.html`) — a hash-routed single-page reader for the curriculum, with progress tracking and date-based week unlocking.
2. **Slide decks** (`slides/week-NN.html`) — one standalone presentation per week, driven by a shared deck engine.

There is no build step, no package manager, no tests, and no framework. Everything is hand-written HTML/CSS/vanilla JS loaded directly by the browser.

## Running it

Open `index.html` directly, or serve the repo root over HTTP (needed so relative paths and slide links resolve cleanly):

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

There is nothing to build, lint, or test. Changes are verified by reloading the page.

## Asset version (cache busting)

**Current version: `25`**

All JS/CSS references carry a `?v=<version>` query string so browsers fetch fresh copies after an update instead of serving a stale cached file. The token lives here in CLAUDE.md as the source of truth.

**When you ship a change to any of `app.js`, `data.js`, `config.js`, `styles.css`, `slides.js`, or `slides.css`, bump the version:**
1. Increment the number above (`1` → `2`).
2. Replace every `?v=<old>` with `?v=<new>` across `index.html` and `slides/*.html`. One command does it (run from repo root, substituting the numbers):
   ```sh
   sed -i '' 's|?v=1|?v=2|g' index.html slides/*.html
   ```
3. Sanity-check: `grep -rc '?v=2' index.html slides/*.html` should show `4` for `index.html` and `3` for each slide.

The version is global — one token covers every asset. Bump it for any meaningful change; there's no need for per-file versions.

## Architecture

### Script load order matters

`index.html` loads three scripts in sequence, and later ones depend on globals set by earlier ones:

1. **`config.js`** → sets `window.programConfig` (the program `startDate`) and `window.programSchedule` (unlock-date math + instructor mode).
2. **`data.js`** → sets the `courseData` object: the **single source of truth** for everything the app renders (meta, philosophy, phases, all 12 weeks, landscape, assessment, glossary).
3. **`app.js`** → the SPA itself: state, routing, rendering.

### The app (`app.js`)

- **Routing** is hash-based (`#/home`, `#/week/3`, `#/philosophy`, `#/landscape`, `#/assessment`, `#/glossary`). `parseHash()` maps the URL to a `state.route`; the `hashchange` listener re-renders.
- **Rendering** is full innerHTML replacement — `render()` calls `renderSidebar()` + `renderMain()`, and `renderMain()` switches on `state.route.type` to one of the `renderX()` functions. There is no virtual DOM or reactivity; any state change calls `render()` again.
- **State persists in `localStorage`**: completed weeks (`fde_progress_v1`), phase filter (`fde_filter_v1`). Always pass user-derived strings through `esc()` before putting them in template literals.

### Week gating (`config.js`)

Weeks unlock on a schedule: Week N opens at `startDate + (N-1)*7 days`. `window.programSchedule.isUnlocked(n)` gates both the app (`renderLockedWeek`) and the slides (`renderGate`). Two escape hatches:
- Set `programConfig.startDate = null` to disable gating entirely.
- **Instructor mode** (the "secret link" to open all weekly lessons): visiting any URL with `?instructor=1` (e.g. `index.html?instructor=1` or `http://localhost:8000/?instructor=1`) sets a `localStorage` flag (`fde_instructor`) that bypasses **all** week gates in that browser and shows an "Instructor mode — all weeks unlocked" banner. The flag **persists** across visits, so the query string is only needed once per browser. Clear it with `?instructor=0` (or `?instructor=false`). Note this is a soft, client-side gate only — there is no real authentication.

### Slide decks (`slides/`)

- `slides.js` defines the `SlideDeck` class (keyboard nav, fullscreen, speaker notes, auto-advance timer, progress bar, **click-to-copy code**) and is shared by every deck. `slides.css` styles them.
- Each `slides/week-NN.html` is **hand-authored content** — a series of `<section class="slide" data-notes="...">` elements. The `<body>` carries `data-week-num` (used for gating) and `data-deck-title`.
- The app links to a deck via `slides/week-${num padded to 2 digits}.html`, so **slide filenames must stay zero-padded** (`week-01.html`, not `week-1.html`).

#### Slide authoring conventions (follow these for every deck)

Keep the deck's shape consistent week to week. The standard flow is: **title** (`.slide.title` — eyebrow + `<h1>` + one or two `.subtitle` lines, including a time-budget line) → **mindset hook** (`.slide.quote` with `.pull-quote`) → **"You will have"** outcomes → **agenda** → content slides → **recap** (`.slide.recap` with a `.next-up` block previewing next week).

Building blocks (all defined in `slides.css` — reuse them, don't hand-roll new structures):
- `<ul class="big-list">` — primary bullet list. `<ol class="numbered-list">` — ordered steps (auto-numbered `01, 02, …`). Both render as glass pills; **inline `<strong>` / `<span class="success">` inside a list item are safe** (the item is a normal block with an absolutely-positioned bullet — do not reintroduce `display:flex` on `.big-list li`, it splits inline children into columns).
- `<div class="cols"><div class="col">…</div><div class="col">…</div></div>` — two-column comparison (e.g. "You set up" vs "Program provides"). `<h3 class="success">` / `<h3 class="danger">` tint a column heading.
- `.slide.demo` + `.demo-card` — frame a live "do it now" walkthrough.
- Emphasis spans: `.success` (green), `.danger` (red).

**Code in slides — pick the right class:**
- `<span class="code-inline">…</span>` for a short command **inside a sentence or bullet** (e.g. `git --version`). Small inline pill that scales with the text.
- `<div class="code-block">…</div>` for a **multi-line / standalone** code block. Big padded box, `white-space: pre`.
- **Never use `.code-block` inline** (as a `<span>`) — it's a block box and will balloon and overlap the surrounding text. That was a real bug; `.code-inline` exists specifically for the inline case.
- Both classes are **automatically click-to-copy** via `slides.js` (`bindCopy()` adds a `title="Click to copy"`, copies `textContent`, shows a green "Copied!" toast). Any code you add inherits this for free — no per-slide wiring.

Every slide should carry a `data-notes="…"` speaker note. Notes split into paragraphs on blank lines.

## Content sources — know which file actually drives the app

This repo contains several overlapping documents. Editing the prose specs does **not** change the running app:

- **`data.js`** — the only content the app renders. To change what a user sees in the app, edit this.
- **`COURSE.md`** — original full course specification (prose). `data.js` was extracted from it.
- **`OVERVIEW.md`** — the larger v2 program spec (Pandai-specific toolchain, expanded weeks). Richer than `data.js`; not wired into the app.
- **`weekly-details/week-N.md`** — detailed per-week class plans and slide briefs (note: **not** zero-padded, unlike slide files).
- **`slides/week-NN.html`** — hand-authored decks; not generated from `data.js`.

When asked to "update week X," clarify or update the relevant surfaces together — the app card (`data.js`), the deck (`slides/week-NN.html`), and the detail doc (`weekly-details/week-N.md`) are maintained separately and can drift.

## Per-week lesson content & formatting (the convention to follow)

`weekly-details/week-N.md` is the **source of truth** for a week's lesson. When you review or update a week, reflect *all* of it across the three surfaces and keep the structure/voice below so every week reads the same.

### The five sections every week has (in `data.js` → app label)

Each entry in `courseData.weeks[]` has exactly these content fields, rendered by `app.js` in this order:

| `data.js` field | App heading | Shape | Voice / altitude |
| --- | --- | --- | --- |
| `objectives` | Learning objectives | `string[]` | What the learner can do by week's end. ~4–6 items. |
| `taughtClass` | Taught class | `string` (paragraphs) | **Student-facing pre-class overview.** Short, "you" voice, 2–3 paragraphs. A preview of the live session — *not* the full instructions. End by pointing to the self-paced track for step-by-step detail. |
| `selfPaced` | Self-paced track | `string[]` **or** `{title, points: string[]}[]` | The detailed, do-it-yourself work. This is where granular steps, URLs, and commands live. |
| `deliverable` | Project deliverable | `string` (paragraphs) | What the learner ships this week. |
| `assessment` | Assessment | `string` (paragraphs) | How it's judged / definition of done. |

### Formatting rules the renderer supports (use them — don't fight them)

- **Paragraph breaks:** `taughtClass`, `deliverable`, and `assessment` are split on blank lines (`\n\n`) into separate `<p>` tags. Write `\n\n` between paragraphs in the string instead of one dense wall of text. (One short paragraph is fine for simple weeks — Week 0 was the outlier that needed several.)
- **Self-paced items, two forms** (the renderer accepts either, per item):
  - A **plain string** → one bullet. Good for short weeks (most weeks).
  - An **object `{ title, points: [] }`** → a **bold lead-in title with indented sub-bullets**. Use this when a step has several parts (downloads, commands, caveats) so it stays scannable instead of becoming a paragraph-in-a-bullet. Week 0 uses this form throughout.
- **Don't dilute to shorten.** When asked to make something more readable, restructure (paragraphs, titled groups, bullets) rather than cutting detail. Detail that doesn't belong in the at-a-glance `taughtClass` overview should move *into* `selfPaced`, not disappear.
- Always pass content through `esc()` (the renderer already does) — write plain text, not HTML, in `data.js`.

### Keep the three surfaces in sync

For a given week, the app card (`data.js`), the deck (`slides/week-NN.html`), and the detail doc (`weekly-details/week-N.md`) should tell the same story. The deck is the visual summary of the live session; the `selfPaced` track holds the full step list; the detail doc is the canonical brief. After editing `data.js`, `app.js`, `styles.css`, `slides.js`, or `slides.css`, **bump the asset version** (see above).

## Design system

The visual language is **Glassmorphism**, defined in `DESIGN.md` and `SKILL.md` (the latter is a managed design-system skill file — treat the block between `TYPEUI_SH_MANAGED_START/END` as generated). It is implemented as CSS custom properties in `styles.css` (app) and `slides/slides.css` (decks). Fonts are Plus Jakarta Sans + JetBrains Mono. Prefer the existing CSS tokens (`var(--color-*)`, `var(--space-*)`) over hard-coded values.
