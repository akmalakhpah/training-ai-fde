-- =============================================================================
-- Slide 9 · "The profiling pass — run this first, always"   (SQLite)
-- =============================================================================
-- HOW TO RUN — DB Browser for SQLite (https://sqlitebrowser.org):
--   Open anki_demo.db -> "Execute SQL" tab -> paste this file. SELECT (highlight)
--   one query and press F5 to run just that query. CLI alternative:
--   sqlite3 anki_demo.db < demo_02_profiling.sql
--
-- Run this BEFORE touching any data. Goal: go from "I have no idea what is in
-- this table" to "I have a written catalogue of every problem" in a few minutes.
-- We profile reviews_raw (the messy export), where the problems actually live.
-- =============================================================================

-- ONE ROW PER COLUMN: blank/null count, distinct count, min, max.
-- This is the slide's UNION ALL profiling query, adapted to reviews_raw.
-- COUNT(NULLIF(TRIM(x),'')) counts values that are neither NULL nor blank, so
-- COUNT(*) minus that = the number of missing/blank values in the column.
SELECT 'card_id' AS col,
       COUNT(*) - COUNT(NULLIF(TRIM(card_id), '')) AS nulls_or_blank,
       COUNT(DISTINCT card_id)                     AS distinct_vals,
       MIN(card_id)                                AS min_val,
       MAX(card_id)                                AS max_val
FROM reviews_raw
UNION ALL
SELECT 'rating',
       COUNT(*) - COUNT(NULLIF(TRIM(rating), '')),
       COUNT(DISTINCT rating),
       MIN(rating), MAX(rating)
FROM reviews_raw
UNION ALL
SELECT 'correct',
       COUNT(*) - COUNT(NULLIF(TRIM(correct), '')),
       COUNT(DISTINCT correct),
       MIN(correct), MAX(correct)
FROM reviews_raw
UNION ALL
SELECT 'reviewed_at',
       COUNT(*) - COUNT(NULLIF(TRIM(reviewed_at), '')),
       COUNT(DISTINCT reviewed_at),
       MIN(reviewed_at), MAX(reviewed_at)
FROM reviews_raw;

-- HOW TO READ IT:
--   * card_id     — should have 0 blanks but does not; distinct count is inflated
--                   by '999', '-1', 'C3' (values that are not real card ids).
--   * rating      — distinct count is far higher than the 4 valid ratings,
--                   because of Good/GOOD/g/gud/' easy '/blank/NULL.
--   * correct     — should only ever be 0 or 1, but you will see Y, N, true, 5, x.
--   * reviewed_at — min/max betray a future date (2099-01-01) and mixed formats.

-- DRILL DOWN 1 — the category mess in `rating`. Every distinct spelling, counted.
SELECT rating, COUNT(*) AS n
FROM reviews_raw
GROUP BY rating
ORDER BY n DESC, rating;

-- DRILL DOWN 2 — the type mess in `correct`. It should only be 0 or 1.
SELECT correct, COUNT(*) AS n
FROM reviews_raw
GROUP BY correct
ORDER BY n DESC;

-- DRILL DOWN 3 — rows whose card_id is not a clean integer pointing at a real
-- card. These are the rows you will have to decide about in the cleaning step.
SELECT *
FROM reviews_raw
WHERE TRIM(card_id) = ''                               -- blank
   OR TRIM(card_id) GLOB '*[^0-9]*'                    -- contains a non-digit (e.g. 'C3', '-1')
   OR CAST(card_id AS INTEGER) NOT IN (SELECT id FROM cards);  -- numeric but no such card
