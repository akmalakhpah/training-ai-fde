# Week 5: Retrieval and Grounding (RAG)

**Phase:** 2, AI Application Engineering
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

> Heavy week. The vector store is provisioned just before this week so setup does not eat into the build.

## Learning objectives

By the end of the week the intern can:

- Explain why models need grounding and how RAG works end to end.
- Build a RAG pipeline: chunk, embed, retrieve, assemble a grounded answer.
- Evaluate retrieval quality and recognise RAG failure modes.
- Know when RAG is the wrong tool.

---

## 1. Taught Class (90 minutes)

> Purpose: build RAG from scratch, then show it confidently retrieving the wrong thing and explain why. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing (3 min)**
- Slide: "Retrieval and Grounding."
- One line: a model only knows what it was trained on and what you put in the prompt. RAG is how you put the right thing in the prompt.

**Block 2: Why grounding (8 min)**
- The failure without it: confident, fluent, wrong (hallucination).
- Grounding: answer from retrieved source text, not from memory.
- Talking point: an FDE ships systems that can cite where the answer came from.

**Block 3: The RAG pipeline end to end (12 min)**
- Two phases. Indexing: chunk, embed, store. Query: embed the question, retrieve nearest chunks, assemble a grounded prompt, generate.
- A single diagram the whole week hangs on.

**Block 4: Chunking (12 min)**
- Why chunk at all: documents are too big for one prompt and too coarse for good retrieval.
- Strategies: fixed size, by paragraph, by heading, with overlap.
- A working default: 256 to 512 tokens with slight overlap.
- Live: chunk the same document three ways and show what changes.

**Block 5: Embeddings and similarity (12 min)**
- An embedding is a vector that captures meaning; similar meaning, nearby vectors.
- Vector stores and nearest-neighbour search.
- Live: embed ten documents, run one query, read the similarity scores out loud.

**Block 6: Assembling the grounded answer (10 min)**
- Stuffing retrieved chunks into the prompt with the question.
- Asking the model to answer only from the provided context and to say when it cannot.
- Live: a working RAG answer over a real curriculum-style corpus.

**Block 7: When RAG retrieves the wrong thing (14 min)**
- Live: show the same system confidently retrieving the wrong chunk, and explain why (bad chunk boundary, ambiguous query, semantic-but-irrelevant match).
- Failure modes: missing context, distracting context, the right answer split across chunks.
- Talking point: the scary failure is not "no answer", it is a confident wrong answer.

**Block 8: When not to use RAG (6 min)**
- When a plain prompt, a database lookup, or a simple rule wins.
- Talking point: reaching for RAG by reflex is a common FDE mistake.

**Block 9: Measuring retrieval and the project (8 min)**
- Quick intro to measuring retrieval quality (did the right source come back).
- Walk the project brief and assessment, including the reliability check. Q&A.

### Live demo checklist for the instructor
- A small RAG pipeline over a real curriculum-style corpus.
- A query that retrieves well and a query that retrieves the wrong chunk on purpose.
- The vector store and embedding calls visible to the class.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: Build RAG from scratch (2 to 2.5 hrs)
- **Goal:** stand up a minimal chunk, embed, retrieve, generate pipeline.
- **Start here:** follow a from-scratch tutorial end to end on a small corpus before touching your own.
- **Read:** "Retrieval Augmented Generation (RAG) from Scratch, Tutorial for Dummies" - https://dev.to/zachary62/retrieval-augmented-generation-rag-from-scratch-tutorial-for-dummies-508a
- **Code along:** pguso, "rag-from-scratch" GitHub - https://github.com/pguso/rag-from-scratch
- **Ask AI (paste into Claude):** "Walk me through building a minimal RAG pipeline in Python over a folder of text files: chunking, embedding, storing in a vector store, retrieving top-k, and generating a grounded answer with the Claude API. Explain each step as you go and keep the code small enough that I understand every line."

### Topic B: Chunking strategies (1.5 hrs)
- **Goal:** see how chunking changes what gets retrieved.
- **Start here:** chunk the same document three ways (fixed, by paragraph, by heading) and compare what gets retrieved for one question.
- **Read:** "Chunking and Embedding Strategies in RAG" - https://medium.com/@tahir.saeed_46137/chunking-and-embedding-strategies-in-rag-a-guide-to-optimizing-retrieval-augmented-generation-7c95432423b1
- **Ask AI (paste into Claude):** "Explain the trade-offs between fixed-size, paragraph, and heading-based chunking for a syllabus document. For each, tell me what kind of question it helps and what kind it hurts, and recommend a starting strategy with a chunk size and overlap for retrieving answers from past exam papers."

### Topic C: Embeddings, vector stores, and measuring retrieval (1.5 hrs)
- **Goal:** read similarity scores and judge whether retrieval is working.
- **Start here:** write five questions with known correct sources and check whether retrieval finds them.
- **Ask AI (paste into Claude):** "I have a RAG system over [describe corpus]. Help me build a tiny retrieval eval: I will give you five questions and the source chunk each should retrieve. Show me how to measure whether the right chunk is in the top-k results, and how to report precision in plain terms so I can tell if a chunking change made retrieval better or worse."

### Topic D: When RAG is the wrong tool (45 min)
- **Goal:** recognise when a plain prompt or a lookup wins.
- **Start here:** name one task in your corpus where RAG is overkill and say why.
- **Ask AI (paste into Claude):** "Give me a decision checklist for when to use RAG versus a plain prompt, a database lookup, or fine-tuning. Then test me: I will describe three tasks and you tell me which approach fits and why."

---

## 3. Weekly Project

### Brief
Build a RAG system over a real document corpus, for example a set of past papers or a syllabus. Show where it retrieves well and where it fails, and explain the failures.

### Requirements (checklist)
- [ ] A working pipeline: chunk, embed, store, retrieve, and generate a grounded answer.
- [ ] At least one example where retrieval clearly works.
- [ ] At least one example where it fails, with your honest explanation of why.
- [ ] A short written failure analysis.

### Reliability check (include in submission)
- One line: note one case where wrong retrieval could mislead the user, and how you would flag low-confidence answers.

### Suggested steps
1. Pick a real corpus and decide a chunking strategy.
2. Build the indexing pipeline, then the query pipeline.
3. Write five test questions with known correct sources; measure whether retrieval finds them.
4. Find and document a genuine failure case; diagnose the cause.
5. Write the failure analysis.

### Deliverables
- The working system (code).
- A written failure analysis: where it works, where it fails, and why.

### Stretch (optional)
- Add a confidence signal (for example a similarity threshold) that flags low-confidence answers instead of guessing.

---

## 4. Submittable Assessment

### What to submit
- The working system and the written failure analysis.

### Presentation
- A 5 minute demo (recorded or live) that deliberately shows a failure case and your honest read on why it happens.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** the pipeline works end to end and retrieval is reasonable.
- **Handling ambiguity and failure (30%):** the honesty and depth of your failure analysis.
- **Communication (25%):** can a non-expert follow why it failed.
- **Ownership (15%):** did you dig into a real failure, or only show the happy path.

### Definition of done
Your system answers grounded questions over a real corpus, and you can stand in front of a failure case and explain exactly why it retrieved the wrong thing.
