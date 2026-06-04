# Week 12: Ship and Defend

**Phase:** 4, Capstone Embedded Deployment
**Class owner:** You, with the full panel (AI Engineer, Product Manager, Project Manager)
**Time budget:** Final session 90 min (demos and defence), plus postmortem and patterns write-up

> The capstone is the real exam. This week is about presenting and defending real work, reflecting on failure honestly, and bringing reusable patterns back to the team.

## Learning objectives

By the end of the week you can:

- Present and defend real work under questioning.
- Reflect on failure honestly in a postmortem.
- Extract reusable patterns that help the next deployment.

---

## 1. Final Session (90 minutes): Demos and Defence

You present your deployment, defend your decisions, and walk through one production failure and the recovery. This outline is the brief for your presentation deck.

### Your presentation outline (about 12 to 15 min)

**Block 1: The problem and the scope (2 min)**
- What the deployment is, who owns it, and the scope you agreed, including what you chose not to build.

**Block 2: Live demo (4 min)**
- Show it working in the real environment. Real data, real trigger, real result.

**Block 3: The decisions (3 min)**
- Two or three real decisions and the tradeoffs behind them (a model choice, an integration approach, a guardrail). Be ready to defend each.

**Block 4: One production failure (3 min)**
- Walk one real failure you hit and how you recovered. This is the most valuable part; do not hide it.

**Block 5: Reusable patterns (2 min)**
- One or two patterns you found that would help the next deployment.

**Block 6: Defence (questioning from the panel)**
- The panel probes your decisions, the failure, and the limits of the system.

### What the panel is listening for
- Did your deployment actually work in a real environment.
- Are you honest about what went wrong, or polishing it away.
- Can you explain technical decisions to the non-technical people in the room.
- Did you own it end to end, or get carried.

---

## 2. The Postmortem

> A blameless postmortem: what happened, why, and what you would do differently, written so the next person learns from it.

### What a good postmortem contains
- A short summary: what you built and how it went.
- A timeline of the significant moments, including the failure.
- Root cause of the main failure, honestly, focused on the system not the blame.
- What went well, what went badly, and where you got lucky.
- What you would do differently next time.

### Resource
- Google SRE, "Postmortem Culture: Learning from Failure" - https://sre.google/sre-book/postmortem-culture/ (read for the blameless framing and structure).

### Ask AI (paste into Claude)
"Help me write a blameless postmortem for my capstone. Here are my notes on what I built, the timeline, and the main failure I hit: [paste]. Structure it as summary, timeline, root cause, what went well, what went badly, and what I would do differently. Keep it honest and focused on the system, not on blaming myself, and make the lessons concrete enough that the next engineer benefits."

---

## 3. Reusable Patterns

> The point of an internal capstone is that the next deployment goes faster. Capture what would transfer.

### What to capture
- A pattern is a problem plus a reusable approach: "when you need X in this kind of system, do Y, and watch out for Z."
- Examples: a reliable prompt structure, an integration workaround that generalises, a guardrail design, an N8N error-handling pattern.

### Ask AI (paste into Claude)
"Here is what I built and the problems I solved along the way: [paste]. Help me extract two or three reusable patterns the next engineer could apply. For each, state the problem it solves, the approach, and the pitfall to avoid. Write each so someone who did not do my project could use it."

---

## 4. Weekly Project and Submission

### Deliverables
- The final demo and defence (presented live to the panel).
- A short written postmortem.
- A list of reusable patterns discovered.

### How it is judged (capstone, weighted most heavily)
The full course rubric applies (technical execution 30, handling ambiguity and failure 30, communication 25, ownership 15), plus the three capstone questions:

- Did your deployment actually work in a real environment?
- Was your postmortem honest about what went wrong?
- Were your reusable patterns genuinely useful to the next person?

### Graduation
You graduate as a deployable AI FDE when you have shipped a working deliverable every week, behaved calmly and competently during at least one real failure, passed the capstone with a working deployment and an honest postmortem, and shown you can explain technical decisions to a non-technical audience. If you are strong technically but weak on ambiguity or communication, you do not graduate as field-ready; you get a development plan and a path to retry.

### Definition of done
You stood in front of a panel, demonstrated a real working deployment, defended your decisions under questioning, told the truth about what broke, and left behind a postmortem and patterns the next person can actually use.
