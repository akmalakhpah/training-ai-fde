-- =============================================================================
-- Week 2 · Data Fluency — demo database SETUP  (SQLite)
-- =============================================================================
-- Builds the "training dataset" the slides refer to, themed after the real
-- AI Anki app (decks -> cards -> reviews). Run this ONCE to create every table
-- and load it with data.
--
-- DB Browser for SQLite (https://sqlitebrowser.org) — recommended GUI:
--   1. New Database -> name it  anki_demo.db  (cancel the "create table" popup).
--   2. "Execute SQL" tab -> paste this whole file -> press F5 (Execute all).
--   3. Click "Write Changes" to save. The final query shows the row counts.
--   Then open each demo_0N_*.sql the same way (paste into Execute SQL, F5).
--
-- CLI alternative:
--     sqlite3 anki_demo.db < setup.sql
--     sqlite3 anki_demo.db < demo_01_queries.sql   (etc.)
--
-- Requires SQLite 3.25+ (for window functions). DB Browser bundles its own;
-- in the CLI check with:  sqlite3 --version
-- The schema mirrors the real anki app (../../training-ai-fde-anki/data/schema.sql):
-- dates are TEXT (ISO-8601), ease is REAL — exactly as the product stores them.
-- =============================================================================

-- Re-runnable: drop everything first so `setup.sql` can be applied repeatedly.
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS reviews_raw;
DROP TABLE IF EXISTS reviews_clean;
DROP TABLE IF EXISTS reviews_big;

-- -----------------------------------------------------------------------------
-- Clean schema (the well-behaved "training database" for the query demo)
-- -----------------------------------------------------------------------------
CREATE TABLE decks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE cards (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  deck_id       INTEGER NOT NULL REFERENCES decks(id),
  front         TEXT NOT NULL,
  back          TEXT NOT NULL,
  ease          REAL    NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  next_due      TEXT    NOT NULL DEFAULT (date('now')),
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE reviews (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id     INTEGER NOT NULL REFERENCES cards(id),
  rating      TEXT    NOT NULL,   -- 'again' | 'hard' | 'good' | 'easy'
  correct     INTEGER NOT NULL,   -- 1 if rating in ('good','easy') else 0
  reviewed_at TEXT    NOT NULL
);
-- NOTE: we deliberately do NOT index reviews(card_id) here — demo_04 adds it live.

-- -----------------------------------------------------------------------------
-- Decks  (deck 4 is intentionally empty — exercises the empty-deck edge case)
-- -----------------------------------------------------------------------------
INSERT INTO decks (id, name, created_at) VALUES
  (1, 'AI Glossary',      '2026-05-15 08:00:00'),
  (2, 'Spanish Basics',   '2026-05-16 08:00:00'),
  (3, 'SQL Keywords',     '2026-05-17 08:00:00'),
  (4, 'Empty Deck (new)', '2026-06-14 08:00:00');

-- -----------------------------------------------------------------------------
-- Cards  (vocab ported from the real anki seed: LLM/RAG/MCP/API/CI-CD/ML)
-- -----------------------------------------------------------------------------
INSERT INTO cards (id, deck_id, front, back, ease, interval_days, next_due, created_at) VALUES
  -- Deck 1 · AI Glossary
  (1,  1, 'LLM',   'Large Language Model — a neural network trained on text to understand and generate language.', 2.6, 7, '2026-06-14', '2026-05-15 08:05:00'),
  (2,  1, 'RAG',   'Retrieval-Augmented Generation — fetch documents and feed them to an LLM as context.',          2.5, 4, '2026-06-16', '2026-05-15 08:05:00'),
  (3,  1, 'MCP',   'Model Context Protocol — an open standard for connecting AI models to tools and data.',          2.5, 2, '2026-06-15', '2026-05-15 08:05:00'),
  (4,  1, 'API',   'Application Programming Interface — a contract that lets one program call another.',             2.2, 1, '2026-06-15', '2026-05-15 08:05:00'),
  (5,  1, 'CI/CD', 'Continuous Integration / Delivery — automated pipelines that build, test, and ship code.',      2.5, 3, '2026-06-15', '2026-05-15 08:05:00'),
  (6,  1, 'ML',    'Machine Learning — algorithms that learn patterns from data instead of being programmed.',      2.7, 9, '2026-06-20', '2026-05-15 08:05:00'),
  -- Deck 2 · Spanish Basics
  (7,  2, 'hola',      'hello',        2.6, 6, '2026-06-19', '2026-05-16 08:05:00'),
  (8,  2, 'gracias',   'thank you',    2.4, 3, '2026-06-15', '2026-05-16 08:05:00'),
  (9,  2, 'por favor', 'please',       2.2, 2, '2026-06-16', '2026-05-16 08:05:00'),
  (10, 2, 'adiós',     'goodbye',      2.5, 4, '2026-06-17', '2026-05-16 08:05:00'),
  (11, 2, 'agua',      'water',        2.5, 0, '2026-06-15', '2026-05-16 08:05:00'),
  (12, 2, 'gato',      'cat',          2.5, 0, '2026-06-15', '2026-05-16 08:05:00'),
  -- Deck 3 · SQL Keywords
  (13, 3, 'SELECT',   'Choose which columns to return.',                          2.6, 5, '2026-06-18', '2026-05-17 08:05:00'),
  (14, 3, 'JOIN',     'Combine rows from two tables on a matching key.',          2.1, 2, '2026-06-16', '2026-05-17 08:05:00'),
  (15, 3, 'GROUP BY', 'Collapse rows into groups for aggregation.',               2.5, 3, '2026-06-15', '2026-05-17 08:05:00'),
  (16, 3, 'INDEX',    'A lookup structure that avoids scanning every row.',       2.5, 4, '2026-06-17', '2026-05-17 08:05:00'),
  (17, 3, 'CTE',      'A named subquery via WITH, referenced later in the query.',2.5, 3, '2026-06-16', '2026-05-17 08:05:00'),
  (18, 3, 'WINDOW',   'A function computed across rows without collapsing them.', 2.4, 2, '2026-06-16', '2026-05-17 08:05:00');

-- -----------------------------------------------------------------------------
-- Reviews  (clean — but note one PLANTED DUPLICATE on card 1 for the ROW_NUMBER
-- demo, and a lapse on card 1 on 2026-06-10 for the LAG demo)
-- -----------------------------------------------------------------------------
INSERT INTO reviews (id, card_id, rating, correct, reviewed_at) VALUES
  -- card 1 (LLM): a clean time series with a lapse, then a duplicate row
  (1,  1, 'good',  1, '2026-05-20 09:00:00'),
  (2,  1, 'easy',  1, '2026-05-27 09:00:00'),
  (3,  1, 'easy',  1, '2026-06-03 09:00:00'),
  (4,  1, 'again', 0, '2026-06-10 09:00:00'),   -- <- lapse: knew it, then forgot
  (5,  1, 'good',  1, '2026-06-14 09:00:00'),
  (6,  1, 'good',  1, '2026-06-14 09:00:00'),   -- <- DUPLICATE of #5 (same card + timestamp)
  -- card 2 (RAG)
  (7,  2, 'again', 0, '2026-05-21 10:00:00'),
  (8,  2, 'hard',  0, '2026-05-28 10:00:00'),
  (9,  2, 'good',  1, '2026-06-08 10:00:00'),
  -- card 3 (MCP)
  (10, 3, 'good',  1, '2026-05-25 11:00:00'),
  (11, 3, 'good',  1, '2026-06-09 11:00:00'),
  -- card 4 (API): >3 reviews, for the HAVING demo
  (12, 4, 'hard',  0, '2026-05-22 14:00:00'),
  (13, 4, 'again', 0, '2026-05-30 14:00:00'),
  (14, 4, 'good',  1, '2026-06-05 14:00:00'),
  (15, 4, 'easy',  1, '2026-06-12 14:00:00'),
  -- card 5 (CI/CD)
  (16, 5, 'good',  1, '2026-06-02 08:30:00'),
  -- card 6 (ML)
  (17, 6, 'easy',  1, '2026-05-26 08:30:00'),
  (18, 6, 'easy',  1, '2026-06-11 08:30:00'),
  -- card 7 (hola)
  (19, 7, 'good',  1, '2026-05-19 19:00:00'),
  (20, 7, 'good',  1, '2026-06-01 19:00:00'),
  (21, 7, 'easy',  1, '2026-06-13 19:00:00'),
  -- card 8 (gracias)
  (22, 8, 'hard',  0, '2026-05-20 19:05:00'),
  (23, 8, 'good',  1, '2026-06-04 19:05:00'),
  -- card 9 (por favor)
  (24, 9, 'again', 0, '2026-05-23 19:10:00'),
  (25, 9, 'hard',  0, '2026-06-06 19:10:00'),
  (26, 9, 'good',  1, '2026-06-14 19:10:00'),
  -- card 10 (adiós)
  (27, 10, 'good', 1, '2026-06-07 19:15:00'),
  -- card 13 (SELECT)
  (28, 13, 'easy', 1, '2026-05-18 21:00:00'),
  (29, 13, 'good', 1, '2026-06-02 21:00:00'),
  -- card 14 (JOIN)
  (30, 14, 'hard',  0, '2026-05-29 21:05:00'),
  (31, 14, 'again', 0, '2026-06-05 21:05:00'),
  (32, 14, 'good',  1, '2026-06-12 21:05:00'),
  -- card 15 (GROUP BY)
  (33, 15, 'good', 1, '2026-06-03 21:10:00'),
  -- card 16 (INDEX)
  (34, 16, 'easy', 1, '2026-06-08 21:15:00'),
  -- card 17 (CTE)
  (35, 17, 'good', 1, '2026-06-09 21:20:00'),
  -- card 18 (WINDOW)
  (36, 18, 'hard', 0, '2026-06-10 21:25:00'),
  (37, 18, 'good', 1, '2026-06-14 21:25:00');

-- =============================================================================
-- MESSY staging table — the "deliberately messy export" for the cleaning demo
-- and the project. All columns are TEXT, because that is how a CSV import lands
-- (SQLite's TEXT affinity keeps every value verbatim — '2.5x', 'Y', 'June 12'
-- are all preserved). This table is the raw load; NEVER clean it in place.
-- Every dirty-data category from slide 8 is planted below.
-- =============================================================================
CREATE TABLE reviews_raw (
  id          TEXT,
  card_id     TEXT,
  rating      TEXT,
  correct     TEXT,
  reviewed_at TEXT
);

INSERT INTO reviews_raw (id, card_id, rating, correct, reviewed_at) VALUES
  -- clean, well-formed rows
  ('1',  '1', 'good',  '1', '2026-05-20 09:00:00'),
  ('2',  '1', 'easy',  '1', '2026-05-27 09:00:00'),
  ('3',  '2', 'again', '0', '2026-05-21 10:00:00'),
  ('4',  '3', 'good',  '1', '2026-05-25 11:00:00'),
  ('5',  '4', 'hard',  '0', '2026-05-22 14:00:00'),
  -- inconsistent categories: all of these mean a known rating
  ('6',  '1', 'Good',  '1', '2026-06-03 09:00:00'),   -- capitalised
  ('7',  '2', 'GOOD',  '1', '2026-06-08 10:00:00'),   -- upper-case
  ('8',  '4', ' easy ','1', '2026-06-12 14:00:00'),   -- surrounding whitespace
  ('9',  '3', 'g',     '1', '2026-06-09 11:00:00'),   -- abbreviation
  ('10', '6', 'gud',   '1', '2026-06-11 08:30:00'),   -- typo
  -- wrong types: boolean-ish `correct`, non-ISO dates
  ('11', '7',  'good', 'Y',    '2026-06-01 19:00:00'),
  ('12', '8',  'hard', 'N',    '2026-05-20 19:05:00'),
  ('13', '9',  'good', 'true', '2026/06/14 19:10:00'),-- slashes in date
  ('14', '13', 'easy', '1',    '18-05-2026'),         -- dd-mm-yyyy
  ('15', '14', 'good', '1',    'June 12 2026'),        -- free-text date
  -- out-of-range values
  ('16', '999','good', '1', '2026-06-02 08:30:00'),   -- card_id has no such card
  ('17', '4',  'easy', '5', '2026-06-05 14:00:00'),   -- correct should be 0/1
  ('18', '5',  'good', '1', '2099-01-01 00:00:00'),   -- timestamp in the future
  ('19', '-1', 'good', '1', '2026-06-07 19:15:00'),   -- negative card_id
  -- nulls / blanks in required fields
  ('20', '',   'good', '1', '2026-06-04 19:05:00'),   -- card_id blank
  ('21', '15', '',     '1', '2026-06-03 21:10:00'),   -- rating blank
  ('22', '16', NULL,   '1', '2026-06-08 21:15:00'),   -- rating NULL
  -- duplicate key: same card + timestamp, conflicting rating
  ('23', '1',  'good', '1', '2026-06-14 09:00:00'),
  ('24', '1',  'easy', '1', '2026-06-14 09:00:00'),   -- <- duplicate of #23
  -- broken / no-clean-answer rows (the project's "you must choose and justify")
  ('25', 'C3', 'good', '1', '2026-06-09 11:00:00'),   -- card_id 'C3' — card 3? unknown
  ('26', '4',  'goo',  'x', ''),                       -- truncated rating, garbage correct, no date
  -- a few more clean rows
  ('27', '7',  'good',  '1', '2026-06-13 19:00:00'),
  ('28', '9',  'again', '0', '2026-05-23 19:10:00'),
  ('29', '17', 'good',  '1', '2026-06-09 21:20:00'),
  ('30', '18', 'hard',  '0', '2026-06-10 21:25:00');

-- Quick confirmation the load worked (rows should be: decks 4, cards 18, reviews 37, raw 30).
SELECT 'decks'       AS tbl, COUNT(*) AS rows FROM decks
UNION ALL SELECT 'cards',       COUNT(*) FROM cards
UNION ALL SELECT 'reviews',     COUNT(*) FROM reviews
UNION ALL SELECT 'reviews_raw', COUNT(*) FROM reviews_raw;
