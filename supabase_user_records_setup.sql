-- ══════════════════════════════════════════════════════════════
-- user_records: tabla para RMs de Cardio y Gym
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS user_records (
  user_id     UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_key  TEXT    NOT NULL,
  record_value TEXT   NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, record_key)
);

ALTER TABLE user_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "records_select" ON user_records;
DROP POLICY IF EXISTS "records_insert" ON user_records;
DROP POLICY IF EXISTS "records_update" ON user_records;
DROP POLICY IF EXISTS "records_delete" ON user_records;

-- Cualquier usuario autenticado puede ver los records de cualquiera
CREATE POLICY "records_select" ON user_records FOR SELECT USING (true);

-- Solo puedes insertar/modificar/borrar tus propios records
CREATE POLICY "records_insert" ON user_records FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "records_update" ON user_records FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "records_delete" ON user_records FOR DELETE USING (user_id = auth.uid());
