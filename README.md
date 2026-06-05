# AI Forward Deployed Engineer (FDE) Course

A **12-week hybrid program** that takes fresh computer science and engineering graduates and turns them into deployable AI Forward Deployed Engineers. Claude is the primary model used throughout, with one dedicated session for self-learning the wider model landscape.

🔗 **Course site:** https://akmalakhpah.github.io/training-ai-fde/

## Philosophy

Most software fails in deployment, not in development. The product works in the demo and breaks inside the customer's real, messy environment. The Forward Deployed Engineer exists to close that gap by embedding with the customer, building production-grade solutions in place, and staying until they work.

For a fresh graduate the technical gap is closable in weeks. The harder gap is the FDE craft: staying calm inside broken systems, turning a vague business problem into a concrete plan, owning delivery end to end, talking to customers without hiding behind a screen, and supervising the AI agents that now do much of the work. Four muscles run through every week:

1. **Ship production code, not coursework.**
2. **Stay functional inside ambiguous, broken, incomplete systems.**
3. **Translate between human problems and technical plans, then defend the call to a customer.**
4. **Supervise the AI agents that do the work — brief them, review their output, guardrail them, and never blindly trust them.**

A trainee strong on the first but weak on the rest is not ready. The whole design builds all four at once.

## Who it's for

Fresh CS or engineering graduates with a solid academic foundation but little or no production experience. They can write code; they have not yet shipped something real users depend on, debugged a live outage, or explained a technical tradeoff to a non-technical stakeholder. No AI/ML background required.

By the end, a graduate can read and contribute to a large unfamiliar codebase, build/deploy/observe/recover a production service, work confidently with real customer data, build reliable LLM applications (structured outputs, RAG, agents, tool calling, evaluation), choose the right model on cost/latency/quality grounds, scope a vague problem into a plan, integrate into systems they don't control, present a recommendation to a mixed audience, and own a real deployment end to end — including the moment it breaks.

## Format

- **Duration:** 12 weeks.
- **One taught class per week** (~90 min) — the synchronous anchor for live demos, code review, scoping drills, and questions.
- **Self-paced build** the rest of the week (~6–9 hours) — where trainees hit walls and climb them.
- **One shippable deliverable every week.**
- **Total commitment:** roughly 8–12 hours per week including the class.

Claude is the primary assistant throughout, used three ways: a coding partner via Claude Code, the model applications are built on via the Claude API, and a thinking partner for scoping and learning. Trainees learn to choose between the **Opus / Sonnet / Haiku** tiers rather than always reaching for the biggest — the tier principle, not a fixed version number.

## Curriculum

| Phase | Weeks | Focus |
| --- | --- | --- |
| **1. Production Engineering Foundations** | 1–3 | Unlearning coursework habits; how code ships and survives |
| **2. AI Application Engineering** | 4–7 | Building reliable systems on top of unreliable models |
| **3. The FDE Craft** | 8–10 | Scoping, integration, and customer communication |
| **4. Capstone Embedded Deployment** | 11–12 | A real deployment with a real owner and a real deadline |

A self-paced **Model Landscape** session sits between Phase 2 and Phase 3, with a group debrief.

### Weekly breakdown

| Week | Topic | Deliverable |
| --- | --- | --- |
| 1 | From Coursework to Production | Clean, merged pull request with tests on a real repo |
| 2 | Data Fluency | Clean a messy dataset and explain the fixes |
| 3 | Deploy, Observe, Recover | Deploy, break, and recover a service |
| 4 | LLM Application Patterns | LLM feature with reliable structured JSON output |
| 5 | Retrieval and Grounding (RAG) | RAG system over a real corpus, with its failure modes |
| 6 | Agents and Tool Calling | Agent with ≥2 tools and a working guardrail |
| 7 | Evaluation, Safety, and Cost | Eval harness with a real safety finding |
| — | Model Landscape | Multi-model comparison and recommendation |
| 8 | Scoping Ambiguity | Scoping document from a vague one-line brief |
| 9 | Integration and the Messy Real World | Integrate two incompatible systems |
| 10 | Customer-Facing Communication | Technical recommendation to a mixed audience |
| 11–12 | Capstone Embedded Deployment | Real deployment, evals, runbook, and postmortem |

## Assessment

There are no written exams — FDE readiness is demonstrated, not tested on paper. Every deliverable is assessed on three questions: **Did it ship and work? How did the trainee behave when it broke or the brief was unclear? Could they explain it to a non-engineer?**

| Dimension | Weight |
| --- | --- |
| Technical execution | 30% |
| Handling ambiguity and failure | 30% |
| Communication | 25% |
| Ownership | 15% |

Ambiguity, communication, and ownership together outweigh raw technical execution — deliberately. That is what separates a good FDE from an ordinary engineer. The capstone is weighted most heavily and is the real exam.

## How the program runs

- Use **real internal systems** as the training ground — contained cost of failure before any external customer.
- Pair every trainee with a **mentor** who has done real deployment work; the mentor unblocks but never rescues.
- Keep **cohorts small** — this is a high-touch program by design.
- **Protect self-paced build time** — the craft is learned by hitting walls during the build, not by hearing about them in a lecture.
- **Reward honesty about failure** — the postmortem and the "here is where my system breaks" are the most valuable things a trainee produces.

---

## Cross-device progress sync (Google Drive)

Progress (which weeks a trainee has completed) is stored in the browser's `localStorage`, so by default it stays on one device. The site can **optionally** sync that progress to each user's own **hidden Google Drive appData folder**, so the same Google account sees the same progress on any device.

This is fully optional and fully client-side:

- The site stays **static** — no server, no database, no build step. The Drive calls run directly from the browser against Google's REST API (which supports CORS).
- When **signed out or offline**, the app behaves exactly as before, using `localStorage` alone. Nothing breaks.
- `localStorage` remains the instant, local source of truth. Drive is a background sync layer that never blocks the UI.
- Only a **public OAuth client ID** is used — there is **no client secret** in the codebase.

### One-time setup (a human does this once)

To turn the feature on, create a Google OAuth client ID and paste it into the config constant. **No client secret is needed** for the browser token flow.

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Drive API** (APIs & Services → Library → "Google Drive API" → Enable).
3. Configure the **OAuth consent screen**:
   - User type: **External**.
   - Add scopes: `.../auth/drive.appdata`, `.../auth/userinfo.email`, `.../auth/userinfo.profile`.
   - While the app is in **Testing**, add the Google accounts that should be allowed under **Test users**.
4. Create an **OAuth Client ID** of type **Web application**:
   - Under **Authorized JavaScript origins**, add every origin the site is served from, e.g. `http://localhost:8000` (local dev) and your production domain `https://akmalakhpah.github.io` (GitHub Pages).
   - No redirect URI is required for the token model.
5. Copy the generated **Client ID** into the `GOOGLE_CLIENT_ID` constant at the top of [auth.js](auth.js) (replacing `PUT_CLIENT_ID_HERE`).

Until a real client ID is set, the sync UI stays dormant and the app runs in plain `localStorage` mode — so it's safe to ship without configuring this.

> Note: Google **One Tap** and the Drive token popup require the page to be served over `http(s)` from an origin you registered above — they do **not** work when opening `index.html` from the `file://` scheme. Use `python3 -m http.server 8000` for local testing.

### How sync behaves

- Signing in shows the Google account chooser (One Tap on load, plus a **"Sign in to sync"** button in the sidebar) and then displays the user's identity with a small sync-status dot.
- On sign-in, local and remote progress are **merged by union** — a week marked complete on *any* device stays complete; you never lose a checkmark.
- After that, each change is debounced (~2s) and pushed to Drive in the background. Network failures are logged and retried, never surfaced as UI errors.
- Signing out keeps your progress on the current device (it just stops syncing).

The sync layer lives in three small, additive modules: [auth.js](auth.js) (Google Identity Services), [drive-sync.js](drive-sync.js) (the Drive appData file), and [progress-store.js](progress-store.js) (the single storage interface the app reads/writes through).

---

### About this repository

The site is a static, dependency-free website (hand-written HTML/CSS/vanilla JS — no build step, no framework). It has two surfaces: the course reader ([index.html](index.html)) and per-week slide decks ([slides/](slides/)). Contributor and maintenance guidance lives in [CLAUDE.md](CLAUDE.md); the full course specification is in [COURSE.md](COURSE.md).
