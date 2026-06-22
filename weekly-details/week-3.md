# Week 3: Deploy, Observe, Recover

**Phase:** 1, Production Engineering Foundations
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

> Heaviest week of Phase 1. In the live class you watch a real app — the **AI Anki** repo you fixed in Week 1 — go live on **AWS**, break, and recover. On your own you then learn **Cloudflare**, the edge platform, by deploying a lightweight service there. You see one platform demonstrated and self-learn the other, so you finish the week understanding the tradeoff between heavy managed compute (AWS) and the edge (Cloudflare).

## Learning objectives

By the end of the week you can:

- Take a service from local to live on AWS (seen live) or Cloudflare (self-learned).
- Expose a working API endpoint and keep config and secrets out of the code.
- Know when a service is broken and why, using logs and metrics.
- Diagnose and recover from a failure you caused on purpose.
- Reason about which platform fits a workload — long-running stateful compute vs the edge.

---

## 1. Taught Class (90 minutes)

> Purpose: show you how a service goes live, how you know when it breaks, and how you recover — by deploying the course's own **AI Anki** app to **AWS** and then breaking it live for the class to diagnose together. This outline is the brief for the slide deck. The deploy is driven by the runbook in the AI Anki repo: `DEPLOY.md`.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "Deploy, Observe, Recover."
- One line: shipping is not the finish line. The job is keeping it alive and knowing the moment it is not.

**Block 2: What "live" actually means (8 min)**
- Local vs a real environment: who can reach it, what can change underneath it.
- The pieces: a build artifact, an environment, configuration, secrets, a public endpoint.
- The key point: the demo runs on your laptop. Production runs where you are not watching.

**Block 3: Containers and environments (10 min)**
- Why containers: the same thing runs the same way everywhere. AI Anki ships as a container image; you'll see its `deploy/Dockerfile`.
- Environments and why you separate them: dev, staging, prod.
- The container image is the build artifact we push to AWS.

**Block 4: Configuration and secrets (10 min)**
- The rule: nothing secret in the code, nothing environment-specific hardcoded.
- Environment variables and secret stores.
- Live with AI Anki: its `ANTHROPIC_API_KEY` is never in the image or git (`.dockerignore` keeps `.env` out) — it's injected as a Lambda environment variable at deploy time.
- The key point: a secret in git history is a secret forever. Treat it as already leaked.

**Block 5: Two platforms, pick the right one (14 min)**
- The choice is the engineering decision: AI Anki is a Python FastAPI server with a SQLite file — stateful, long-running compute. That's why the live deploy goes to **AWS**, not the edge.
- Path A, AWS (demonstrated live): AI Anki on **Lambda as a container image + a public Function URL**, using the AWS Lambda Web Adapter so the unmodified FastAPI app runs as-is. All inside the AWS free tier.
- Path B, Cloudflare (you'll self-learn): a Worker on the edge with Wrangler — low latency, light compute, global reach, but no Python server and no local filesystem.
- When the edge is the right choice and when it is not: light, stateless, latency-sensitive work fits Cloudflare; heavy, stateful, or long-running work fits AWS.
- You'll see AI Anki deployed to AWS live, with its public URL hit from a browser.

**Block 6: Observability (12 min)**
- Logs, metrics, and the difference. Logs tell you what happened; metrics tell you how often and how bad.
- What to log and what not to (never log secrets or personal data).
- You'll open AI Anki's **CloudWatch** logs and read a real request, then look at the Lambda Monitor tab (invocations, errors, duration) for the metrics view.

**Block 7: The live incident (14 min)**
- AI Anki gets broken on purpose: we remove its `ANTHROPIC_API_KEY` environment variable (a secret that "got lost in a redeploy"), then call its Claude-powered `/generate` endpoint.
- You'll diagnose it together with the class using only the CloudWatch logs and the HTTP status, not the source. AI Anki surfaces a clean `503` with an `AINotConfigured` signal that points straight at configuration.
- You'll walk the recovery: form a hypothesis, check the logs, fix (re-add the env var), redeploy, confirm.
- The key point: stay calm and read. The logs almost always told you already.

**Block 8: API design in one slide (5 min)**
- A clean endpoint: clear inputs, clear outputs, sensible status codes. AI Anki's endpoints are the worked example.
- This is what your project's service will expose.

**Block 9: Project and wrap (4 min)**
- You'll walk through the project brief and assessment. Q&A.

### What you'll see demonstrated live
- The AI Anki repo deployed to AWS Lambda from a container image, reachable at a public Function URL.
- That service broken live — its `ANTHROPIC_API_KEY` removed on a redeploy.
- The CloudWatch logs and the Lambda metrics dashboard used to diagnose and confirm the recovery.

---

## 2. Self-Learn (6 to 8 hours)

You saw **AWS** demonstrated live with AI Anki. Now do the hands-on yourself on **Cloudflare** — the edge platform — so you've touched both. Deploy a lightweight hello-world Worker, give it an endpoint, read its logs, and manage its secrets. Read enough about AWS (you already watched it) to articulate when you'd pick it over the edge.

### Topic A: Cloud basics on Cloudflare (2 hrs)
- **Goal:** deploy a hello-world Worker and reach it from a browser.
- **Start here:** install Wrangler, deploy the starter Worker, and open its `*.workers.dev` URL.
- **Read:** "Get started - CLI" - https://developers.cloudflare.com/workers/get-started/guide/ and the "First Worker" learning path - https://developers.cloudflare.com/learning-paths/workers/get-started/first-worker/
- **Watch:** "Cloudflare Workers Tutorial - Intro & Deployment" - https://www.youtube.com/watch?v=1gX0uavithA (fallback search: "Cloudflare Workers deploy tutorial").
- **Compare with what you saw:** skim the AWS Lambda getting-started guide (https://docs.aws.amazon.com — search "AWS Lambda getting started") so you can say, in one sentence, why AI Anki went to AWS and not to a Worker.
- **Ask AI (paste into Claude):** "I am deploying my first Cloudflare Worker. Explain the edge deployment model in plain terms, the minimum steps from local code to a public URL with Wrangler, and the three mistakes beginners most often make. Then contrast it with deploying a stateful Python server to AWS Lambda, and give me a rule of thumb for choosing between them."

### Topic B: API design and integration patterns (1 to 1.5 hrs)
- **Goal:** add one clean endpoint to your Worker.
- **Start here:** add an endpoint that takes an input and returns a structured JSON response, and document its inputs and outputs.
- **Ask AI (paste into Claude):** "Review this endpoint I wrote: [paste]. Critique the input validation, the response shape, the status codes, and the error handling against production norms. Show me a cleaner version and explain each change."

### Topic C: Reading logs and metrics (1.5 hrs)
- **Goal:** find a failure in the logs without reading the source.
- **Start here:** trigger an error on purpose in your Worker, then find it using `wrangler tail` and the Workers dashboard.
- **Read:** Cloudflare "Workers logs and observability" - https://developers.cloudflare.com/workers/observability/logs/ (and recall the CloudWatch view you saw for AI Anki — same idea, different platform).
- **Ask AI (paste into Claude):** "Here is a chunk of logs from my service around the time it failed: [paste]. Walk me through how to read these, what signals point to the root cause, and what I would check next. Do not assume you can see the source code; reason from the logs."

### Topic D: Config, secrets, and environment variables (1 hr)
- **Goal:** keep secrets and environment-specific values out of the code.
- **Start here:** move one hardcoded value into a Worker secret with `wrangler secret put` and confirm the service still runs.
- **Read:** Cloudflare "Secrets" - https://developers.cloudflare.com/workers/configuration/secrets/
- **Ask AI (paste into Claude):** "Explain the difference between configuration, environment variables, and secrets for a deployed service. Show me how to manage each on Cloudflare Workers (vars vs secrets) and how the same job is done on AWS Lambda, and give me a rule of thumb for deciding which bucket a given value belongs in."

---

## 3. Weekly Project

### Brief
Deploy a small service that exposes an API endpoint, break it on purpose, and recover it using only logs and metrics. Pick the platform that fits what you're deploying.

### Requirements (checklist)
- [ ] Deploy a small service to AWS or Cloudflare with a public URL.
- [ ] The service exposes at least one API endpoint.
- [ ] Config and secrets are kept out of the code (environment variables or a secret store).
- [ ] Break it intentionally (a bad config, a missing variable, or a thrown error).
- [ ] Diagnose and fix it using only logs and metrics, not by re-reading the code first.
- [ ] Document the incident: what broke, how you found it, how you fixed it.
- [ ] State which platform you chose and why (one or two sentences).

### Suggested steps
1. Deploy the hello-world, confirm the URL works.
2. Add your endpoint and move any secrets to env vars / secrets; redeploy.
3. Confirm you can see logs and metrics for live requests.
4. Break it on purpose and write down the exact change you made.
5. From the logs alone, form a hypothesis, fix, redeploy, confirm recovery.
6. Write the incident report.

### Deliverables
- The live URL.
- The repo.
- A short incident write-up: timeline, symptom, diagnosis from logs, fix, confirmation.

### Stretch (optional)
- Add a basic health-check endpoint and a metric or alert that would have caught the break.
- **AI Anki option (the recommended path):** deploy your Week 1 AI Anki fork to **AWS** as the service for this exercise instead of a hello-world. The repo ships a complete runbook — `DEPLOY.md` plus `deploy/aws-deploy.sh` — that mirrors exactly what you saw in class (Lambda container, Function URL, CloudWatch, the `ANTHROPIC_API_KEY` break). This is the closest thing to the real on-call loop and the strongest submission.

---

## 4. Submittable Assessment

### What to submit
- The live URL, the repo, and the incident write-up.

### Presentation
- A 5 minute live demo where you break the service on purpose and recover it in front of the class, narrating what the logs are telling you.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** the service deploys, the endpoint works, secrets are not in the code.
- **Handling ambiguity and failure (30%):** how calmly and methodically you diagnose the break from logs.
- **Communication (25%):** the incident write-up and the live narration.
- **Ownership (15%):** did you drive the recovery yourself.

### Definition of done
You can break your own service live, and within a few minutes find the cause in the logs and bring it back, while explaining each step to the room.
