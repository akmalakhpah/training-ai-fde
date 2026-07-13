# Week 6: MCP and Tool Calling

**Phase:** 2, AI Application Engineering
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Explain MCP as the standard protocol for connecting models to tools and data.
- Use an existing MCP server, and build a custom one.
- Drive a model through a multi-step task using MCP tools.
- Build guardrails so a tool call fails safely.
- Use Conductor to run more than one agent in parallel on real work.

---

## 1. Taught Class (90 minutes)

> Purpose: give a model hands the standard way. You'll see both sides the project needs — using an MCP server and building one. This outline is the brief for the slide deck.

### What you'll cover

**Title and framing**
- "MCP and Tool Calling."
- The one line to hold onto: a model that can only talk is a chatbot. A model that can call tools is an FDE's building block.

**The problem MCP solves**
- Before MCP: every tool wired into every app by hand, N times M integrations.
- MCP: a common protocol, so any model can talk to any tool or data source.
- The three things an MCP server can expose: tools (functions the model can call), resources (data it can read), prompts (templates).
- The mental model: MCP is to AI tools what USB was to peripherals, one standard plug.

**The anatomy diagram (one picture for the whole week)**
- Show the three-part diagram: MCP host (the AI app — Claude Code, Claude Desktop, Cursor, n8n) with an MCP client inside it, the MCP server (the adapter you run or connect to, exposing tools/resources/prompts), and your world behind it (APIs, databases, files, SaaS like Flowyteam and Pandai, or the AI Anki app).
- Trace one request end to end: the model asks to call a tool, the client sends it to the server over JSON-RPC (stdio locally or HTTP remotely), the server does the real work, the result returns into the model's context.
- The takeaway: everything else this week is a detail of this one diagram.

**Tool calling, the mechanics**
- How a model calls a tool: it asks, your code runs the function, you return the result, it continues.
- The tool definition: name, description, input schema. The description is a prompt; the model reads it.
- You'll see a single tool the model calls to complete a task.

**MCP vs RAG (when to use each)**
- The question everyone asks after seeing both: is MCP just RAG? No — different jobs, and good agents use both. Students built RAG in Week 5, so draw the line clearly.
- RAG gives the model knowledge: retrieve relevant text and paste it into the prompt. Read-only — it informs the answer but changes nothing. Best for search over docs, policies, knowledge bases. Answers "what do we know about X?"
- MCP gives the model hands: typed tools it can call to read live data and to act (query, write, send, trigger). Best for live data and multi-step actions. Answers "what can I do about X?"
- The one-line test: reach for RAG when the model needs to KNOW something new; reach for MCP when it needs to DO or read something live.
- Not rivals: the cleanest pattern is to expose a RAG search as an MCP tool (e.g. a `search_docs` tool that retrieves under the hood), so one server both informs and acts.

**Using an existing server — Demo 1: the MCP Playground (~10 min)**
- Open the MCP Playground (https://mcpplaygroundonline.com) — a hosted MCP client, nothing to install — and point it at the test server (https://mcpplaygroundonline.com/mcp-test-server).
- Read the tools list (the exact catalogue a model sees, with each input schema), call one tool by hand, and open the raw view to show the JSON-RPC request and response.
- The takeaway: an MCP server is just a list of typed functions you can inspect and call.

**Using an existing server — Demo 2: connect Claude Code to real servers (~14 min)**
- Add two real company servers to Claude Code with `claude mcp add <name> <url> --transport http --header "Authorization: Bearer <token>"`: Flowyteam (https://flowyteam.com/api/mcp/gateway — HR, OKR, CRM, tickets) and Pandai (https://app.pandai.org/mcp/internal/support — internal support). Tokens are placeholders; each student uses their own.
- Run `claude mcp list` to confirm, then ask Claude in plain English (e.g. "list the open Flowyteam projects", "summarise the latest Pandai support request") and watch it pick the tool, send the call over HTTP, and reason over the result.
- The takeaway: you do not always build. Connecting to a customer's server is one command plus a token — this is exactly the FDE motion.

**Building a custom MCP server (for AI Anki)**
- You'll see a tiny MCP server built — one that exposes one tool with a strict input schema — and called from Claude. The concrete target is the Week 1 AI Anki app: a tool like add_card or list_decks that calls the app's HTTP API.
- Here's the structure: define the tool, validate the input, do the work, return a clean result.
- The takeaway: a good tool has a tight schema and a description the model cannot misread.

**Multi-step agent loops**
- You'll see a task that needs two or more tool calls in sequence, and how the loop and the state between steps work.

**Guardrails**
- Why this matters: a model with hands can do real damage. A guardrail stops a clearly bad action before it runs.
- You'll see a guardrail added that blocks a clearly bad action, then provoked, and holding.
- The takeaway: design the guardrail for the action you would be fired for.

**Conductor and parallel agents**
- You'll see two agents run in parallel against the same tools, now that there is parallel work worth orchestrating.
- When parallelism helps and when it just adds confusion.

**Project and wrap**
- You'll walk through the project brief and assessment, including the reliability check. Note that this server is what Week 7 will automate.

### What you'll need to follow along
- The MCP Playground open in a browser (https://mcpplaygroundonline.com) pointed at its test server.
- Claude Code with the Flowyteam and Pandai servers added (URLs above; tokens from the instructor).
- A local AI Anki fork running (uvicorn app.main:app --reload) and a minimal custom MCP server scaffold.
- A guardrail that can be provoked live.
- Conductor set up to run two agents.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: What MCP is and the problem it solves (1 hr)
- **Goal:** explain MCP to someone else in three sentences.
- **Start here:** read the MCP overview and write three sentences on why a shared protocol beats one-off integrations.
- **Read:** Model Context Protocol docs, "Build an MCP server" intro - https://modelcontextprotocol.io/docs/develop/build-server and the site overview at https://modelcontextprotocol.io/
- **Ask AI (paste into Claude):** "Explain the Model Context Protocol to me as if I am a competent engineer who has never used it. What problem does it solve, what are tools, resources, and prompts, and how does a model actually call a tool through an MCP server? Use a concrete example of a weather tool."

### Topic B: Use servers you did not build — Playground + real servers (1.5 hrs)
- **Goal:** complete a real task through servers you did not build — first in the browser, then in Claude Code.
- **Start in the browser:** open the MCP Playground (https://mcpplaygroundonline.com), point it at the test server (https://mcpplaygroundonline.com/mcp-test-server), read the tools list, call one tool by hand, and open the raw view to see the JSON-RPC request and response.
- **Then in Claude Code:** connect two real company servers and run one task through each.
  - Flowyteam — https://flowyteam.com/api/mcp/gateway (HR, OKR, CRM, tickets)
  - Pandai — https://app.pandai.org/mcp/internal/support (internal support)
  - Both are remote HTTP servers that need a token; get yours from the instructor.
  - Command (token is a placeholder — use your own): `claude mcp add flowyteam https://flowyteam.com/api/mcp/gateway --transport http --header "Authorization: Bearer <your-token>"`, then `claude mcp list` to confirm, then ask Claude in plain English.
- **Read:** DataCamp, "Model Context Protocol (MCP): A Guide With Demo Project" - https://www.datacamp.com/tutorial/mcp-model-context-protocol
- **Ask AI (paste into Claude):** "I connected Claude Code to a remote MCP server and asked it to complete a task. Explain what just happened at the protocol level — what the client sent, what the server returned, and how the result got back into your context."

### Topic C: Build a custom MCP server for AI Anki (2 to 2.5 hrs)
- **Goal:** wrap your Week 1 AI Anki fork in an MCP server that exposes one tool with a strict schema, and call it from Claude.
- **Start here:** run your AI Anki fork locally (`uvicorn app.main:app --reload`), then build a small FastMCP server whose tool calls the app's HTTP API — start with `add_card` (POST /decks/{deck_id}/cards) or `list_decks` (GET /decks). Repo: https://github.com/akmalakhpah/training-ai-fde-anki
- **Read:** Towards Data Science, "Build Your First MCP Server in 6 Steps" - https://towardsdatascience.com/model-context-protocol-mcp-tutorial-build-your-first-mcp-server-in-6-steps/ (fallback: the official build-server tutorial linked above).
- **Ask AI (paste into Claude):** "Help me build a minimal MCP server in Python using FastMCP that exposes one tool for my AI Anki app: add_card(deck_id, front, back) that POSTs to my local FastAPI endpoint. Show the full code, explain the input schema, and show me how to call it from Claude. Keep it small enough that I understand every line."

### Topic D: A second Anki tool, guardrails, and Conductor (1.5 hrs)
- **Goal:** add a second tool plus a guardrail, and run two agents in parallel.
- **Start here:** add a second Anki tool (e.g. `generate_cards` or `list_decks`), then add a guardrail that blocks one clearly bad action — for example, refuse to generate more than 20 cards, or reject an empty card front — and provoke it. Then run two agents in Conductor against your server.
- **Ask AI (paste into Claude):** "Here is a tool my model can call on my AI Anki app: [paste]. What could go wrong if the model called it with bad or malicious input? Help me design a guardrail that blocks the clearly bad cases before the action runs, and show me how to test that the guardrail actually holds when provoked."

---

## 3. Weekly Project

### Brief
Build a custom MCP server that wraps your Week 1 AI Anki fork, exposing at least two tools a model can call to complete a real multi-step task, with at least one guardrail that prevents a clearly bad action. Drive it from Claude through an agent loop. (Anki is the intended target and it feeds Week 7; if you have a different app you would rather wrap, that is acceptable.)

Repo: https://github.com/akmalakhpah/training-ai-fde-anki — run it with `uvicorn app.main:app --reload`. Useful endpoints to wrap as tools: `GET /decks` (list_decks), `POST /decks` (create_deck), `POST /decks/{deck_id}/cards` (add_card), `GET /decks/{deck_id}/due` (due cards), `POST /cards/{card_id}/review` (review), `GET /decks/{deck_id}/stats` (stats), `POST /decks/{deck_id}/generate` (generate_cards).

### Requirements (checklist)
- [ ] An MCP server exposing at least two AI Anki tools with strict input schemas (e.g. `list_decks`, `add_card`, `generate_cards`).
- [ ] The model completes a real multi-step task through the server (e.g. "create a French deck and fill it with 10 cards").
- [ ] At least one guardrail that prevents a clearly bad action, and holds when provoked (e.g. refuse to generate more than 20 cards, or reject an empty card front).
- [ ] Use Conductor to build and test in parallel; one line on whether it saved time.
- [ ] Build the server so it can be called by something other than you (it will be triggered by your Week 7 automation).

### Reliability check (include in submission)
- One line: name one bad input or action your guardrail must block, and confirm it does when provoked.

### Suggested steps
1. Run your AI Anki fork locally and define the multi-step task and the two tools it needs.
2. Build the MCP server and its tool schemas against the app's HTTP API.
3. Drive it from Claude in an agent loop until the task completes.
4. Add and provoke the guardrail.
5. Use Conductor to parallelise the build and note whether it helped.

### Deliverables
- The MCP server, the tool definitions, and the guardrail.
- A short note on what the guardrail blocks and your one-line Conductor reflection.

### Stretch (optional)
- Expose a resource (read-only data) in addition to your tools — for example, a deck's stats as a readable resource.

---

## 4. Submittable Assessment

### What to submit
- The MCP server, the tool definitions, the guardrail, the note, and the Conductor reflection.

### Presentation
- A 3 to 5 minute demo (recorded or live) showing the model complete the task through your MCP server, including the guardrail firing when provoked.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** the model completes the task through MCP end to end, with clean tool and schema design.
- **Handling ambiguity and failure (30%):** does the guardrail actually work when provoked.
- **Communication (25%):** can you explain what your server does and why the schema looks as it does.
- **Ownership (15%):** did you build something callable and reusable, or a one-off.

### Definition of done
A model can complete a real multi-step task through your MCP server, your guardrail blocks the bad action when provoked, and the server is ready to be triggered by an automation next week.
