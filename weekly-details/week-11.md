# Week 11: Build in Place

**Phase:** 4, Capstone Embedded Deployment
**Class owner:** Mentor, with you
**Time budget:** Capstone kickoff 90 min, embedded build ~14 to 18 hrs, mid-capstone review mid-week

> No simulation. A real, scoped internal Pandai deployment with a real owner and a real deadline. Scope was agreed in Week 10, so this week is build and ship.

## Learning objectives

By the end of the week the intern can:

- Own a real deployment end to end.
- Apply every prior week under real conditions.
- Hit real walls and climb them with a mentor who unblocks but does not rescue.

---

## 1. Capstone Kickoff (90 minutes)

> Purpose: lock scope, deadline, and access, and name the one failure that would sink the capstone. This is a working session, not a lecture, but here is the outline for any kickoff slides.

### Kickoff outline

**Block 1: Capstone framing (10 min)**
- Slide: "Build in Place."
- One line: everything so far was practice. This is real, with a real owner and a real deadline.
- The mentor's role: unblock, never rescue. Being rescued teaches nothing.

**Block 2: Confirm scope (20 min)**
- Re-read the Week 10 agreed scope: the problem, the plan, the assumptions, what you will not build.
- The mentor pressure-tests it once more and cuts anything that will not fit in two weeks at about 20 hours per week.

**Block 3: Lock the deadline and the failure condition (15 min)**
- Set the deadline. Name the single thing that, if it slipped, would make this capstone a failure. Protect that thing first.

**Block 4: Confirm access (15 min)**
- Repos, environments, credentials, the real system or data, the stakeholders. Nothing should block the build on day two for want of access.

**Block 5: Plan the two weeks (20 min)**
- A rough day-by-day: scope to build to integrate to deploy to evaluate. Where the mid-capstone review lands. What "done" looks like.

**Block 6: Q&A and go (10 min)**

### Suitable capstones
- A messaging-based learning helper on N8N.
- A RAG assistant over curriculum content.
- An internal automation that removes a manual task.
- A small agent that supports the customer success team.

---

## 2. Embedded Work (the bulk of the week)

This is not self-learn from videos; it is real delivery using everything from Weeks 1 to 10. The toolchain in one place:

- **Build:** Claude Code and Conductor.
- **Tools for the model:** an MCP server (Week 6).
- **Version control:** GitHub, with clean PRs and CI.
- **Deploy:** AWS or Cloudflare (Week 3).
- **Integrate and automate:** N8N (Weeks 7 and 9).
- **Prove it works:** reliability checks (the one-line failure check applied seriously).
- **Operate:** a runbook.

### Working rhythm
- Build the smallest end-to-end slice first; get something real working before adding scope.
- Keep a running log of decisions and walls hit; it becomes your Week 12 postmortem.
- When stuck, bring the mentor a specific, well-framed question, not "it does not work".

### Prompts to keep moving

- **Unblocking with Claude Code (paste in the repo):** "I am stuck on [specific symptom]. Here is what I have tried: [list]. Here are the relevant files and the error: [paste]. Diagnose the most likely cause, propose the smallest fix, and tell me how to verify it. Do not refactor beyond what is needed."
- **Scoping a slice (paste into Claude):** "Here is my capstone scope and my deadline: [paste]. Break it into end-to-end slices, smallest first, so I always have something working. For each slice, tell me what 'done' looks like and what I can safely defer."
- **Writing the runbook (paste into Claude):** "My deployed system does [describe]. Help me write a runbook: how to start and stop it, the config and secrets it needs, the three most likely failures and how to recover from each, and who to contact. Keep it to one page that a tired on-call person could follow."

---

## 3. Weekly Project

### Brief
A working deployment in a real environment, with reliability checks and a runbook.

### Requirements (checklist)
- [ ] The system is deployed and works in a real environment.
- [ ] It is built with the real toolchain (Claude Code, GitHub, an MCP server where relevant, AWS or Cloudflare, N8N).
- [ ] Reliability checks show it works and name where it can fail.
- [ ] A one-page runbook covers operation and recovery.
- [ ] Scope was held; what you said you would not build, you did not build.

### Deliverables
- The deployed system, the repo, the reliability checks, and the runbook.

### Mid-capstone review (mid-week, with the mentor)
- Show the working slice so far. Surface blockers early. Confirm the deadline is still realistic or re-scope now, not in Week 12.

---

## 4. Assessment (carried into Week 12)

The capstone is assessed on the full course rubric (technical execution, handling ambiguity and failure, communication, ownership), weighted most heavily, plus the three capstone questions answered in Week 12:

- Did the deployment actually work in a real environment?
- Was the postmortem honest about what went wrong?
- Were the reusable patterns genuinely useful to the next person?

### Definition of done for Week 11
A real system is deployed and working in a real environment, you held your scope, and you have a runbook and reliability checks ready to present and defend in Week 12.
