# Week 2: Data Fluency

**Phase:** 1, Production Engineering Foundations
**Class owner:** AI Engineer
**Time budget:** Taught class 90 min, self-learn 6 to 8 hrs, project 6 to 8 hrs, assessment 2 to 3 hrs (total ~16 to 20 hrs)

## Learning objectives

By the end of the week you can:

- Query, transform, and move real data with confidence.
- Recognise dirty data and decide what to do about it.
- Take a messy export and turn it into a clean, queryable table.
- Use AI to draft SQL, then verify it by hand.

---

## 1. Taught Class (90 minutes)

> Purpose: walk the full path from a messy export to a clean queryable table, in the order the project needs it. This outline is the brief for the slide deck.

### Slide-by-slide outline

**Block 1: Title and framing**
- "Data Fluency, for people who will live inside customer databases."
- One line: an FDE spends more time in the customer's data than in their own code, and that data is always messier than the demo.

**Block 2: SQL you actually need**
- Joins (inner, left, why the difference bites you), GROUP BY and aggregates.
- CTEs: splitting a complex query into named, readable parts with WITH.
- Subqueries: when a CTE is clearer.
- You'll see one query built that answers a real question about the dataset, starting simple and layering in a join and a CTE.

**Block 3: Window functions**
- The idea: calculate across a set of rows related to the current row without collapsing them.
- The workhorses: ROW_NUMBER, RANK, LAG, LEAD, running totals with SUM OVER.
- You'll watch ROW_NUMBER used to find duplicate keys, and LAG used to compare a row to the one before it.
- Window functions are how you find data-quality problems, not just analytics.

**Block 4: Spotting dirty data**
- The usual suspects: nulls where there should not be, duplicate keys, wrong types, out-of-range values, inconsistent categories ("MY" vs "Malaysia"), broken rows.
- You'll see a profiling pass run on the dataset that counts nulls, duplicates, and out-of-range values per column.
- Never trust an export. Profile it first.

**Block 5: Cleaning and loading**
- Decide per problem: fix, drop, flag, or escalate. Each choice has a cost.
- You'll watch the issues found in Block 4 get fixed, then the cleaned result loaded into a fresh, queryable table.
- Keep the raw data; never clean in place. You want to be able to redo it.

**Block 6: Indexing and a slow query**
- Why a query is slow, in one diagram (full scan vs index lookup).
- You'll see one slow query get an index added, with the before and after time.

**Block 7: The non-technical view via Gemini and Sheets**
- You'll watch the same analysis taken into a Google Sheet through Gemini, for a quick view a non-engineer can read.
- The customer often wants the answer in a sheet, not a database.

**Block 8: Using AI for SQL, safely**
- You'll see Claude or Gemini asked for a window-function query, then run, then checked by hand against a small sample.
- The model drafts, you verify. A wrong query that runs is more dangerous than one that errors.

**Block 9: Project and wrap**
- You'll walk through the project brief and assessment, with time for your questions.

### What you'll see demonstrated live
- A real, slightly messy dataset loaded in a database you can query.
- A deliberately messy export for the cleaning demo.
- A slow query that visibly speeds up with an index.
- A Google Sheet with Gemini enabled.

---

## 2. Self-Learn (6 to 8 hours)

### Topic A: SQL joins, CTEs, and subqueries (1.5 to 2 hrs)
- **Goal:** write a multi-step query that joins tables and uses a CTE.
- **Start here:** draw the schema of the training dataset on paper, then write a query that answers one real question using a join and a CTE.
- **Watch:** Crunchy Data interactive playground, "CTEs and Window Functions" - https://www.crunchydata.com/developers/playground/ctes-and-window-functions
- **Read:** GeeksforGeeks, "Window Functions in SQL" - https://www.geeksforgeeks.org/sql/window-functions-in-sql/
- **Ask AI (paste into Claude):** "Teach me CTEs by example using this schema: [paste schema]. Show me the same query written as a subquery and as a CTE, explain which is clearer and why, then give me three practice questions of increasing difficulty against this schema with the answers hidden until I ask."

### Topic B: Window functions (1.5 hrs)
- **Goal:** use ROW_NUMBER, LAG, and a running total.
- **Start here:** write a query using ROW_NUMBER that finds duplicate keys in the dataset.
- **Watch:** BeardedDev, "SQL Tutorial - Window Functions (Follow Along)" - https://www.youtube.com/watch?v=lBcDSsgp0RU (fallback search: "BeardedDev SQL window functions follow along").
- **Ask AI (paste into Claude):** "Explain SQL window functions to me using a concrete table of student quiz attempts. Show me ROW_NUMBER, RANK, LAG, and a running total, each with the query and a worked example of the output rows. Then give me one realistic data-quality check I could write with a window function."

### Topic C: Data quality and detection (1.5 hrs)
- **Goal:** profile a dataset and catalogue what is wrong.
- **Start here:** write one query that counts nulls, duplicates, and out-of-range values per column.
- **Read:** search "data quality dimensions completeness validity uniqueness" and read one overview; then look at your database's docs for type casting and constraints.
- **Ask AI (paste into Claude):** "Here is a sample of a messy data export: [paste 20 rows]. Act as a data-quality reviewer. List every problem you can see, grouped by type (missing, duplicate, wrong type, out of range, inconsistent category, broken row). For each, tell me how I would detect it at scale with SQL and what my options are to fix, drop, or flag it."

### Topic D: Moving data safely and verifying AI-written SQL (1 to 1.5 hrs)
- **Goal:** load cleaned data into a fresh table without losing rows, and verify a model's SQL.
- **Start here:** export a table to CSV, transform one column, and load it back into a fresh table; confirm the row counts match.
- **Ask AI (paste into Claude):** "I asked you for this SQL: [paste query]. Before I run it on real data, walk me through exactly what it will do row by row on this 5-row sample: [paste]. Tell me what could go wrong, what it would do to nulls and duplicates, and how I should sanity-check the result after running it."

---

## 3. Weekly Project

### Brief
Clean the messy review export from the AI Anki app and load it into a fresh, queryable table — the same detect → fix → load workflow from the live demo, now done yourself and justified.

The export is provided as [`demo/week-02/messy_export.csv`](../demo/week-02/messy_export.csv): 30 review records (`id`, `card_id`, `rating`, `correct`, `reviewed_at`) from the `decks`/`cards`/`reviews` schema of your Week 1 AI Anki fork.

### Setup (do this first)
1. **Download DB Browser for SQLite** — <https://sqlitebrowser.org/dl/> (free; Windows/Mac/Linux). This is the interface for the whole project.
2. **Build the practice database** — open DB Browser, *New Database* → `anki_demo.db`, then *Execute SQL* → paste and run [`demo/week-02/setup.sql`](../demo/week-02/setup.sql) (creates `decks`, `cards`, `reviews`, and the messy `reviews_raw`).
3. **Study the worked references** — the demo files are the techniques you will reuse:
   - [`demo_01_queries.sql`](../demo/week-02/demo_01_queries.sql) — joins, CTEs, and window functions.
   - [`demo_02_profiling.sql`](../demo/week-02/demo_02_profiling.sql) — the profiling pass.
   - [`demo_03_cleaning.sql`](../demo/week-02/demo_03_cleaning.sql) — the detect → fix → load cleaning pattern.
   - [`demo_04_indexing.sql`](../demo/week-02/demo_04_indexing.sql) — `EXPLAIN QUERY PLAN` and indexing.

### Requirements (checklist)
- [ ] Import `messy_export.csv` into a **raw staging table** (DB Browser → File → Import → Table from CSV file), then leave it untouched.
- [ ] Profile the raw table: detect and catalogue every data-quality problem (the **detect** step).
- [ ] Clean the data with SQL, deciding fix vs drop vs flag for each problem and justifying the choice — your decisions may differ from the demo's, which is fine if you defend them (the **fix** step).
- [ ] `INSERT` the cleaned result into a fresh table, `reviews_clean` (the **load** step), and reconcile the counts so **raw = clean + dropped**.
- [ ] Write a one-paragraph note explaining what was wrong, how you detected it, and what you decided.
- [ ] Do not clean in place; leave the raw staging table intact so the work is reproducible from the CSV.

### What the export contains
Broken rows, wrong types (`correct` as `'Y'`/`'true'`/`'5'`, dates like `'June 12 2026'`), missing values, inconsistent rating spellings (`'Good'`/`'GOOD'`/`'g'`/`'gud'`), and duplicate keys. The **no-clean-answer** problem is the row whose `card_id` is `'C3'` (is it card 3, or unknown?) — you must choose and justify.

### Deliverables
- The cleaned `reviews_clean` table (or its CSV export).
- The SQL you used, readable and commented.
- The one-paragraph written note.

### Stretch (optional)
- Add a validation query that would fail loudly if the same problem reappeared in a future export.
- Produce a Gemini + Google Sheets non-technical summary of one finding — for example retention per deck or the most-failed cards.

---

## 4. Submittable Assessment

### Tools
Done in **DB Browser for SQLite** (<https://sqlitebrowser.org/dl/>) against the [`demo/week-02/`](../demo/week-02/) kit: `setup.sql` builds the database, `messy_export.csv` is the export to clean, and `demo_01`–`demo_04` are your reference patterns.

### What to submit
- The cleaned `reviews_clean` table (or its CSV export), the SQL, and the written note.

### How it is judged (maps to the course rubric)
- **Technical execution (30%):** correctness of the cleaned data and the quality of the SQL.
- **Handling ambiguity and failure (30%):** how you handled the no-clean-answer row (the `'C3'` `card_id`).
- **Communication (25%):** clarity of the note. The note matters as much as the query.
- **Ownership (15%):** did you profile thoroughly or stop at the first obvious issue.

### Definition of done
Someone can re-import `messy_export.csv`, run your SQL, and reproduce your `reviews_clean` table exactly, and your note tells them what was wrong and what you decided, without them having to read the queries.
