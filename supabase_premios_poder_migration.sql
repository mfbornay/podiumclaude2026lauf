-- ══════════════════════════════════════════════════════════════
-- PREMIOS DE PODER MIGRATION
-- Ejecutar en Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- Power effects on users
ALTER TABLE users ADD COLUMN IF NOT EXISTS silenced_until DATE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS renamed_to TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS renamed_until DATE;

-- Power holder and pin state on groups
ALTER TABLE groups ADD COLUMN IF NOT EXISTS power_holder_id UUID REFERENCES auth.users(id);
ALTER TABLE groups ADD COLUMN IF NOT EXISTS pinned_message TEXT;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS pin_used BOOLEAN DEFAULT FALSE;

-- Track power usage (for limits enforcement)
CREATE TABLE IF NOT EXISTS power_usage (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  holder_id    UUID REFERENCES auth.users(id) NOT NULL,
  group_id     UUID REFERENCES groups(id) NOT NULL,
  power        TEXT NOT NULL CHECK (power IN ('silence','rename','emoji','pin')),
  target_user_id UUID REFERENCES auth.users(id),
  used_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS power_usage_holder ON power_usage(holder_id, group_id, power);

-- Enable RLS
ALTER TABLE power_usage ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read power_usage for their group
CREATE POLICY "power_usage_read" ON power_usage
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Only the power holder can insert their own usage
CREATE POLICY "power_usage_insert" ON power_usage
  FOR INSERT WITH CHECK (auth.uid() = holder_id);

-- To assign the power holder after a season ends, run:
-- UPDATE groups SET power_holder_id = '<winner_user_id>' WHERE id = '<group_id>';
