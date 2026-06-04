# Week 3: Deploy, Observe, Recover

**Phase:** 1, Production Engineering Foundations
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

> Heaviest week of Phase 1. The intern picks one path, AWS or Cloudflare, not both. The other is shown in class but not required for the build.

## Learning objectives

By the end of the week the intern can:

- Take a service from local to live on AWS or Cloudflare.
- Expose a working API endpoint and keep config and secrets out of the code.
- Know when a service is broken and why, using logs and metrics.
- Diagnose and recover from a failure they caused on purpose.

---

## 1. Taught Class (90 minutes)

> Purpose: show how a service goes live, how you know when it breaks, and how you recover, ending with a live incident the class diagnoses together. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "Deploy, Observe, Recover."
- One line: shipping is not the finish line. The job is keeping it alive and knowing the moment it is not.

**Block 2: What "live" actually means (8 min)**
- Local vs a real environment: who can reach it, what can change underneath it.
- The pieces: a build artifact, an environment, configuration, secrets, a public endpoint.
- Talking point: the demo runs on your laptop. Production runs where you are not watching.

**Block 3: Containers and environments (10 min)**
- Why containers: the same thing runs the same way everywhere.
- Environments and why you separate them: dev, staging, prod.
- Live: show a small service and its container definition.

**Block 4: Configuration and secrets (10 min)**
- The rule: nothing secret in the code, nothing environment-specific hardcoded.
- Environment variables and secret stores.
- Live: move one hardcoded value into an environment variable and redeploy.
- Talking point: a secret in git history is a secret forever. Treat it as already leaked.

**Block 5: Two paths to live (14 min)**
- Path A, AWS: a small service on managed compute (for example a container service or a serverless function).
- Path B, Cloudflare: a Worker on the edge with Wrangler.
- When the edge is the right choice: low latency, light compute, global reach. When it is not: heavy compute, long-running jobs.
- Live: deploy a hello-world on both, hit the public URL.

**Block 6: Observability (12 min)**
- Logs, metrics, and the difference. Logs tell you what happened; metrics tell you how often and how bad.
- What to log and what not to (never log secrets or personal data).
- Live: open the logs of the deployed service and read a real request.

**Block 7: The live incident (14 min)**
- Live: break the service on purpose (a bad config, a missing env var, a thrown error).
- The class diagnoses it together using only the logs and metrics, not the source.
- Walk the recovery: form a hypothesis, check the logs, fix, redeploy, confirm.
- Talking point: stay calm and read. The logs almost always told you already.

**Block 8: API design in one slide (5 min)**
- A clean endpoint: clear inputs, clear outputs, sensible status codes.
- This is what your project's service will expose.

**Block 9: Project and wrap (4 min)**
- Walk the project brief and assessment. Q&A.

### Live demo checklist for the instructor
- A small service deployable to both AWS and Cloudflare.
- The ability to break it live (toggle a bad env var or config).
- Access to the logs and metrics dashboards for both paths.

---

## 2. Self-Learn (6 to 8 hours)

Pick one path, AWS or Cloudflare, for the hands-on work. Read enough about the other to know when you would choose it.

### Topic A: Cloud basics on your chosen path (2 hrs)
- **Goal:** deploy a hello-world and reach it from a browser.
- **Start here:** deploy the provided hello-world service to your chosen platform and open its URL.
- **Cloudflare path, read:** "Get started - CLI" - https://developers.cloudflare.com/workers/get-started/guide/ and "First Worker" learning path - https://developers.cloudflare.com/learning-paths/workers/get-started/first-worker/
- **Cloudflare path, watch:** "Cloudflare Workers Tutorial - Intro & Deployment" - https://www.youtube.com/watch?v=1gX0uavithA (fallback search: "Cloudflare Workers deploy tutorial").
- **AWS path, read:** the official AWS getting-started guide for your chosen compute (search "AWS Lambda getting started" or "AWS App Runner getting started" in the AWS docs at https://docs.aws.amazon.com).
- **Ask AI (paste into Claude):** "I am deploying my first service to [AWS or Cloudflare]. Explain the deployment model in plain terms, the minimum steps from local code to a public URL, and the three mistakes beginners most often make. Then give me a checklist I can follow."

### Topic B: API design and integration patterns (1 to 1.5 hrs)
- **Goal:** add one clean endpoint to the sample service.
- **Start here:** add an endpoint that takes an input and returns a structured response, and document its inputs and outputs.
- **Ask AI (paste into Claude):** "Review this endpoint I wrote: [paste]. Critique the input validation, the response shape, the status codes, and the error handling against production norms. Show me a cleaner version and explain each change."

### Topic C: Reading logs and metrics (1.5 hrs)
- **Goal:** find a failure in the logs without reading the source.
- **Start here:** trigger an error on purpose in your deployed service, then find it in the logs.
- **Read:** your platform's logging docs (Cloudflare "Workers logs and observability", or AWS CloudWatch logs basics).
- **Ask AI (paste into Claude):** "Here is a chunk of logs from my service around the time it failed: [paste]. Walk me through how to read these, what signals point to the root cause, and what I would check next. Do not assume you can see the source code; reason from the logs."

### Topic D: Config, secrets, and environment variables (1 hr)
- **Goal:** keep secrets and environment-specific values out of the code.
- **Start here:** move one hardcoded value into an environment variable and confirm the service still runs.
- **Ask AI (paste into Claude):** "Explain the difference between configuration, environment variables, and secrets for a deployed service. Show me how to manage each on [AWS or Cloudflare], and give me a rule of thumb for deciding which bucket a given value belongs in."

---

## 3. Weekly Project

### Brief
Deploy a small service that exposes an API endpoint, break it on purpose, and recover it using only logs and metrics.

### Requirements (checklist)
- [ ] Deploy a small service to AWS or Cloudflare with a public URL.
- [ ] The service exposes at least one API endpoint.
- [ ] Config and secrets are kept out of the code (environment variables or a secret store).
- [ ] Break it intentionally (a bad config, a missing variable, or a thrown error).
- [ ] Diagnose and fix it using only logs and metrics, not by re-reading the code first.
- [ ] Document the incident: what broke, how you found it, how you fixed it.

### Suggested steps
1. Deploy the hello-world, confirm the URL works.
2. Add your endpoint and move any secrets to env vars; redeploy.
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
