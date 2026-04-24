-- ═══════════════════════════════════════════════════════════
--  feed_reactions  –  Reacciones emoji en el feed de Podium
--  Ejecutar en: Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════

create table if not exists public.feed_reactions (
  id          bigserial    primary key,
  group_id    uuid         not null references public.groups(id) on delete cascade,
  user_id     uuid         not null references auth.users(id)    on delete cascade,
  feed_type   text         not null check (feed_type in ('log','streak','bet_open','bet_won','dispute')),
  feed_ref    text         not null,   -- ej: '{user_id}:{date}' para logs, 'dispute:{id}'...
  emoji       text         not null,
  created_at  timestamptz  not null default now(),
  unique (user_id, feed_ref, emoji)
);

-- Índice para buscar reacciones de un grupo rápido
create index if not exists feed_reactions_group_idx on public.feed_reactions (group_id);

-- ── RLS ────────────────────────────────────────────────────
alter table public.feed_reactions enable row level security;

-- Miembros del grupo pueden leer todas las reacciones de su grupo
create policy "group members read reactions"
  on public.feed_reactions for select
  using (
    group_id in (
      select group_id from public.group_members where user_id = auth.uid()
    )
  );

-- Solo puedes insertar reacciones propias en tu grupo
create policy "group members insert own reactions"
  on public.feed_reactions for insert
  with check (
    user_id = auth.uid() and
    group_id in (
      select group_id from public.group_members where user_id = auth.uid()
    )
  );

-- Solo puedes borrar tus propias reacciones
create policy "delete own reactions"
  on public.feed_reactions for delete
  using (user_id = auth.uid());
