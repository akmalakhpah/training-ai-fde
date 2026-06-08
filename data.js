// Course content extracted from COURSE.md
const courseData = {
  meta: {
    title: "AI Forward Deployed Engineer Course",
    subtitle: "A 12-week hybrid program that turns you, a fresh graduate, into a deployable AI Forward Deployed Engineer.",
    duration: "12 weeks",
    commitment: "~16–20 hours / week",
    classFormat: "~90 min taught class + self-paced build",
    model: "Claude (primary)",
  },

  philosophy: {
    title: "Course Philosophy",
    body: [
      "Most software fails in deployment, not in development. The product works in the demo and breaks inside the customer's real, messy environment. The Forward Deployed Engineer exists to close that gap by embedding with the customer, building production-grade solutions in place, and staying until they work.",
      "For you, a fresh graduate, the technical gap is closable in weeks. The harder gap is the FDE craft: staying calm inside broken systems, turning a vague business problem into a concrete plan, owning delivery end to end, and talking to customers without hiding behind a screen. This course weights heavily toward that craft, because it is what degrees and bootcamps skip.",
    ],
    muscles: [
      "Ship production code, not coursework.",
      "Stay functional inside ambiguous, broken, incomplete systems.",
      "Translate between human problems and technical plans, then defend the call to a customer.",
      "Supervise the AI agents that do the work — brief them, review their output, guardrail them, and never blindly trust them.",
    ],
    closer: "If you finish the course strong on muscle one but weak on the rest, you are not ready. The whole design exists to build all four at once.",
  },

  audience: {
    target:
      "You are a fresh computer science or engineering graduate with a solid academic foundation but little or no production experience. You can write code. You have not yet shipped something real users depend on, debugged a live outage at 2am, or explained a technical tradeoff to a non-technical stakeholder.",
    outcomes: [
      "Read and contribute to a large unfamiliar codebase without freezing.",
      "Build, deploy, observe, and recover a production service.",
      "Query, clean, and move real customer data confidently.",
      "Build reliable LLM applications: structured outputs, RAG, agents, tool calling, and evaluation.",
      "Choose the right model for a given task on cost, latency, and quality grounds.",
      "Scope a vague business problem into a concrete technical plan.",
      "Integrate into systems you do not control.",
      "Present a technical recommendation to a mixed audience and earn trust.",
      "Own a real deployment end to end, including the moment it breaks.",
    ],
  },

  prerequisites: {
    knowledge: [
      "Programming fundamentals in at least one language. Comfort writing functions, loops, data structures, and reading other people's code.",
      "Basic command line use: navigating directories, running scripts, environment variables.",
      "Basic understanding of how the web works: HTTP, requests and responses, what an API is at a conceptual level.",
      "Willingness to be wrong in public. This is non-negotiable for an FDE.",
    ],
    built: "Python depth, SQL, cloud, GitHub workflows beyond the basics, LLM application patterns, and the entire FDE craft. You do not need any AI or machine learning background.",
    setup: [
      "A public GitHub repository named exactly 'training-ai-fde' (e.g. github.com/<your-username>/training-ai-fde), initialised with a README and one folder per week — this is where every weekly assessment is submitted.",
      "A working laptop with Visual Studio Code installed (code.visualstudio.com).",
      "GitHub installed (github.com) and a GitHub account with 2FA; authenticate via the GitHub CLI ('gh auth login').",
      "Python 3.12+ installed (python.org) and Node.js LTS v20+ installed (nodejs.org, required for Claude Code).",
      "A Claude Pro subscription — the one thing the program provides, for the full course (about 4 months). You authenticate Claude Code by logging in with it; no API key is needed for Claude Code itself.",
      "Claude Code installed and authenticated via your Claude Pro login, plus the Claude Code VS Code extension.",
      "Your own free accounts, created by you, for everything else: a Google account with Gemini, an AWS free-tier account, and a Cloudflare free-tier account. These are yours, so watch your own usage — there are no central spending caps.",
      "For the weeks that build on the Claude API, your own free Anthropic API account and key, stored in an ANTHROPIC_API_KEY environment variable — never committed to git. (Conductor, the MCP SDK, the vector store, and N8N are set up later, just before the weeks that need them.)",
    ],
  },

  tooling: {
    intro: "Claude is the primary model and assistant throughout the course. You use it three ways:",
    uses: [
      "As a coding partner through Claude Code for building and debugging.",
      "As the model you build applications on through the Claude API.",
      "As a thinking partner for scoping, writing, and learning.",
    ],
    tiers: [
      { name: "Opus tier", desc: "The most capable, for complex reasoning and long-horizon agentic work. Claude Opus 4.8 is the most capable model as of mid 2026." },
      { name: "Sonnet tier", desc: "The balanced default for most development, analysis, and general application work." },
      { name: "Haiku tier", desc: "Fast and cost-efficient, for high-volume, latency-sensitive, simple tasks." },
    ],
    principle: "Model names change over time, so you learn the tier principle, not a fixed version number. Choosing the right model for the task matters more than always reaching for the most powerful one.",
  },

  phases: [
    { id: "p0", num: 0, weeks: "Week 0", name: "Setup", focus: "Tooling, accounts, a public submission repo, and a calibration diagnostic", color: "primary" },
    { id: "p1", num: 1, weeks: "1–3", name: "Production Engineering Foundations", focus: "Unlearning coursework habits, learning how code ships and survives", color: "primary" },
    { id: "p2", num: 2, weeks: "4–7", name: "AI Application Engineering", focus: "Building reliable systems on top of unreliable models", color: "success" },
    { id: "p3", num: 3, weeks: "8–10", name: "The FDE Craft", focus: "Scoping, integration, and customer communication", color: "warning" },
    { id: "p4", num: 4, weeks: "11–12", name: "Capstone Embedded Deployment", focus: "A real deployment with a real owner and a real deadline", color: "danger" },
  ],

  weeks: [
    {
      num: 0,
      phaseId: "p0",
      title: "Setup and Diagnostic",
      objectives: [
        "Work confidently in VS Code and its integrated terminal, and push real work to GitHub from inside the editor.",
        "Use VS Code as the hub that pulls in the rest of the toolchain — Git, Python 3.12+, Node.js LTS — through its extensions and prompts, instead of hunting down five separate installers.",
        "Create a public GitHub repo named training-ai-fde as the submission home for all twelve weeks.",
        "Run Claude in both surfaces — the Claude Desktop app and the Claude Code extension in VS Code — signed in with the program-provided Claude Pro account, and keep any API keys you create out of version control.",
        "Create your own free accounts and confirm access to Python, Node, Google + Gemini, and free-tier AWS and Cloudflare.",
        "Take a light, ungraded diagnostic so the teaching team knows where the cohort actually starts.",
      ],
      taughtClass: "This is a hands-on setup session that runs before the course officially starts — about 3–4 hours of guided setup plus a short, ungraded diagnostic, with the AI Engineer on the call to unblock anything that breaks. The goal is simple: you walk into Week 1 with a working environment instead of losing your first real week to a broken one.\n\nThe centrepiece is your submission repo — a public GitHub repository named training-ai-fde that becomes the home for everything you submit across all twelve weeks. You only download two apps by hand: VS Code and Claude Desktop. From there, VS Code is the hub — its extensions and built-in prompts install Git, Python, and Node for you, so you're not chasing installers across five different sites. You'll sign into Claude with the program's Claude Pro account in both surfaces: the Claude Desktop app and the Claude Code extension in VS Code (no API key needed).\n\nWe'll also cover the one habit that matters from day one: keeping any API key you create out of your public repo. The week stays deliberately light — heavier tools arrive later, just before the weeks that use them — so you can focus on getting the basics solid. The detailed, step-by-step instructions are in the self-paced track below; come having skimmed them, and bring whatever you got stuck on.",
      selfPaced: [
        {
          title: "Submission repo — do this first",
          points: [
            "Create a GitHub account at github.com/signup with a professional username (assessors and, later, customers see it) and verify your email.",
            "Turn on two-factor auth (Settings → Password and authentication) using an authenticator app — Google Authenticator, Authy, or 1Password.",
            "At github.com/new, create a repo named exactly training-ai-fde (lowercase), visibility Public, initialised with a README.",
            "Add one folder per week (week-00 … week-12) and make the README an index that links to each week.",
            "Add a one-paragraph CLAUDE.md stub at the repo root — what this repo is and how it's organised. It primes Claude Code the moment you open the repo; you'll learn to write a real one in Week 1.",
            "Send the program your repo URL in the Week 0 onboarding form.",
            "From now on, 'submit' = push to this repo, then share the link (a file, folder, pull request, or release tag, as each week specifies).",
            "If a deliverable is ever genuinely sensitive, raise it with the teaching team rather than making the repo private.",
          ],
        },
        {
          title: "VS Code — the hub (manual download #1)",
          points: [
            "Download: code.visualstudio.com/download. macOS — drag into /Applications; Windows — run the installer and tick 'Add to PATH'.",
            "Open the integrated terminal (Ctrl+`) — this is where you verify each tool below.",
            "In the Extensions panel (Ctrl+Shift+X) add Claude Code, Python, and on Windows the 'WSL' extension. These extensions install Git, Python, and Node for you — no five separate download pages.",
          ],
        },
        {
          title: "Claude Desktop + the Claude Code extension (manual download #2)",
          points: [
            "Claude Desktop: download from claude.ai/download and sign in with the program-provided Claude Pro account — your chat-and-MCP surface, used more from Week 6 onward.",
            "Claude Code extension: install it from the VS Code Extensions panel and sign in with the same Claude Pro account — no API key needed; the Pro subscription covers the full ~4-month course.",
            "Verify: open your training-ai-fde folder in VS Code, start Claude Code, ask 'what files are in this repo?', and confirm it answers from the real files.",
          ],
        },
        {
          title: "Git + GitHub — through VS Code",
          points: [
            "Install Git via the prompt: open the Source Control panel; if Git is missing, follow VS Code's 'Install Git' button. (macOS: the first 'git' command pops the Xcode Command Line Tools installer — accept it.) Verify 'git --version'.",
            "Set your identity: 'git config --global user.name \"Your Name\"' and 'git config --global user.email \"you@example.com\"'.",
            "Sign in to GitHub without a separate CLI: VS Code's Accounts menu (bottom-left) → 'Sign in to GitHub' runs a browser flow — no SSH keys. (Prefer the CLI? 'gh auth login' from cli.github.com still works; it's optional.)",
            "Verify the chain: Command Palette → 'Git: Clone' your repo, add a file, then commit and push from the Source Control panel and confirm it on github.com.",
          ],
        },
        {
          title: "Python 3.12+ — installed by the extension",
          points: [
            "Open any .py file: if Python is missing, the Python extension offers to install it (Windows — Microsoft Store; macOS — it guides you). No trip to python.org.",
            "Verify: 'python3 --version' (macOS/Linux) or 'python --version' (Windows) shows 3.12+, and 'python3 -m pip --version'.",
          ],
        },
        {
          title: "Node.js LTS v20+",
          points: [
            "Powers the Claude Code engine and later-week tooling (Wrangler, npm). The one runtime without an in-editor prompt: grab the LTS at nodejs.org/en/download, or let your Claude Code partner install it from the VS Code terminal.",
            "Verify: 'node --version' (v20+) and 'npm --version'.",
          ],
        },
        {
          title: "Anthropic API key — only when a later week needs it",
          points: [
            "Claude Code itself needs no key. The Claude API is separate, used only in the API-building weeks.",
            "When a week needs it, create your own free account at console.anthropic.com and generate a key.",
            "Store it in an env var, never committed — macOS/Linux: 'export ANTHROPIC_API_KEY=\"...\"' in ~/.zshrc; Windows: System → Environment Variables or 'setx'. Verify with 'echo $ANTHROPIC_API_KEY'.",
            "A committed key is a setup failure — if it lands in git history, rotate it immediately and tell the team. It's your own account, so a leak is your cost and security problem.",
          ],
        },
        {
          title: "Google account + Gemini",
          points: [
            "Sign in to a Google account you create (a free personal account is fine — the program does not provide one).",
            "Confirm Docs, Sheets, and Slides open and Gemini is available in the side panel.",
            "Used from Week 2 (non-technical data view) and heavily from Week 8 onward.",
          ],
        },
        {
          title: "AWS + Cloudflare — your own free-tier accounts",
          points: [
            "The program does not provision these, and there are no central spending caps — stay on the free tier and watch your own usage.",
            "Confirm you can log in: AWS console (console.aws.amazon.com) and Cloudflare dashboard (dash.cloudflare.com).",
            "The AWS CLI and Wrangler ('npm install -g wrangler') come later.",
            "You build on only one for Week 3 (your choice), but create and log into both now.",
          ],
        },
        {
          title: "Provisioned later — not in Week 0",
          points: [
            "Provisioned later, on purpose: vector store before Week 5, Conductor + MCP SDK before Week 6, N8N before Week 7 — don't install these in Week 0.",
          ],
        },
        {
          title: "Setup checklist — every box ticked = ready for Week 1",
          points: [
            "Public training-ai-fde repo with README index, week folders, and a CLAUDE.md stub; URL sent.",
            "VS Code installed, terminal works; Claude Code, Python, + (Windows) WSL extensions added.",
            "Claude Desktop installed and signed in with the Claude Pro account.",
            "Git installed via the VS Code prompt and configured; GitHub signed in through VS Code; a test commit pushed.",
            "Python 3.12+ and pip verified (via the Python extension).",
            "Node.js LTS v20+ and npm verified.",
            "Claude Code extension signed in with the Claude Pro account, answering about your repo.",
            "Your own Google account signed in; Docs, Sheets, Slides, Gemini reachable.",
            "Your own free-tier AWS and Cloudflare logins confirmed.",
            "(Later, when a week needs the Claude API) your own Anthropic API key set as an env var, not committed.",
          ],
        },
      ],
      deliverable: "Ship a public training-ai-fde repo with a [README](https://github.com/akmalakhpah/training-ai-fde/blob/main/resources/README.md) index and a week-00 folder holding your completed diagnostic. Every checklist item passes its one-line verification, and you've sent the program your repo URL.\n\nThe diagnostic (about 1 hour, ungraded) is a small coding warm-up — a function and a couple of test cases in any language — plus two or three short questions: a GitHub operation (branch and commit), a command-line task (navigate, run a script, read an environment variable), and a short written read of an unfamiliar function (what it does, what would break it).\n\nTo submit is to push the work and share the link — a file, a folder, a pull request, or a release tag, as each week specifies. This runs the full setup-to-submission loop once, before Week 1 depends on it.",
      assessment: "Week 0 is ungraded — the diagnostic is calibration, not a gate. It tells the teaching team where the cohort actually starts so the early weeks can flex.\n\nDone means: the public repo exists with a README index and a week-00 diagnostic, every tool passes its verification check, the diagnostic is committed to week-00, and the repo URL has been sent to the program.\n\nDefinition of done: a teammate can open your training-ai-fde repo, see a clear README and a week-00 diagnostic, and you can ask Claude Code about the repo in VS Code and get a correct answer — all without a setup error blocking Day 1 of Week 1.",
    },
    {
      num: 1,
      phaseId: "p1",
      title: "From Coursework to Production",
      objectives: [
        "Explain what separates a student repo from a production system.",
        "Work inside a large codebase written by other people without freezing.",
        "Drive a single Claude Code agent well: brief it, review its diff, and catch it when it is wrong.",
        "Write the context files that steer an AI agent — a CLAUDE.md, a clear README, and where it fits an AGENTS.md or a Skill — and use them to brief Claude Code before it touches the code.",
        "Fix one bug by hand, without the agent, reading the code and the stack trace yourself.",
        "Follow a real branching, review, and merge workflow on GitHub, including a CI pipeline.",
      ],
      taughtClass: "This week is your jump from coursework to production, and the class opens on the four muscles this whole programme builds — shipping real work, staying functional inside broken systems, translating between human problems and technical plans, and supervising the AI agents that do the work — with this week leaning hardest on the first while giving you your first real rep at the fourth. The 90-minute session is a guided tour of every move you will make alone in the project, so nothing is first seen solo.\n\nYou will watch the repo you will work on this week — AI Anki, a small FastAPI flashcard study app with a Claude-powered card generator — get opened and walked through: where config, source, tests, the README, and the CI workflow live, then learn the method for reading an unfamiliar codebase: find the entry point, follow one request from entry to database to response, and ignore error handling on the first pass. From there it is GitHub for real (feature branches, rebase vs merge, and resolving a deliberate conflict live), the full pull request lifecycle, a GitHub Actions pipeline made to fail and then pass, and writing a test for code nobody on the call wrote.\n\nTwo demos anchor the session: driving a single Claude Code agent — briefing it, scoping it narrowly, and catching it being confidently wrong — and the reason your first bug this week is fixed by hand with no agent at all, because you cannot supervise a machine doing something you have never done yourself. You will also see the files that make a good briefing reusable — a CLAUDE.md, a clear README, and where it fits an AGENTS.md or a Skill — which hand the agent your repo's context once instead of in every prompt. Use the self-paced track below for the step-by-step reps — rebase, codebase reading, Claude Code, context files, and testing — that turn this tour into muscle.",
      selfPaced: [
        {
          title: "Topic A — GitHub beyond commit and push (1.5–2 hrs)",
          points: [
            "Goal: branch, rebase, and resolve a merge conflict from the command line without panic.",
            "Start here: in your fork of the AI Anki repo (akmalakhpah/training-ai-fde-anki), create a branch, make two commits, then manufacture a merge conflict against the pre-made conflict branch and resolve it from the command line.",
            "Watch: 'Git Branching Strategy & Git REBASE to fix Merge Conflicts' — https://www.youtube.com/watch?v=6FUqOswIags (fallback search: 'git rebase resolve merge conflicts tutorial').",
            "Read: Atlassian 'Merging vs Rebasing' — https://www.atlassian.com/git/tutorials/merging-vs-rebasing and 'Resolve merge conflicts' — https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts.",
            "Ask AI (paste into Claude): 'I am new to git rebase. Walk me through, step by step, how to rebase my feature branch onto main, what to do when I hit a conflict, and how to tell whether I should rebase or merge in a shared repo. Then give me three practice exercises I can run locally to build the muscle.'",
          ],
        },
        {
          title: "Topic B — Reading a large unfamiliar codebase (1.5–2 hrs)",
          points: [
            "Goal: orient in a repo you did not write and find where to make a change.",
            "Start here: open your fork of the AI Anki repo and answer in writing — where does a request enter (routes.py), where does it hit the database (db.py), where does the response leave.",
            "Read: Sparkbox 'How to Understand a Large Codebase' — https://sparkbox.com/foundry/how_to_understand_a_large_codebase and DEV 'How to Learn Unfamiliar Codebases' — https://dev.to/sammytran/how-to-learn-unfamiliar-codebases-1mi1.",
            "Ask AI (paste into Claude Code, inside the repo): 'You are helping me onboard to this codebase. Without changing any files, give me a map: the entry points, the main modules and what each is responsible for, where data is read and written, and the path a single user request takes from entry to response. Then point me at three small, low-risk files I could read first to understand the conventions.'",
          ],
        },
        {
          title: "Topic C — Claude Code fundamentals (1–1.5 hrs)",
          points: [
            "Goal: brief, run, and review a single agent and catch its mistakes.",
            "Start here: ask Claude Code to explain one module, then verify its explanation against the actual code line by line.",
            "Read: Claude Code Quickstart — https://code.claude.com/docs/en/quickstart (skim the whole page, then read the sections on CLAUDE.md and reviewing changes).",
            "Ask AI (paste into Claude Code): 'Explain what this module does and how it connects to the rest of the system. Cite the specific functions and line ranges you are basing each claim on, so I can verify you. Flag anything you are unsure about rather than guessing.'",
          ],
        },
        {
          title: "Topic D — Writing tests for code you did not write (1–1.5 hrs)",
          points: [
            "Goal: add a happy-path test and an edge-case test to existing code.",
            "Start here: pick one untested function in the repo and write two tests for it.",
            "Read: the testing section of the repo's README, plus your language's standard test runner docs (for example pytest or Jest).",
            "Ask AI (paste into Claude): 'Here is a function I did not write: [paste]. Help me understand its behaviour, then propose a happy-path test and one edge-case test. Do not write code that just mirrors the implementation. Explain what each test actually proves and what would make it fail.'",
          ],
        },
        {
          title: "Topic E — Steering the agent with context files (1–1.5 hrs)",
          points: [
            "Goal: write the markdown files that brief an AI agent on your repo once — a CLAUDE.md, a clear README, and where it fits an AGENTS.md or a Skill — instead of re-explaining the same context in every prompt.",
            "Know the difference: a README is for humans (what the project is, how to run it); a CLAUDE.md is for the agent (how to work in this repo — install/run/test commands, the architecture in a few lines, conventions and gotchas); AGENTS.md is the same idea as a tool-neutral standard other coding agents read; a Skill packages a reusable procedure the agent can invoke on demand.",
            "Start here: inside your fork of the AI Anki repo (which ships with no CLAUDE.md on purpose), run /init in Claude Code to generate a draft CLAUDE.md, then read it critically and tighten it by hand — correct anything wrong, add the real run and test commands, the top-level architecture in two or three lines, and the conventions a newcomer would most likely trip on.",
            "Read: Claude Code memory / CLAUDE.md docs — https://code.claude.com/docs/en/memory ; the AGENTS.md convention — https://agents.md ; and skim Claude Code Skills — https://code.claude.com/docs/en/skills (fallback search: 'Claude Code CLAUDE.md memory', 'agents.md standard').",
            "Ask AI (paste into Claude Code, inside the repo): 'Draft a CLAUDE.md for this repository. Base every line on what you can verify in the code: the exact commands to install, run, and test it, the top-level architecture, and the three conventions a new contributor is most likely to get wrong. Keep it short and concrete, and do not invent commands or structure you cannot find. Flag anything you are unsure about so I can confirm it.'",
            "Then verify: a context file the agent wrote about your repo is only as good as your check of it — confirm each command actually runs and each claim matches the code before you commit it.",
          ],
        },
      ],
      deliverable: "Brief: take AI Anki — a small FastAPI flashcard app with a Claude-powered card generator — from fork to a clean, merged pull request, with one bug fixed by hand and one fixed with Claude Code.\n\nRequirements: (1) fork akmalakhpah/training-ai-fde-anki to your own GitHub account, clone your fork, and get it running locally; (2) find a first small, genuine bug and fix it by hand, no agent, noting what the stack trace or error told you; (3) find a second genuine issue and fix it with Claude Code, reviewing the diff before accepting; (4) add at least one test that covers your change; (5) open one clean pull request into your fork's main — a clear title, a description of the change, and the tests; (6) get the PR through review and merged, with CI passing; (7) write or substantially improve a CLAUDE.md for the repo (it ships without one on purpose), verify every command and claim in it against the code, and use it to brief Claude Code on the agent-assisted fix — commit it as part of your PR.\n\nSuggested steps: fork, clone, install, run the test suite, and confirm it is green before you touch anything; orient using the Topic B codebase-reading method and write the three-question answer; reproduce the first bug, read the trace, fix it by hand, add or update a test; write or sharpen the repo's CLAUDE.md so the agent starts with real context, then pick the second issue, brief Claude Code, review and accept its diff, confirm tests pass; branch, commit with clean messages, push, open the PR, respond to review, merge.\n\nDeliverables: the merged pull request link (including the CLAUDE.md you wrote or improved), plus a short written note (half a page) covering how you navigated the codebase, what the by-hand bug taught you, where Claude Code helped or got in the way, and one line on what you put in the CLAUDE.md and whether it changed how the agent behaved.\n\nStretch (optional): add a second test that would have caught the bug before it shipped; try the Claude-powered card generator (set ANTHROPIC_API_KEY) and read how that endpoint is wired; leave a constructive review comment on a peer's PR.",
      assessment: "Submit the merged PR link and the half-page note, then give a 3-minute walkthrough of your change: what was wrong, how you fixed it, and one thing the by-hand bug taught you about reading code. Judged on technical execution (does the fix work, are the tests meaningful, is the PR clean, did CI pass, is the CLAUDE.md you shipped accurate and useful), handling ambiguity and failure (navigating an unfamiliar repo and a real bug without freezing), communication (can a non-author follow your PR and walkthrough), and ownership (did you drive it to merged). Done means a reviewer who has never seen your change can read the PR, understand what it does and why, see the test that proves it, and watch CI pass — all without asking you a question.",
    },
    {
      num: 2,
      phaseId: "p1",
      title: "Data Fluency",
      objectives: [
        "Query, transform, and move real data with confidence.",
        "Recognise dirty data and decide what to do about it.",
        "Take a messy export and turn it into a clean, queryable table.",
        "Use AI to draft SQL, then verify it by hand.",
      ],
      taughtClass: "A 90-minute class that walks the full path from a messy export to a clean, queryable table, in the order the project needs it. It opens on a framing that holds for the whole role: an FDE spends more time inside the customer's data than in their own code, and that data is always messier than the demo.\n\nYou start with the SQL you actually need — joins (inner vs left, and why the difference bites you), GROUP BY and aggregates, CTEs that split a complex query into named, readable parts with WITH, and subqueries — built live into one query that answers a real question about the dataset, layering in a join and a CTE. Then window functions: ROW_NUMBER, RANK, LAG, LEAD, and running totals with SUM OVER, used live to find duplicate keys and to compare a row to the one before it — the point being that window functions are how you find data-quality problems, not just analytics.\n\nFrom there it is spotting dirty data — nulls where there should not be, duplicate keys, wrong types, out-of-range values, inconsistent categories like 'MY' vs 'Malaysia', and broken rows — under the rule never trust an export, profile it first. You then decide per problem whether to fix, drop, flag, or escalate, load the cleaned result into a fresh table without ever cleaning in place so the work can be redone, and see why one slow query speeds up dramatically once you add an index.\n\nThe class closes on two FDE habits: taking the same analysis into a Google Sheet through Gemini for a view a non-engineer can read, and using AI for SQL safely — asking Claude or Gemini for a query, running it, and checking it by hand against a small sample, because a wrong query that runs is more dangerous than one that errors. Use the self-paced track below for the step-by-step reps — joins and CTEs, window functions, profiling, and verifying AI-written SQL — that turn this tour into muscle.",
      selfPaced: [
        {
          title: "Topic A — SQL joins, CTEs, and subqueries (1.5–2 hrs)",
          points: [
            "Goal: write a multi-step query that joins tables and uses a CTE.",
            "Start here: draw the schema of the training dataset on paper, then write a query that answers one real question using a join and a CTE.",
            "Watch: Crunchy Data interactive playground, 'CTEs and Window Functions' (https://www.crunchydata.com/developers/playground/ctes-and-window-functions).",
            "Read: GeeksforGeeks, 'Window Functions in SQL' (https://www.geeksforgeeks.org/sql/window-functions-in-sql/).",
            "Ask AI (paste into Claude): 'Teach me CTEs by example using this schema: [paste schema]. Show me the same query written as a subquery and as a CTE, explain which is clearer and why, then give me three practice questions of increasing difficulty against this schema with the answers hidden until I ask.'",
          ],
        },
        {
          title: "Topic B — Window functions (1.5 hrs)",
          points: [
            "Goal: use ROW_NUMBER, LAG, and a running total.",
            "Start here: write a query using ROW_NUMBER that finds duplicate keys in the dataset.",
            "Watch: BeardedDev, 'SQL Tutorial - Window Functions (Follow Along)' (https://www.youtube.com/watch?v=lBcDSsgp0RU; fallback search: 'BeardedDev SQL window functions follow along').",
            "Ask AI (paste into Claude): 'Explain SQL window functions to me using a concrete table of student quiz attempts. Show me ROW_NUMBER, RANK, LAG, and a running total, each with the query and a worked example of the output rows. Then give me one realistic data-quality check I could write with a window function.'",
          ],
        },
        {
          title: "Topic C — Data quality and detection (1.5 hrs)",
          points: [
            "Goal: profile a dataset and catalogue what is wrong.",
            "Start here: write one query that counts nulls, duplicates, and out-of-range values per column.",
            "Read: search 'data quality dimensions completeness validity uniqueness' and read one overview, then look at your database's docs for type casting and constraints.",
            "Ask AI (paste into Claude): 'Here is a sample of a messy data export: [paste 20 rows]. Act as a data-quality reviewer. List every problem you can see, grouped by type (missing, duplicate, wrong type, out of range, inconsistent category, broken row). For each, tell me how I would detect it at scale with SQL and what my options are to fix, drop, or flag it.'",
          ],
        },
        {
          title: "Topic D — Moving data safely and verifying AI-written SQL (1–1.5 hrs)",
          points: [
            "Goal: load cleaned data into a fresh table without losing rows, and verify a model's SQL.",
            "Start here: export a table to CSV, transform one column, and load it back into a fresh table; confirm the row counts match.",
            "Ask AI (paste into Claude): 'I asked you for this SQL: [paste query]. Before I run it on real data, walk me through exactly what it will do row by row on this 5-row sample: [paste]. Tell me what could go wrong, what it would do to nulls and duplicates, and how I should sanity-check the result after running it.'",
          ],
        },
      ],
      deliverable: "Given a deliberately messy export, produce a clean result loaded into a fresh, queryable table, and explain what was wrong and how you fixed it.\n\nRequirements (checklist): profile the export to detect and catalogue the data-quality problems (the detect step); clean the data with SQL, deciding fix vs drop vs flag for each problem (the fix step); load the cleaned result into a fresh, queryable table (the load step); write a one-paragraph note explaining what was wrong, how you detected it, and how you fixed it; and do not clean in place — keep the raw data intact so the work is reproducible.\n\nThe messy export will include broken rows, wrong types, missing values, and duplicate keys; expect at least one problem that has no clean answer, where you must choose and justify.\n\nDeliverables: the cleaned dataset (or the fresh table); the SQL you used, readable and commented; and the one-paragraph written note.\n\nStretch (optional): add a validation query that would fail loudly if the same problem reappeared in a future export, and produce the Gemini and Sheets non-technical summary of one finding.\n\nAI Anki option (optional): run your SQL against your Week 1 AI Anki fork's SQLite database (the decks, cards, and reviews tables) — for example, retention per deck or the most-failed cards.",
      assessment: "Submit the cleaned dataset or table, the SQL, and the written note.\n\nJudged against the course rubric: technical execution (30%) — correctness of the cleaned data and the quality of the SQL; handling ambiguity and failure (30%) — how you handled the problem with no clean answer; communication (25%) — clarity of the note, which matters as much as the query; and ownership (15%) — whether you profiled thoroughly or stopped at the first obvious issue.\n\nDefinition of done: someone can run your SQL against the raw export and reproduce your clean table, and your note tells them what was wrong and what you decided, without them having to read the queries.",
    },
    {
      num: 3,
      phaseId: "p1",
      title: "Deploy, Observe, Recover",
      objectives: [
        "Take a service from local to live.",
        "Know when a service is broken and why, using logs and metrics.",
      ],
      taughtClass: "How a service goes live and how you know when it breaks: containers, environments, configuration, logging, and basic observability. The session centres on a live incident walkthrough — a service falls over and you diagnose it together from the logs, the same way a real on-call shift works. Use the self-paced track below to deploy, break, and recover a service of your own.",
      selfPaced: [
        {
          title: "Topic A — Cloud basics on your chosen path (2 hrs)",
          points: [
            "Goal: deploy a hello-world and reach it from a browser. Pick one path, AWS or Cloudflare, for the hands-on work; read enough about the other to know when you would choose it.",
            "Start here: deploy the provided hello-world service to your chosen platform and open its URL.",
            "Cloudflare path, read: 'Get started - CLI' (https://developers.cloudflare.com/workers/get-started/guide/) and the 'First Worker' learning path (https://developers.cloudflare.com/learning-paths/workers/get-started/first-worker/).",
            "Cloudflare path, watch: 'Cloudflare Workers Tutorial - Intro & Deployment' (https://www.youtube.com/watch?v=1gX0uavithA; fallback search: 'Cloudflare Workers deploy tutorial').",
            "AWS path, read: the official AWS getting-started guide for your chosen compute (search 'AWS Lambda getting started' or 'AWS App Runner getting started' at https://docs.aws.amazon.com).",
            "Ask AI (paste into Claude): 'I am deploying my first service to [AWS or Cloudflare]. Explain the deployment model in plain terms, the minimum steps from local code to a public URL, and the three mistakes beginners most often make. Then give me a checklist I can follow.'",
          ],
        },
        {
          title: "Topic B — API design and integration patterns (1–1.5 hrs)",
          points: [
            "Goal: add one clean endpoint to the sample service.",
            "Start here: add an endpoint that takes an input and returns a structured response, and document its inputs and outputs.",
            "Ask AI (paste into Claude): 'Review this endpoint I wrote: [paste]. Critique the input validation, the response shape, the status codes, and the error handling against production norms. Show me a cleaner version and explain each change.'",
          ],
        },
        {
          title: "Topic C — Reading logs and metrics (1.5 hrs)",
          points: [
            "Goal: find a failure in the logs without reading the source.",
            "Start here: trigger an error on purpose in your deployed service, then find it in the logs.",
            "Read: your platform's logging docs (Cloudflare 'Workers logs and observability', or AWS CloudWatch logs basics).",
            "Ask AI (paste into Claude): 'Here is a chunk of logs from my service around the time it failed: [paste]. Walk me through how to read these, what signals point to the root cause, and what I would check next. Do not assume you can see the source code; reason from the logs.'",
          ],
        },
        {
          title: "Topic D — Config, secrets, and environment variables (1 hr)",
          points: [
            "Goal: keep secrets and environment-specific values out of the code.",
            "Start here: move one hardcoded value into an environment variable and confirm the service still runs.",
            "Ask AI (paste into Claude): 'Explain the difference between configuration, environment variables, and secrets for a deployed service. Show me how to manage each on [AWS or Cloudflare], and give me a rule of thumb for deciding which bucket a given value belongs in.'",
          ],
        },
      ],
      deliverable: "Brief: deploy a small service that exposes an API endpoint, break it on purpose, and recover it using only logs and metrics.\n\nRequirements (checklist): deploy a small service to AWS or Cloudflare with a public URL; expose at least one API endpoint; keep config and secrets out of the code (environment variables or a secret store); break it intentionally (a bad config, a missing variable, or a thrown error); diagnose and fix it using only logs and metrics, not by re-reading the code first; and document the incident — what broke, how you found it, how you fixed it.\n\nSuggested steps: deploy the hello-world and confirm the URL works; add your endpoint and move any secrets to env vars, then redeploy; confirm you can see logs and metrics for live requests; break it on purpose and write down the exact change you made; from the logs alone, form a hypothesis, fix, redeploy, and confirm recovery; then write the incident report.\n\nDeliverables: the live URL; the repo; and a short incident write-up — timeline, symptom, diagnosis from logs, fix, confirmation.\n\nStretch (optional): add a basic health-check endpoint and a metric or alert that would have caught the break.\n\nAI Anki option (optional): deploy your Week 1 AI Anki fork as the service for this exercise instead of a hello-world.",
      assessment: "Submit the live URL, the repo, and the incident write-up. Presentation: a 5-minute live demo where you break the service on purpose and recover it in front of the class, narrating what the logs are telling you.\n\nJudged against the course rubric: technical execution (30%) — the service deploys, the endpoint works, secrets are not in the code; handling ambiguity and failure (30%) — how calmly and methodically you diagnose the break from logs; communication (25%) — the incident write-up and the live narration; and ownership (15%) — did you drive the recovery yourself.\n\nDefinition of done: you can break your own service live, and within a few minutes find the cause in the logs and bring it back, while explaining each step to the room.",
    },
    {
      num: 4,
      phaseId: "p2",
      title: "LLM Application Patterns",
      objectives: [
        "Understand how LLM applications work in production.",
        "Treat prompting as engineering, not guesswork.",
        "Reason about cost, latency, and non-determinism.",
      ],
      taughtClass: "How LLM apps actually work. You will watch a small feature get built live on the Claude API — structured prompting, streaming, structured JSON output, error handling, and measuring cost per call — with one recurring theme: the model is the easy part, the system around it is the job. Use the self-paced track below to build a small, reliable feature of your own.",
      selfPaced: [
        {
          title: "Topic A — Prompt design and iteration (1.5–2 hrs)",
          points: [
            "Goal: improve a prompt across versions and measure the change.",
            "Start here: write a prompt that classifies a question's topic, then improve it across three versions, keeping notes on what changed the output.",
            "Read: Anthropic prompt engineering overview (https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview).",
            "Ask AI (paste into Claude): 'I want to treat this prompt like engineering. Here is version 1: [paste]. Critique it for ambiguity, missing constraints, and missing examples. Propose version 2, explain each change, and tell me what test inputs would reveal whether version 2 is actually better.'",
          ],
        },
        {
          title: "Topic B — Reliable structured output (1.5–2 hrs)",
          points: [
            "Goal: get guaranteed-valid JSON and see where naive prompting breaks.",
            "Start here: make the model return strict JSON, then feed it three odd inputs and see where the JSON breaks; then switch to structured outputs.",
            "Read: Claude API 'Structured outputs' (https://platform.claude.com/docs/en/build-with-claude/structured-outputs) and the Anthropic cookbook, 'Extracting structured JSON' (https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/extracting_structured_json.ipynb).",
            "Ask AI (paste into Claude): 'Explain the difference between asking a model nicely for JSON and using structured outputs with a schema. Show me a Python example calling the Claude API with a JSON schema for an object with fields topic (string) and difficulty (enum). Then show me what happens to invalid input and how the schema protects me.'",
          ],
        },
        {
          title: "Topic C — Token economics and cost (1–1.5 hrs)",
          points: [
            "Goal: compute cost per call and reason about it at scale.",
            "Start here: compute the cost per call of your feature, then multiply it out to a million students.",
            "Read: the Claude pricing and token-counting docs (search 'Claude API pricing' and 'token counting' in the Anthropic docs).",
            "Ask AI (paste into Claude): 'My feature sends about [N] input tokens and gets about [M] output tokens per call. Walk me through how to calculate the cost per call, the cost for a million calls a day, and which design choices (shorter prompts, smaller model, caching) would move that number the most.'",
          ],
        },
        {
          title: "Topic D — Handling non-determinism (1 hr)",
          points: [
            "Goal: write code that survives a varying model response.",
            "Start here: call the same prompt five times and write code that handles the variation gracefully.",
            "Ask AI (paste into Claude): 'Here is my code that calls a model and parses the result: [paste]. It assumes the response is always well-formed. Show me how to make it robust: validation, retries with backoff, a fallback path, and clear logging when the model returns something unusable.'",
          ],
        },
      ],
      deliverable: "Brief: build a small LLM feature on the Claude API that returns reliable structured JSON, handles errors, and reports its own cost per call. Pick a Pandai-flavoured task, for example tagging a question by topic and difficulty.\n\nRequirements (checklist): the feature returns structured JSON that conforms to a schema you define; it handles bad or surprising input without crashing; it reports its own cost per call (tokens in, tokens out, dollars); and it includes basic retry or fallback logic for a failed or malformed response.\n\nReliability check (include in submission): one line naming an input that would make your feature produce wrong or malformed output, and what catches it.\n\nSuggested steps: define the task and the output schema; write the prompt and iterate it across at least two versions; switch from free-text parsing to structured outputs; add error handling, retries, and a cost counter; then test against a handful of awkward inputs and record what happens.\n\nDeliverables: the working feature (code); and a short cost note — cost per call and what drives it.\n\nStretch (optional): add prompt caching or a smaller model for part of the work and measure the cost difference.\n\nAI Anki option (optional): build this feature into your Week 1 AI Anki fork by hardening its /generate endpoint — structured outputs, cost per call, and retries.",
      assessment: "Submit the working feature and the short cost note.\n\nJudged against the course rubric: technical execution (30%) — reliability of the structured output and quality of error handling; handling ambiguity and failure (30%) — how the feature behaves on awkward input; communication (25%) — can you explain the cost behaviour of your feature clearly; and ownership (15%) — did you iterate the prompt and test the failure paths, or stop at the first working call.\n\nDefinition of done: your feature returns schema-valid JSON on good input, fails gracefully on bad input, and you can state its cost per call and what would change it.",
    },
    {
      num: 5,
      phaseId: "p2",
      title: "Retrieval and Grounding (RAG)",
      objectives: [
        "Understand why models need grounding and how RAG works end to end.",
        "Evaluate retrieval quality and recognise RAG failure modes.",
      ],
      taughtClass: "RAG from scratch: chunking, embeddings, retrieval, and assembling grounded answers. You will see a RAG system retrieve well, then watch it confidently retrieve the wrong thing — and learn why that happens, because recognising the failure is the real skill. Use the self-paced track below to build your own RAG system and probe where it breaks.",
      selfPaced: [
        {
          title: "Topic A — Build RAG from scratch (2–2.5 hrs)",
          points: [
            "Goal: stand up a minimal chunk, embed, retrieve, generate pipeline.",
            "Start here: follow a from-scratch tutorial end to end on a small corpus before touching your own.",
            "Read: 'Retrieval Augmented Generation (RAG) from Scratch, Tutorial for Dummies' (https://dev.to/zachary62/retrieval-augmented-generation-rag-from-scratch-tutorial-for-dummies-508a).",
            "Code along: pguso, 'rag-from-scratch' on GitHub (https://github.com/pguso/rag-from-scratch).",
            "Ask AI (paste into Claude): 'Walk me through building a minimal RAG pipeline in Python over a folder of text files: chunking, embedding, storing in a vector store, retrieving top-k, and generating a grounded answer with the Claude API. Explain each step as you go and keep the code small enough that I understand every line.'",
          ],
        },
        {
          title: "Topic B — Chunking strategies (1.5 hrs)",
          points: [
            "Goal: see how chunking changes what gets retrieved.",
            "Start here: chunk the same document three ways (fixed, by paragraph, by heading) and compare what gets retrieved for one question.",
            "Read: 'Chunking and Embedding Strategies in RAG' (https://medium.com/@tahir.saeed_46137/chunking-and-embedding-strategies-in-rag-a-guide-to-optimizing-retrieval-augmented-generation-7c95432423b1).",
            "Ask AI (paste into Claude): 'Explain the trade-offs between fixed-size, paragraph, and heading-based chunking for a syllabus document. For each, tell me what kind of question it helps and what kind it hurts, and recommend a starting strategy with a chunk size and overlap for retrieving answers from past exam papers.'",
          ],
        },
        {
          title: "Topic C — Embeddings, vector stores, and measuring retrieval (1.5 hrs)",
          points: [
            "Goal: read similarity scores and judge whether retrieval is working.",
            "Start here: write five questions with known correct sources and check whether retrieval finds them.",
            "Ask AI (paste into Claude): 'I have a RAG system over [describe corpus]. Help me build a tiny retrieval eval: I will give you five questions and the source chunk each should retrieve. Show me how to measure whether the right chunk is in the top-k results, and how to report precision in plain terms so I can tell if a chunking change made retrieval better or worse.'",
          ],
        },
        {
          title: "Topic D — When RAG is the wrong tool (45 min)",
          points: [
            "Goal: recognise when a plain prompt or a lookup wins.",
            "Start here: name one task in your corpus where RAG is overkill and say why.",
            "Ask AI (paste into Claude): 'Give me a decision checklist for when to use RAG versus a plain prompt, a database lookup, or fine-tuning. Then test me: I will describe three tasks and you tell me which approach fits and why.'",
          ],
        },
      ],
      deliverable: "Brief: build a RAG system over a real document corpus, for example a set of past papers or a syllabus. Show where it retrieves well and where it fails, and explain the failures.\n\nRequirements (checklist): a working pipeline that chunks, embeds, stores, retrieves, and generates a grounded answer; at least one example where retrieval clearly works; at least one example where it fails, with your honest explanation of why; and a short written failure analysis.\n\nReliability check (include in submission): one line noting a case where wrong retrieval could mislead the user, and how you would flag low-confidence answers.\n\nSuggested steps: pick a real corpus and decide a chunking strategy; build the indexing pipeline, then the query pipeline; write five test questions with known correct sources and measure whether retrieval finds them; find and document a genuine failure case and diagnose the cause; then write the failure analysis.\n\nDeliverables: the working system (code); and a written failure analysis — where it works, where it fails, and why.\n\nStretch (optional): add a confidence signal (for example a similarity threshold) that flags low-confidence answers instead of guessing.\n\nAI Anki option (optional): point the RAG pipeline at a study corpus and have it generate grounded flashcards into your Week 1 AI Anki fork instead of just answering questions.",
      assessment: "Submit the working system and the written failure analysis. Presentation: a 5-minute demo (recorded or live) that deliberately shows a failure case and your honest read on why it happens.\n\nJudged against the course rubric: technical execution (30%) — the pipeline works end to end and retrieval is reasonable; handling ambiguity and failure (30%) — the honesty and depth of your failure analysis; communication (25%) — can a non-expert follow why it failed; and ownership (15%) — did you dig into a real failure, or only show the happy path.\n\nDefinition of done: your system answers grounded questions over a real corpus, and you can stand in front of a failure case and explain exactly why it retrieved the wrong thing.",
    },
    {
      num: 6,
      phaseId: "p2",
      title: "MCP and Tool Calling",
      objectives: [
        "Understand MCP as the standard protocol for connecting models to tools and data.",
        "Use an existing MCP server, and build a custom one.",
        "Build guardrails so a tool call fails safely, and use Conductor to run agents in parallel.",
      ],
      taughtClass: "Giving a model hands, the standard way. MCP is the problem-solver here: instead of wiring each tool into each application by hand, it is a common protocol so any model can talk to any tool or data source.\n\nLive, you will watch Claude connect to a ready-made MCP server (a filesystem or sample database) and run a multi-step task through it, then see a tiny custom MCP server built from scratch — one tool with a strict schema, an agent loop using it, and a guardrail that stops a clearly bad action. Finally Conductor runs two agents in parallel against the same tools, now that you have parallel work worth orchestrating. Use the self-paced track below to build your own server end to end.",
      selfPaced: [
        {
          title: "Topic A — What MCP is and the problem it solves (1 hr)",
          points: [
            "Goal: explain MCP to someone else in three sentences.",
            "Start here: read the MCP overview and write three sentences on why a shared protocol beats one-off integrations.",
            "Read: Model Context Protocol docs, 'Build an MCP server' intro (https://modelcontextprotocol.io/docs/develop/build-server) and the site overview (https://modelcontextprotocol.io/).",
            "Ask AI (paste into Claude): 'Explain the Model Context Protocol to me as if I am a competent engineer who has never used it. What problem does it solve, what are tools, resources, and prompts, and how does a model actually call a tool through an MCP server? Use a concrete example of a weather tool.'",
          ],
        },
        {
          title: "Topic B — Connect to an existing MCP server (1.5 hrs)",
          points: [
            "Goal: complete a real task through a server you did not build.",
            "Start here: connect Claude to a ready-made MCP server (filesystem or a sample database) and complete one task through it.",
            "Read: DataCamp, 'Model Context Protocol (MCP): A Guide With Demo Project' (https://www.datacamp.com/tutorial/mcp-model-context-protocol).",
            "Ask AI (paste into Claude): 'I want to connect Claude to an existing MCP server (for example the filesystem server). Walk me through installing it, configuring it, and running one task through it end to end. Then explain what just happened at the protocol level.'",
          ],
        },
        {
          title: "Topic C — Build a custom MCP server (2–2.5 hrs)",
          points: [
            "Goal: expose one tool with a strict schema and call it.",
            "Start here: build a server that exposes a single tool with a strict input schema, and call it from Claude.",
            "Read: Towards Data Science, 'Build Your First MCP Server in 6 Steps' (https://towardsdatascience.com/model-context-protocol-mcp-tutorial-build-your-first-mcp-server-in-6-steps/; fallback: the official build-server tutorial linked above).",
            "Ask AI (paste into Claude): 'Help me build a minimal MCP server in Python using FastMCP that exposes one tool: given a student question, return its topic and difficulty. Show the full code, explain the input schema, and show me how to call this tool from Claude. Keep it small enough that I understand every line.'",
          ],
        },
        {
          title: "Topic D — Tool design, guardrails, and Conductor (1.5 hrs)",
          points: [
            "Goal: add a guardrail and run two agents in parallel.",
            "Start here: add a guardrail to your tool that blocks one clearly bad action, then provoke it; then run two agents in Conductor against your tool.",
            "Ask AI (paste into Claude): 'Here is a tool my model can call: [paste]. What could go wrong if the model called it with bad or malicious input? Help me design a guardrail that blocks the clearly bad cases before the action runs, and show me how to test that the guardrail actually holds when provoked.'",
          ],
        },
      ],
      deliverable: "Brief: build a custom MCP server that exposes at least two tools a model can call to complete a real multi-step task, with at least one guardrail that prevents a clearly bad action. Drive it from Claude through an agent loop.\n\nRequirements (checklist): a custom MCP server exposing at least two tools with strict input schemas; the model completes a real multi-step task through the server; at least one guardrail that prevents a clearly bad action and holds when provoked; use Conductor to build and test in parallel, with one line on whether it saved time; and build the server so it can be called by something other than you (it will be triggered by your Week 7 automation).\n\nReliability check (include in submission): one line naming a bad input or action your guardrail must block, and confirming it does when provoked.\n\nSuggested steps: define the multi-step task and the two tools it needs; build the MCP server and its tool schemas; drive it from Claude in an agent loop until the task completes; add and provoke the guardrail; then use Conductor to parallelise the build and note whether it helped.\n\nDeliverables: the MCP server, the tool definitions, and the guardrail; and a short note on what the guardrail blocks plus your one-line Conductor reflection.\n\nStretch (optional): expose a resource (read-only data) in addition to your tools.\n\nAI Anki option (optional): make your MCP tools act on your Week 1 AI Anki fork — for example, add-card and generate-cards tools.",
      assessment: "Submit the MCP server, the tool definitions, the guardrail, the note, and the Conductor reflection. Presentation: a 3-to-5-minute demo (recorded or live) showing the model complete the task through your MCP server, including the guardrail firing when provoked.\n\nJudged against the course rubric: technical execution (30%) — the model completes the task through MCP end to end, with clean tool and schema design; handling ambiguity and failure (30%) — does the guardrail actually work when provoked; communication (25%) — can you explain what your server does and why the schema looks as it does; and ownership (15%) — did you build something callable and reusable, or a one-off.\n\nDefinition of done: a model can complete a real multi-step task through your MCP server, your guardrail blocks the bad action when provoked, and the server is ready to be triggered by an automation next week.",
    },
    {
      num: 7,
      phaseId: "p2",
      title: "Automation with N8N",
      objectives: [
        "Automate a real workflow end to end with N8N.",
        "Trigger work on events and schedules, not manual clicks.",
        "Connect an AI call and a Week 6 MCP agent into an automation, and handle failure gracefully.",
      ],
      taughtClass: "Turning a manual task into an automation that runs itself. You will tour N8N — nodes, triggers, webhooks, and schedules — then watch a workflow get built where an incoming webhook triggers a Claude API call and returns a result, extended to call your Week 6 MCP-backed agent so the two weeks connect into one pipeline. A step then gets broken on purpose to show failure handling — a retry, an error branch, and an alert — because an automation that fails silently is worse than no automation. Use the self-paced track below to automate a real task of your own.",
      selfPaced: [
        {
          title: "Topic A — N8N fundamentals (1.5–2 hrs)",
          points: [
            "Goal: build a webhook-triggered flow that delivers a result somewhere.",
            "Start here: build a flow triggered by a webhook that posts a message to Slack or writes a row to a Google Sheet.",
            "Read: N8N quickstart (https://docs.n8n.io/try-it-out/quickstart/).",
            "Watch: 'n8n Quick Start Tutorial: Build Your First Workflow [2025]' (https://www.youtube.com/watch?v=4cQWJViybAQ; fallback search: 'n8n quick start build your first workflow').",
            "Ask AI (paste into Claude): 'I am new to N8N. Explain nodes, triggers, and how data flows between nodes. Then walk me through building a workflow where a webhook receives a JSON payload and writes selected fields to a Google Sheet, including how to map the fields between nodes.'",
          ],
        },
        {
          title: "Topic B — Connecting an AI call into a flow (1.5 hrs)",
          points: [
            "Goal: add a Claude API call inside a workflow.",
            "Start here: add a Claude API node that processes the incoming data and returns structured output.",
            "Read: N8N 'Build an AI workflow' tutorial (https://docs.n8n.io/advanced-ai/intro-tutorial/).",
            "Ask AI (paste into Claude): 'In N8N, I want a workflow that takes an incoming message, sends it to the Claude API to extract structured fields, and routes the result based on one field. Walk me through the node setup and how to pass data cleanly from the AI node to the next step.'",
          ],
        },
        {
          title: "Topic C — Wiring your Week 6 MCP agent into an automation (1.5 hrs)",
          points: [
            "Goal: trigger your own MCP server from an N8N event.",
            "Start here: trigger your Week 6 server from an N8N event instead of running it by hand.",
            "Ask AI (paste into Claude): 'I have an MCP server from last week that completes a multi-step task. I want N8N to call it when an external event fires. Walk me through the options for exposing my server to N8N (webhook, HTTP request node, or a small wrapper) and the trade-offs of each.'",
          ],
        },
        {
          title: "Topic D — Failure handling in workflows (1–1.5 hrs)",
          points: [
            "Goal: make one step fail and recover gracefully.",
            "Start here: make one step fail on purpose, then add a retry and an error branch that alerts you.",
            "Watch: 'The Ultimate Guide to Webhooks in n8n' (search 'n8n webhooks step by step guide'; Class Central lists a step-by-step version).",
            "Ask AI (paste into Claude): 'In N8N, show me how to handle failure in a workflow: configuring retries on a node, adding an error workflow or error branch, and sending an alert when a step fails. Give me a checklist of failure modes I should design for in any automation that calls an external API.'",
          ],
        },
      ],
      deliverable: "Brief: automate a real manual task end to end in N8N. An external event triggers a flow that calls AI and delivers a result somewhere useful, and handles at least one failure path gracefully.\n\nRequirements (checklist): an external trigger — a webhook, a new row, or an incoming message, not a manual click; the flow calls AI, either your Week 6 MCP agent or a Claude API call; it delivers a result somewhere useful — a Google Sheet, a Slack message, or a database; and it handles at least one failure path gracefully rather than dying silently.\n\nReliability check (include in submission): one line naming the step most likely to fail, and showing what your flow does when it does.\n\nSuggested steps: pick a genuine manual task worth removing; build the trigger and the happy path first and confirm it works end to end; add the AI step (MCP agent or Claude API); break a step on purpose and add a retry, an error branch, and an alert; then write the note on the manual task removed and the failure handling.\n\nDeliverables: the exported N8N workflow; and a short note on the manual task it removes and how it handles failure.\n\nStretch (optional): add a schedule trigger so the automation also runs on a timer, not only on events.",
      assessment: "Submit the exported N8N workflow and the short note. Presentation: a 3-to-5-minute demo (recorded or live) triggering the automation live and showing the failure path in action.\n\nJudged against the course rubric: technical execution (30%) — the automation completes end to end on a real trigger; handling ambiguity and failure (30%) — failure is handled, not ignored; communication (25%) — can you explain the manual task removed and why it matters; and ownership (15%) — did you automate something genuinely useful, or a toy.\n\nDefinition of done: a real event fires your workflow, it calls AI and delivers a useful result, and when a step fails it retries or alerts instead of dying silently.",
    },
    {
      num: 8,
      phaseId: "p3",
      title: "Scoping Ambiguity",
      objectives: [
        "Turn a vague business problem into a concrete technical plan.",
        "Find the real problem behind the stated one.",
        "Say no to the wrong solution.",
      ],
      taughtClass: "Live scoping drills. You will work one-line briefs like 'we want to use AI' or 'fix our support load' the way they actually arrive — finding the real problem behind the stated one, asking the right questions, and shaping a plan. You will also see how to push back on a bad request without losing the customer. Use the self-paced track below to turn a vague brief into a scoping document of your own.",
      selfPaced: [
        {
          title: "Topic A — Problem framing and clarifying questions (1.5–2 hrs)",
          points: [
            "Goal: turn a vague brief into the right ten questions.",
            "Start here: take a vague brief and write the ten questions you would ask before writing any code.",
            "Read: DesignGurus, 'How to Handle Ambiguity, Clarify Requirements Before Designing' (https://designgurus.substack.com/p/how-to-handle-ambiguity-in-system) and LinkedIn, 'How do you define scope with ambiguous requirements' (https://www.linkedin.com/advice/3/how-do-you-define-scope-project-ambiguous-unclear).",
            "Ask AI (paste into Claude): 'Act as an experienced forward deployed engineer. Here is a one-line customer brief: \"we want to use AI to help our students\". Show me how you would interrogate it: the clarifying questions you would ask, in priority order, and what answer to each would change about the solution. Then role-play: you be a vague customer and I will practise asking the questions.'",
          ],
        },
        {
          title: "Topic B — The real problem vs the stated request (1.5 hrs)",
          points: [
            "Goal: separate what the customer asked for from what they need.",
            "Start here: for one brief, write the stated request and the likely real need side by side.",
            "Ask AI (paste into Claude): 'Here is a customer request: [paste]. Give me three different underlying problems this request might really be about, and for each, the question I would ask to find out. Then tell me which one would not need AI at all, and how I would say that to the customer without sounding unhelpful.'",
          ],
        },
        {
          title: "Topic C — Writing the scoping document (1.5–2 hrs)",
          points: [
            "Goal: produce a clear, concrete scoping document.",
            "Start here: use the provided scoping template and fill it for a sample brief.",
            "Ask AI (paste into Claude): 'Here is my draft scoping document for a vague brief: [paste]. Review it as a skeptical engineering manager. Is the real problem clearly stated, is the plan concrete and realistic, are the assumptions explicit, and is the what-we-will-not-build section thoughtful? Tell me where it is hand-wavy and how to tighten it.'",
          ],
        },
        {
          title: "Topic D — Linking technical work to a business outcome (1 hr)",
          points: [
            "Goal: connect the build to something a non-engineer cares about.",
            "Start here: finish the sentence 'this is worth building because the customer will be able to...' for your brief.",
            "Ask AI (paste into Claude): 'I am scoping this project: [describe]. Help me articulate the business outcome in terms a non-technical decision-maker cares about (time saved, cost reduced, students reached, risk lowered). Give me three ways to phrase the value, each anchored to a number I could try to estimate.'",
          ],
        },
      ],
      deliverable: "Brief: given a deliberately vague one-line brief, produce a scoping document that states the real problem, a proposed plan, the assumptions made, and explicitly what you would not build.\n\nRequirements (checklist): the real problem, stated clearly, not the surface request; a concrete, realistic proposed plan; the assumptions you are making, listed explicitly; a thoughtful what-we-will-not-build section; and a clear link from the work to a business outcome a non-engineer cares about.\n\nSuggested steps: read the brief and resist the urge to design — write your clarifying questions first; hypothesise the real problem behind the stated one; draft the plan, the assumptions, and the out-of-scope list; pressure-test it with the Topic C prompt; then prepare to defend it against a customer who keeps changing the ask.\n\nDeliverables: the scoping document (Google Docs).\n\nStretch (optional): include a one-paragraph 'what we would do in phase 2' to show you can sequence, not just scope.",
      assessment: "Submit the scoping document. Presentation: defend your scope in class while the instructor plays a customer who keeps changing the ask.\n\nJudged against the course rubric: technical execution (30%) — is the plan concrete and realistic; handling ambiguity and failure (30%) — did you find the real problem rather than solving the surface request, and how did you hold your scope under pressure; communication (25%) — is the document clear, and can you defend it without getting defensive; and ownership (15%) — did you take a position, including saying no where needed.\n\nDefinition of done: a reader who has only seen the one-line brief can read your document and understand the real problem, what you will build, what you will not, and why — and you can defend that scope when a customer pushes.",
    },
    {
      num: 9,
      phaseId: "p3",
      title: "Integration and the Messy Real World",
      objectives: [
        "Integrate into systems you do not control.",
        "Work around legacy constraints and bad documentation.",
      ],
      taughtClass: "Customer environments are fragmented, undocumented, and resistant to change. You will walk through a real integration, including the workarounds that never appear in any tutorial, with one lesson underneath it: adapt to the customer's reality rather than forcing them to fit your product. Use the self-paced track below to integrate two systems that were never designed to talk to each other.",
      selfPaced: [
        {
          title: "Topic A — Integration patterns for messy systems (1.5 hrs)",
          points: [
            "Goal: choose an integration approach given limited access.",
            "Start here: pick two services and sketch how data would move between them without a direct API.",
            "Ask AI (paste into Claude): 'I need to integrate two systems. System A only offers a daily CSV export to an FTP folder. System B has a REST API. Walk me through realistic integration patterns given these constraints, the trade-offs of each, and how I would make it reliable when the export is late or malformed.'",
          ],
        },
        {
          title: "Topic B — Authentication patterns (2 hrs)",
          points: [
            "Goal: understand and use API keys, OAuth, JWT, and webhook verification.",
            "Start here: authenticate to one real service using each of two different methods.",
            "Watch: 'API Authentication EXPLAINED! OAuth vs JWT vs API Keys' (https://www.youtube.com/watch?v=GcVtElYa17s).",
            "Read: WorkOS, 'What Is API Authentication: a guide to OAuth 2.0, JWT, and key methods' (https://workos.com/blog/what-is-api-authentication-a-guide-to-oauth-2-0-jwt-and-key-methods) and Hookdeck, 'Webhook authentication strategies' (https://hookdeck.com/webhooks/guides/what-are-the-webhook-authentication-strategies).",
            "Ask AI (paste into Claude): 'Explain API keys, OAuth 2.0, JWT, and webhook signature verification (HMAC) to me with one concrete example each. For each, tell me where the secret lives, what the main security risk is, and when I would choose it. Then quiz me with three scenarios and I will pick the right method.'",
          ],
        },
        {
          title: "Topic C — Legacy constraints and partial access (1 hr)",
          points: [
            "Goal: plan an integration when you cannot change the other system.",
            "Start here: write down what you would do if the system you must integrate with has read access only.",
            "Ask AI (paste into Claude): 'I have to integrate with a legacy system I cannot modify, with read-only access and no sandbox. Give me a defensive integration checklist: how to avoid breaking it, how to handle its failures, how to test safely, and how to detect when its data changes shape underneath me.'",
          ],
        },
        {
          title: "Topic D — Documenting workarounds (45 min)",
          points: [
            "Goal: write workaround notes the next person can survive on.",
            "Start here: write a three-line note (what, why, what to watch) for every workaround you make.",
            "Ask AI (paste into Claude): 'Here is a workaround I built: [describe]. Help me write a clear three-line note for the next engineer: what the workaround does, why it was necessary, and what to watch out for or revisit later. Make it something a stranger could act on.'",
          ],
        },
      ],
      deliverable: "Brief: integrate two systems that were not designed to talk to each other, using N8N, a webhook, or custom code, and document every workaround.\n\nRequirements (checklist): two systems integrated — for example push a result from an AI step into a Google Sheet, a Slack message, or a database, triggered by an external event; at least one real authentication step (API key, OAuth, JWT, or verified webhook); every workaround documented with the three-line note (what, why, what to watch); and evidence you adapted to constraints rather than wishing them away.\n\nSuggested steps: pick two systems and the data that must move between them; decide the integration pattern and the auth method; build the happy path and confirm data moves correctly; hit the inevitable snag and build and document the workaround; then write the workaround documentation.\n\nDeliverables: the working integration; and the workaround documentation.\n\nStretch (optional): add a check that detects when the other system's data changes shape, before it breaks your flow.",
      assessment: "Submit the working integration and the workaround documentation.\n\nJudged against the course rubric: technical execution (30%) — the integration works and the auth is correct; handling ambiguity and failure (30%) — did you adapt to constraints rather than complaining about them; communication (25%) — quality of the workaround documentation, could a stranger act on it; and ownership (15%) — did you push through the messy part instead of stopping at the clean API that did not exist.\n\nDefinition of done: data moves correctly between two systems that were not built to connect, the auth is sound, and your workaround notes would let the next engineer maintain it without calling you.",
    },
    {
      num: 10,
      phaseId: "p3",
      title: "Customer-Facing Communication and Capstone Scoping",
      objectives: [
        "Explain technical tradeoffs to non-technical people, build trust, and deliver bad news well.",
        "Build a clean, honest deck a non-technical decision-maker can follow.",
        "Scope your own capstone with your mentor before the build weeks begin.",
      ],
      taughtClass: "The skill that gets faked the most and exposed the fastest: running a customer meeting, framing tradeoffs for a mixed audience, building trust, and feeding field insight back to the product team. You will see a good and a bad version of the same conversation, build slides in Google Slides with Gemini drafting and tightening the message, and work local context — communicating across English, Bahasa Malaysia, and Mandarin business settings.\n\nThe last 20 minutes pair you with your capstone mentor to agree scope, so Weeks 11 and 12 are pure build and ship. Use the self-paced track below to prepare your recommendation and apply the Week 8 scoping template to your own capstone.",
      selfPaced: [
        {
          title: "Topic A — Communicating to technical and non-technical audiences (1.5–2 hrs)",
          points: [
            "Goal: explain a technical decision so a non-engineer follows and believes it.",
            "Start here: explain one technical tradeoff from an earlier week to a non-engineer in five sentences.",
            "Read: Stanford Online, '10 Tips for Communicating Technical Ideas to Non-Technical People' (https://online.stanford.edu/10-tips-communicating-technical-ideas-non-technical-people) and Lucidchart, 'How to Explain Technical Ideas to a Non-Technical Audience' (https://www.lucidchart.com/blog/how-to-explain-technical-ideas-to-a-non-technical-audience).",
            "Ask AI (paste into Claude): 'I need to explain this technical decision to a non-technical school administrator: [paste]. Rewrite it as five plain sentences that lead with the benefit, use one everyday analogy, and end with a clear recommendation. Then tell me which sentence a busy executive would remember and why.'",
          ],
        },
        {
          title: "Topic B — Framing tradeoffs and managing expectations (1.5 hrs)",
          points: [
            "Goal: present a real tradeoff and a recommendation.",
            "Start here: turn one technical tradeoff (cost vs quality, or speed vs safety) into a single slide.",
            "Ask AI (paste into Claude): 'I have a tradeoff: a cheaper model that is faster but less accurate, versus a frontier model that is slower and pricier. Help me frame this for a mixed audience of one executive and one engineer: the options, what each costs and buys, and a clear recommendation with a reason. Keep it to what fits on one slide.'",
          ],
        },
        {
          title: "Topic C — Delivering bad news (1 hr)",
          points: [
            "Goal: write a clear, early bad-news message with a path forward.",
            "Start here: write the message you would send when a deadline is about to slip.",
            "Ask AI (paste into Claude): 'A deployment I promised for Friday will slip to the following Wednesday because of an integration issue outside my control. Help me write the message to the customer: honest, early, no excuses, with the new date and what I am doing about it. Then show me the version that would damage trust, so I can see the difference.'",
          ],
        },
        {
          title: "Topic D — The deck and capstone scoping (1.5–2 hrs)",
          points: [
            "Goal: a clean deck, and an agreed capstone scope.",
            "Start here: draft your recommendation deck in Google Slides; then apply the Week 8 scoping template to your assigned capstone and agree it with your mentor.",
            "Ask AI (paste into Claude or Gemini): 'Here is the message of my recommendation deck: [paste]. Help me tighten each slide to pass the glance test (graspable in five seconds), cut jargon, and make sure every slide has one clear point. Then review my capstone scope for whether it is realistic in two weeks at about 20 hours per week.'",
          ],
        },
      ],
      deliverable: "Brief: two deliverables. First, present a technical recommendation to a mock customer plus a leadership audience, involving a real tradeoff. Second, an agreed one-page capstone scope.\n\nRequirements (checklist): a recommendation that involves a real tradeoff (for example cost vs quality, or speed vs safety); a clean Google Slides deck that passes the glance test; a one-page written brief of the recommendation; and an agreed capstone scope — the problem, the plan, the assumptions, and what you will not build, signed off by your mentor.\n\nSuggested steps: pick the recommendation and the tradeoff; build the deck and tighten it with Gemini and the glance test; rehearse the live delivery, including the bad-news framing if relevant; and in parallel, scope your capstone with your mentor and get it agreed.\n\nDeliverables: the slide deck and the one-page written brief; and the agreed capstone scope.",
      assessment: "Submit the slide deck, the one-page written brief, and the agreed capstone scope. Presentation: the live recommendation, scored on clarity and trust, not just technical correctness — the test is whether a non-technical person in the room can follow the decision and believe in it.\n\nJudged against the course rubric: technical execution (30%) — is the recommendation technically sound and the tradeoff real; handling ambiguity and failure (30%) — how you handle pushback and questions you cannot fully answer; communication (25%) — clarity and trust, could a non-technical decision-maker follow and believe it; and ownership (15%) — did you take a clear position and own the recommendation.\n\nDefinition of done: a non-technical person in the room can follow your recommendation, understand the tradeoff, and believe your call — and you walk out of the week with a capstone scope your mentor has agreed is realistic.",
    },
    {
      num: 11,
      phaseId: "p4",
      title: "Build in Place",
      objectives: [
        "Own a real deployment end to end.",
        "Apply every prior week under real conditions.",
      ],
      taughtClass: "Capstone confirmation and kickoff. Your scope was already agreed in Week 10, so this session locks the deadline, confirms access, and names the one thing that would make this capstone a failure if it slipped. Suitable capstones include a messaging-based learning helper on N8N, a RAG assistant over curriculum content, an internal automation that removes a manual task, or a small agent that supports customer success — and your mentor pressure-tests the scope one more time, cutting anything that will not fit in two weeks. Use the self-paced track below to build, integrate, and deploy across the full toolchain.",
      selfPaced: [
        {
          title: "The toolchain — real delivery, not videos",
          points: [
            "This is not self-learn from videos; it is real delivery using everything from Weeks 1 to 10.",
            "Build: Claude Code and Conductor.",
            "Tools for the model: an MCP server (Week 6).",
            "Version control: GitHub, with clean PRs and CI.",
            "Deploy: AWS or Cloudflare (Week 3).",
            "Integrate and automate: N8N (Weeks 7 and 9).",
            "Prove it works: reliability checks (the one-line failure check applied seriously), then operate it from a runbook.",
          ],
        },
        {
          title: "Working rhythm",
          points: [
            "Build the smallest end-to-end slice first; get something real working before adding scope.",
            "Keep a running log of decisions and walls hit; it becomes your Week 12 postmortem.",
            "When stuck, bring the mentor a specific, well-framed question, not 'it does not work'.",
          ],
        },
        {
          title: "Prompts to keep moving",
          points: [
            "Unblocking with Claude Code (paste in the repo): 'I am stuck on [specific symptom]. Here is what I have tried: [list]. Here are the relevant files and the error: [paste]. Diagnose the most likely cause, propose the smallest fix, and tell me how to verify it. Do not refactor beyond what is needed.'",
            "Scoping a slice (paste into Claude): 'Here is my capstone scope and my deadline: [paste]. Break it into end-to-end slices, smallest first, so I always have something working. For each slice, tell me what \"done\" looks like and what I can safely defer.'",
            "Writing the runbook (paste into Claude): 'My deployed system does [describe]. Help me write a runbook: how to start and stop it, the config and secrets it needs, the three most likely failures and how to recover from each, and who to contact. Keep it to one page that a tired on-call person could follow.'",
          ],
        },
      ],
      deliverable: "Brief: a working deployment in a real environment, with reliability checks and a runbook.\n\nRequirements (checklist): the system is deployed and works in a real environment; it is built with the real toolchain (Claude Code, GitHub, an MCP server where relevant, AWS or Cloudflare, N8N); reliability checks show it works and name where it can fail; a one-page runbook covers operation and recovery; and scope was held — what you said you would not build, you did not build.\n\nMid-capstone review (mid-week, with the mentor): show the working slice so far, surface blockers early, and confirm the deadline is still realistic or re-scope now, not in Week 12.\n\nDeliverables: the deployed system, the repo, the reliability checks, and the runbook.",
      assessment: "Assessment is carried into Week 12. The capstone is assessed on the full course rubric (technical execution 30%, handling ambiguity and failure 30%, communication 25%, ownership 15%), weighted most heavily, plus the three capstone questions answered in Week 12: did the deployment actually work in a real environment; was the postmortem honest about what went wrong; were the reusable patterns genuinely useful to the next person.\n\nDefinition of done for Week 11: a real system is deployed and working in a real environment, you held your scope, and you have a runbook and reliability checks ready to present and defend in Week 12.",
    },
    {
      num: 12,
      phaseId: "p4",
      title: "Ship and Defend",
      objectives: [
        "Present and defend real work.",
        "Reflect on failure honestly.",
        "Bring reusable patterns back to the team.",
      ],
      taughtClass: "You present your deployment to stakeholders, defend your decisions under questioning, and walk through one production failure you hit and how you recovered. This is the capstone's public exam — the work speaks, and so does how honestly you account for it. Use the self-paced track below to prepare your demo, your postmortem, and the reusable patterns you bring back to the team.",
      selfPaced: [
        {
          title: "Prepare your demo and defence (~12–15 min each)",
          points: [
            "The problem and the scope (2 min): what the deployment is, who owns it, and the scope you agreed, including what you chose not to build.",
            "Live demo (4 min): show it working in the real environment — real data, real trigger, real result.",
            "The decisions (3 min): two or three real decisions and the tradeoffs behind them (a model choice, an integration approach, a guardrail). Be ready to defend each.",
            "One production failure (3 min): walk one real failure you hit and how you recovered. This is the most valuable part; do not hide it.",
            "Reusable patterns (2 min): one or two patterns you found that would help the next deployment.",
            "Defence: the panel probes the decisions, the failure, and the limits of the system.",
          ],
        },
        {
          title: "The postmortem (blameless)",
          points: [
            "What a good postmortem contains: a short summary of what you built and how it went; a timeline of the significant moments, including the failure; the root cause of the main failure, honestly, focused on the system not the blame; what went well, what went badly, and where you got lucky; and what you would do differently next time.",
            "Read: Google SRE, 'Postmortem Culture: Learning from Failure' (https://sre.google/sre-book/postmortem-culture/) for the blameless framing and structure.",
            "Ask AI (paste into Claude): 'Help me write a blameless postmortem for my capstone. Here are my notes on what I built, the timeline, and the main failure I hit: [paste]. Structure it as summary, timeline, root cause, what went well, what went badly, and what I would do differently. Keep it honest and focused on the system, not on blaming myself, and make the lessons concrete enough that the next engineer benefits.'",
          ],
        },
        {
          title: "Reusable patterns",
          points: [
            "A pattern is a problem plus a reusable approach: 'when you need X in this kind of system, do Y, and watch out for Z.'",
            "Examples: a reliable prompt structure, an integration workaround that generalises, a guardrail design, an N8N error-handling pattern.",
            "Ask AI (paste into Claude): 'Here is what I built and the problems I solved along the way: [paste]. Help me extract two or three reusable patterns the next engineer could apply. For each, state the problem it solves, the approach, and the pitfall to avoid. Write each so someone who did not do my project could use it.'",
          ],
        },
      ],
      deliverable: "Brief: present and defend your capstone to the full panel — a live demo and defence, a short written postmortem, and a list of reusable patterns.\n\nDeliverables: the final demo and defence (presented live to the panel); a short written postmortem; and a list of reusable patterns discovered that could help the next deployment.",
      assessment: "Submit the final demo and defence (live to the panel), the written postmortem, and the reusable-patterns list.\n\nThe capstone is the real exam, weighted most heavily. The full course rubric applies — technical execution (30%), handling ambiguity and failure (30%), communication (25%), ownership (15%) — plus the three capstone questions: did the deployment actually work in a real environment; was the postmortem honest about what went wrong; were the reusable patterns genuinely useful to the next person.\n\nGraduation: you graduate as a deployable AI FDE when you have shipped a working deliverable every week, behaved calmly and competently during at least one real failure, passed the capstone with a working deployment and an honest postmortem, and shown you can explain technical decisions to a non-technical audience. Strong technically but weak on ambiguity or communication does not graduate as field-ready; you get a development plan and a path to retry.\n\nDefinition of done: you stood in front of a panel, demonstrated a real working deployment, defended your decisions under questioning, told the truth about what broke, and left behind a postmortem and patterns the next person can actually use.",
    },
  ],

  landscape: {
    title: "Model Landscape Session",
    intro: "Claude is the primary model throughout the course so you go deep rather than wide. But a real FDE must understand the broader landscape, because customers arrive with different constraints, budgets, and existing commitments. A dedicated self-paced session, run between Phase 2 and Phase 3, with a group debrief.",
    objectives: [
      "Understand the major categories: proprietary frontier models, open-weight models, and small or specialised models.",
      "Reason about tradeoffs that drive model choice: capability, cost, latency, context length, data residency, and licensing.",
      "Build a defensible model selection for a given scenario rather than defaulting to one option.",
    ],
    tasks: [
      "Pick three different models from different providers, including at least one open-weight model.",
      "Run the same realistic task across all three plus Claude.",
      "Measure cost per call, latency, and output quality on a small eval set.",
      "Write a one-page recommendation for two contrasting scenarios: a cost-sensitive, high-volume deployment (e.g. messaging integration), and a complex reasoning deployment where a frontier model is justified.",
    ],
    closer: "There is no single best model, only the best model for a given set of constraints. If you can only reach for one model, you will lose deployments that a more flexible engineer would win.",
  },

  assessment: {
    intro: "There are no written exams. FDE readiness is demonstrated, not tested on paper.",
    weekly: [
      "Did it ship and work?",
      "How did you behave when it broke or the brief was unclear?",
      "Could you explain it to a non-engineer?",
    ],
    rubric: [
      { dim: "Technical execution", weight: "30%", desc: "Does the work function correctly and to production standard?" },
      { dim: "Handling ambiguity and failure", weight: "30%", desc: "Behaviour when the brief is vague or the system breaks." },
      { dim: "Communication", weight: "25%", desc: "Clarity to technical and non-technical audiences." },
      { dim: "Ownership", weight: "15%", desc: "Did you drive it to done, or wait to be carried?" },
    ],
    graduation: [
      "Shipped a working deliverable every week.",
      "Demonstrated calm and competent behaviour during at least one real failure.",
      "Passed the capstone with a working deployment and an honest postmortem.",
      "Shown you can explain technical decisions to a non-technical audience.",
    ],
    note: "If you are strong technically but weak on ambiguity or communication, you do not graduate as field-ready. You are given a development plan and a path to retry, because these are the traits the role cannot do without.",
  },

  glossary: [
    // --- The role and the craft ---
    { term: "FDE", def: "Forward Deployed Engineer. An engineer who embeds with a customer to build, deploy, and operate production-grade solutions in place — and stays until they work." },
    { term: "FDE craft", def: "The non-technical skills that separate field-ready engineers from pure coders: scoping vague problems, staying calm in broken systems, owning delivery end to end, and communicating with customers." },
    { term: "The four muscles", def: "The course's core competencies: (1) ship production code, not coursework; (2) stay functional inside ambiguous, broken, or incomplete systems; (3) translate between human problems and technical plans, then defend the call to a customer; (4) supervise the AI agents that do the work — brief them, review their output, guardrail them, and never blindly trust them." },
    { term: "Discovery", def: "The investigative phase where an FDE learns a customer's real needs, constraints, and context before proposing any solution." },
    { term: "Scoping", def: "Turning a vague business problem into a concrete technical plan with explicit assumptions, boundaries, and a clear 'what we will not build.'" },
    { term: "Stakeholder", def: "A customer, product manager, or decision-maker affected by a deployment; FDEs must present technical tradeoffs to mixed, often non-technical, audiences." },
    { term: "Production-grade", def: "Code that is tested, logged, configured for multiple environments, protects its secrets, and is built to recover from failure — as opposed to coursework." },
    { term: "Runbook", def: "A document describing how to operate and recover a deployed system, so it can be handed off to operations or a future engineer." },
    { term: "Postmortem", def: "An honest written reflection on a real failure — what broke, how it was recovered, and what was learned. Assessed for honesty, a core FDE skill." },
    { term: "Incident", def: "A documented production failure and its recovery; Week 3 has you deliberately break a deployed service and diagnose it using only logs and metrics." },
    { term: "Workaround", def: "A non-ideal integration pattern forced by legacy constraints or bad docs; the FDE move is to adapt to customer reality and document it for the next engineer." },
    { term: "Reliability check", def: "A one-line statement, required on every Phase 2 deliverable, naming one failure mode and what catches it — so systems are built expecting failure." },
    { term: "Capstone", def: "The final exam (Weeks 11–12): a real, scoped internal Pandai deployment with a real owner and a real deadline." },
    { term: "Mentor", def: "An experienced FDE paired one-to-one with each intern for the program — there to unblock, not to rescue." },

    // --- AI / LLM concepts ---
    { term: "LLM", def: "Large Language Model. The text-generation model at the foundation of everything built in the course." },
    { term: "Agent", def: "A system where a model takes multi-step actions using tools to complete a task, rather than answering in a single shot." },
    { term: "Agentic work", def: "Multi-step reasoning and decision-making where a model plans and acts over several turns; the kind of task that benefits from a more capable model tier." },
    { term: "Tool calling", def: "A model invoking external functions or services to act in the world, then using the results to continue. The mechanism behind agents." },
    { term: "Prompt engineering", def: "The disciplined practice of writing, testing, and iterating prompts to make model output reliable — treated as engineering, with versioning and measurement." },
    { term: "Prompt design", def: "The anatomy of an effective prompt: role, task, context, format instructions, examples, and constraints." },
    { term: "System prompt", def: "The instruction that sets a model's role and standing rules for a conversation, separate from the user's turn-by-turn input." },
    { term: "Context window", def: "The maximum amount of text, measured in tokens, a model can consider at once; larger windows enable longer-horizon work." },
    { term: "Token", def: "The atomic unit of text a model processes. Cost and latency are both measured per token, which makes token economics central to scaling." },
    { term: "Token economics", def: "Reasoning about how input and output token counts drive cost per call — and what that becomes at the scale of millions of users." },
    { term: "Temperature", def: "A setting that controls how random or focused a model's output is; lower values give more deterministic, repeatable responses." },
    { term: "Structured output", def: "Constraining a model's response to a defined JSON schema so it is guaranteed valid and parseable, instead of parsing free text." },
    { term: "Streaming", def: "Returning a model's output token-by-token as it generates, improving how fast a response feels to the user." },
    { term: "Hallucination", def: "A model confidently producing false or fabricated information not grounded in its input — the core risk that RAG is meant to reduce." },
    { term: "Grounding", def: "Forcing a model to answer from retrieved source documents rather than its training data, so claims are traceable and accurate." },
    { term: "Non-determinism", def: "The property that the same input can yield slightly different model outputs, which is why production systems need validation and graceful handling." },
    { term: "Fine-tuning", def: "Further training a base model on custom data. Not a focus of this course, which favors prompting and RAG over retraining." },

    // --- RAG and retrieval ---
    { term: "RAG", def: "Retrieval Augmented Generation. Retrieving relevant documents and putting them in the prompt so the model's answer is grounded in real source material." },
    { term: "Embedding", def: "A vector representation of text that captures meaning, so semantically similar content sits close together and can be found by similarity search." },
    { term: "Vector store", def: "A database optimized for storing embeddings and finding the nearest ones; it powers the retrieval step of a RAG system." },
    { term: "Chunking", def: "Splitting documents into smaller passages (commonly a few hundred tokens, with overlap) before embedding; how you chunk changes what gets retrieved." },
    { term: "Retrieval quality", def: "Whether the correct source actually appears in the top results for a query — the make-or-break measure of a RAG system." },

    // --- Evaluation ---
    { term: "Eval", def: "A structured, repeatable way to measure whether a model or system is good enough to ship — usually on quality, cost, and latency together." },
    { term: "Eval set", def: "A curated collection of test cases with known-good answers, used to measure output quality and decide when a system is ready." },
    { term: "Evaluation harness", def: "The test framework that runs an eval set against a system to produce evidence for ship/no-ship decisions." },
    { term: "Guardrail", def: "A control that stops a model or agent from taking an unsafe or clearly wrong action before it executes." },
    { term: "Failure mode", def: "A specific way a system can break — e.g. a bad chunk boundary, an ambiguous query, or distracting context — that you design against explicitly." },

    // --- Tools and platforms used in the course ---
    { term: "Claude", def: "The primary model family used throughout the course; its Opus, Sonnet, and Haiku tiers trade off capability, cost, and latency." },
    { term: "Claude API", def: "The programmatic interface for building LLM features — structured outputs, streaming, token counting — used from Week 4 on." },
    { term: "Claude Code", def: "Anthropic's coding-partner agent, run in the terminal and VS Code, used throughout the course (with deliberate 'no agent' tasks to build supervision judgment)." },
    { term: "Conductor", def: "A tool for running and orchestrating multiple Claude Code agents in parallel, introduced once there is enough agentic work to parallelize." },
    { term: "MCP", def: "Model Context Protocol. A standard for connecting models to external tools and data, exposing tools (functions), resources (data), and prompts." },
    { term: "MCP server", def: "A service that implements MCP to expose tools, resources, or prompts to a model; Week 6 covers both using existing servers and building your own." },
    { term: "N8N", def: "A visual workflow-automation platform used as the integration backbone for AI features, wiring triggers, model calls, and actions with failure handling." },
    { term: "Gemini", def: "Google's model, used in the course inside Google Workspace for quick data views in Sheets and for drafting and tightening Slides." },
    { term: "Google Workspace", def: "Docs, Sheets, and Slides (with Gemini), used heavily from the scoping and communication weeks onward for customer-facing work." },
    { term: "VS Code", def: "The course's primary editor, where Claude Code integrates via extension." },
    { term: "GitHub", def: "Where every weekly deliverable is submitted — each intern keeps a public 'training-ai-fde' repository." },
    { term: "GitHub Actions", def: "GitHub's CI system; Week 1 has you read real pipelines that pass and fail on a pull request." },
    { term: "AWS", def: "Amazon Web Services; one of the two deployment targets offered in Week 3, chosen when you need heavier compute." },
    { term: "Cloudflare Workers", def: "An edge deployment platform; the other Week 3 target, chosen when low latency and global reach matter more than compute." },

    // --- Engineering and delivery practice ---
    { term: "API", def: "Application Programming Interface. A contract for how systems talk to each other, with defined inputs, outputs, and status codes." },
    { term: "Endpoint", def: "A specific URL path that exposes one action of a service; Week 3 ships a service with at least one documented endpoint." },
    { term: "Webhook", def: "A callback URL fired by an external event, used to trigger automated workflows on incoming data." },
    { term: "Authentication", def: "Proving identity to a system; integration work covers OAuth, JWT, API keys, and webhooks." },
    { term: "OAuth / JWT / API key", def: "Common auth mechanisms — OAuth and JWT are token-based, an API key is a static credential — chosen per integration." },
    { term: "Secrets management", def: "Keeping sensitive values like API keys out of source code, in environment variables or a secret store, and out of git history." },
    { term: "Environment variable", def: "A configuration value held outside the code (e.g. ANTHROPIC_API_KEY), so the same code runs across dev, staging, and production." },
    { term: "Environments", def: "Separate execution contexts — development, staging, production — with different configuration and a real cost of failure in prod." },
    { term: "CI/CD", def: "Continuous Integration / Continuous Deployment. Automated pipelines that test and ship code, seen here via GitHub Actions." },
    { term: "Pull request", def: "A GitHub proposal to merge code changes, reviewed before landing; Week 1 is about opening clean PRs and responding to feedback." },
    { term: "Branching", def: "Developing on isolated git branches and merging back, keeping a clean, readable history." },
    { term: "Latency", def: "The time from request to response; one of the three axes (with cost and quality) for choosing a model or design." },
    { term: "Observability", def: "Being able to understand a running system from the outside via logs and metrics, without reading its source." },
    { term: "Logs", def: "The time-ordered record of what a system did, used to diagnose failures in production." },
    { term: "Metrics", def: "Numeric measures of system health — request counts, error rates — read alongside logs to find what went wrong." },
    { term: "Retry / timeout", def: "Patterns for surviving transient failures: retrying a failed call and bounding how long you wait for one." },
    { term: "Schema", def: "The defined shape of data — a database schema, or a JSON schema that constrains model output to a guaranteed structure." },
    { term: "SQL", def: "The query language for relational data; Week 2 covers joins, window functions, CTEs, subqueries, and query optimization on real data." },
    { term: "CTE", def: "Common Table Expression. A named, temporary result set inside a SQL query that makes complex transformations readable." },
    { term: "Window function", def: "A SQL feature that computes across a set of rows related to the current one, without collapsing them into a group." },
    { term: "Index", def: "A database structure that speeds up lookups on specific columns; the usual first fix for a slow query." },
    { term: "Data quality", def: "Whether data can be trusted — checking for nulls, duplicates, wrong types, and out-of-range values before building on it." },

    // --- Program context ---
    { term: "Cohort", def: "The small group of interns (3–6) who go through the program together; kept small to protect the one-to-one mentorship ratio." },
    { term: "Pandai scale", def: "The course's reference for production volume — serving millions of students — used to pressure-test whether a cost or design holds up." },
    { term: "Mid-course checkpoint", def: "A half-day review at the end of Week 7 that checks every Phase 2 deliverable for trend and assigns remediation before the craft phase begins." },
  ],
};
