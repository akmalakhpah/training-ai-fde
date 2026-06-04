# Week 1: From Coursework to Production

**Phase:** 1, Production Engineering Foundations
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Explain what separates a student repo from a production system.
- Work inside a large codebase written by other people without freezing.
- Drive a single Claude Code agent well: brief it, review its diff, and catch it when it is wrong.
- Fix one bug by hand, without the agent, reading the code and the stack trace themselves.
- Follow a real branching, review, and merge workflow on GitHub, including a CI pipeline.

---

## 1. Taught Class (90 minutes)

> Purpose: a guided tour of every move you'll make alone this week, so nothing in the project is first seen solo. This outline is the brief for the slide deck. Each numbered block is roughly one to three slides.

### Slide-by-slide outline

**Block 1: Title and why this week**
- "From Coursework to Production."
- One line: most software does not fail in development, it fails in deployment. This week is about the habits that survive contact with a real system.
- The three muscles you're building: ship real work, stay functional in broken systems, translate between humans and machines.

**Block 2: Coursework vs production**
- A side-by-side table. Student repo: one author, runs once, no tests, no review, throwaway. Production repo: many authors, runs for years, tests required, every change reviewed, history matters.
- What "done" means in production: merged, tested, reviewed, observable, and not breaking anyone else.
- Your degree optimized for getting it working once. The field optimizes for it staying working while others change it.

**Block 3: Anatomy of a production repo**
- You'll see a real internal Pandai service opened in VS Code.
- Walk the top-level structure: where config lives, where source lives, where tests live, the README, the CI config.
- The signals of a healthy repo to look for: a CLAUDE.md or README, a tests folder, a CI workflow file, a clear module boundary.

**Block 4: Reading an unfamiliar codebase**
- The method: find the entry point, follow one request through to the data and back, ignore error handling and edge cases on the first pass.
- You'll watch one user-facing action get traced. Use "jump to definition" to drill down the call stack.
- The three questions you must answer about the project repo this week: where does a request enter, where does it hit the database, where does the response leave.
- You understand a codebase by changing it, not just reading it. Reading gets you to your first change faster.

**Block 5: GitHub for real**
- Beyond commit and push: branching model, feature branches, keeping history clean.
- Rebase vs merge, in one diagram. When to rebase (clean up your own branch) and when not to (shared history).
- You'll see a branch created, two commits made, a conflict created on purpose, and resolved.

**Block 6: The pull request lifecycle**
- Branch, open a PR, request review, respond to comments, get approval, merge.
- What a good PR looks like: small, one concern, a clear description, tests included.
- You'll see a real PR opened, walking the description, the diff, and the review thread.

**Block 7: CI/CD with GitHub Actions**
- What CI is and why it exists: the robot that checks your work before a human does.
- You'll watch a GitHub Actions pipeline fail (a broken test), then a fix get pushed, then it passes.
- Green CI is the floor, not the ceiling.

**Block 8: Testing code you did not write**
- Why tests matter more in shared code: they are how you change things without fear.
- You'll see one test written for an existing function nobody on the call wrote, a happy path and an edge case.

**Block 9: Driving one Claude Code agent**
- You'll watch Claude Code open in VS Code, get briefed with context, scoped to a task narrowly, and its diff reviewed before accepting.
- You'll see it being confidently wrong on purpose, and how to catch it: read the diff, run the test, ask it to justify a change.
- The agent is fast, not trustworthy. Your job is supervision.

**Block 10: The "no agent" rep and the project**
- Why you fix the first bug this week by hand: you cannot supervise an agent if you have never debugged without one.
- You'll walk through the project brief and the assessment, with time for your questions.

### What you'll see demonstrated live
- A real repo cloned and ready.
- A pre-made branch with a deliberate merge conflict.
- A PR already open with review comments.
- A CI pipeline made to fail and pass on demand.
- Claude Code authenticated inside VS Code.

---

## 2. Self-Learn (6 to 8 hours)

Each topic has a goal, a concrete starting action, something to watch or read, and a real prompt to paste into Claude.

### Topic A: GitHub beyond commit and push (1.5 to 2 hrs)
- **Goal:** branch, rebase, and resolve a merge conflict without panic.
- **Start here:** in the training repo, create a branch, make two commits, then create a merge conflict against another branch and resolve it from the command line.
- **Watch:** "Git Branching Strategy & Git REBASE to fix Merge Conflicts" - https://www.youtube.com/watch?v=6FUqOswIags (fallback search: "git rebase resolve merge conflicts tutorial").
- **Read:** Atlassian, "Merging vs Rebasing" - https://www.atlassian.com/git/tutorials/merging-vs-rebasing and "Resolve merge conflicts" - https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts
- **Ask AI (paste into Claude):** "I am new to git rebase. Walk me through, step by step, how to rebase my feature branch onto main, what to do when I hit a conflict, and how to tell whether I should rebase or merge in a shared repo. Then give me three practice exercises I can run locally to build the muscle."

### Topic B: Reading a large unfamiliar codebase (1.5 to 2 hrs)
- **Goal:** orient in a repo you did not write and find where to make a change.
- **Start here:** open the training repo and answer in writing: where does a request enter, where does it hit the database, where does the response leave.
- **Read:** Sparkbox, "How to Understand a Large Codebase" - https://sparkbox.com/foundry/how_to_understand_a_large_codebase and DEV, "How to Learn Unfamiliar Codebases" - https://dev.to/sammytran/how-to-learn-unfamiliar-codebases-1mi1
- **Ask AI (paste into Claude Code, inside the repo):** "You are helping me onboard to this codebase. Without changing any files, give me a map: the entry points, the main modules and what each is responsible for, where data is read and written, and the path a single user request takes from entry to response. Then point me at three small, low-risk files I could read first to understand the conventions."

### Topic C: Claude Code fundamentals (1 to 1.5 hrs)
- **Goal:** brief, run, and review a single agent and catch its mistakes.
- **Start here:** ask Claude Code to explain one module to you, then verify its explanation against the actual code line by line.
- **Read:** Claude Code Quickstart - https://code.claude.com/docs/en/quickstart (skim the whole page, then read the section on CLAUDE.md and reviewing changes).
- **Ask AI (paste into Claude Code):** "Explain what this module does and how it connects to the rest of the system. Cite the specific functions and line ranges you are basing each claim on, so I can verify you. Flag anything you are unsure about rather than guessing."

### Topic D: Writing tests for code you did not write (1 to 1.5 hrs)
- **Goal:** add a happy-path test and an edge-case test to existing code.
- **Start here:** pick one untested function in the repo and write two tests for it.
- **Read:** the testing section of the repo's README, plus your language's standard test runner docs (for example pytest or Jest).
- **Ask AI (paste into Claude):** "Here is a function I did not write: [paste]. Help me understand its behaviour, then propose a happy-path test and one edge-case test. Do not write code that just mirrors the implementation. Explain what each test actually proves and what would make it fail."

---

## 3. Weekly Project

### Brief
Take a real internal training repo from clone to a clean, merged pull request, with one bug fixed by hand and one fixed with Claude Code.

### Requirements (checklist)
- [ ] Clone the internal training repo and get it running locally.
- [ ] Find a first small, genuine bug and fix it **by hand, no agent**. Note what the stack trace or error told you.
- [ ] Find a second genuine issue and fix it **with Claude Code**, reviewing the diff before accepting.
- [ ] Add at least one test that covers your change.
- [ ] Open one clean pull request: a clear title, a description of the change, and the tests.
- [ ] Get the PR through review and merged, with CI passing.

### Suggested steps
1. Clone, install, run the test suite, confirm it is green before you touch anything.
2. Orient using the Topic B method. Write the three-question answer.
3. Reproduce the first bug, read the trace, fix it by hand, add or update a test.
4. Pick the second issue, brief Claude Code, review and accept its diff, confirm tests pass.
5. Branch, commit with clean messages, push, open the PR, respond to review, merge.

### Deliverables
- The merged pull request link.
- A short written note (half a page) covering: how you navigated the codebase, what the by-hand bug taught you, and where Claude Code helped or got in the way.

### Stretch (optional)
- Add a second test that would have caught the bug before it shipped.
- Leave a constructive review comment on a peer's PR.

---

## 4. Submittable Assessment

### What to submit
- The merged pull request link.
- The written note (half a page).

### Presentation
- A 3 minute walkthrough (recorded or live in the next class) of your change: what was wrong, how you fixed it, and one thing the by-hand bug taught you about reading code.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** does the fix work, are the tests meaningful, is the PR clean, did CI pass.
- **Handling ambiguity and failure (30%):** how you navigated an unfamiliar repo and a real bug without freezing.
- **Communication (25%):** can a non-author follow your PR description and your walkthrough.
- **Ownership (15%):** did you drive it to merged, or stall waiting for help.

### Definition of done
A reviewer who has never seen your change can read the PR, understand what it does and why, see the test that proves it, and watch CI pass, all without asking you a question.
