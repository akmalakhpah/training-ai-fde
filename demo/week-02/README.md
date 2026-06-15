# Week 2 · Data Fluency — demo database (SQLite)

The "training dataset" the Week 2 slides keep referring to, made real. It is themed
after the **AI Anki** app the cohort forks in Week 1 (`decks` → `cards` → `reviews`),
and it runs on **SQLite** — the same engine the app uses, so this is literally the
"AI Anki option" mentioned in the project brief, pre-built.

> Slide wording uses an **orders / customers** domain; this database uses
> **decks / cards / reviews**. The ideas are identical — see the mapping table below.

## Requirements

- **DB Browser for SQLite** — the GUI we use. Download (free, Win/Mac/Linux):
  **https://sqlitebrowser.org/dl/**. It bundles its own SQLite engine (3.25+), so there is
  nothing else to install.
- A SQLite database is just a file (`anki_demo.db`) — no server, no `CREATE DATABASE`.
- *(Optional)* the `sqlite3` CLI works too, if you prefer the terminal (`sqlite3 --version`
  to check you have 3.25+).

> **DB Browser runs SQL, not the `sqlite3` dot-commands.** The demo files contain pure SQL —
> no `.mode`, `.headers`, or `.timer` — so they paste straight into the "Execute SQL" tab.
> DB Browser shows results in a grid and the run time at the bottom automatically.

## Run it — DB Browser for SQLite

1. **Build the database once.** *New Database* → name it `anki_demo.db` (cancel the
   "create table" popup) → **Execute SQL** tab → paste all of `setup.sql` → press **F5**
   (Execute all) → **Write Changes**. The final query shows the row counts.
2. **Run a demo.** Open each file below in the **Execute SQL** tab and run it:
   - To watch the build-up query by query, **highlight one statement and press F5** —
     DB Browser runs just the selection. (F5 with nothing selected runs the whole file and
     shows only the *last* query's result.)

| File | Slide | What it shows |
| --- | --- | --- |
| `demo_01_queries.sql`   | 7  | JOIN → HAVING → CTE → `ROW_NUMBER` (dup) → `LAG` (lapse) → running total |
| `demo_02_profiling.sql` | 9  | the profiling pass over the messy export |
| `demo_03_cleaning.sql`  | 11 | messy export → clean table, with row-count reconciliation |
| `demo_04_indexing.sql`  | 12 | `EXPLAIN QUERY PLAN` before/after `CREATE INDEX` |

`setup.sql` is **re-runnable** — it drops and recreates everything, so you can reset the
database at any time by pasting it again and pressing F5.

### CLI alternative

```sh
cd demo/week-02
sqlite3 anki_demo.db < setup.sql
sqlite3 anki_demo.db < demo_01_queries.sql   # etc.
# for tidy columns in an interactive session: .mode column then .headers on
```

## What is in the database

| Table | Rows | Role |
| --- | --- | --- |
| `decks` | 4 | incl. one empty deck (exercises the empty-deck edge case) |
| `cards` | 18 | 3 decks of 6 cards; vocab ported from the real anki seed |
| `reviews` | 37 | clean-ish — but with **one planted duplicate** and **one planted lapse** on card 1 |
| `reviews_raw` | 30 | the **deliberately messy export** — all `TEXT`, every dirty-data category planted |

The schema mirrors the real app (`../../training-ai-fde-anki/data/schema.sql`): dates are
`TEXT` (ISO-8601), `ease` is `REAL`, `correct` is `1` when the rating is `good`/`easy`.

## Slide → Anki query mapping

The slides talk orders; you run reviews. Same construct, renamed columns:

| Slide (orders domain) | This database (Anki domain) |
| --- | --- |
| `orders` table | `reviews` table |
| `customers` table | `cards` / `decks` |
| `customer_id` | `card_id` |
| `order_date` | `reviewed_at` |
| `order_total` (reversal via `LAG`) | `correct` (lapse via `LAG` — knew it, then forgot) |
| "customers with > 3 orders" | "cards reviewed > 3 times" (`demo_01` step 2) |
| `ROW_NUMBER` to find duplicate orders | `ROW_NUMBER` to find duplicate reviews (`demo_01` step 4) |
| `price` as `'RM 12.50'` (wrong type) | `correct` as `'Y'`/`'true'`/`'5'`, dates as `'June 12 2026'` (`reviews_raw`) |
| `'MY'`/`'Malaysia'`/`'MYS'` (category drift) | `'good'`/`'Good'`/`'GOOD'`/`'g'`/`'gud'` (`reviews_raw`) |
| `CREATE INDEX ... ON orders(customer_id)` | `CREATE INDEX ... ON reviews(card_id)` (`demo_04`) |

## SQLite vs the slides: one syntax difference

Slide 12 says **`EXPLAIN ANALYZE`** — that is MySQL/Postgres. SQLite uses
**`EXPLAIN QUERY PLAN`**, which prints the access method instead of a timing:

- `SCAN reviews` → reads every row (slow).
- `SEARCH reviews USING INDEX idx_reviews_card (card_id=?)` → jumps to matching rows (fast).

For wall-clock timing, turn on `.timer` in the `sqlite3` shell (see `demo_04`'s optional
200k-row block). The slide has been updated to say `EXPLAIN QUERY PLAN`.

## Instructor cues (per file)

- **`demo_01`** — build up slowly; ask the room to *predict* each result before running.
  Step 4 finds the duplicate review; step 5 finds the lapse on card 1 (`again` after two `easy`s).
- **`demo_02`** — run this *first*, every time. The point lands when the `rating` distinct
  count comes back far higher than 4. Narrate every problem aloud — that catalogue drives `demo_03`.
- **`demo_03`** — emphasise *never clean in place*. End on the reconciliation: `raw_rows = 30`,
  `clean_rows = 26`, `dropped_bad_card = 3`, `dropped_duplicates = 1` (30 = 26 + 4), and `reviews_raw`
  is still 30. Walk through one *fix*, one *drop*, one *flag* decision.
- **`demo_04`** — show the plan flip on the 37-row table first (`SCAN` → `SEARCH`), then run the
  optional 200k block with `.timer on` to feel the speed.

## The project starter: `messy_export.csv`

`messy_export.csv` is the same 30 dirty rows as a CSV, for students to load themselves
(mirrors "a real customer export").

**In DB Browser:** *File → Import → Table from CSV file…* → pick `messy_export.csv` → tick
**"Column names in first line"** → set the table name (e.g. `reviews_raw_import`) → OK →
**Write Changes**. (DB Browser infers `TEXT` columns, which is exactly what we want — every
messy value lands verbatim.)

**CLI alternative** — create the table *first* so the import uses these column names
(otherwise SQLite names them after the CSV's first data row):

```sh
sqlite3 anki_demo.db
sqlite> CREATE TABLE reviews_raw_import (id TEXT, card_id TEXT, rating TEXT, correct TEXT, reviewed_at TEXT);
sqlite> .mode csv
sqlite> .import --skip 1 messy_export.csv reviews_raw_import
```

> CSV note: a blank field arrives as an empty string `''` (where `setup.sql` used SQL `NULL`
> for one rating). Both mean "missing rating" and the cleaning logic in `demo_03` treats them
> identically, so the cleaned result is the same.

Then the project is: profile it (`demo_02` pattern) → clean it (`demo_03` pattern) → load into
a fresh table → write the one-paragraph note. The `'C3'` row (card 3? unknown) is the
"at least one problem with no clean answer" the brief warns about — choose and justify.
