-- =============================================================================
-- Slide 7 · "Build a query from simple to complex"   (SQLite)
-- =============================================================================
-- HOW TO RUN — DB Browser for SQLite (https://sqlitebrowser.org):
--   Open anki_demo.db -> "Execute SQL" tab -> paste this file. To see ONE query's
--   output, SELECT (highlight) that query's text and press F5 — DB Browser runs
--   just the selection. F5 with nothing selected runs the whole file and shows
--   only the LAST query's result. Results and timing appear automatically.
--   CLI alternative:  sqlite3 anki_demo.db < demo_01_queries.sql
--   (run  .mode column  and  .headers on  first for tidy columns).
--
-- TEACHING RHYTHM: before each query, ask the room to predict the output.
-- Slide wording is orders/customers; here it is decks/cards/reviews — same idea.
-- =============================================================================

-- STEP 1 — a simple INNER JOIN. "Show every review with its card and deck."
-- (Slide analogue: join orders to customers.)
SELECT d.name AS deck, c.front AS card, r.rating, r.reviewed_at
FROM reviews r
JOIN cards c ON c.id = r.card_id
JOIN decks d ON d.id = c.deck_id
ORDER BY r.reviewed_at
LIMIT 10;

-- STEP 2 — aggregate + HAVING. "Which cards have been reviewed more than 3 times?"
-- (Slide analogue: customers with more than 3 orders this month.)
-- HAVING filters AFTER the GROUP BY — you cannot use COUNT(*) in a WHERE.
SELECT c.id, c.front AS card, COUNT(*) AS review_count
FROM reviews r
JOIN cards c ON c.id = r.card_id
GROUP BY c.id, c.front
HAVING COUNT(*) > 3
ORDER BY review_count DESC;

-- STEP 3 — refactor the join into a CTE, then build on it. Same result as a
-- subquery would give, but the WITH block names the intermediate step so the
-- final SELECT reads top-to-bottom. "Retention per deck."
WITH deck_reviews AS (
  SELECT d.id AS deck_id, d.name AS deck, r.correct
  FROM reviews r
  JOIN cards c ON c.id = r.card_id
  JOIN decks d ON d.id = c.deck_id
)
SELECT deck,
       COUNT(*)                              AS reviews,
       SUM(correct)                          AS correct,
       ROUND(100.0 * SUM(correct) / COUNT(*), 1) AS retention_pct
FROM deck_reviews
GROUP BY deck
ORDER BY retention_pct DESC;

-- STEP 4 — ROW_NUMBER to surface DUPLICATE rows. Number the reviews within each
-- (card_id, reviewed_at) group; anything numbered > 1 is a duplicate.
-- This finds the planted duplicate on card 1 at 2026-06-14 09:00:00.
WITH ranked AS (
  SELECT id, card_id, rating, reviewed_at,
         ROW_NUMBER() OVER (PARTITION BY card_id, reviewed_at ORDER BY id) AS rn
  FROM reviews
)
SELECT * FROM ranked WHERE rn > 1;

-- STEP 5 — LAG to detect a LAPSE (the Anki analogue of an order_total reversal).
-- Pull each card's PREVIOUS review outcome onto the current row, then keep the
-- rows where the learner knew it (prev_correct = 1) but then forgot (correct = 0).
-- Surfaces card 1's 'again' on 2026-06-10, right after two 'easy's.
WITH seq AS (
  SELECT r.id, c.front AS card, r.reviewed_at, r.rating, r.correct,
         LAG(r.correct) OVER (PARTITION BY r.card_id ORDER BY r.reviewed_at) AS prev_correct
  FROM reviews r
  JOIN cards c ON c.id = r.card_id
)
SELECT card, reviewed_at, rating, prev_correct, correct
FROM seq
WHERE prev_correct = 1 AND correct = 0;

-- STEP 6 — SUM(...) OVER for a RUNNING TOTAL without collapsing rows.
-- A per-card running count of reviews and running count of correct answers.
SELECT c.front AS card, r.reviewed_at, r.rating, r.correct,
       COUNT(*)     OVER (PARTITION BY r.card_id ORDER BY r.reviewed_at) AS running_reviews,
       SUM(r.correct) OVER (PARTITION BY r.card_id ORDER BY r.reviewed_at) AS running_correct
FROM reviews r
JOIN cards c ON c.id = r.card_id
WHERE r.card_id = 1
ORDER BY r.reviewed_at;
