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

**Tool calling, the mechanics**
- How a model calls a tool: it asks, your code runs the function, you return the result, it continues.
- The tool definition: name, description, input schema. The description is a prompt; the model reads it.
- You'll see a single tool the model calls to complete a task.

**Using an existing MCP server**
- You'll see Claude connected to a ready-made MCP server (for example a filesystem or a sample database server) and one real task completed through it.
- The takeaway: you do not always build. Often the fastest integration is an MCP server that already exists.

**Building a custom MCP server**
- You'll see a tiny MCP server built — one that exposes one tool with a strict input schema — and called from Claude.
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
- A ready-made MCP server to connect to.
- A minimal custom MCP server scaffold.
- A guardrail that can be provoked live.
- Conductor set up to run two agents.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: What MCP is and the problem it solves (1 hr)
- **Goal:** explain MCP to someone else in three sentences.
- **Start here:** read the MCP overview and write three sentences on why a shared protocol beats one-off integrations.
- **Read:** Model Context Protocol docs, "Build an MCP server" intro - https://modelcontextprotocol.io/docs/develop/build-server and the site overview at https://modelcontextprotocol.io/
- **Ask AI (paste into Claude):** "Explain the Model Context Protocol to me as if I am a competent engineer who has never used it. What problem does it solve, what are tools, resources, and prompts, and how does a model actually call a tool through an MCP server? Use a concrete example of a weather tool."

### Topic B: Connect to an existing MCP server (1.5 hrs)
- **Goal:** complete a real task through a server you did not build.
- **Start here:** connect Claude to a ready-made MCP server (filesystem or a sample database) and complete one task through it.
- **Read:** DataCamp, "Model Context Protocol (MCP): A Guide With Demo Project" - https://www.datacamp.com/tutorial/mcp-model-context-protocol
- **Ask AI (paste into Claude):** "I want to connect Claude to an existing MCP server (for example the filesystem server). Walk me through installing it, configuring it, and running one task through it end to end. Then explain what just happened at the protocol level."

### Topic C: Build a custom MCP server (2 to 2.5 hrs)
- **Goal:** expose one tool with a strict schema and call it.
- **Start here:** build a server that exposes a single tool with a strict input schema, and call it from Claude.
- **Read:** Towards Data Science, "Build Your First MCP Server in 6 Steps" - https://towardsdatascience.com/model-context-protocol-mcp-tutorial-build-your-first-mcp-server-in-6-steps/ (fallback: the official build-server tutorial linked above).
- **Ask AI (paste into Claude):** "Help me build a minimal MCP server in Python using FastMCP that exposes one tool: given a student question, return its topic and difficulty. Show the full code, explain the input schema, and show me how to call this tool from Claude. Keep it small enough that I understand every line."

### Topic D: Tool design, guardrails, and Conductor (1.5 hrs)
- **Goal:** add a guardrail and run two agents in parallel.
- **Start here:** add a guardrail to your tool that blocks one clearly bad action, then provoke it; then run two agents in Conductor against your tool.
- **Ask AI (paste into Claude):** "Here is a tool my model can call: [paste]. What could go wrong if the model called it with bad or malicious input? Help me design a guardrail that blocks the clearly bad cases before the action runs, and show me how to test that the guardrail actually holds when provoked."

---

## 3. Weekly Project

### Brief
Build a custom MCP server that exposes at least two tools a model can call to complete a real multi-step task, with at least one guardrail that prevents a clearly bad action. Drive it from Claude through an agent loop.

### Requirements (checklist)
- [ ] A custom MCP server exposing at least two tools with strict input schemas.
- [ ] The model completes a real multi-step task through the server.
- [ ] At least one guardrail that prevents a clearly bad action, and holds when provoked.
- [ ] Use Conductor to build and test in parallel; one line on whether it saved time.
- [ ] Build the server so it can be called by something other than you (it will be triggered by your Week 7 automation).

### Reliability check (include in submission)
- One line: name one bad input or action your guardrail must block, and confirm it does when provoked.

### Suggested steps
1. Define the multi-step task and the two tools it needs.
2. Build the MCP server and its tool schemas.
3. Drive it from Claude in an agent loop until the task completes.
4. Add and provoke the guardrail.
5. Use Conductor to parallelise the build and note whether it helped.

### Deliverables
- The MCP server, the tool definitions, and the guardrail.
- A short note on what the guardrail blocks and your one-line Conductor reflection.

### Stretch (optional)
- Expose a resource (read-only data) in addition to your tools.

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
