-- ══════════════════════════════════════════════════════════════
-- SMART BETS MIGRATION
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- Extend bets table with smart bet fields
ALTER TABLE bets ADD COLUMN IF NOT EXISTS bet_type   TEXT DEFAULT 'duel_ambito';
ALTER TABLE bets ADD COLUMN IF NOT EXISTS metric      TEXT;
ALTER TABLE bets ADD COLUMN IF NOT EXISTS target_user_id UUID REFERENCES auth.users(id);
ALTER TABLE bets ADD COLUMN IF NOT EXISTS target_value   INT;
ALTER TABLE bets ADD COLUMN IF NOT EXISTS condition       TEXT DEFAULT 'gte';
ALTER TABLE bets ADD COLUMN IF NOT EXISTS betting_closes_at TIMESTAMPTZ;
ALTER TABLE bets ADD COLUMN IF NOT EXISTS ends_at          TIMESTAMPTZ;

-- Expand status allowed values (keep backward compat with 'open')
ALTER TABLE bets DROP CONSTRAINT IF EXISTS bets_status_check;
ALTER TABLE bets ADD CONSTRAINT bets_status_check
  CHECK (status IN ('open','betting','locked','won','lost','cancelled'));

-- Index for faster status queries
CREATE INDEX IF NOT EXISTS bets_group_status ON bets(group_id, status);

-- bet_stakes: ensure user_id column exists (should already, just in case)
ALTER TABLE bet_stakes ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
