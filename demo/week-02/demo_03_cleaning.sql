-- =============================================================================
-- Slide 11 · "Messy export -> clean, queryable table"   (SQLite)
-- =============================================================================
-- HOW TO RUN — DB Browser for SQLite (https://sqlitebrowser.org):
--   Open anki_demo.db -> "Execute SQL" tab -> paste this file -> press F5 to run
--   it all (it builds reviews_clean, then shows the reconciliation + flagged rows).
--   Click "Write Changes" to keep reviews_clean. CLI alternative:
--   sqlite3 anki_demo.db < demo_03_cleaning.sql
--
-- The whole workflow, in one statement per step:
--   1. profile (done in demo_02) — we already catalogued the problems
--   2. write a cleaning CTE that fixes / drops / flags each problem
--   3. INSERT the result into a FRESH table (reviews_clean) — never clean in place
--   4. reconcile row counts:  raw = clean + dropped
-- The raw table (reviews_raw) is read-only here and stays completely untouched.
--
-- DECISIONS made below, one per problem (fix / drop / flag / escalate):
--   * wrong-type `correct`  -> FIX  : recompute from the rule correct = rating in (good,easy).
--                                      We do not trust the messy column at all.
--   * inconsistent `rating` -> FIX  : normalise via CASE WHEN (lower/trim, map typos).
--   * duplicate key         -> FIX  : keep the first row per (card_id, reviewed_at) via ROW_NUMBER.
--   * blank/unknown card_id -> DROP : a review we cannot attribute to a card is unrecoverable.
--   * unrecognised rating   -> FLAG : keep the row, mark it, leave correct NULL for review.
--   * missing/odd date      -> FLAG : keep, mark 'missing_date' — escalate to the data owner.
--   * card_id 999 (no card) -> FLAG : numeric but orphaned — keep + 'card_id_not_found' to escalate.
-- =============================================================================

DROP TABLE IF EXISTS reviews_clean;
CREATE TABLE reviews_clean (
  id          INTEGER,
  card_id     INTEGER,
  rating      TEXT,
  correct     INTEGER,
  reviewed_at TEXT,
  flag        TEXT          -- NULL when the row is clean; otherwise a ';'-joined list of issues
);

INSERT INTO reviews_clean (id, card_id, rating, correct, reviewed_at, flag)
WITH parsed AS (
  SELECT
    CAST(id AS INTEGER) AS id,
    -- card_id is clean only if it is fully numeric; otherwise NULL
    CASE WHEN TRIM(card_id) <> '' AND TRIM(card_id) NOT GLOB '*[^0-9]*'
         THEN CAST(TRIM(card_id) AS INTEGER) END AS card_id,
    -- normalise the rating: lower-case, trim, map abbreviations and typos
    CASE LOWER(TRIM(rating))
         WHEN 'again' THEN 'again' WHEN 'a'   THEN 'again'
         WHEN 'hard'  THEN 'hard'  WHEN 'h'   THEN 'hard'
         WHEN 'good'  THEN 'good'  WHEN 'g'   THEN 'good'  WHEN 'gud' THEN 'good'
         WHEN 'easy'  THEN 'easy'  WHEN 'e'   THEN 'easy'
         ELSE NULL END AS rating,
    NULLIF(TRIM(reviewed_at), '') AS reviewed_at
  FROM reviews_raw
),
graded AS (
  SELECT
    id, card_id, rating, reviewed_at,
    -- FIX: derive `correct` from the rule, ignoring the dirty source column
    CASE WHEN rating IN ('good', 'easy') THEN 1
         WHEN rating IS NULL            THEN NULL
         ELSE 0 END AS correct,
    -- build the flag string from each unresolved problem
    NULLIF(RTRIM(
      (CASE WHEN rating IS NULL THEN 'bad_rating;' ELSE '' END) ||
      (CASE WHEN reviewed_at IS NULL THEN 'missing_date;' ELSE '' END) ||
      (CASE WHEN card_id IS NOT NULL AND card_id NOT IN (SELECT id FROM cards)
            THEN 'card_id_not_found;' ELSE '' END),
    ';'), '') AS flag
  FROM parsed
),
deduped AS (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY card_id, reviewed_at ORDER BY id) AS rn
  FROM graded
  WHERE card_id IS NOT NULL        -- DROP rows we cannot attribute to any card
)
SELECT id, card_id, rating, correct, reviewed_at, flag
FROM deduped
WHERE rn = 1;                      -- FIX duplicates: keep only the first per key

-- ---------------------------------------------------------------------------
-- RECONCILE: raw = clean + dropped. The numbers must add up exactly.
-- ---------------------------------------------------------------------------
SELECT
  (SELECT COUNT(*) FROM reviews_raw)                       AS raw_rows,
  (SELECT COUNT(*) FROM reviews_clean)                     AS clean_rows,
  (SELECT COUNT(*) FROM reviews_raw
     WHERE TRIM(card_id) = '' OR TRIM(card_id) GLOB '*[^0-9]*') AS dropped_bad_card,
  (SELECT COUNT(*) FROM reviews_raw) - (SELECT COUNT(*) FROM reviews_clean)
     - (SELECT COUNT(*) FROM reviews_raw
          WHERE TRIM(card_id) = '' OR TRIM(card_id) GLOB '*[^0-9]*') AS dropped_duplicates;
-- Expect: raw_rows = 30, clean_rows = 26, dropped_bad_card = 3, dropped_duplicates = 1.
-- (3 unattributable card_ids: '', 'C3', '-1'  +  1 duplicate row removed = 4 dropped.)

-- PROOF the raw table is untouched (still 30 rows).
SELECT COUNT(*) AS raw_still_intact FROM reviews_raw;

-- WHAT GOT FLAGGED rather than dropped (review these with the data owner).
SELECT * FROM reviews_clean WHERE flag IS NOT NULL ORDER BY id;
