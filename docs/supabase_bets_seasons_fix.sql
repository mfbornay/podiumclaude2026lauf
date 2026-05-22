-- =======================================================================
-- PODIUM · FIX: Apuestas (ends_at) + Temporadas (duración / fecha fin)
-- Ejecuta en: Supabase → SQL Editor → New Query → Run
-- =======================================================================

-- 1. Añadir fecha de fin real a las apuestas
ALTER TABLE public.bets
  ADD COLUMN IF NOT EXISTS ends_at date,
  ADD COLUMN IF NOT EXISTS winner_side smallint; -- 1 o 2

-- 2. Columnas de duración y fecha fin en grupos (para temporadas)
ALTER TABLE public.groups
  ADD COLUMN IF NOT EXISTS season_duration_days integer DEFAULT 56,
  ADD COLUMN IF NOT EXISTS season_end_date date;

-- 3. Añadir status y ended_at a seasons (si la tabla existe y falta)
ALTER TABLE public.seasons
  ADD COLUMN IF NOT EXISTS ended_at timestamptz,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'closed';

-- 4. Índice útil para el cron de auto-resolución
CREATE INDEX IF NOT EXISTS idx_bets_status_ends_at
  ON public.bets (status, ends_at)
  WHERE status = 'open' AND ends_at IS NOT NULL;

-- 5. Índice para rotación de temporadas
CREATE INDEX IF NOT EXISTS idx_groups_season_end_date
  ON public.groups (season_end_date)
  WHERE season_end_date IS NOT NULL;

-- =======================================================================
