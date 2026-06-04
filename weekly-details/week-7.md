# Week 7: Automation with N8N

**Phase:** 2, AI Application Engineering
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week the intern can:

- Automate a real workflow end to end with N8N.
- Trigger work on events and schedules, not manual clicks.
- Connect an AI call, and a Week 6 MCP agent, into an automation.
- Handle failure inside a workflow with retries, error branches, and alerts.

---

## 1. Taught Class (90 minutes)

> Purpose: turn a manual task into an automation that runs itself, then break a step and show it failing safely. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "Automation with N8N."
- One line: an FDE removes manual work. The customer remembers the toil you deleted, not the model you called.

**Block 2: What N8N is (8 min)**
- A visual workflow tool: nodes connected into a flow, data passed between them.
- Nodes, triggers, actions, and the data that moves through.
- Talking point: it is glue and orchestration, not a place to hide real logic.

**Block 3: Triggers (10 min)**
- Manual, schedule (cron), and webhook triggers.
- Live: a webhook node that generates a URL and fires the flow when called.
- Talking point: the trigger is the difference between a script you run and a system that runs itself.

**Block 4: A first real flow (12 min)**
- Live: build a flow where an incoming webhook posts a message to Slack or writes a row to a Google Sheet.
- Reading the data between nodes; mapping fields.

**Block 5: Adding an AI call (12 min)**
- Live: add a Claude API node that processes the incoming data and returns structured output, then route the result onward.

**Block 6: Wiring in the Week 6 MCP agent (12 min)**
- Live: trigger the MCP server built in Week 6 from an N8N event instead of running it by hand.
- This is the moment the two weeks join into one pipeline: event, agent, action.

**Block 7: Failure handling (16 min)**
- Why it matters: an automation that fails silently is worse than no automation, because no one notices.
- Live: break a step on purpose, then add a retry, an error branch, and an alert.
- Talking point: design the unhappy path on purpose. It is the part that pages you at 2am.

**Block 8: Project and wrap (7 min)**
- Walk the project brief and assessment, including the reliability check. Q&A.

### Live demo checklist for the instructor
- An N8N instance ready, with Slack and Google Sheets connected.
- The Week 6 MCP server reachable from N8N.
- A step that can be broken on purpose to demonstrate the error branch.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: N8N fundamentals (1.5 to 2 hrs)
- **Goal:** build a webhook-triggered flow that delivers a result somewhere.
- **Start here:** build a flow triggered by a webhook that posts a message to Slack or writes a row to a Google Sheet.
- **Read:** N8N quickstart - https://docs.n8n.io/try-it-out/quickstart/
- **Watch:** "n8n Quick Start Tutorial: Build Your First Workflow [2025]" - https://www.youtube.com/watch?v=4cQWJViybAQ (fallback search: "n8n quick start build your first workflow").
- **Ask AI (paste into Claude):** "I am new to N8N. Explain nodes, triggers, and how data flows between nodes. Then walk me through building a workflow where a webhook receives a JSON payload and writes selected fields to a Google Sheet, including how to map the fields between nodes."

### Topic B: Connecting an AI call into a flow (1.5 hrs)
- **Goal:** add a Claude API call inside a workflow.
- **Start here:** add a Claude API node that processes the incoming data and returns structured output.
- **Read:** N8N "Build an AI workflow" tutorial - https://docs.n8n.io/advanced-ai/intro-tutorial/
- **Ask AI (paste into Claude):** "In N8N, I want a workflow that takes an incoming message, sends it to the Claude API to extract structured fields, and routes the result based on one field. Walk me through the node setup and how to pass data cleanly from the AI node to the next step."

### Topic C: Wiring your Week 6 MCP agent into an automation (1.5 hrs)
- **Goal:** trigger your own MCP server from an N8N event.
- **Start here:** trigger your Week 6 server from an N8N event instead of running it by hand.
- **Ask AI (paste into Claude):** "I have an MCP server from last week that completes a multi-step task. I want N8N to call it when an external event fires. Walk me through the options for exposing my server to N8N (webhook, HTTP request node, or a small wrapper) and the trade-offs of each."

### Topic D: Failure handling in workflows (1 to 1.5 hrs)
- **Goal:** make one step fail and recover gracefully.
- **Start here:** make one step fail on purpose, then add a retry and an error branch that alerts you.
- **Watch:** "The Ultimate Guide to Webhooks in n8n" - search "n8n webhooks step by step guide" (Class Central lists a step-by-step version).
- **Ask AI (paste into Claude):** "In N8N, show me how to handle failure in a workflow: configuring retries on a node, adding an error workflow or error branch, and sending an alert when a step fails. Give me a checklist of failure modes I should design for in any automation that calls an external API."

---

## 3. Weekly Project

### Brief
Automate a real manual task end to end in N8N. An external event triggers a flow that calls AI and delivers a result somewhere useful, and handles at least one failure path gracefully.

### Requirements (checklist)
- [ ] An external trigger: a webhook, a new row, or an incoming message (not a manual click).
- [ ] The flow calls AI: either your Week 6 MCP agent or a Claude API call.
- [ ] It delivers a result somewhere useful: a Google Sheet, a Slack message, or a database.
- [ ] It handles at least one failure path gracefully rather than dying silently.

### Reliability check (include in submission)
- One line: name the step most likely to fail, and show what your flow does when it does.

### Suggested steps
1. Pick a genuine manual task worth removing.
2. Build the trigger and the happy path first; confirm it works end to end.
3. Add the AI step (MCP agent or Claude API).
4. Break a step on purpose; add a retry, an error branch, and an alert.
5. Write the note on the manual task removed and the failure handling.

### Deliverables
- The exported N8N workflow.
- A short note on the manual task it removes and how it handles failure.

### Stretch (optional)
- Add a schedule trigger so the automation also runs on a timer, not only on events.

---

## 4. Submittable Assessment

### What to submit
- The exported N8N workflow and the short note.

### Presentation
- A 3 to 5 minute demo (recorded or live) triggering the automation live and showing the failure path in action.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** the automation completes end to end on a real trigger.
- **Handling ambiguity and failure (30%):** failure is handled, not ignored.
- **Communication (25%):** can you explain the manual task removed and why it matters.
- **Ownership (15%):** did you automate something genuinely useful, or a toy.

### Definition of done
A real event fires your workflow, it calls AI and delivers a useful result, and when a step fails it retries or alerts instead of dying silently.

---

## End of Phase 2: mid-course checkpoint

After this week, before Phase 3, sit the mid-course checkpoint: a half-day review of all seven deliverables for trend. Any intern shaky on a Phase 2 foundation (LLM patterns, RAG, MCP, or automation) gets a short remediation task before Week 8.
