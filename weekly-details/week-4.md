# Week 4: LLM Application Patterns

**Phase:** 2, AI Application Engineering
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Explain how LLM applications work in production — the full input-to-output-to-failure loop.
- Treat prompting as engineering, not guesswork: versions, test inputs, measurable improvement.
- Get reliable, schema-valid structured output from a model instead of parsing free text.
- Reason about cost, latency, and non-determinism, and price a feature at Pandai scale across model tiers.
- Plan AI work in markdown (CLAUDE.md, plan.md) and use AI tools (Claude Code, Claude Cowork) to understand and build LLM features.

---

## 1. Taught Class (90 minutes)

> Purpose: build a small, reliable LLM feature live on the Claude API, so you see that the model is the easy part and the system around it is the job. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "LLM Application Patterns."
- One line: this is the AI in AI FDE. You will not train models, you will build production systems that use them.

**Block 2: The shape of an LLM app (10 min)**
- The loop: input, prompt assembly, model call, parse, validate, act, handle failure.
- Where things go wrong: the model is non-deterministic, the output is text, and text lies about being JSON.
- The key point: the model is the easy part. The system around it is the job.

**Block 3: Prompting as engineering (12 min)**
- A prompt is code: it has inputs, expected outputs, edge cases, and versions.
- Anatomy: role, task, context, format instruction, examples, constraints.
- You'll see a first prompt written that classifies a question by topic, then improved across two versions with the output change shown.

**Block 4: Structured output (14 min)**
- The problem: "please return JSON" is not a guarantee.
- The solution: structured outputs and strict tool use that constrain the model to a schema.
- You'll see a JSON schema defined and the model return guaranteed-valid JSON on the Claude API.
- The key point: never parse free text when you can constrain the shape.

**Block 5: Error handling and non-determinism (12 min)**
- You'll see the same prompt called five times, the variation shown, then code written that handles it.
- Retries, timeouts, fallbacks, and what to do when the model returns something unusable.
- The key point: design for the bad response, not the demo response.

**Block 6: Streaming (6 min)**
- What streaming is and when it matters (perceived latency for users).
- You'll see a response streamed token by token.

**Block 7: Cost and latency (12 min)**
- Token economics: input tokens, output tokens, and where the cost actually lands. Output tokens cost 5× input on every tier.
- A worked example: tagging one question is ~350 input + ~30 output tokens. On Claude Haiku 4.5 ($1 in / $5 out per 1M) that is $0.0005 per call; a million is $500. On Claude Opus 4.8 ($5 / $25) the same call is $0.0025 — five times more (not the old ~25×; current pricing makes the Haiku→Opus jump 5×).
- A **live token-cost calculator** on the slide: pick an Anki scenario, switch the model between Haiku 4.5, Sonnet 4.6, and Opus 4.8, and watch cost per call / per day / per month move in real time, with a 3-tier comparison strip.
- Current pricing per 1M tokens: Haiku 4.5 $1 / $5, Sonnet 4.6 $3 / $15, Opus 4.8 $5 / $25.
- Model tiers: Haiku for classification/tagging, Sonnet for generation/grading that needs more reasoning, Opus only when the task genuinely needs deep reasoning.
- The key point: "can you run this cheaply at scale" is the question every customer asks.

**Block 8: Plan in markdown, build with AI tools (6 min)**
- The habit that ties the week together: plan AI work in markdown. .md is the shared language between you and your AI tools — CLAUDE.md briefs the agent, README.md briefs humans, and a `plan.md` is where you think before you code.
- For the Anki feature, `plan.md` has five sections: Goal, Output schema, Prompt versions to try, Failure modes to handle, Cost target. Commit it — it is versionable, reviewable in the PR, and directly readable by Claude Code, so the plan becomes the brief.
- **Claude Cowork** (Anthropic's collaborative workspace — a shared document you and Claude edit together, not a throwaway chat): paste your feature's code and prompt, have it map them onto the seven-step loop, draft the JSON schema, and list the inputs most likely to break it, then co-edit `plan.md` so the understanding becomes a kept artifact.

**Block 9: Project and wrap (5 min)**
- You'll walk through the project brief — hardening a Claude-powered feature in your Week 1 AI Anki fork — and the assessment, including the one-line reliability check. Q&A.

### What you'll see demonstrated live
- A live Claude API call from the AI Anki repo.
- A classification prompt that visibly improves across three versions (v1 a wish, v2 role+format, v3 +example).
- A JSON schema enforcing structured output via `output_config.format`, and the four ways "give me JSON" breaks (preamble, markdown fence, wrong type, out-of-enum value).
- A cost counter printing tokens and dollars per call, plus the live token-cost calculator across model tiers.
- A `plan.md` written for the feature and handed to Claude Code as the brief; Claude Cowork used to map the feature onto the seven-step loop.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: Prompt design and iteration (1.5 to 2 hrs)
- **Goal:** improve a prompt across versions and measure the change, on a real Anki feature.
- **Start here:** take the prompt inside your AI Anki fork's Claude-powered feature (or write one that tags a question by topic and difficulty) and improve it across three versions — v1 a bare ask, v2 with a role and explicit output format, v3 with one worked example — keeping notes on what changed the output for the same inputs.
- **Read:** Anthropic prompt engineering overview - https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- **Ask AI (paste into Claude):** "I want to treat this prompt like engineering. Here is version 1: [paste]. Critique it for ambiguity, missing constraints, and missing examples. Propose version 2, explain each change, and tell me what test inputs would reveal whether version 2 is actually better."

### Topic B: Reliable structured output (1.5 to 2 hrs)
- **Goal:** get guaranteed-valid JSON and see where naive prompting breaks.
- **Start here:** make your Anki feature return strict JSON the naive way, then feed it three odd inputs (an empty string, a question in Malay, a prompt-injection attempt) and watch the JSON break — a preamble sentence, a markdown code fence, a number where a string-enum belongs, or a topic outside your allowed set. Then switch to structured outputs (`output_config.format` with a `json_schema`) and see which breakages the schema eliminates and which your validation has to catch.
- **Read:** Claude API "Structured outputs" - https://platform.claude.com/docs/en/build-with-claude/structured-outputs and the Anthropic cookbook, "Extracting structured JSON" - https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/extracting_structured_json.ipynb
- **Ask AI (paste into Claude):** "Explain the difference between asking a model nicely for JSON and using structured outputs with a schema. Show me a Python example calling the Claude API with a JSON schema for an object with fields topic (enum) and difficulty (enum). Then show me what happens to invalid input and how the schema protects me."

### Topic C: Token economics and cost (1 to 1.5 hrs)
- **Goal:** compute cost per call from real usage numbers and reason about it at scale.
- **Start here:** read `response.usage.input_tokens` and `response.usage.output_tokens` off a real call to your feature, then compute cost with current pricing (per 1M tokens: Claude Haiku 4.5 $1 in / $5 out, Claude Sonnet 4.6 $3 / $15, Claude Opus 4.8 $5 / $25) and multiply out to a million calls a day. Remember output tokens cost 5× input on every tier.
- **Try it:** open the live token-cost calculator on the Week 4 slides, load a scenario, switch the model from Haiku to Sonnet to Opus to see the monthly bill move, then plug in your own measured numbers.
- **Read:** the Claude pricing and token-counting docs (search "Claude API pricing" and "token counting" in the Anthropic docs).
- **Ask AI (paste into Claude):** "My feature sends about [N] input tokens and gets about [M] output tokens per call. Walk me through how to calculate the cost per call, the cost for a million calls a day on Haiku 4.5, Sonnet 4.6, and Opus 4.8, and which design choices (shorter prompts, smaller model, caching) would move that number the most."

### Topic D: Handling non-determinism (1 hr)
- **Goal:** write code that survives a varying model response.
- **Start here:** call the same prompt five times against your Anki feature, log the five responses, and write code that handles the variation gracefully — validate against your schema, retry with backoff feeding the validation error back, fall back to a safe default, and log the raw response when something is unusable.
- **Ask AI (paste into Claude):** "Here is my code that calls a model and parses the result: [paste]. It assumes the response is always well-formed. Show me how to make it robust: validation, retries with backoff, a fallback path, and clear logging when the model returns something unusable."

### Topic E: Plan in markdown, build with AI tools (1 to 1.5 hrs)
- **Goal:** make markdown your planning surface for AI work, and use AI collaboration tools to understand an LLM feature before and while you build it.
- **Why markdown:** `.md` is the shared language between you and your AI tools. CLAUDE.md briefs the agent, README.md briefs humans, and a `plan.md` / `spec.md` is where you think before you code. A plan written in markdown is versionable, reviewable in a PR, and directly readable by Claude Code — so the plan becomes the brief.
- **Start here:** before touching your Anki feature, write a `plan.md` in the repo with five short sections — Goal, Output schema, Prompt versions to try, Failure modes to handle, Cost target. Commit it. Hand that `plan.md` to Claude Code as the brief and review its diff against your own plan.
- **Use Claude Cowork to understand the feature:** open your feature's code and prompt in Claude Cowork (Anthropic's collaborative AI workspace — a shared document you and Claude edit together, not a throwaway chat) and co-work through it — ask it to map your code onto the seven-step LLM loop (input, prompt assembly, model call, parse, validate, act, handle failure), to draft the JSON schema, and to list the inputs most likely to break it. Co-edit the `plan.md` with it so the understanding becomes a written artifact, not a chat you lose.
- **Read:** Claude Code memory / CLAUDE.md docs - https://code.claude.com/docs/en/memory ; and skim the Claude Cowork overview in the product docs to see how a shared workspace differs from a one-off chat.
- **Ask AI (paste into Claude Code or Claude Cowork):** "Here is my LLM feature's code and prompt: [paste]. Map it onto the seven-step production loop (input, prompt assembly, model call, parse, validate, act, handle failure) and tell me which steps are missing or weak. Then draft a plan.md with sections for Goal, Output schema, Prompt versions, Failure modes, and Cost target that I can commit and hand back to you as the brief."

---

## 3. Weekly Project

### Brief
Go back to your Week 1 AI Anki fork (`training-ai-fde-anki`) and harden one Claude-powered feature into something production-shaped: it returns reliable structured JSON, handles errors, and reports its own cost per call. Harden the existing `/generate` card generator, or add a `/tag` endpoint that classifies a question by topic and difficulty (the example built live in class). If you genuinely cannot use the Anki repo, any Pandai-flavoured task with a schema of at least two meaningful fields is an acceptable fallback.

Plan it in markdown first: write a `plan.md` in the repo (Goal, Output schema, Prompt versions, Failure modes, Cost target) and commit it — it doubles as the brief you hand to Claude Code.

### Requirements (checklist)
- [ ] You wrote and committed a `plan.md` before coding.
- [ ] The feature returns structured JSON that conforms to a schema you define.
- [ ] It handles bad or surprising input without crashing (empty string, wrong language, malformed model response).
- [ ] It reports its own cost per call (tokens in, tokens out, dollars) read from `response.usage`.
- [ ] It includes a retry or fallback for a failed or malformed response.
- [ ] It ships as a clean PR into your fork, with a test for the new behaviour (the Week 1 workflow).

### Reliability check (include in submission)
- One line: name one input that would make your feature produce wrong or malformed output, and what catches it.

### Suggested steps
1. Write the `plan.md` (use Claude Cowork to map the existing feature onto the seven-step loop first, if it helps).
2. Define the output schema.
3. Write the prompt; iterate it across at least two versions.
4. Switch from free-text parsing to structured outputs (`output_config.format`).
5. Add error handling, retries, and a cost counter.
6. Test against a handful of awkward inputs and record what happens; add a test; open the PR.

### Deliverables
- The PR (merged or open) with the working feature and its test.
- The `plan.md`.
- A short cost note: cost per call and what drives it, with the per-call number for at least two model tiers.

### Stretch (optional)
- Add prompt caching or drop to a smaller model (Haiku 4.5) for part of the work and measure the cost difference.
- Use Claude Cowork to write up what you learned about the feature's failure modes.

---

## 4. Submittable Assessment

### What to submit
- The PR link (the hardened Anki feature plus its test).
- The `plan.md`.
- The short cost note.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** reliability of the structured output and quality of error handling.
- **Handling ambiguity and failure (30%):** how the feature behaves on awkward input.
- **Communication (25%):** can you explain the cost behaviour of your feature clearly, including the cost difference between model tiers.
- **Ownership (15%):** did you plan it in markdown, iterate the prompt, and test the failure paths, or stop at the first working call.

### Definition of done
Your feature returns schema-valid JSON on good input, fails gracefully on bad input, ships as a clean PR with a test, and you can state its cost per call and what would change it.
