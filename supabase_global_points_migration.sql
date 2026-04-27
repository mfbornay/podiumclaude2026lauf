-- ══════════════════════════════════════════════════════════════
-- MIGRACIÓN: puntos globales + fix RLS disputes
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- 1. Cambiar unique constraint de daily_logs a (user_id, date)
--    (los logs son del usuario, no de la liga)
ALTER TABLE daily_logs DROP CONSTRAINT IF EXISTS daily_logs_pkey;
ALTER TABLE daily_logs DROP CONSTRAINT IF EXISTS daily_logs_user_id_group_id_date_key;
ALTER TABLE daily_logs DROP CONSTRAINT IF EXISTS daily_logs_user_date_key;
ALTER TABLE daily_logs ADD CONSTRAINT daily_logs_user_date_key UNIQUE (user_id, date);

-- 2. Recrear group_ranking view para calcular puntos por liga
--    via JOIN con group_members (no por group_id en daily_logs)
DROP VIEW IF EXISTS group_ranking;
CREATE OR REPLACE VIEW group_ranking AS
SELECT
  gm.group_id,
  dl.user_id,
  COALESCE(SUM(dl.total_pts), 0)::int AS total_pts,
  COUNT(*)::int AS days_logged
FROM daily_logs dl
JOIN group_members gm ON gm.user_id = dl.user_id
GROUP BY gm.group_id, dl.user_id;

-- 3. Fix RLS de disputes (faltaban políticas de INSERT/SELECT)
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "disputes_select" ON disputes;
DROP POLICY IF EXISTS "disputes_insert" ON disputes;
DROP POLICY IF EXISTS "disputes_update" ON disputes;

CREATE POLICY "disputes_select" ON disputes FOR SELECT USING (
  group_id IN (
    SELECT group_id FROM group_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "disputes_insert" ON disputes FOR INSERT WITH CHECK (
  challenger = auth.uid()
  AND group_id IN (
    SELECT group_id FROM group_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "disputes_update" ON disputes FOR UPDATE USING (
  group_id IN (
    SELECT group_id FROM group_members WHERE user_id = auth.uid()
  )
);

-- 4. Fix RLS de dispute_votes si no existe
ALTER TABLE dispute_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "dispute_votes_select" ON dispute_votes;
DROP POLICY IF EXISTS "dispute_votes_insert" ON dispute_votes;
DROP POLICY IF EXISTS "dispute_votes_upsert" ON dispute_votes;

CREATE POLICY "dispute_votes_select" ON dispute_votes FOR SELECT USING (true);

CREATE POLICY "dispute_votes_upsert" ON dispute_votes FOR INSERT WITH CHECK (
  voter_id = auth.uid()
);

CREATE POLICY "dispute_votes_update" ON dispute_votes FOR UPDATE USING (
  voter_id = auth.uid()
);
