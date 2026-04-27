-- Tabla para récords personales (RMs y tiempos)
-- Ejecutar en Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS user_records (
  user_id     UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_key  TEXT    NOT NULL,
  record_value TEXT   NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, record_key)
);

-- RLS
ALTER TABLE user_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own records"
  ON user_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert their own records"
  ON user_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own records"
  ON user_records FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own records"
  ON user_records FOR DELETE
  USING (auth.uid() = user_id);

-- Índice para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_user_records_user_id ON user_records(user_id);
