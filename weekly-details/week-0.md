# Week 0: Setup and Diagnostic

**Phase:** 0, Setup
**Class owner:** You + AI Engineer
**Time budget:** Setup ~3 to 4 hrs, diagnostic ~1 hr (ungraded). You do this before the course officially starts.

## Purpose

Get every tool installed and authenticated so you don't lose Week 1 to a broken environment, stand up the one place you submit every assessment (a public GitHub repository), and take a light, ungraded reading of where you actually start. This week is deliberately light: you only set up the tools the early weeks need. Conductor, the MCP SDK, the vector store, and N8N are provisioned later, just before the weeks that use them.

## Learning objectives

By the end of Week 0 you can:

- Open VS Code, use its integrated terminal, and run commands.
- Use **VS Code as the hub** that pulls in the rest of the toolchain — Git, Python 3.12+, Node.js LTS — through its extensions and built-in prompts, instead of hunting down five separate installers.
- Use GitHub from inside VS Code (sign in, clone, commit, push) — and from the command line when needed.
- Create and use a public `training-ai-fde` repository as your submission home.
- Run Claude in **both** surfaces — the Claude Desktop app and the Claude Code extension in VS Code — signed in with the program-provided Claude Pro account, against a real folder.
- Create your own free accounts and confirm access to Python, Node, Google + Gemini, and free-tier AWS and Cloudflare.
- Keep secrets (any API key you create) out of version control.

---

## 1. The Submission Repository (do this first)

You submit every weekly assessment in this course on your own GitHub. You create **one public repository named exactly `training-ai-fde`**, and it becomes the home for all twelve weeks. This mirrors how an FDE actually works: output lives in version control, in the open, where a reviewer can read it without you in the room.

### Steps

1. **Create a GitHub account** if needed: https://github.com/signup. Use a professional username — it is visible to assessors and, later, customers. Verify your email.
2. **Turn on two-factor authentication.** Settings → Password and authentication → Two-factor authentication. Use an authenticator app (Google Authenticator, Authy, or 1Password).
3. **Create the repository** at https://github.com/new:
   - **Repository name:** `training-ai-fde` (exactly this, lowercase).
   - **Visibility:** **Public** (required — the program and peers must be able to read it).
   - **Initialize with a README** so it is not empty.
   - Resulting URL: `https://github.com/<your-username>/training-ai-fde` — for example, https://github.com/akmalakhpah/training-ai-fde.
4. **Structure it** with one folder per week: `week-00/`, `week-01/`, … `week-12/`. Make the README an index that links to each week.
5. **Send the program your repo URL** in the Week 0 onboarding form.

From here on, "submit" means: push the work to this repo, then share the link (a file, a folder, a pull request, or a release tag, as each week specifies).

> Why public: an FDE's work is read by people who were not there when it was written. A public repo forces clean commits, readable READMEs, and honest history from day one. If a specific deliverable is sensitive, raise it with the teaching team rather than making the whole repo private.

---

## 2. Core Tools — VS Code is the hub

> **Who provides what.** The program provides **one** thing: a **Claude Pro subscription** for the full course (about 4 months), which signs you into **both** Claude Desktop and the **Claude Code** extension in VS Code. **Everything else is a free account or free tool you set up yourself** — GitHub, a Google account (with Gemini), free-tier AWS, free-tier Cloudflare, and, when an API-building week needs it, your own free Anthropic API key. Because the AWS/Cloudflare/Anthropic accounts are yours, there are no central spending caps — stay on the free tiers and watch your own usage.

You download **two apps by hand — VS Code and Claude Desktop.** Everything else is pulled in *from inside VS Code*: its extensions and built-in prompts install Git, Python, and Node for you, so you are not chasing installers across five different websites. On Windows, the smoothest path for command-line tools is **WSL2** (Windows Subsystem for Linux); the AI Engineer can help you enable it.

### 2.1 Visual Studio Code — the hub (manual download #1)
- **Download:** https://code.visualstudio.com/download
- macOS: unzip and drag **Visual Studio Code** into `/Applications`. Windows: run the installer, tick "Add to PATH".
- **Open the integrated terminal** (`Ctrl+` backtick) — this is where you verify each tool below.
- Everything after this is installed *from inside VS Code*, not from a separate download page.

### 2.2 Claude Desktop + the Claude Code extension (manual download #2)
- **Claude Desktop:** download from https://claude.ai/download and sign in with the **program-provided Claude Pro account**. This is your chat-and-MCP surface — light use early, heavier from Week 6 (MCP) onward. The Pro subscription is the one thing the program pays for, and it covers the full course (about 4 months).
- **Claude Code extension:** in VS Code open the Extensions panel (`Ctrl+Shift+X`), search **Claude Code**, install it, and sign in with the **same Claude Pro account** — no API key is involved. This is your in-editor coding partner.
- **Verify:** open your `training-ai-fde` folder in VS Code, start Claude Code, ask "what files are in this repo?", and confirm it answers from the real files.

### 2.3 Extensions — let VS Code pull in the rest
- In the Extensions panel (`Ctrl+Shift+X`) also add **Python** (Microsoft) and, on Windows, **WSL**.
- These extensions watch for missing tools and offer to install them — that is how Git, Python, and Node land on your machine in the next steps, instead of five hand-downloaded installers.

### 2.4 Git + GitHub — through VS Code
- **Install Git via the prompt:** open the **Source Control** panel in VS Code. If Git is missing it shows an **Install Git** button — follow it. (On macOS, the first `git` command pops the Xcode Command Line Tools installer; accept it.) Verify with `git --version`.
- **Configure identity** in the terminal:
  ```
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```
- **Authenticate to GitHub without a separate CLI:** VS Code's **Accounts** menu (bottom-left) → **Sign in to GitHub** runs a browser flow — no manual SSH keys. (Prefer the command line? `gh auth login` from https://cli.github.com still works; it is optional.)
- **Verify the chain:** **Command Palette → Git: Clone** your `<your-username>/training-ai-fde` repo, add a file, then commit and push from the Source Control panel and confirm it appears on github.com.

### 2.5 Python 3.12+ — installed by the extension
- Open any `.py` file (or run `python3 --version`). If Python is missing, the **Python extension** offers to install it (Windows: via the Microsoft Store; macOS: it guides you). No trip to python.org required.
- **Verify:** `python3 --version` (macOS/Linux) or `python --version` (Windows) shows 3.12+; `python3 -m pip --version`.

### 2.6 Node.js (LTS, v20+)
- Node powers the Claude Code engine and later-week tooling (Wrangler, npm packages). It is the one runtime without an in-editor prompt: grab the **LTS** build at https://nodejs.org/en/download, or in the VS Code terminal let your Claude Code partner install it for you.
- **Verify:** `node --version` (v20+) and `npm --version`.

### 2.7 Your own Anthropic API key (only when a week needs it)
- Claude Code itself needs **no** key — it logs in with your Claude Pro account (§2.2). The Claude **API** is a separate thing, used only in the API-building weeks. When a week needs it, create your **own free Anthropic API account** at https://console.anthropic.com and generate a key.
- Store the key in an environment variable, never hard-coded or committed. macOS/Linux: add `export ANTHROPIC_API_KEY="..."` to `~/.zshrc`. Windows: System → Environment Variables or `setx`.
- **Verify:** `echo $ANTHROPIC_API_KEY` prints the key. A committed key is a setup failure — if it ever lands in git history, rotate it immediately and tell the team. It is your own account, so a leak is your security and cost problem.

### 2.8 Google account and Gemini
- Sign in to a **Google account you create** (a free personal account is fine — the program does not provide one). Confirm Docs, Sheets, and Slides open and **Gemini** is available in the side panel. Used from Week 2 (non-technical data view) and heavily from Week 8 onward.

### 2.9 AWS and Cloudflare (your own free-tier accounts)
- The program does **not** provision these — create your **own free-tier accounts**. Stay on the free tier and watch your own usage: these are your accounts, so there are no central spending caps. In Week 0 just confirm you can log in:
  - AWS console: https://console.aws.amazon.com (free tier; AWS CLI later from https://aws.amazon.com/cli/).
  - Cloudflare dashboard: https://dash.cloudflare.com (free tier; Wrangler later via `npm install -g wrangler`).
- You build on only one for Week 3 (your choice), but create and log into both now.

### 2.10 Internal training repo and sandbox
- Confirm you can `git clone` the Week 1 training repo (you will not work in it yet) so access problems surface now, not on Day 1.

> **Provisioned later, on purpose:** the vector store before Week 5, Conductor and the MCP SDK before Week 6, N8N before Week 7. Do not install these in Week 0.

---

## 3. Setup Checklist

- [ ] GitHub account created, 2FA on, **public** `training-ai-fde` repo with a README and week folders; URL sent to the program.
- [ ] VS Code installed, terminal works; Claude Code, Python, + (Windows) WSL extensions added.
- [ ] Claude Desktop installed and signed in with the program-provided Claude Pro account.
- [ ] Git installed via the VS Code prompt and configured; GitHub signed in through VS Code; a test commit pushed.
- [ ] Python 3.12+ and pip verified (installed via the Python extension).
- [ ] Node.js LTS (v20+) and npm verified.
- [ ] Claude Code extension signed in with the Claude Pro account, answering about your repo.
- [ ] Your own Google account signed in; Docs, Sheets, Slides, Gemini reachable.
- [ ] Your own free-tier AWS and Cloudflare accounts created and logins confirmed.
- [ ] Week 1 training repo clones successfully.
- [ ] (Later, when a week needs the Claude API) your own Anthropic API key set as an environment variable, not committed.

---

## 4. Diagnostic (about 1 hour, ungraded)

A short coding warm-up plus two or three questions on GitHub, the command line, and reading an unfamiliar function. **Calibration, not a gate** — it tells the teaching team where you actually start so the early weeks can flex.

### Tasks
- A small coding warm-up (a function and a couple of test cases) in your language of choice.
- Two or three short questions: a GitHub operation (branch and commit), one command-line task (navigate, run a script, read an environment variable), and a short written read of an unfamiliar function (what does it do, what would break it).

### Submit
- Commit the diagnostic work to a `week-00/` folder in your `training-ai-fde` repo and share the link. This exercises the full setup-to-submission loop once, before Week 1 depends on it.

---

## 5. Submittable Assessment

Week 0 is not graded. "Done" means:

- The public `training-ai-fde` repo exists, with a README index and a `week-00/` folder containing the diagnostic.
- Every checklist item passes its verification step.
- The repo URL has been sent to the program.

### Definition of done
A teammate can open your `training-ai-fde` repo, see a clear README and a `week-00/` diagnostic, and you can ask Claude Code about the repo in VS Code and get a correct answer — all without a setup error blocking you on Day 1 of Week 1.
