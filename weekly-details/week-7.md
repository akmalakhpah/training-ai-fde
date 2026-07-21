# Week 7: Automation with N8N

**Phase:** 2, AI Application Engineering
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Automate a real workflow end to end with N8N.
- Trigger work on events and schedules, not manual clicks.
- Connect an AI call, and your Week 6 AI Anki MCP agent, into an automation.
- Handle failure inside a workflow with retries, error branches, and alerts.
- Judge where a no-code automation is the right tool and where the work has to become code.

---

## 1. Taught Class (90 minutes)

> Purpose: turn a manual task into an automation that runs itself, then break a step and watch it fail safely. This outline is the brief for the slide deck.

### What you'll cover

**Title and framing**
- "Automation with N8N."
- The one line to hold onto: an FDE removes manual work. The customer remembers the toil you deleted, not the model you called.

**What N8N is**
- A visual workflow tool: nodes connected into a flow, data passed between them.
- Nodes, triggers, actions, and the data that moves through.
- The takeaway: it is glue and orchestration, not a place to hide real logic.

**Triggers**
- Manual, schedule (cron), and webhook triggers.
- You'll see a webhook node that generates a URL and fires the flow when called.
- The takeaway: the trigger is the difference between a script you run and a system that runs itself.

**A first real flow**
- You'll see a flow built where an incoming webhook posts a message to Slack or writes a row to a Google Sheet.
- Reading the data between nodes; mapping fields.

**Adding an AI call**
- You'll see a Claude API node added that processes the incoming data and returns structured output, then routes the result onward.

**Wiring in the Week 6 Anki MCP agent**
- You'll see the MCP server you built in Week 6 — the one wrapping AI Anki — triggered from an N8N event instead of run by hand.
- The live flow: a new row of study topics fires the webhook, N8N calls `generate_cards` / `add_card` on the MCP server, cards land in a deck, and a summary posts to Slack.
- This is the moment the whole course joins into one pipeline. The app you forked in Week 1, deployed in Week 3, hardened in Week 4, and wrapped in Week 6 now runs on its own: event, agent, action.

**Failure handling**
- Why it matters: an automation that fails silently is worse than no automation, because no one notices.
- You'll see a step broken on purpose, then a retry, an error branch, and an alert added.
- The takeaway: design the unhappy path on purpose. It is the part that pages you at 2am.

**Where no-code ends and code begins** *(the judgement beat — do not skip it)*
- N8N is the fastest path to a working automation. That is exactly why you need to know where you'd rip it out.
- The line: glue stays (trigger, routing, field mapping, delivery); logic goes (decisions, prompts, data shaping, anything needing tests, versioning, or volume).
- The test to say out loud: "what breaks first if this runs 100 times a minute instead of 10 times a day?"
- Licensing, because a customer will ask: N8N is Sustainable Use License, **not** open source. Fine to self-host and deploy; awkward to embed in a product.
- The alternatives an FDE should be able to name unprompted: **Windmill** (open source, scripts-first, keeps the visual demo), **Trigger.dev / Inngest** (code-first durable workflows — real retries and idempotency), **Zapier/Make** (only if the customer already lives there), **Activepieces** (MIT-licensed n8n-alike).
- The takeaway: choosing the tool *and* naming its exit condition is the FDE skill. This feeds directly into Week 8's scoping work.

**Project and wrap**
- You'll walk through the project brief and assessment, including the reliability check and the new boundary note.

### What you'll need to follow along
- An N8N instance ready, with Slack and Google Sheets connected.
- The Week 6 AI Anki MCP server running and reachable from N8N over HTTP.
- A Google Sheet of study topics to act as the trigger source.
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

### Topic C: Wiring your Week 6 Anki MCP agent into an automation (1.5 hrs)
- **Goal:** trigger your own MCP server from an N8N event instead of running it by hand.
- **Start here:** expose your Week 6 AI Anki MCP server over HTTP and call it from an N8N HTTP Request node, so an incoming event generates cards into a deck with nobody at a terminal.
- **Ask AI (paste into Claude):** "I have an MCP server from last week that wraps my AI Anki app and completes a multi-step task (generate cards, add them to a deck). I want N8N to call it when an external event fires. Walk me through the options for exposing my server to N8N (webhook, HTTP request node, or a small wrapper) and the trade-offs of each."

### Topic D: Failure handling in workflows (1 to 1.5 hrs)
- **Goal:** make one step fail and recover gracefully.
- **Start here:** make one step fail on purpose, then add a retry and an error branch that alerts you.
- **Watch:** "The Ultimate Guide to Webhooks in n8n" - search "n8n webhooks step by step guide" (Class Central lists a step-by-step version).
- **Ask AI (paste into Claude):** "In N8N, show me how to handle failure in a workflow: configuring retries on a node, adding an error workflow or error branch, and sending an alert when a step fails. Give me a checklist of failure modes I should design for in any automation that calls an external API."

### Topic E: Where no-code ends and code begins (1 hr)
- **Goal:** be able to say in one sentence when you would *not* reach for N8N.
- **Start here:** open the flow you built and mark every node as either **glue** (trigger, routing, field mapping, delivery) or **logic** (a decision, a prompt, data shaping). The logic nodes are the ones that belong in your service, not in the workflow.
- **Read:** N8N ships under the [Sustainable Use License](https://docs.n8n.io/sustainable-use-license/), not an open-source licence. Read enough to answer a customer who asks whether they can embed it in their own product.
- **Look at one code-first alternative for twenty minutes** so you can name it in a conversation: [Windmill](https://www.windmill.dev/), [Trigger.dev](https://trigger.dev/), or [Inngest](https://www.inngest.com/). You are not learning it this week — you are learning that it exists and what it buys you (real durable execution, idempotency, tests, version control).
- **Ask AI (paste into Claude):** "I built this automation in N8N: [describe your flow node by node]. Act as a senior engineer reviewing it. Which parts are legitimate orchestration that should stay in N8N, and which are business logic that should move into my own service? Then tell me what would break first if this flow ran 100 times a minute instead of 10 times a day, and what I would migrate it to."

---

## 3. Weekly Project

### Brief
Automate a real manual task end to end in N8N. An external event triggers a flow that calls AI and delivers a result somewhere useful, and handles at least one failure path gracefully.

### AI Anki option (the recommended path)
Make your Week 6 MCP server run without you. A new row in a Google Sheet of study topics — or an incoming message — fires the flow, which calls your server's `generate_cards` and `add_card` tools to fill a deck in your AI Anki fork, then posts a summary to Slack or writes the result back to the Sheet.

This closes the loop on the app you forked in Week 1, cleaned data from in Week 2, deployed in Week 3, hardened in Week 4, and wrapped in Week 6 — and it is the thing you can point at in the mid-course checkpoint as a single system you built across seven weeks. Any other genuine manual task is acceptable, but Anki is the intended target and makes the strongest submission.

### Requirements (checklist)
- [ ] An external trigger: a webhook, a new row, or an incoming message (not a manual click).
- [ ] The flow calls AI: either your Week 6 Anki MCP agent or a Claude API call.
- [ ] It delivers a result somewhere useful: cards in your Anki deck, a Google Sheet, a Slack message, or a database.
- [ ] It handles at least one failure path gracefully rather than dying silently.

### Reliability check (include in submission)
- One line: name the step most likely to fail, and show what your flow does when it does.

### Boundary note (include in submission)
- Two or three lines: the one step you would move out of N8N and into code **first**, what would force the move (volume, testing, versioning, or logic that outgrew a node), and what you would move it to.
- "Nothing" is not an acceptable answer. Every workflow has one.

### Suggested steps
1. Pick a genuine manual task worth removing (or take the AI Anki path above).
2. Build the trigger and the happy path first; confirm it works end to end.
3. Add the AI step (your Anki MCP agent or a Claude API call).
4. Break a step on purpose; add a retry, an error branch, and an alert.
5. Mark each node glue-or-logic (Topic E) and write the boundary note.
6. Write the note on the manual task removed, the failure handling, and the boundary.

### Deliverables
- The exported N8N workflow.
- A short note on the manual task it removes, how it handles failure, and where you would stop using N8N.

### Stretch (optional)
- Add a schedule trigger so the automation also runs on a timer — for example a nightly job that reads the `reviews` table from your Anki app and posts a study digest to Slack.

---

## 4. Submittable Assessment

### What to submit
- The exported N8N workflow and the short note (manual task removed, failure handling, boundary note).

### Presentation
- A 3 to 5 minute demo (recorded or live) triggering the automation live and showing the failure path in action.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** the automation completes end to end on a real trigger.
- **Handling ambiguity and failure (30%):** failure is handled, not ignored.
- **Communication (25%):** can you explain the manual task removed, why it matters, and where you would stop using N8N.
- **Ownership (15%):** did you automate something genuinely useful, or a toy.

### Definition of done
A real event fires your workflow, it calls AI and delivers a useful result, when a step fails it retries or alerts instead of dying silently, and you can name the one step you would move into code first and what would force the move.

---

## End of Phase 2: mid-course checkpoint

After this week, before Phase 3, you sit the mid-course checkpoint: a half-day review of all seven of your deliverables for trend. If you are shaky on a Phase 2 foundation (LLM patterns, RAG, MCP, or automation), you get a short remediation task before Week 8.
