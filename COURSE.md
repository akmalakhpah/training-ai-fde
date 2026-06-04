# AI Forward Deployed Engineer Course

## Complete Course Specification

A 12-week hybrid program that takes fresh computer science and engineering graduates and turns them into deployable AI Forward Deployed Engineers. Claude is the primary model used throughout, with one dedicated session for self-learning the wider model landscape.

---

## 1. Course Philosophy

Most software fails in deployment, not in development. The product works in the demo and breaks inside the customer's real, messy environment. The Forward Deployed Engineer exists to close that gap by embedding with the customer, building production-grade solutions in place, and staying until they work.

For a fresh graduate, the technical gap is closable in weeks. The harder gap is the FDE craft: staying calm inside broken systems, turning a vague business problem into a concrete plan, owning delivery end to end, and talking to customers without hiding behind a screen. This course weights heavily toward that craft, because it is what degrees and bootcamps skip.

Three muscles run through every single week:

1. Ship production code, not coursework.
2. Stay functional inside ambiguous, broken, incomplete systems.
3. Translate between human problems and technical plans.

If a trainee finishes the course strong on muscle one but weak on two and three, they are not ready. The whole design exists to build all three at once.

---

## 2. Who This Is For and Intended Outcomes

### Target trainee

Fresh computer science or engineering graduates with a solid academic foundation but little or no production experience. They can write code. They have not yet shipped something that real users depend on, debugged a live outage at 2am, or explained a technical tradeoff to a non-technical stakeholder.

### Outcomes

By the end, a graduate can:

- Read and contribute to a large unfamiliar codebase without freezing.
- Build, deploy, observe, and recover a production service.
- Query, clean, and move real customer data confidently.
- Build reliable LLM applications: structured outputs, RAG, agents, tool calling, and evaluation.
- Choose the right model for a given task on cost, latency, and quality grounds.
- Scope a vague business problem into a concrete technical plan.
- Integrate into systems they do not control.
- Present a technical recommendation to a mixed audience and earn trust.
- Own a real deployment end to end, including the moment it breaks.

---

## 3. Prerequisites

### Knowledge prerequisites

Trainees should arrive with these. The course does not reteach them.

- Programming fundamentals in at least one language. Comfort writing functions, loops, data structures, and reading other people's code.
- Basic command line use: navigating directories, running scripts, environment variables.
- Basic understanding of how the web works: HTTP, requests and responses, what an API is at a conceptual level.
- Willingness to be wrong in public. This is non-negotiable for an FDE.

### Skills the course builds, so not required up front

Python depth, SQL, cloud, GitHub workflows beyond the basics, LLM application patterns, and the entire FDE craft. Trainees do not need any AI or machine learning background.

### Environment and account setup (complete before Week 1)

- A working laptop with a code editor installed.
- GitHub installed and a code hosting account (GitHub or equivalent) ready.
- Python installed (current stable version).
- Node.js installed (required for Claude Code).
- A Claude Pro subscription provided by the program (the one thing the program pays for, for the full ~4-month course); used to log into Claude Code.
- Claude Code installed and authenticated by logging in with that Claude Pro account (no API key needed for Claude Code).
- Your own free accounts, created by you, for everything else: a Google account with Gemini, free-tier AWS, free-tier Cloudflare, and — when an API-building week needs it — your own free Anthropic API key.
- Able to clone the Week 1 training repository (link shared in onboarding).

A short Week 0 setup checklist is run before the cohort starts so that nobody loses Week 1 to installation problems.

---

## 4. Format and Time Commitment

- Duration: 12 weeks.
- One taught class per week, roughly 90 minutes. This is the synchronous anchor for live demos, code review, scoping drills, and questions.
- Self-paced learning across the rest of the week, roughly 6 to 9 hours.
- One shippable deliverable every week.
- Total trainee commitment: roughly 8 to 12 hours per week including the class.

The taught class is deliberately short. The real learning is in the self-paced build, where trainees hit walls and climb them. The class exists to unblock, demonstrate, and pressure-test, not to lecture for hours.

### Tooling and the role of Claude

Claude is the primary model and assistant throughout the course. Trainees use it three ways:

1. As a coding partner through Claude Code for building and debugging.
2. As the model they build applications on through the Claude API.
3. As a thinking partner for scoping, writing, and learning.

The current Claude family is organized in tiers, and trainees learn to choose between them rather than defaulting to the biggest one:

- Opus tier: the most capable, for complex reasoning and long-horizon agentic work. Claude Opus 4.8 is the most capable model as of mid 2026.
- Sonnet tier: the balanced default for most development, analysis, and general application work.
- Haiku tier: fast and cost-efficient, for high-volume, latency-sensitive, simple tasks.

Model names change over time, so trainees learn the tier principle, not a fixed version number. The principle is that choosing the right model for the task matters more than always reaching for the most powerful one.

---

## 5. Course Structure Overview

| Phase | Weeks | Focus |
|-------|-------|-------|
| 1. Production Engineering Foundations | 1 to 3 | Unlearning coursework habits, learning how code ships and survives |
| 2. AI Application Engineering | 4 to 7 | Building reliable systems on top of unreliable models |
| 3. The FDE Craft | 8 to 10 | Scoping, integration, and customer communication |
| 4. Capstone Embedded Deployment | 11 to 12 | A real deployment with a real owner and a real deadline |

A single half-day Model Landscape session sits between Phase 2 and Phase 3 (described in Section 8). It is self-paced with a group debrief.

---

## 6. Detailed Weekly Breakdown

Each week follows the same shape: learning objectives, the taught class, the self-paced track, the project deliverable, and how it is assessed.

---

### Phase 1: Production Engineering Foundations

---

#### Week 1: From Coursework to Production

**Learning objectives**
- Understand what separates a student repo from a production system.
- Work confidently inside a large codebase written by other people.
- Follow a real branching, review, and merge workflow.

**Taught class**
Live walkthrough of a real internal service. The instructor shows the branching model, opens a pull request, walks through a code review, and explains what "done" actually means in production. Trainees see a real CI pipeline run and fail and pass.

**Self-paced track**
- GitHub beyond commit and push: branching, rebasing, resolving conflicts, keeping clean history.
- Strategies for reading a large unfamiliar codebase: entry points, following the data, ignoring what does not matter yet.
- Writing tests for code you did not write.

**Project deliverable**
Clone an internal training repo, find one small genuine issue, and open a clean pull request with tests. Get it through review and merged.

**Assessment**
Was the pull request clean and mergeable? Did the trainee respond well to review feedback? Did they navigate the codebase without needing to be walked through every file?

---

#### Week 2: Data Fluency

**Learning objectives**
- Query, transform, and move real data with confidence.
- Recognise dirty data and decide what to do about it.

**Taught class**
SQL for people who will live inside customer databases. Live querying against a real, slightly messy dataset: joins, window functions, CTEs, subqueries, and query optimization. The instructor shows a slow query and makes it fast.

**Self-paced track**
- Relational schema design and indexing basics.
- Common data quality problems and how to detect them.
- Moving data safely between systems.

**Project deliverable**
Given a deliberately messy export (broken rows, wrong types, missing values, duplicate keys), produce a clean and queryable result, plus a one-paragraph note explaining what was wrong and how it was fixed.

**Assessment**
Correctness of the cleaned data, quality of the SQL, and the clarity of the explanation. The note matters as much as the query.

---

#### Week 3: Deploy, Observe, Recover

**Learning objectives**
- Take a service from local to live.
- Know when a service is broken and why, using logs and metrics.

**Taught class**
How a service goes live and how you know when it breaks. Containers, environments, configuration, logging, and basic observability. The instructor runs a live incident walkthrough: a service falls over, and the class diagnoses it together from the logs.

**Self-paced track**
- Cloud basics on one provider.
- API design and integration patterns.
- Reading logs and metrics to diagnose a failure.

**Project deliverable**
Deploy a small service to a sandbox environment, intentionally break it, then diagnose and fix it using only logs and metrics. Document the incident and the fix.

**Assessment**
Did the service deploy and run? Could the trainee diagnose the failure independently? Quality of the incident write-up.

---

### Phase 2: AI Application Engineering

The goal here is building reliable systems on top of unreliable models. This is the AI in AI FDE. Trainees do not train models. They build production applications that use them.

---

#### Week 4: LLM Application Patterns

**Learning objectives**
- Understand how LLM applications work in production.
- Treat prompting as engineering, not guesswork.
- Reason about cost, latency, and non-determinism.

**Taught class**
How LLM apps actually work. The instructor builds a small feature live using the Claude API: structured prompting, streaming, structured JSON output, error handling, and measuring cost per call. The recurring theme: the model is the easy part, the system around it is the job.

**Self-paced track**
- Prompt design and iteration as an engineering discipline.
- Getting reliable structured output from a model.
- Token economics and the cost implications of design choices.
- Handling non-deterministic responses gracefully.

**Project deliverable**
Build a small LLM feature on the Claude API that returns reliable structured JSON, handles errors, and reports its own cost per call.

**Assessment**
Reliability of the structured output, quality of error handling, and whether the trainee can explain the cost behaviour of their feature.

---

#### Week 5: Retrieval and Grounding (RAG)

**Learning objectives**
- Understand why models need grounding and how RAG works end to end.
- Evaluate retrieval quality and recognise RAG failure modes.

**Taught class**
RAG from scratch: chunking, embeddings, retrieval, and assembling grounded answers. The instructor shows a RAG system retrieving well, then shows it confidently retrieving the wrong thing, and explains why.

**Self-paced track**
- Chunking strategies and their tradeoffs.
- Vector stores and similarity search.
- Measuring retrieval quality.
- When RAG is the wrong tool.

**Project deliverable**
Build a RAG system over a real document corpus. Demonstrate where it retrieves well and where it fails, and explain the failures.

**Assessment**
Does the system work end to end? More importantly, can the trainee identify and explain its failure modes honestly rather than hiding them?

---

#### Week 6: Agents and Tool Calling

**Learning objectives**
- Design agentic workflows with tool calling.
- Build guardrails so an agent fails safely.
- Understand MCP as an integration pattern.

**Taught class**
Giving a model hands. Tool calling, multi-step agent loops, and orchestration. The instructor builds an agent that uses tools to complete a real task, then shows what happens when it goes wrong and how a guardrail stops it. MCP is introduced as a standard way to connect models to tools and data.

**Self-paced track**
- Designing tools a model can call safely and reliably.
- Multi-step workflows and state.
- Guardrails, retries, and failure recovery in agent loops.
- MCP basics.

**Project deliverable**
Build an agent that completes a real multi-step task using at least two tools, with at least one guardrail that prevents a clearly bad action.

**Assessment**
Does the agent complete the task? Does the guardrail actually work when provoked? Quality of the tool design.

---

#### Week 7: Evaluation, Safety, and Cost

**Learning objectives**
- Decide whether an AI system is good enough to ship, with evidence.
- Build an evaluation harness.
- Account for safety and abuse.

**Taught class**
How do you know an AI system is good enough? Defining success, building eval sets, and measuring quality, cost, and latency together. Safety controls and abuse cases, including the heightened care required for any system that touches minors in a K-12 context.

**Self-paced track**
- Writing eval sets that reflect real use.
- Measuring quality, cost, and latency as a single picture.
- Identifying safety and abuse risks.

**Project deliverable**
Build an evaluation harness for the Week 5 or Week 6 project. Produce a report covering quality, cost, latency, and at least one safety risk found.

**Assessment**
Does the eval harness measure something meaningful? Is the report honest about weaknesses? Did the trainee surface a real safety concern?

---

### Phase 3: The FDE Craft

The technical baseline is now in place. These three weeks build the things that actually decide whether someone thrives in the field. This is the heart of the course.

---

#### Week 8: Scoping Ambiguity

**Learning objectives**
- Turn a vague business problem into a concrete technical plan.
- Find the real problem behind the stated one.
- Say no to the wrong solution.

**Taught class**
Live scoping drills. The instructor hands out one-line briefs like "we want to use AI" or "fix our support load," and the class works through finding the real problem, asking the right questions, and shaping a plan. The instructor models how to push back on a bad request without losing the customer.

**Self-paced track**
- Problem framing and the art of the clarifying question.
- Writing a short, clear scoping document.
- Distinguishing what the customer asked for from what they need.

**Project deliverable**
Given a deliberately vague one-line brief, produce a scoping document stating the real problem, a proposed plan, the assumptions made, and explicitly what you would not build.

**Assessment**
Did the trainee find the real problem rather than solving the surface request? Is the plan concrete and realistic? Is the "what we will not build" section thoughtful?

---

#### Week 9: Integration and the Messy Real World

**Learning objectives**
- Integrate into systems you do not control.
- Work around legacy constraints and bad documentation.

**Taught class**
Customer environments are fragmented, undocumented, and resistant to change. The instructor walks through a real integration, including the workarounds that never appear in any tutorial. The lesson: adapt to the customer's reality rather than forcing them to fit your product.

**Self-paced track**
- Integration patterns for systems with no clean API.
- Handling legacy constraints and partial access.
- Documenting workarounds so the next person survives.

**Project deliverable**
Integrate two systems that were not designed to talk to each other. Document every workaround and the reasoning behind it.

**Assessment**
Does the integration work? Quality of the workaround documentation. Did the trainee adapt to constraints rather than complaining about them?

---

#### Week 10: Customer-Facing Communication

**Learning objectives**
- Explain technical tradeoffs to non-technical people.
- Build trust and manage expectations.
- Deliver bad news well.

**Taught class**
The skill that gets faked the most and exposed the fastest. Running a customer meeting, framing tradeoffs for a mixed audience, building trust, and feeding field insight back to the product team. The instructor demonstrates a good and a bad version of the same conversation.

**Self-paced track**
- Written and verbal communication to technical and non-technical stakeholders.
- Managing expectations before they become problems.
- Delivering bad news clearly and early.

**Project deliverable**
Present a technical recommendation to a mock customer plus a leadership audience. The recommendation should involve a real tradeoff.

**Assessment**
Scored on clarity and trust, not just technical correctness. Could a non-technical person in the room follow the decision and believe in it?

---

### Phase 4: Capstone Embedded Deployment

No simulation. A real, scoped internal deployment with a real owner and a real deadline. Internal systems are the training ground before any trainee touches an external customer, because the cost of failure is contained.

---

#### Week 11: Build in Place

**Learning objectives**
- Own a real deployment end to end.
- Apply every prior week under real conditions.

**Taught class**
Capstone kickoff. Each trainee is paired with a real internal deployment and a mentor who has done deployment work. Scope is agreed and the deadline is set.

**Embedded work**
Scope it, build it, integrate it, evaluate it, deploy it. Hit the real walls and climb them. The mentor unblocks but does not rescue.

**Project deliverable**
A working deployment in a real environment, with evals and a runbook.

---

#### Week 12: Ship and Defend

**Learning objectives**
- Present and defend real work.
- Reflect on failure honestly.
- Bring reusable patterns back to the team.

**Taught class**
Each trainee presents their deployment to stakeholders, defends their decisions under questioning, and walks through one production failure they hit and how they recovered.

**Project deliverable**
Final demo, a short written postmortem, and a list of reusable patterns discovered that could help the next deployment.

**Assessment**
The capstone is the real exam. See Section 7.

---

## 7. Assessment Framework

There are no written exams. FDE readiness is demonstrated, not tested on paper.

### Weekly assessment

Every weekly deliverable is assessed on three questions:

1. Did it ship and work?
2. How did the trainee behave when it broke or the brief was unclear?
3. Could they explain it to a non-engineer?

A trainee who ships clean code but freezes under ambiguity is not ready. A strong communicator who cannot fix the system when it breaks is found out quickly. Both signals are tracked across all twelve weeks, not just at the end.

### Assessment rubric (applied weekly and to the capstone)

| Dimension | Weight | What is being judged |
|-----------|--------|----------------------|
| Technical execution | 30% | Does the work function correctly and to production standard? |
| Handling ambiguity and failure | 30% | Behaviour when the brief is vague or the system breaks |
| Communication | 25% | Clarity to technical and non-technical audiences |
| Ownership | 15% | Did they drive it to done, or wait to be carried? |

The two middle and final columns (ambiguity, communication, ownership) carry more combined weight than raw technical execution. This is deliberate and reflects what actually separates a good FDE from an ordinary engineer.

### Capstone assessment

The capstone is weighted most heavily. It is assessed on the same rubric, plus:

- Did the deployment actually work in a real environment?
- Was the postmortem honest about what went wrong?
- Were the reusable patterns genuinely useful to the next person?

### Graduation criteria

A trainee graduates as a deployable AI FDE when they have:

- Shipped a working deliverable every week.
- Demonstrated calm and competent behaviour during at least one real failure.
- Passed the capstone with a working deployment and an honest postmortem.
- Shown they can explain technical decisions to a non-technical audience.

A trainee who is strong technically but weak on ambiguity or communication does not graduate as field-ready. They are given a development plan and a path to retry, because these are the traits the role cannot do without.

---

## 8. Model Landscape Session (Self-Learning)

Claude is the primary model throughout the course so that trainees go deep rather than wide and build real fluency on one strong, well-documented platform. But a real FDE must understand the broader landscape, because customers arrive with different constraints, budgets, and existing commitments.

This is a dedicated self-paced session, run between Phase 2 and Phase 3, with a group debrief.

### Objectives

- Understand the major categories of models: proprietary frontier models, open-weight models, and small or specialised models.
- Reason about the tradeoffs that drive model choice: capability, cost, latency, context length, data residency, and licensing.
- Build a defensible model selection for a given scenario rather than defaulting to one option.

### Self-learning tasks

1. Pick three different models from different providers, including at least one open-weight model.
2. Run the same realistic task across all three plus Claude.
3. Measure cost per call, latency, and output quality on a small eval set.
4. Write a one-page recommendation for two contrasting scenarios:
   - A cost-sensitive, high-volume deployment such as a messaging integration where cheaper or faster models may win.
   - A complex reasoning deployment where a frontier model is justified.

### Group debrief

Trainees present their findings to each other. The instructor draws out the key lesson: there is no single best model, only the best model for a given set of constraints. The same tradeoff thinking applies whether the customer wants the cheapest workable option or the most capable one. An FDE who can only reach for one model will lose deployments that a more flexible engineer would win.

### Why Claude remains primary

After this session, the course returns to Claude as the main platform. The point of the session is judgement, not switching. Trainees should leave able to justify when Claude is the right choice and when another model fits the customer's constraints better, which is exactly the reasoning a customer will expect from them.

---

## 9. Projects Summary

| Week | Project | Primary muscle |
|------|---------|----------------|
| 1 | Clean pull request with tests on a real repo | Working in someone else's code |
| 2 | Clean a messy dataset and explain the fixes | Data fluency |
| 3 | Deploy, break, and recover a service | Operating in production |
| 4 | LLM feature with reliable structured output | LLM application patterns |
| 5 | RAG system over a real corpus | Retrieval and grounding |
| 6 | Agent with tools and a working guardrail | Agentic workflows |
| 7 | Evaluation harness with a safety finding | Evaluation and safety |
| Landscape | Multi-model comparison and recommendation | Model judgement |
| 8 | Scoping document from a vague brief | Scoping ambiguity |
| 9 | Integrate two incompatible systems | Messy integration |
| 10 | Technical recommendation to a mixed audience | Customer communication |
| 11 to 12 | Capstone embedded deployment | End-to-end ownership |

---

## 10. Notes for Running the Program

Use real internal systems as the training ground. Live deployments, messaging integrations, automation workflows, and database work are exactly the kind of embedded, messy delivery FDEs do. Apprentice trainees on internal systems first, where the cost of failure is contained, before pointing them at external customers.

Pair every trainee with a mentor who has done real deployment work. The FDE craft transfers through apprenticeship, not lectures. The mentor unblocks but never rescues, because being rescued teaches nothing.

Keep cohorts small. This is a high-touch program by design. A large cohort dilutes the mentorship that makes it work.

Protect the self-paced build time. The weekly class is short on purpose. Trainees learn the craft by hitting walls during the build, not by hearing about walls in a lecture.

Reward honesty about failure. The postmortem, the "here is where my system breaks," and the "I got this wrong" are the most valuable things a trainee produces. An FDE who hides failures is a liability. Build a culture where surfacing them early is the expected behaviour.

---

## 11. Appendix: Glossary

- FDE: Forward Deployed Engineer. An engineer who embeds with a customer to build, deploy, and operate solutions in place.
- RAG: Retrieval Augmented Generation. Grounding a model's answers in retrieved documents.
- Agent: A system where a model takes multi-step actions using tools.
- Tool calling: A model invoking external functions or services to act in the world.
- MCP: A standard pattern for connecting models to external tools and data sources.
- Eval: A structured way to measure whether a model or system is good enough.
- Guardrail: A control that stops a system from taking an unsafe or clearly wrong action.
- Runbook: A document describing how to operate and recover a deployed system.
