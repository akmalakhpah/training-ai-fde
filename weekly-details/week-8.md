# Week 8: Scoping Ambiguity

**Phase:** 3, The FDE Craft
**Class owner:** Product Manager
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week the intern can:

- Turn a vague business problem into a concrete technical plan.
- Find the real problem behind the stated one.
- Say no to the wrong solution without losing the customer.
- Write a clear scoping document.

---

## 1. Taught Class (90 minutes)

> Purpose: live scoping drills, then turn one brief into a filled scoping document on screen. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "Scoping Ambiguity."
- One line: the technical work is the easy half. The hard half is figuring out what to build before you build it.

**Block 2: Why briefs are vague (8 min)**
- Customers describe symptoms, not problems. "We want to use AI" is a wish, not a spec.
- The cost of building the stated request instead of the real need.
- Talking point: the requirement looks vague because the business goal behind it was never made explicit.

**Block 3: The clarifying question (12 min)**
- Good questions vs leading questions. Asking "why" to reach the business goal.
- The starter set: what does success look like, who is the user, what happens today without this, what is the constraint (time, cost, data, access).
- Live: take a one-line brief and generate ten clarifying questions as a class.

**Block 4: Finding the real problem (12 min)**
- The stated request vs the underlying need, side by side.
- Live: a brief like "fix our support load" worked back to the real problem (maybe it is a docs problem, or a routing problem, not an AI problem).
- Talking point: the best scoping sometimes ends with "you do not need AI for this".

**Block 5: Setting boundaries (12 min)**
- Scope creep and how to bound an open problem: what is in, what is out, what is explicitly not being built.
- Phrasing in scope from out of scope without sounding like a no.
- Live: draw the in and out line for one brief.

**Block 6: Pushing back without losing the customer (12 min)**
- Live: the instructor models declining a bad request while keeping trust, then a counter-example of doing it badly.
- Talking point: "no" with a reason and an alternative builds trust; "no" alone loses it.

**Block 7: The scoping document (16 min)**
- Live: turn one brief into a filled scoping document on screen, using the template the intern will use.
- The sections: the real problem, the proposed plan, the assumptions made, and explicitly what we will not build.
- Talking point: the what-we-will-not-build section is where the thinking shows.

**Block 8: Project and wrap (5 min)**
- Walk the project brief and the defend-your-scope assessment. Q&A.

### Live materials for the instructor
- Three or four one-line briefs drawn from real Pandai and SEA enterprise situations.
- The scoping document template in Google Docs.
- A good and a bad version of a pushback conversation.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: Problem framing and clarifying questions (1.5 to 2 hrs)
- **Goal:** turn a vague brief into the right ten questions.
- **Start here:** take a vague brief and write the ten questions you would ask before writing any code.
- **Read:** DesignGurus, "How to Handle Ambiguity, Clarify Requirements Before Designing" - https://designgurus.substack.com/p/how-to-handle-ambiguity-in-system and LinkedIn, "How do you define scope with ambiguous requirements" - https://www.linkedin.com/advice/3/how-do-you-define-scope-project-ambiguous-unclear
- **Ask AI (paste into Claude):** "Act as an experienced forward deployed engineer. Here is a one-line customer brief: 'we want to use AI to help our students'. Show me how you would interrogate it: the clarifying questions you would ask, in priority order, and what answer to each would change about the solution. Then role-play: you be a vague customer and I will practise asking the questions."

### Topic B: The real problem vs the stated request (1.5 hrs)
- **Goal:** separate what the customer asked for from what they need.
- **Start here:** for one brief, write the stated request and the likely real need side by side.
- **Ask AI (paste into Claude):** "Here is a customer request: [paste]. Give me three different underlying problems this request might really be about, and for each, the question I would ask to find out. Then tell me which one would not need AI at all, and how I would say that to the customer without sounding unhelpful."

### Topic C: Writing the scoping document (1.5 to 2 hrs)
- **Goal:** produce a clear, concrete scoping document.
- **Start here:** use the provided scoping template and fill it for a sample brief.
- **Ask AI (paste into Claude):** "Here is my draft scoping document for a vague brief: [paste]. Review it as a skeptical engineering manager. Is the real problem clearly stated, is the plan concrete and realistic, are the assumptions explicit, and is the what-we-will-not-build section thoughtful? Tell me where it is hand-wavy and how to tighten it."

### Topic D: Linking technical work to a business outcome (1 hr)
- **Goal:** connect the build to something a non-engineer cares about.
- **Start here:** finish the sentence "this is worth building because the customer will be able to..." for your brief.
- **Ask AI (paste into Claude):** "I am scoping this project: [describe]. Help me articulate the business outcome in terms a non-technical decision-maker cares about (time saved, cost reduced, students reached, risk lowered). Give me three ways to phrase the value, each anchored to a number I could try to estimate."

---

## 3. Weekly Project

### Brief
Given a deliberately vague one-line brief, produce a scoping document that states the real problem, a proposed plan, the assumptions made, and explicitly what you would not build.

### Requirements (checklist)
- [ ] The real problem, stated clearly, not the surface request.
- [ ] A concrete, realistic proposed plan.
- [ ] The assumptions you are making, listed explicitly.
- [ ] A thoughtful what-we-will-not-build section.
- [ ] A clear link from the work to a business outcome a non-engineer cares about.

### Suggested steps
1. Read the brief and resist the urge to design. Write your clarifying questions first.
2. Hypothesise the real problem behind the stated one.
3. Draft the plan, the assumptions, and the out-of-scope list.
4. Pressure-test it with the Topic C prompt.
5. Prepare to defend it against a customer who keeps changing the ask.

### Deliverables
- The scoping document (Google Docs).

### Stretch (optional)
- Include a one-paragraph "what we would do in phase 2" to show you can sequence, not just scope.

---

## 4. Submittable Assessment

### What to submit
- The scoping document.

### Presentation
- Defend your scope in class while the instructor plays a customer who keeps changing the ask.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** is the plan concrete and realistic.
- **Handling ambiguity and failure (30%):** did you find the real problem rather than solving the surface request, and how did you hold your scope under pressure.
- **Communication (25%):** is the document clear, and can you defend it without getting defensive.
- **Ownership (15%):** did you take a position, including saying no where needed.

### Definition of done
A reader who has only seen the one-line brief can read your document and understand the real problem, what you will build, what you will not, and why, and you can defend that scope when a customer pushes.
