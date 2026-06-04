# Pandai AI Forward Deployed Engineer Internship

## A 12-Week Cohort Program for Fresh Graduates (v2)

A hybrid, reusable cohort program that takes fresh computer science and engineering graduates through a real Pandai internship and turns them into deployable AI Forward Deployed Engineers. Claude is the primary model. The toolchain mirrors what Pandai actually uses in the field: Claude Code, Google Workspace and Gemini, N8N, Visual Studio Code, Conductor, AWS, Cloudflare, and GitHub.

> This is version 2. It keeps the philosophy of the original and tightens the delivery: honest time budget, de-loaded Week 1, tools introduced in sequence, a reliability check on every AI deliverable, dedicated weeks on MCP (Week 6) and N8N automation (Week 7), capstone scoping started in Week 10, a mid-course checkpoint, and a rubric split across assessors with concrete anchors.

---

## 1. Why This Course Exists

Most software does not fail in development. It fails in deployment. The demo works. Then it breaks inside the customer's real, messy environment, with their dirty data, their locked-down network, and their half-documented systems.

The Forward Deployed Engineer exists to close that gap. The FDE embeds with the customer, builds production-grade solutions in place, and stays until they actually work. The role is three jobs in one: part engineer, part consultant, part product manager.

For a fresh graduate, the technical gap is closable in weeks. The harder gap is the FDE craft. Staying calm inside broken systems. Turning a vague business problem into a concrete plan. Owning delivery end to end. Talking to a customer without hiding behind a screen. Supervising the AI agents that now do much of the building. This course weights heavily toward that craft, because it is what degrees and bootcamps skip.

Four muscles run through every single week.

1. Ship production work, not coursework.
2. Stay functional inside ambiguous, broken, incomplete systems.
3. Translate between human problems and technical plans, then defend the call to a customer.
4. Supervise the AI agents that do the work — brief them, review their output, guardrail them, and never blindly trust them.

An intern who finishes strong on muscle one but weak on the rest is not field-ready. The whole design builds all four at once.

---

## 2. Who This Is For

Fresh computer science or engineering graduates with a solid academic base and little or no production experience. They can write code. They have not yet shipped something real users depend on, debugged a live outage, or explained a technical tradeoff to a non-technical stakeholder.

No AI or machine learning background is required. The course builds it.

### Cohort size and shape

This is a high-touch program, so the cohort is deliberately small.

- Target cohort: 3 to 6 interns. Below 3 the group drills lose their value. Above 6 the mentorship thins out.
- Every intern is paired with one mentor for the whole program (see Section 9).
- Group mechanics (scoping drills, peer demos, debriefs) assume the whole cohort is in the room together for the Monday class.
- If the cohort is a single intern, the mentor or another team member plays the second voice in scoping drills and mock-customer roles so the craft practice still works.

### What an intern can do by the end

- Read and contribute to a large unfamiliar codebase without freezing.
- Build, deploy, observe, and recover a production service on AWS or Cloudflare.
- Query, clean, and move real data with confidence.
- Build reliable LLM applications: structured output, RAG, and tool calling through MCP.
- Automate real workflows with N8N and connect AI into them.
- Choose the right model for a task on cost, latency, and quality grounds.
- Scope a vague business problem into a concrete technical plan.
- Integrate into systems they do not control.
- Present a technical recommendation to a mixed audience and earn trust.
- Own a real Pandai deployment end to end, including the moment it breaks.

---

## 3. The Toolchain

Interns work in the real Pandai stack. Tools are introduced in sequence, not all at once, so nobody drowns in setup. The "introduced in" column says when each tool first appears as something the intern must use.

| Tool | Role in the course | Introduced in |
|------|--------------------|---------------|
| Visual Studio Code | The main editor and integrated workspace | Week 0 |
| GitHub | Version control, pull requests, code review, GitHub Actions for CI/CD | Week 1 |
| Claude Code | Primary coding and debugging partner, in the terminal and inside VS Code | Week 1 |
| SQL and Google Sheets / Gemini | Querying and cleaning real data, with a quick non-technical view | Week 2 |
| AWS | Cloud deployment, compute, storage, and serverless | Week 3 |
| Cloudflare | Edge deployment, Workers, and lightweight hosting | Week 3 |
| Claude API | The model layer interns build their applications on | Week 4 |
| Vector store | Embeddings and similarity search for retrieval | Week 5 |
| MCP | The standard protocol for connecting models to tools and data | Week 6 |
| Conductor | Running and orchestrating multiple Claude Code agents in parallel | Week 6 |
| N8N | Workflow automation and the integration backbone for AI features | Week 7 |
| Google Workspace and Gemini | Scoping write-ups, slides, and a quick non-technical view | Week 8 onward |

### Why Conductor and parallel agents arrive in Week 6, not Week 1

Orchestrating multiple agents is an advanced move. It only pays off once an intern has real parallel work and can already judge when a single agent is wrong. In Week 1 they drive one agent on one task so they build that judgment first. Conductor lands in Week 6, when agentic work gives them something genuine to parallelise.

### The role of Claude and choosing models

Claude is the primary model so interns go deep on one strong, well-documented platform rather than spreading thin. They use it three ways. As a coding partner through Claude Code. As the model they build applications on through the Claude API. As a thinking partner for scoping, writing, and learning.

The current Claude family is organised in tiers, and interns learn to choose between them rather than always reaching for the biggest.

- Opus tier: the most capable, for complex reasoning and long-horizon agentic work. Claude Opus 4.8 is the most capable model as of mid 2026.
- Sonnet tier: the balanced default for most development, analysis, and application work.
- Haiku tier: fast and cheap, for high-volume, latency-sensitive, simple tasks.

Model names change over time, so interns learn the tier principle, not a fixed version. Choosing the right model for the task matters more than always picking the most powerful one. This maps directly to what a Pandai customer will ask: can you run this cheaply at the scale of two million students.

### Build the judgment, not just the reflex

Claude Code is in the intern's hands from Week 1, which is a risk: an intern who never struggles without the agent never learns to supervise it. So Week 1 includes one deliberate "no agent" debugging rep. The intern fixes one bug by hand, reading the code and the stack trace themselves, before they are allowed to point Claude Code at it. The point is not to slow them down. It is to make sure that when the agent is confidently wrong in the field, they can tell.

---

## 4. Format and Time Commitment

Every week has the same four parts.

1. **Taught class:** one live or online session, about 90 minutes, usually Monday afternoon. Taught by you or another Pandai team lead. The synchronous anchor for demos, code review, scoping drills, and questions. Short on purpose.
2. **Self-learn:** 6 to 8 hours of self-paced learning and exploration. Every week gives a clear set of things to explore and a concrete starting point or example, so the intern is never staring at a blank page.
3. **Weekly project:** one shippable deliverable.
4. **Submittable assessment:** a mix of presentation (recorded or live) and written or project submission.

### Honest weekly time budget

| Part | Time |
|------|------|
| Taught class | 1.5 hrs |
| Self-learn | 6 to 8 hrs |
| Weekly project (the build) | 6 to 8 hrs |
| Assessment (write-up and presentation prep) | 2 to 3 hrs |
| **Total** | **~16 to 20 hrs per week** |

This is a serious part-time commitment, around 20 hours in the heavier weeks. The class is short so the real learning happens in the self-paced build, where interns hit walls and climb them. The class exists to unblock, demonstrate, and pressure-test, not to lecture.

### Who owns each week

The teaching bench is you plus Pandai team leads (Project Manager, Product Manager, AI Engineer), with Claude as the always-on tutor during self-learn. Ownership maps to expertise.

| Week | Theme | Class owner |
|------|-------|-------------|
| 0 | Setup and diagnostic | You + AI Engineer |
| 1 | Coursework to production | AI Engineer |
| 2 | Data fluency | AI Engineer |
| 3 | Deploy, observe, recover | AI Engineer |
| 4 | LLM application patterns | AI Engineer |
| 5 | Retrieval and grounding | AI Engineer |
| 6 | MCP and tool calling | AI Engineer |
| 7 | Automation with N8N | AI Engineer |
| 8 | Scoping ambiguity | Product Manager |
| 9 | Integration and the messy real world | AI Engineer + Project Manager |
| 10 | Customer communication + capstone scoping | Project Manager + you |
| 11 | Capstone build in place | Mentor + you |
| 12 | Ship and defend | You + full panel |

### Week 0: Setup and diagnostic

Week 0 runs before the cohort officially starts. Its only jobs are to get every tool installed and authenticated so nobody loses Week 1 to a broken environment, to stand up the one place every assessment is submitted (a public GitHub repository), and to take a light, ungraded reading of where the cohort actually starts. Budget about 3 to 4 hours for the full setup and roughly 1 hour for the diagnostic. Work top to bottom; each step has a download location and a one-line check that proves it worked.

#### The submission repository (do this first, everything else hangs off it)

Every weekly assessment in this course is submitted on your own GitHub. You create one public repository, named exactly `training-ai-fde`, and it becomes the home for all twelve weeks of work. This mirrors how an FDE actually works: your output lives in version control, in the open, where a reviewer can read it without you in the room.

1. **Create a GitHub account** (skip if you have one). Go to https://github.com/signup, use a professional username (it will be visible to assessors and, later, customers), and verify your email.
2. **Turn on two-factor authentication.** GitHub requires it for contributors. Settings → Password and authentication → Two-factor authentication, and use an authenticator app (Google Authenticator, Authy, or 1Password).
3. **Create the repository.** Go to https://github.com/new and set:
   - **Repository name:** `training-ai-fde` (exactly this, lowercase).
   - **Visibility:** **Public.** This is required — the program and your peers must be able to read it.
   - **Initialize with a README** so the repo is not empty.
   Your repo URL will look like `https://github.com/<your-username>/training-ai-fde` — for example, https://github.com/akmalakhpah/training-ai-fde.
4. **Structure it for the course.** Create one folder per week so submissions stay organised: `week-01/`, `week-02/`, and so on. Put each week's deliverable, write-up, and links in its week folder. Keep the README as an index that links to each week.
5. **Send the program your repo URL** in the Week 0 onboarding form so assessors can find it. From here on, "submit" means: push to this repo, then share the link (a file, a folder, a pull request, or a release tag, as each week specifies).

> Why public: an FDE's work is read by people who were not there when it was written. A public repo forces clean commits, readable READMEs, and honest history from day one. If a specific deliverable contains anything sensitive, raise it with the teaching team rather than making the whole repo private.

#### Core tools — install and verify in order

Install these on your own laptop. macOS and Windows instructions are both given; on Windows, the smoothest path for the command-line tools is WSL2 (Windows Subsystem for Linux), which the AI Engineer can help you enable.

**1. Visual Studio Code (your editor)**
- Download: https://code.visualstudio.com/download — pick your OS.
- macOS: open the `.zip`, drag **Visual Studio Code** into `/Applications`. Windows: run the installer and tick "Add to PATH".
- Verify: open VS Code, press the shortcut to open the integrated terminal (`Ctrl+` backtick), and confirm you get a shell prompt.
- Recommended: install the Python extension and, on Windows, the "WSL" extension from the Extensions panel.

**2. GitHub (version control)**
- macOS: easiest is to run `xcode-select --install`, or install via Homebrew (`brew install git`). Or follow GitHub's install guide at https://github.com/git-guides/install-git.
- Windows: download "Git for Windows" via GitHub from https://github.com/git-for-windows/git/releases and accept the defaults (this also gives you Git Bash).
- Verify: `git --version` prints a version number.
- Configure your identity (uses the email on your GitHub account):
  ```
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```
- Authenticate to GitHub the simple way by installing the GitHub CLI from https://cli.github.com (`brew install gh` on macOS, or the Windows installer), then run `gh auth login` and follow the browser prompt. This lets you `git clone`, `push`, and open pull requests without managing SSH keys by hand.
- Verify the whole chain: `gh repo clone <your-username>/training-ai-fde`, add a file, `git commit`, `git push`, and confirm it appears on github.com.

**3. Python (current stable version)**
- Download: https://www.python.org/downloads/ — install the current stable release (3.12 or newer). On macOS you can also use `brew install python`; on Windows, tick **"Add Python to PATH"** in the installer.
- Verify: `python3 --version` (macOS/Linux) or `python --version` (Windows) prints 3.12+.
- Verify pip: `python3 -m pip --version`.

**4. Node.js (required for Claude Code)**
- Download the **LTS** build from https://nodejs.org/en/download — or use `brew install node` on macOS / the Windows installer.
- Verify: `node --version` (expect v20+) and `npm --version`.

**5. Claude Code (your primary coding partner)**
- Install once Node is working: `npm install -g @anthropic-ai/claude-code` (see https://code.claude.com/docs for the current install command and OS notes).
- Authenticate: run `claude` in any project folder and follow the login prompt, logging in with the **Claude Pro account provided by the program** (see Section 10). Claude Code authenticates by login — there is no API key to enter.
- Verify: inside your `training-ai-fde` folder, run `claude`, ask it "what files are in this repo?", and confirm it answers from the actual files.
- Also install the **Claude Code VS Code extension** from the Extensions panel so you can drive it inside the editor.

**6. Claude Pro account (provided) and, later, your own API key**
- The program provides one thing: a **Claude Pro subscription** for the full course (about 4 months). It is how you log into Claude Code — no API key is needed for Claude Code itself.
- The Claude **API** is separate and used only in the API-building weeks. When a week needs it, create your **own free Anthropic API account** at https://console.anthropic.com and generate a key. Store it in an environment variable, never hard-coded in a file or committed to GitHub. On macOS/Linux add `export ANTHROPIC_API_KEY="..."` to your `~/.zshrc`; on Windows set it via System → Environment Variables (or `setx`).
- Verify: `echo $ANTHROPIC_API_KEY` (macOS/Linux) prints the key; a committed key is a setup failure — it is your own account, so a leak is your security and cost problem. If it ever lands in git history, rotate it and tell the team.

**7. Google account and Gemini**
- Sign in to a **Google account you create yourself** (a free personal account is fine — the program does not provide one). Confirm you can open Google Docs, Sheets, and Slides, and that **Gemini** is available in the side panel. These are used from Week 2 (quick non-technical data view) and heavily from Week 8 onward (scoping write-ups and slides).

**8. AWS and Cloudflare (your own free-tier accounts)**
- The program does **not** provision these — create your **own free-tier accounts** and stay on the free tier (these are your accounts, so there are no central spending caps — watch your own usage). In Week 0 you only need to confirm you can log in:
  - AWS: create and sign in to the console at https://console.aws.amazon.com (free tier); later you'll install the AWS CLI from https://aws.amazon.com/cli/.
  - Cloudflare: create and sign in at https://dash.cloudflare.com (free tier); later you'll use Wrangler (`npm install -g wrangler`) for Workers.
- You actively use only one of these for the Week 3 build (you choose AWS or Cloudflare), but create and log into both now.

**9. Week 1 training repository**
- In Week 0, confirm you can `git clone` the Week 1 training repo (you will not work in it yet) so access problems surface now, not on Day 1. The teaching team shares the repo link in onboarding.

> **Provisioned later, on purpose.** To keep Week 0 light, three tools are set up just before the week that needs them: **the vector store** before Week 5, **Conductor and the MCP SDK** before Week 6, and **N8N** before Week 7. Do not install these in Week 0.

#### Setup checklist (everything above, condensed)

- [ ] GitHub account created, 2FA on, and a **public** repo named `training-ai-fde` initialised with a README and week folders; URL sent to the program.
- [ ] Visual Studio Code installed, terminal works, Python + WSL extensions added.
- [ ] GitHub installed and configured (`user.name`, `user.email`); `gh auth login` done; a test commit pushed to your repo.
- [ ] Python 3.12+ and pip verified.
- [ ] Node.js LTS (v20+) and npm verified.
- [ ] Claude Code installed, authenticated by logging in with the program-provided Claude Pro account, and answering questions about your repo; VS Code extension installed.
- [ ] Your own Google account signed in, with Docs, Sheets, Slides, and Gemini reachable.
- [ ] Your own free-tier AWS and Cloudflare accounts created and logins confirmed.
- [ ] Week 1 training repo clones successfully.
- [ ] (Later, when a week needs the Claude API) your own `ANTHROPIC_API_KEY` set as an environment variable, not committed to git.

#### Diagnostic (about 1 hour, ungraded)

A short coding warm-up plus two or three questions on GitHub, the command line, and reading an unfamiliar function. It is calibration, not a gate — it tells the teaching team where the cohort actually starts so the early weeks can flex. Commit your diagnostic work to a `week-00/` folder in your `training-ai-fde` repo so the setup-to-submission loop is exercised once before Week 1 depends on it.

---

## 5. Course Map

| Phase | Weeks | Focus |
|-------|-------|-------|
| 0. Setup | Week 0 | Tooling, accounts, and a calibration diagnostic |
| 1. Production Engineering Foundations | 1 to 3 | Unlearning coursework habits, learning how code ships and survives |
| 2. AI Application Engineering | 4 to 7 | Building reliable systems on top of unreliable models |
| Mid-course checkpoint | end of Week 7 | Consolidation and a remediation path before the craft phase |
| 3. The FDE Craft | 8 to 10 | Scoping, integration, and customer communication |
| 4. Capstone Embedded Deployment | 11 to 12 | A real Pandai deployment with a real owner and a real deadline |

Two structural notes on Phase 2: it now spends a full week each on MCP (Week 6) and automation with N8N (Week 7), which build into one another, and capstone scoping starts inside Week 10 so Weeks 11 and 12 are pure build and ship.

---

## 6. Weekly Breakdown

---

### Phase 1: Production Engineering Foundations

---

#### Week 1: From Coursework to Production

**Class owner:** AI Engineer

**Learning objectives**
- Understand what separates a student repo from a production system.
- Work confidently inside a large codebase written by other people.
- Drive a single Claude Code agent well from inside VS Code.
- Fix one bug by hand, without the agent, to build supervision judgment.
- Follow a real branching, review, and merge workflow on GitHub.

**Taught class (90 min)**
A guided tour of everything the week asks the intern to do alone. The instructor opens a real internal Pandai service and shows how to read into an unfamiliar codebase: find the entry point, follow one request through to the database and back. Then the production workflow: the branching model, opening a pull request, code review, and a GitHub Actions pipeline that fails and then passes, with a clear definition of what "done" means. The instructor writes one test for a function nobody on the call wrote, to model testing code you do not own. Finally a live demo of driving one Claude Code agent inside VS Code: how to brief it, how to check its diff, and how to catch it when it is confidently wrong. By the end the intern has seen, at overview depth, every move the project requires.

**Self-learn (6 to 8 hours)**
Clear targets, each with a starting point.
- GitHub beyond commit and push: branching, rebasing, resolving conflicts, clean history. Start here: take the training repo, create a branch, make two commits, then deliberately create a merge conflict with a teammate's branch and resolve it.
- Reading a large unfamiliar codebase: find the entry points, follow the data, ignore what does not matter yet. Start here: open the training repo and answer three questions in writing, where does a request enter, where does it hit the database, and where does the response leave.
- Claude Code fundamentals: how to give it context, scope a task, and review its diff before accepting. Start here: ask Claude Code to explain one module to you, then verify its explanation against the actual code.
- Writing tests for code you did not write. Start here: pick one untested function and write two tests, one happy path and one edge case.

**Weekly project**
Clone an internal training repo. First, find and fix one small bug by hand, no agent, and note what the stack trace told you. Then find a second genuine issue and use Claude Code to help you fix that one. Open one clean pull request with tests. Get it through review and merged.

**Submittable assessment**
- Submission: the merged pull request link, plus a short written note covering how you navigated the codebase, what the by-hand bug taught you, and where Claude Code helped or got in the way.
- Presentation: a 3 minute walkthrough (recorded or live) of your change in the next class.

---

#### Week 2: Data Fluency

**Class owner:** AI Engineer

**Learning objectives**
- Query, transform, and move real data with confidence.
- Recognise dirty data and decide what to do about it.

**Taught class (90 min)**
SQL for people who will live inside customer databases, walked through in the order the project will need it. First, querying a real dataset: joins, window functions, CTEs, and subqueries. Then the part the project turns on: the instructor runs the dataset through a data-quality pass live, finding nulls, duplicate keys, wrong types, and out-of-range values, fixes them, and loads the cleaned result into a fresh queryable table. Along the way the instructor takes one slow query and makes it fast with an index, and shows the same analysis in a Google Sheet through Gemini for a quick non-technical view. The intern leaves having seen the full path from messy export to clean table.

**Self-learn (6 to 8 hours)**
- Relational schema design and indexing basics. Start here: draw the schema of the training dataset, then add an index to one slow query and measure the before and after.
- Common data quality problems and how to detect them. Start here: write a query that counts nulls, duplicates, and out-of-range values per column.
- Moving data safely between systems. Start here: export a table to CSV, transform one column, and load it back into a fresh table without losing rows. This is exactly the load step your project ends on.
- Using Claude or Gemini to draft and explain SQL, then verifying it yourself. Start here: ask the model for a window-function query, run it, and check the result by hand against a small sample.

**Weekly project**
Given a deliberately messy export with broken rows, wrong types, missing values, and duplicate keys, produce a clean result loaded into a fresh, queryable table. Write a one-paragraph note explaining what was wrong, how you detected it, and how you fixed it. Each project step maps to one self-learn topic: detect (data-quality), fix (SQL), load (moving data safely).

**Submittable assessment**
- Submission: the cleaned dataset, the SQL, and the written note.
- Assessed on correctness of the data, quality of the SQL, and clarity of the explanation. The note matters as much as the query.

---

#### Week 3: Deploy, Observe, Recover

**Class owner:** AI Engineer

**Learning objectives**
- Take a service from local to live on AWS or Cloudflare.
- Know when a service is broken and why, using logs and metrics.

> Heaviest week of Phase 1. The intern picks one path, AWS or Cloudflare, not both. The other path is shown in class but not required for the build, so the week fits the time budget.

**Taught class (90 min)**
How a service goes live and how you know when it breaks. Containers, environments, configuration, logging, and basic observability. Two paths shown live: a small service on AWS, and a Cloudflare Worker on the edge. The instructor runs a live incident: a service falls over, and the class diagnoses it together from the logs.

**Self-learn (6 to 8 hours)**
- Cloud basics on your chosen path, AWS or Cloudflare, and when the edge is the right choice. Start here: deploy the provided hello-world service to your chosen platform and reach it from a browser.
- API design and integration patterns. Start here: add one endpoint to the sample service and document its inputs and outputs.
- Reading logs and metrics to diagnose a failure. Start here: trigger an error on purpose and find it in the logs without looking at the code.
- Environment variables, secrets, and configuration you do not hardcode. Start here: move one hardcoded value into an environment variable and confirm the service still runs.

**Weekly project**
Deploy a small service that exposes at least one API endpoint to AWS or Cloudflare, with its config and secrets kept out of the code. Intentionally break it. Diagnose and fix it using only logs and metrics. Document the incident and the fix. The endpoint exercises the API-design self-learn; the config and secrets exercise the environment-variables self-learn.

**Submittable assessment**
- Submission: the live URL, the repo, and a short incident write-up.
- Presentation: a 5 minute live demo where you break it on purpose and recover it in front of the class.

---

### Phase 2: AI Application Engineering

The goal here is building reliable systems on top of unreliable models. This is the AI in AI FDE. Interns do not train models. They build production applications that use them. Knowing whether your system actually works is a core FDE skill, so every deliverable in this phase carries a one-line reliability check: name a way it fails and what catches it. The four weeks build on each other: patterns (Week 4), grounding (Week 5), tools through MCP (Week 6), and automation that ties them together (Week 7).

---

#### Week 4: LLM Application Patterns

**Class owner:** AI Engineer

**Learning objectives**
- Understand how LLM applications work in production.
- Treat prompting as engineering, not guesswork.
- Reason about cost, latency, and non-determinism.

**Taught class (90 min)**
How LLM apps actually work. The instructor builds a small feature live on the Claude API: structured prompting, streaming, structured JSON output, error handling, and measuring cost per call. The recurring theme: the model is the easy part, the system around it is the job.

**Self-learn (6 to 8 hours)**
- Prompt design and iteration as an engineering discipline. Start here: write a prompt that classifies a question's topic, then improve it across three versions and keep notes on what changed the output.
- Getting reliable structured output from a model. Start here: make the model return strict JSON, then feed it three odd inputs and see where the JSON breaks.
- Token economics and the cost implications of design choices, framed at Pandai scale. Start here: compute the cost per call of your feature, then multiply it out to a million students.
- Handling non-deterministic responses gracefully. Start here: call the same prompt five times and write code that handles the variation.

**Weekly project**
Build a small LLM feature on the Claude API that returns reliable structured JSON, handles errors, and reports its own cost per call. Pick a Pandai-flavoured task, for example tagging a question by topic and difficulty.

**Reliability check (one line):** name one input that would make your feature produce wrong or malformed output, and what catches it.

**Submittable assessment**
- Submission: the working feature and a short cost note.
- Assessed on reliability of the structured output, quality of error handling, and whether you can explain the cost behaviour of your feature.

---

#### Week 5: Retrieval and Grounding (RAG)

**Class owner:** AI Engineer

**Learning objectives**
- Understand why models need grounding and how RAG works end to end.
- Evaluate retrieval quality and recognise RAG failure modes.

> Heavy week. The vector store is provisioned just before this week so setup does not eat into the build.

**Taught class (90 min)**
RAG from scratch: chunking, embeddings, retrieval, and assembling grounded answers. The instructor shows a RAG system retrieving well, then shows it confidently retrieving the wrong thing, and explains why. Examples use a real curriculum-style corpus.

**Self-learn (6 to 8 hours)**
- Chunking strategies and their tradeoffs. Start here: chunk the same document three ways and compare what gets retrieved for one question.
- Vector stores and similarity search. Start here: embed ten documents, run one query, and read the similarity scores.
- Measuring retrieval quality. Start here: write five questions with known correct sources and check whether retrieval finds them.
- When RAG is the wrong tool and a plain prompt or a database lookup wins. Start here: name one task in your corpus where RAG is overkill and say why.

**Weekly project**
Build a RAG system over a real document corpus, for example a set of past papers or a syllabus. Show where it retrieves well and where it fails, and explain the failures.

**Reliability check (one line):** note one case where wrong retrieval could mislead the user, and how you would flag low-confidence answers.

**Submittable assessment**
- Submission: the working system and a written failure analysis.
- Presentation: a 5 minute demo (recorded or live) that deliberately shows a failure case and your honest read on why it happens.

---

#### Week 6: MCP and Tool Calling

**Class owner:** AI Engineer

**Learning objectives**
- Understand MCP as the standard protocol for connecting models to tools and data.
- Use an existing MCP server, and build a custom one.
- Drive a model through a multi-step task using MCP tools.
- Build guardrails so a tool call fails safely.
- Use Conductor to run more than one agent in parallel on real work.

**Taught class (90 min)**
Giving a model hands, the standard way. The instructor explains what MCP is and the problem it solves: instead of wiring each tool into each application by hand, MCP is a common protocol so any model can talk to any tool or data source. Live, the instructor connects Claude to a ready-made MCP server, for example a filesystem or a sample database server, and runs a multi-step task through it. Then the instructor builds a tiny custom MCP server that exposes one tool, shows tool calling and an agent loop using it, and adds a guardrail that stops a clearly bad action. Finally Conductor is shown running two agents in parallel against the same tools, now that the intern has parallel work worth orchestrating. By the end the intern has seen both sides the project needs: using an MCP server and building one.

**Self-learn (6 to 8 hours)**
- What MCP is and the problem it solves. Start here: read the MCP overview and write three sentences on why a shared protocol beats one-off integrations.
- Connecting to an existing MCP server. Start here: connect Claude to a ready-made MCP server (filesystem or a sample database) and complete one real task through it.
- Building a custom MCP server. Start here: build a server that exposes a single tool with a strict input schema, and call it from Claude.
- Tool design and guardrails. Start here: add a guardrail to your tool that blocks one clearly bad action, then provoke it and confirm it holds.
- Multi-step agent loops over MCP tools, and Conductor for parallel work. Start here: run a two-step task that uses your tool, then run two agents in Conductor against it and compare their output.

**Weekly project**
Build a custom MCP server that exposes at least two tools a model can call to complete a real multi-step task, with at least one guardrail that prevents a clearly bad action. Drive it from Claude through an agent loop. Use Conductor to build and test the server and its tools in parallel rather than one at a time, and write one line on whether parallel agents actually saved you time. This server is the thing your Week 7 automation will trigger, so build it to be called by something other than you.

**Reliability check (one line):** name one bad input or action your guardrail must block, and confirm it does when provoked.

**Submittable assessment**
- Submission: the MCP server, the tool definitions, the guardrail, a short note on what the guardrail blocks, and your one-line reflection on using Conductor.
- Presentation: a 3 to 5 minute demo (recorded or live) showing the model complete the task through your MCP server, including the guardrail firing when provoked.
- Assessed on whether the model completes the task through MCP end to end, the quality of the tool and schema design, and whether the guardrail actually works when provoked.

---

#### Week 7: Automation with N8N

**Class owner:** AI Engineer

**Learning objectives**
- Automate a real workflow end to end with N8N.
- Trigger work on events and schedules, not manual clicks.
- Connect an AI call, and a Week 6 MCP agent, into an automation.
- Handle failure inside a workflow with retries, error branches, and alerts.

**Taught class (90 min)**
Turning a manual task into an automation that runs itself. The instructor tours N8N: nodes, triggers, webhooks, and schedules. Live, the instructor builds a workflow where an incoming webhook triggers a Claude API call and returns a result, then extends it to call the MCP-backed agent from Week 6, so the two weeks connect into one pipeline. The instructor then breaks a step on purpose and shows failure handling: a retry, an error branch, and an alert, because an automation that fails silently is worse than no automation. By the end the intern has seen a full flow from trigger to result to failure path, which is exactly what the project asks them to build.

**Self-learn (6 to 8 hours)**
- N8N fundamentals: nodes, triggers, webhooks, and schedules. Start here: build a flow triggered by a webhook that posts a message to Slack or writes a row to a Google Sheet.
- Connecting an AI call into a flow. Start here: add a Claude API node that processes the incoming data and returns structured output.
- Wiring your Week 6 MCP agent into an automation. Start here: trigger your Week 6 server from an N8N event instead of running it by hand.
- Failure handling in workflows. Start here: make one step fail on purpose, then add a retry and an error branch that alerts you.

**Weekly project**
Automate a real manual task end to end in N8N. An external event (a webhook, a new row, an incoming message) triggers a flow that calls AI, your Week 6 MCP agent or a Claude API call, and delivers a result somewhere useful, for example a Google Sheet, a Slack message, or a database. The flow must handle at least one failure path gracefully rather than dying silently.

**Reliability check (one line):** name the step most likely to fail, and show what your flow does when it does.

**Submittable assessment**
- Submission: the exported N8N workflow and a short note on the manual task it removes and how it handles failure.
- Presentation: a 3 to 5 minute demo (recorded or live) triggering the automation live and showing the failure path in action.
- Assessed on whether the automation completes end to end on a real trigger, whether it removes a genuine manual task, and whether failure is handled rather than ignored.

---

### Mid-course checkpoint (end of Week 7)

The technical half is the hardest to fake and the easiest to fall behind in, so there is one honest checkpoint before the craft phase begins. This is not a new week of work. It is a half-day review.

- Each intern's seven weekly deliverables are reviewed together for trend, not just last-week performance.
- Any intern who is shaky on a Phase 2 foundation (LLM patterns, RAG, MCP, or automation) gets a short, specific remediation task to close the gap before Week 8, rather than carrying a silent weakness into the capstone.
- The teaching team confirms the cohort is ready for the craft phase, where the deliverables assume the technical baseline holds.

This exists because the weeks build on each other. A weak Week 4 quietly breaks Weeks 5 to 7, and a weak Phase 2 breaks the capstone. The checkpoint surfaces that early, while there is still time to fix it.

---

### Phase 3: The FDE Craft

The technical baseline is now in place. These three weeks build the things that actually decide whether someone thrives in the field. This is the heart of the course.

---

#### Week 8: Scoping Ambiguity

**Class owner:** Product Manager

**Learning objectives**
- Turn a vague business problem into a concrete technical plan.
- Find the real problem behind the stated one.
- Say no to the wrong solution.

**Taught class (90 min)**
Live scoping drills. The instructor hands out one-line briefs like "we want to use AI" or "fix our support load," and the cohort works through finding the real problem, asking the right questions, and shaping a plan. The instructor models how to push back on a bad request without losing the customer. Then the instructor turns one brief into a filled scoping document on screen, the same template the intern will use, showing what goes in the real problem, the plan, the assumptions, and the what-we-will-not-build section. Briefs are drawn from real Pandai and SEA enterprise situations.

**Self-learn (6 to 8 hours)**
- Problem framing and the art of the clarifying question. Start here: take a vague brief and write the ten questions you would ask before writing any code.
- Writing a short, clear scoping document in Google Docs. Start here: use the provided scoping template and fill it for a sample brief.
- Distinguishing what the customer asked for from what they need. Start here: for one brief, write the stated request and the likely real need side by side.
- Linking technical work to a business outcome a non-engineer cares about. Start here: finish the sentence "this is worth building because the customer will be able to..." for your brief.

**Weekly project**
Given a deliberately vague one-line brief, produce a scoping document that states the real problem, a proposed plan, the assumptions made, and explicitly what you would not build.

**Submittable assessment**
- Submission: the scoping document.
- Presentation: defend your scope in class while the instructor plays a customer who keeps changing the ask.
- Assessed on whether you found the real problem rather than solving the surface request, whether the plan is concrete and realistic, and whether the what-we-will-not-build section is thoughtful.

---

#### Week 9: Integration and the Messy Real World

**Class owner:** AI Engineer, with the Project Manager on customer-reality framing

**Learning objectives**
- Integrate into systems you do not control.
- Work around legacy constraints and bad documentation.

**Taught class (90 min)**
Customer environments are fragmented, undocumented, and resistant to change. The instructor walks through a real integration, including the workarounds that never appear in any tutorial. Along the way the instructor shows how the two systems authenticate, an API key one way and a webhook the other, so the intern has seen the auth patterns the project will need before meeting them alone. N8N is used as the glue between two systems that were not designed to talk to each other. The lesson: adapt to the customer's reality rather than forcing them to fit your product.

**Self-learn (6 to 8 hours)**
- Integration patterns for systems with no clean API. Start here: pick two services and sketch how data would move between them without a direct API.
- Authentication patterns: OAuth, JWT, API keys, and webhooks. Start here: authenticate to one real service using each of two different methods.
- Handling legacy constraints and partial access. Start here: write down what you would do if the system you must integrate with has read access only.
- Documenting workarounds so the next person survives. Start here: write a three-line note for every workaround you make, what, why, and what to watch.

**Weekly project**
Integrate two systems that were not designed to talk to each other, using N8N, a webhook, or custom code. For example, push a result from an AI step into a Google Sheet, a Slack message, or a database, triggered by an external event. Document every workaround and the reasoning behind it.

**Submittable assessment**
- Submission: the working integration and the workaround documentation.
- Assessed on whether the integration works, the quality of the workaround documentation, and whether you adapted to constraints rather than complaining about them.

---

#### Week 10: Customer-Facing Communication and Capstone Scoping

**Class owner:** Project Manager, with you

**Learning objectives**
- Explain technical tradeoffs to non-technical people.
- Build trust and manage expectations.
- Deliver bad news well.
- Scope your own capstone before the build weeks begin.

> This week now does double duty. The communication work is the same as before, and by the end of the week each intern has an agreed capstone scope, so Weeks 11 and 12 are pure build and ship.

**Taught class (90 min)**
The skill that gets faked the most and exposed the fastest. Running a customer meeting, framing tradeoffs for a mixed audience, building trust, and feeding field insight back to the product team. The instructor demonstrates a good and a bad version of the same conversation. Slides are built in Google Slides, with Gemini used to draft and tighten the message. The last 20 minutes pair each intern with their capstone mentor to agree scope.

**Self-learn (6 to 8 hours)**
- Written and verbal communication to technical and non-technical stakeholders. Start here: explain your Week 7 model choice to a non-engineer in five sentences.
- Managing expectations before they become problems. Start here: list three expectations you would set on day one of a deployment.
- Delivering bad news clearly and early. Start here: write the message you would send when a deadline is about to slip.
- Building a clean, honest deck that a non-technical decision-maker can follow. Start here: turn one technical tradeoff into a single slide.
- Local context: communicating across English, Bahasa Malaysia, and Mandarin business settings.
- Capstone scoping: apply the Week 8 scoping template to your assigned capstone and agree it with your mentor.

**Weekly project**
Two deliverables. First, present a technical recommendation to a mock customer plus a leadership audience, involving a real tradeoff, for example cost versus quality, or speed versus safety. Second, a one-page agreed capstone scope: the problem, the plan, the assumptions, and what you will not build.

**Submittable assessment**
- Presentation: the live recommendation, scored on clarity and trust, not just technical correctness. Could a non-technical person in the room follow the decision and believe in it?
- Submission: the slide deck, a one-page written brief, and the agreed capstone scope.

---

### Phase 4: Capstone Embedded Deployment

No simulation. A real, scoped internal Pandai deployment with a real owner and a real deadline. Internal systems are the training ground before any intern touches an external customer, because the cost of failure is contained. Scope was agreed in Week 10, so these two weeks are build and ship, with the mentor holding the line on a realistic scope.

---

#### Week 11: Build in Place

**Class owner:** Mentor, with you

**Learning objectives**
- Own a real deployment end to end.
- Apply every prior week under real conditions.

**Taught class (90 min)**
Capstone confirmation and kickoff. Scope was agreed in Week 10, so this session locks the deadline, confirms access, and names the one thing that would make this capstone a failure if it slipped. Suitable capstones include a messaging-based learning helper on N8N, a RAG assistant over curriculum content, an internal automation that removes a manual task, or a small agent that supports the customer success team. The mentor pressure-tests the scope one more time and cuts anything that will not fit in two weeks.

**Embedded work**
Build it, integrate it, deploy it. Use the full toolchain: Claude Code and Conductor to build, GitHub for version control, an MCP server for the model's tools, AWS or Cloudflare to deploy, N8N to integrate and automate, and reliability checks to prove it works. Hit the real walls and climb them. The mentor unblocks but does not rescue.

**Weekly project**
A working deployment in a real environment, with reliability checks and a runbook.

**Submittable assessment**
- Submission: the deployed system, the repo, the reliability checks, and the runbook.
- Progress is checked at a mid-capstone review with the mentor, mid-week, so a stuck intern is caught before Week 12.

---

#### Week 12: Ship and Defend

**Class owner:** You, with the full panel (AI Engineer, Product Manager, Project Manager)

**Learning objectives**
- Present and defend real work.
- Reflect on failure honestly.
- Bring reusable patterns back to the team.

**Taught class (90 min)**
Each intern presents their deployment to stakeholders, defends their decisions under questioning, and walks through one production failure they hit and how they recovered.

**Weekly project**
Final demo, a short written postmortem, and a list of reusable patterns discovered that could help the next deployment.

**Submittable assessment**
- Presentation: the final demo and defence. The capstone is the real exam. See Section 7.
- Submission: the postmortem and the reusable patterns list.

---

## 7. Assessment Framework

There are no written exams. FDE readiness is demonstrated, not tested on paper. Every week produces both a submission and, on most weeks, a presentation (recorded or live), so written and verbal skills are both built and judged. All submissions live in the intern's own public `training-ai-fde` GitHub repository, one folder per week, created in Week 0 (see Section 4). To submit is to push the work and share the link.

### Weekly assessment

Every weekly deliverable is assessed on three questions.

1. Did it ship and work?
2. How did the intern behave when it broke or the brief was unclear?
3. Could they explain it to a non-engineer?

An intern who ships clean code but freezes under ambiguity is not ready. A strong communicator who cannot fix the system when it breaks is found out quickly. Both signals are tracked across all twelve weeks.

### Rubric (applied weekly and to the capstone)

| Dimension | Weight | What is being judged | Scored by |
|-----------|--------|----------------------|-----------|
| Technical execution | 30% | Does the work function correctly and to production standard? | AI Engineer |
| Handling ambiguity and failure | 30% | Behaviour when the brief is vague or the system breaks | Product Manager / Project Manager |
| Communication | 25% | Clarity to technical and non-technical audiences | Product Manager |
| Ownership | 15% | Did they drive it to done, or wait to be carried? | You / mentor |

Splitting the score across assessors is deliberate. Seventy percent of the grade is judgment-based (ambiguity, communication, ownership), so it should not rest on one person's read. The assessor closest to each dimension owns that score.

### Scoring anchors

To keep judgment-based scoring honest, each dimension uses a simple 1 to 4 scale with concrete anchors. An example for handling ambiguity and failure:

- 1: froze or waited to be told what to do when the brief was unclear or the system broke.
- 2: eventually moved, but needed heavy prompting and missed the real problem.
- 3: asked good clarifying questions, made reasonable assumptions, and recovered from the break.
- 4: reframed the problem, made a defensible call under uncertainty, and stayed calm and clear throughout.

Each dimension gets its own four-line anchor set so a 2 and a 4 mean the same thing to every assessor. Build the full anchor table with the teaching team before the cohort starts.

### Capstone assessment

The capstone is weighted most heavily. Same rubric, plus three extra questions.

- Did the deployment actually work in a real environment?
- Was the postmortem honest about what went wrong?
- Were the reusable patterns genuinely useful to the next person?

### Graduation criteria

An intern graduates as a deployable AI FDE when they have:

- Shipped a working deliverable every week.
- Demonstrated calm and competent behaviour during at least one real failure.
- Passed the capstone with a working deployment and an honest postmortem.
- Shown they can explain technical decisions to a non-technical audience.

An intern who is strong technically but weak on ambiguity or communication does not graduate as field-ready. They get a development plan and a path to retry, because these are the traits the role cannot do without.

### Did the program work?

One program-level signal, checked 4 to 8 weeks after graduation: is the graduate productive on real Pandai work without being carried? If graduates pass the course but stall on real delivery, the course, not the intern, needs revising.

---

## 8. Projects Summary

| Week | Project | Primary muscle | Key tools |
|------|---------|----------------|-----------|
| 0 | Setup and calibration diagnostic | Readiness | VS Code, GitHub, Claude Code |
| 1 | One by-hand fix plus one Claude Code fix, in a clean PR with tests | Working in someone else's code | Claude Code, VS Code, GitHub |
| 2 | Clean a messy dataset and explain the fixes | Data fluency | SQL, Gemini, Google Sheets |
| 3 | Deploy, break, and recover a service | Operating in production | AWS or Cloudflare, GitHub Actions |
| 4 | LLM feature with reliable structured output | LLM application patterns | Claude API |
| 5 | RAG system over a real corpus | Retrieval and grounding | Claude API, vector store |
| 6 | Custom MCP server with tools and a guardrail, driven by an agent | MCP and tool calling | Claude API, MCP, Conductor |
| 7 | Automation that removes a manual task, with failure handling | Workflow automation | N8N, Claude API, MCP |
| 8 | Scoping document from a vague brief | Scoping ambiguity | Google Docs |
| 9 | Integrate two incompatible systems | Messy integration | N8N, webhooks, APIs |
| 10 | Technical recommendation plus agreed capstone scope | Customer communication and scoping | Google Slides, Gemini, Google Docs |
| 11 to 12 | Capstone embedded deployment | End-to-end ownership | Full stack |

---

## 9. Notes for Running the Program

Use real internal Pandai systems as the training ground. Live deployments, messaging integrations, automation workflows, and database work are exactly the embedded, messy delivery FDEs do. Apprentice interns on internal systems first, where the cost of failure is contained, before pointing them at external customers.

Pair every intern with a mentor who has done real deployment work. The FDE craft transfers through apprenticeship, not lectures. The mentor unblocks but never rescues, because being rescued teaches nothing.

Keep cohorts small, 3 to 6 interns. This is a high-touch program by design. A large cohort dilutes the mentorship that makes it work. With a single intern, have a team member play the second voice in scoping drills and mock-customer roles.

Protect the self-learn time. The weekly class is short on purpose. Interns learn the craft by hitting walls during the build, not by hearing about walls in a lecture. Each self-learn block ships with clear targets and a starting point, so the intern explores with direction rather than guessing.

Use the mid-course checkpoint honestly. Its whole job is to catch a weak Phase 2 foundation before it breaks the capstone. Do not let an intern carry a silent gap into Week 11.

Reward honesty about failure. The postmortem, the "here is where my system breaks," and the "I got this wrong" are the most valuable things an intern produces. An FDE who hides failures is a liability. Build a culture where surfacing them early is the expected behaviour.

---

## 10. Accounts, Access, and Cost

Set up accounts in waves so Week 0 stays light. **The program provides exactly one paid thing: a Claude Pro subscription per intern for the full course (about 4 months)**, used to log into Claude Code. Everything else is a free account the intern creates themselves.

- Week 0: VS Code, GitHub (each intern creates a **public** `training-ai-fde` repo as their submission home), Python and Node, Claude Code logged in with the program-provided Claude Pro account, and the intern's own free accounts — a Google account with Gemini, free-tier AWS, and free-tier Cloudflare.
- Before Week 5: vector-store access.
- Before Week 6: Conductor and MCP SDK access.
- Before Week 7: N8N instance or sandbox.
- When an API-building week needs it: the intern's own free Anthropic API key.

Cost ownership: the program pays only for the Claude Pro subscriptions. AWS, Cloudflare, and Anthropic API usage run on each intern's **own** free-tier accounts, so there are no central spending caps — brief interns to stay on free tiers and watch their own usage. Name one person on the teaching team to field account/access issues and remind interns about free-tier limits.

---

## 11. Glossary

- FDE: Forward Deployed Engineer. An engineer who embeds with a customer to build, deploy, and operate solutions in place.
- RAG: Retrieval Augmented Generation. Grounding a model's answers in retrieved documents.
- Agent: A system where a model takes multi-step actions using tools.
- Tool calling: A model invoking external functions or services to act in the world.
- MCP: Model Context Protocol. A standard for connecting models to external tools and data sources.
- Eval: A structured way to measure whether a model or system is good enough.
- Guardrail: A control that stops a system from taking an unsafe or clearly wrong action.
- Runbook: A document describing how to operate and recover a deployed system.
- N8N: A workflow automation tool used here as the integration backbone for AI features.
- Conductor: A tool for running and orchestrating multiple Claude Code agents in parallel.
