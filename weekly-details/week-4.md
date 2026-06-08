# Week 4: LLM Application Patterns

**Phase:** 2, AI Application Engineering
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Explain how LLM applications work in production.
- Treat prompting as engineering, not guesswork.
- Get reliable structured output from a model.
- Reason about cost, latency, and non-determinism.

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
- Token economics: input tokens, output tokens, and where the cost actually lands.
- You'll see the cost per call of the feature measured, then multiplied to Pandai scale (a million students).
- Model tiers: when Haiku is enough and Opus is overkill.
- The key point: "can you run this cheaply at scale" is the question every customer asks.

**Block 8: Project and wrap (5 min)**
- You'll walk through the project brief and assessment, including the one-line reliability check. Q&A.

### What you'll see demonstrated live
- A live Claude API call from a minimal project scaffold.
- A classification prompt that visibly improves across versions.
- A JSON schema enforcing structured output.
- A cost counter printing tokens and dollars per call.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: Prompt design and iteration (1.5 to 2 hrs)
- **Goal:** improve a prompt across versions and measure the change.
- **Start here:** write a prompt that classifies a question's topic, then improve it across three versions, keeping notes on what changed the output.
- **Read:** Anthropic prompt engineering overview - https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- **Ask AI (paste into Claude):** "I want to treat this prompt like engineering. Here is version 1: [paste]. Critique it for ambiguity, missing constraints, and missing examples. Propose version 2, explain each change, and tell me what test inputs would reveal whether version 2 is actually better."

### Topic B: Reliable structured output (1.5 to 2 hrs)
- **Goal:** get guaranteed-valid JSON and see where naive prompting breaks.
- **Start here:** make the model return strict JSON, then feed it three odd inputs and see where the JSON breaks; then switch to structured outputs.
- **Read:** Claude API "Structured outputs" - https://platform.claude.com/docs/en/build-with-claude/structured-outputs and the Anthropic cookbook, "Extracting structured JSON" - https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/extracting_structured_json.ipynb
- **Ask AI (paste into Claude):** "Explain the difference between asking a model nicely for JSON and using structured outputs with a schema. Show me a Python example calling the Claude API with a JSON schema for an object with fields topic (string) and difficulty (enum). Then show me what happens to invalid input and how the schema protects me."

### Topic C: Token economics and cost (1 to 1.5 hrs)
- **Goal:** compute cost per call and reason about it at scale.
- **Start here:** compute the cost per call of your feature, then multiply it out to a million students.
- **Read:** the Claude pricing and token-counting docs (search "Claude API pricing" and "token counting" in the Anthropic docs).
- **Ask AI (paste into Claude):** "My feature sends about [N] input tokens and gets about [M] output tokens per call. Walk me through how to calculate the cost per call, the cost for a million calls a day, and which design choices (shorter prompts, smaller model, caching) would move that number the most."

### Topic D: Handling non-determinism (1 hr)
- **Goal:** write code that survives a varying model response.
- **Start here:** call the same prompt five times and write code that handles the variation gracefully.
- **Ask AI (paste into Claude):** "Here is my code that calls a model and parses the result: [paste]. It assumes the response is always well-formed. Show me how to make it robust: validation, retries with backoff, a fallback path, and clear logging when the model returns something unusable."

---

## 3. Weekly Project

### Brief
Build a small LLM feature on the Claude API that returns reliable structured JSON, handles errors, and reports its own cost per call. Pick a Pandai-flavoured task, for example tagging a question by topic and difficulty.

### Requirements (checklist)
- [ ] The feature returns structured JSON that conforms to a schema you define.
- [ ] It handles bad or surprising input without crashing.
- [ ] It reports its own cost per call (tokens in, tokens out, dollars).
- [ ] It includes basic retry or fallback logic for a failed or malformed response.

### Reliability check (include in submission)
- One line: name one input that would make your feature produce wrong or malformed output, and what catches it.

### Suggested steps
1. Define the task and the output schema.
2. Write the prompt; iterate it across at least two versions.
3. Switch from free-text parsing to structured outputs.
4. Add error handling, retries, and a cost counter.
5. Test against a handful of awkward inputs and record what happens.

### Deliverables
- The working feature (code).
- A short cost note: cost per call and what drives it.

### Stretch (optional)
- Add prompt caching or a smaller model for part of the work and measure the cost difference.
- **AI Anki option:** build this feature into your Week 1 AI Anki fork by hardening its `/generate` endpoint — structured outputs, cost per call, and retries.

---

## 4. Submittable Assessment

### What to submit
- The working feature and the short cost note.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** reliability of the structured output and quality of error handling.
- **Handling ambiguity and failure (30%):** how the feature behaves on awkward input.
- **Communication (25%):** can you explain the cost behaviour of your feature clearly.
- **Ownership (15%):** did you iterate the prompt and test the failure paths, or stop at the first working call.

### Definition of done
Your feature returns schema-valid JSON on good input, fails gracefully on bad input, and you can state its cost per call and what would change it.
