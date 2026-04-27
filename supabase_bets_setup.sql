-- ══════════════════════════════════════════════════════════════
-- TABLA: bets (apuestas duelo creadas por admin)
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS bets (
  id          BIGSERIAL PRIMARY KEY,
  group_id    TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,
  p1_id       UUID NOT NULL REFERENCES auth.users(id),
  p2_id       UUID NOT NULL REFERENCES auth.users(id),
  pot         INT  NOT NULL DEFAULT 5,
  ends_label  TEXT NOT NULL DEFAULT 'domingo',
  status      TEXT NOT NULL DEFAULT 'open'  CHECK (status IN ('open','won','lost','cancelled')),
  winner_side INT  CHECK (winner_side IN (1,2)),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE bets ENABLE ROW LEVEL SECURITY;

-- Cualquier miembro del grupo puede ver apuestas
CREATE POLICY "bets_select" ON bets FOR SELECT USING (
  group_id IN (SELECT group_id FROM group_members WHERE user_id = auth.uid())
);

-- Solo admins pueden crear apuestas (lo validamos en app también)
CREATE POLICY "bets_insert" ON bets FOR INSERT WITH CHECK (
  group_id IN (SELECT group_id FROM group_members WHERE user_id = auth.uid())
);

-- Solo admins pueden cerrar apuestas (validamos en app)
CREATE POLICY "bets_update" ON bets FOR UPDATE USING (
  group_id IN (SELECT group_id FROM group_members WHERE user_id = auth.uid())
);

-- ══════════════════════════════════════════════════════════════
-- TABLA: bet_stakes (apuestas de espectadores)
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS bet_stakes (
  id         BIGSERIAL PRIMARY KEY,
  bet_id     BIGINT NOT NULL REFERENCES bets(id) ON DELETE CASCADE,
  user_id    UUID   NOT NULL REFERENCES auth.users(id),
  side       INT    NOT NULL CHECK (side IN (1,2)),
  amount     INT    NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (bet_id, user_id)
);

ALTER TABLE bet_stakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bet_stakes_select" ON bet_stakes FOR SELECT USING (true);

CREATE POLICY "bet_stakes_insert" ON bet_stakes FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

CREATE POLICY "bet_stakes_update" ON bet_stakes FOR UPDATE USING (
  user_id = auth.uid()
);
