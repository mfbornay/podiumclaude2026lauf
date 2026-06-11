-- ══════════════════════════════════════════════════════════════
-- PLAYOFFS MIGRATION
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- El bracket completo se guarda como JSONB en el grupo:
-- { active, round (qf|sf|final|done), round_starts, round_ends,
--   matches: { qf:[{p1,p2,seed1,seed2,winner}], sf:[...], final:[...] },
--   champion }
ALTER TABLE groups ADD COLUMN IF NOT EXISTS playoff JSONB;
