# Week 9: Integration and the Messy Real World

**Phase:** 3, The FDE Craft
**Class owner:** AI Engineer, with the Project Manager on customer-reality framing
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Integrate into systems you do not control.
- Work around legacy constraints and bad documentation.
- Use the right authentication pattern for a given system.
- Document workarounds so the next person survives.

---

## 1. Taught Class (90 minutes)

> Purpose: you'll walk through a real integration including the workarounds that never appear in tutorials, and see the auth patterns your project will need. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "Integration and the Messy Real World."
- One line: the demo connects two clean systems. The field connects two systems that hate each other.

**Block 2: Why customer environments are messy (8 min)**
- Fragmented, undocumented, resistant to change, partial access.
- The FDE stance: adapt to the customer's reality rather than forcing them to fit your product.
- The reality: you will rarely get the clean API the docs assume.

**Block 3: Integration patterns (12 min)**
- Clean API, no API, file drop, scheduled export, webhook, scraping as last resort.
- A decision tree: what to reach for given what access you have.
- Live: you'll identify the integration pattern for a real messy case.

**Block 4: Authentication patterns (16 min)**
- API keys: the simple bearer token. Where they leak and how to store them.
- OAuth: delegated access without sharing passwords; the consent flow.
- JWT: signed, self-contained tokens.
- Webhooks: receiving events, and verifying they are genuine (HMAC signatures).
- Live: you'll see the two systems in the demo authenticate, an API key one way and a webhook the other.
- Remember: getting auth wrong is the most common way an integration silently fails or quietly leaks.

**Block 5: A real integration, warts and all (16 min)**
- Live: you'll watch a real integration walked end to end, with the workarounds narrated: the field that is always null, the endpoint that rate-limits, the timezone that is wrong, the doc that lies.
- N8N as the glue between two systems that were not designed to talk.

**Block 6: Legacy constraints and partial access (10 min)**
- What to do with read-only access, no sandbox, or a system you cannot change.
- Defensive integration: assume the other side will break.

**Block 7: Documenting workarounds (10 min)**
- The three-line note per workaround: what, why, and what to watch.
- Remember: the next engineer inherits your workarounds. Undocumented, they look like bugs.

**Block 8: Project and wrap (5 min)**
- You'll walk through the project brief and assessment. Q&A.

### Live materials
- Two systems that were genuinely not designed to talk to each other.
- A real example of each auth pattern.
- A list of real workarounds from past integrations.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: Integration patterns for messy systems (1.5 hrs)
- **Goal:** choose an integration approach given limited access.
- **Start here:** pick two services and sketch how data would move between them without a direct API.
- **Ask AI (paste into Claude):** "I need to integrate two systems. System A only offers a daily CSV export to an FTP folder. System B has a REST API. Walk me through realistic integration patterns given these constraints, the trade-offs of each, and how I would make it reliable when the export is late or malformed."

### Topic B: Authentication patterns (2 hrs)
- **Goal:** understand and use API keys, OAuth, JWT, and webhook verification.
- **Start here:** authenticate to one real service using each of two different methods.
- **Watch:** "API Authentication EXPLAINED! OAuth vs JWT vs API Keys" - https://www.youtube.com/watch?v=GcVtElYa17s
- **Read:** WorkOS, "What Is API Authentication: a guide to OAuth 2.0, JWT, and key methods" - https://workos.com/blog/what-is-api-authentication-a-guide-to-oauth-2-0-jwt-and-key-methods and Hookdeck, "Webhook authentication strategies" - https://hookdeck.com/webhooks/guides/what-are-the-webhook-authentication-strategies
- **Ask AI (paste into Claude):** "Explain API keys, OAuth 2.0, JWT, and webhook signature verification (HMAC) to me with one concrete example each. For each, tell me where the secret lives, what the main security risk is, and when I would choose it. Then quiz me with three scenarios and I will pick the right method."

### Topic C: Legacy constraints and partial access (1 hr)
- **Goal:** plan an integration when you cannot change the other system.
- **Start here:** write down what you would do if the system you must integrate with has read access only.
- **Ask AI (paste into Claude):** "I have to integrate with a legacy system I cannot modify, with read-only access and no sandbox. Give me a defensive integration checklist: how to avoid breaking it, how to handle its failures, how to test safely, and how to detect when its data changes shape underneath me."

### Topic D: Documenting workarounds (45 min)
- **Goal:** write workaround notes the next person can survive on.
- **Start here:** write a three-line note (what, why, what to watch) for every workaround you make.
- **Ask AI (paste into Claude):** "Here is a workaround I built: [describe]. Help me write a clear three-line note for the next engineer: what the workaround does, why it was necessary, and what to watch out for or revisit later. Make it something a stranger could act on."

---

## 3. Weekly Project

### Brief
Integrate two systems that were not designed to talk to each other, using N8N, a webhook, or custom code, and document every workaround.

### Requirements (checklist)
- [ ] Two systems integrated: for example push a result from an AI step into a Google Sheet, a Slack message, or a database, triggered by an external event.
- [ ] At least one real authentication step (API key, OAuth, JWT, or verified webhook).
- [ ] Every workaround documented with the three-line note (what, why, what to watch).
- [ ] Evidence you adapted to constraints rather than wishing them away.

### Suggested steps
1. Pick two systems and the data that must move between them.
2. Decide the integration pattern and the auth method.
3. Build the happy path; confirm data moves correctly.
4. Hit the inevitable snag; build and document the workaround.
5. Write the workaround documentation.

### Deliverables
- The working integration.
- The workaround documentation.

### Stretch (optional)
- Add a check that detects when the other system's data changes shape, before it breaks your flow.

---

## 4. Submittable Assessment

### What to submit
- The working integration and the workaround documentation.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** the integration works and the auth is correct.
- **Handling ambiguity and failure (30%):** did you adapt to constraints rather than complaining about them.
- **Communication (25%):** quality of the workaround documentation; could a stranger act on it.
- **Ownership (15%):** did you push through the messy part instead of stopping at the clean API that did not exist.

### Definition of done
Data moves correctly between two systems that were not built to connect, the auth is sound, and your workaround notes would let the next engineer maintain it without calling you.
