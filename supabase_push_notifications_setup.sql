-- ══════════════════════════════════════════════════════════════
-- push_subscriptions: tabla para notificaciones push Web Push
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint    TEXT NOT NULL UNIQUE,
  p256dh      TEXT NOT NULL,
  auth        TEXT NOT NULL,
  group_id    UUID REFERENCES groups(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "push_select" ON push_subscriptions;
DROP POLICY IF EXISTS "push_insert" ON push_subscriptions;
DROP POLICY IF EXISTS "push_delete" ON push_subscriptions;

CREATE POLICY "push_select" ON push_subscriptions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "push_insert" ON push_subscriptions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "push_delete" ON push_subscriptions FOR DELETE USING (user_id = auth.uid());
