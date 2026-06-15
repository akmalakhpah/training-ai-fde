-- =============================================================================
-- Slide 12 · "Indexing a slow query — before and after"   (SQLite)
-- =============================================================================
-- HOW TO RUN — DB Browser for SQLite (https://sqlitebrowser.org):
--   Open anki_demo.db -> "Execute SQL" tab. SELECT (highlight) one statement and
--   press F5 to run it. DB Browser shows the execution time at the bottom of the
--   window, so you do not need the CLI's .timer. CLI alternative:
--   sqlite3 anki_demo.db < demo_04_indexing.sql   (add  .timer on  for timings).
--
-- SQLite has no EXPLAIN ANALYZE (that is MySQL/Postgres). The SQLite way to see
-- how a query runs is EXPLAIN QUERY PLAN. It prints the access method:
--     SCAN   reviews                              -> reads EVERY row (slow)
--     SEARCH reviews USING INDEX ... (card_id=?)  -> jumps to matching rows (fast)
-- The mental image from the slide is exactly that: full scan vs index lookup.
-- =============================================================================

-- BEFORE — no index on reviews(card_id). Expect: "SCAN reviews".
EXPLAIN QUERY PLAN
SELECT * FROM reviews WHERE card_id = 4;

-- Add the index. One line — this is the whole fix.
CREATE INDEX idx_reviews_card ON reviews(card_id);

-- AFTER — same query. Expect: "SEARCH reviews USING INDEX idx_reviews_card (card_id=?)".
EXPLAIN QUERY PLAN
SELECT * FROM reviews WHERE card_id = 4;

-- The plan changed even on 37 rows — that is the teaching point. To FEEL the
-- wall-clock difference you need volume, so the optional block below builds a
-- big table and times the same lookup with and without an index.

-- ---------------------------------------------------------------------------
-- OPTIONAL · feel the speed on ~200k rows (uses .timer; safe to skip)
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS reviews_big;
CREATE TABLE reviews_big (
  id INTEGER, card_id INTEGER, rating TEXT, correct INTEGER, reviewed_at TEXT
);

-- Generate 200,000 synthetic reviews spread across the 18 cards.
WITH RECURSIVE seq(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 200000
)
INSERT INTO reviews_big (id, card_id, rating, correct, reviewed_at)
SELECT n, (n % 18) + 1, 'good', 1, '2026-06-01 00:00:00'
FROM seq;

-- Full scan — reads all 200k rows. Note the execution time (shown at the bottom
-- of DB Browser, or enable .timer in the CLI).
SELECT COUNT(*) FROM reviews_big WHERE card_id = 4;

CREATE INDEX idx_big_card ON reviews_big(card_id);

-- Index lookup — jumps straight to card 4's rows. Note the time again — much faster.
SELECT COUNT(*) FROM reviews_big WHERE card_id = 4;

-- Confirm the plan flipped on the big table too.
EXPLAIN QUERY PLAN
SELECT COUNT(*) FROM reviews_big WHERE card_id = 4;

-- Tidy up the scratch table (the core training data is untouched).
DROP TABLE reviews_big;

-- TAKEAWAY: index the columns you filter / join / sort on (here, card_id), but
-- remember every index costs a little on each INSERT and UPDATE — index with
-- evidence (a plan that says SCAN), not by instinct.
