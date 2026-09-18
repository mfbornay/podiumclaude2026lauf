/* Fuente única de la lógica de puntuación y de fechas.
   La usan la app (src/App.tsx) y los crons (api/*.ts): antes cada uno tenía su
   propia copia de los hábitos y su propia forma de calcular "hoy", y no coincidían. */

export type Habit = { id: string; icon: string; name: string; pts: number };

export const QUESTIONS: Habit[] = [
  { id: "gym", icon: "💪", name: "Gym / Fuerza", pts: 10 },
  { id: "running", icon: "🏃", name: "Running", pts: 8 },
  { id: "sport", icon: "🎾", name: "Deporte grupo", pts: 6 },
  { id: "quedada", icon: "🍻", name: "Quedada amigos", pts: 5 },
  { id: "familia", icon: "🏠", name: "Plan familiar", pts: 4 },
  { id: "food", icon: "🥗", name: "Comida limpia", pts: 4 },
  { id: "screen_good", icon: "📵", name: "Redes sociales <2h", pts: 4 },
  { id: "no_alcohol", icon: "🍺", name: "Sin alcohol (finde)", pts: 2 },
  { id: "sin_movil", icon: "🌅", name: "Sin móvil al despertar", pts: 1 },
  { id: "vitamina_d", icon: "☀️", name: "Tomar el sol 20'", pts: 1 },
  { id: "pareja", icon: "❤️", name: "Plan de pareja", pts: 3 },
  { id: "book", icon: "📚", name: "Lectura 30min", pts: 3 },
  { id: "course", icon: "📖", name: "Estudio/Curso", pts: 4 },
  { id: "podcast", icon: "🎧", name: "Podcast educ.", pts: 2 },
  { id: "meditation", icon: "😴", name: "Sueño +8h", pts: 3 },
];

export const AMBITOS = [
  { id: "deporte", label: "Deporte", icon: "💪", color: "#F0A832", habits: ["gym", "running", "sport"] },
  { id: "social", label: "Social", icon: "🍻", color: "#F2667A", habits: ["quedada", "familia", "pareja"] },
  { id: "salud", label: "Salud", icon: "🥗", color: "#5DC98A", habits: ["food", "screen_good", "no_alcohol", "sin_movil", "vitamina_d", "meditation"] },
  { id: "cultura", label: "Cultura", icon: "📚", color: "#5B8DEF", habits: ["book", "course", "podcast"] },
];

/** Hábitos que mantienen viva la racha. */
export const STREAK_HABITS = ["gym", "running", "sport"];

/** Puntos de un hábito, con la personalización del grupo (groups.habit_pts) si existe. */
export function habitPoints(habitId: string, override?: Record<string, number> | null): number {
  const q = QUESTIONS.find((x) => x.id === habitId);
  if (!q) return 0;
  const custom = override?.[habitId];
  return typeof custom === "number" ? custom : q.pts;
}

/** Suma de puntos de un día. Mismo cálculo que el trigger calculate_points de Postgres. */
export function calcPoints(done: Record<string, boolean>, override?: Record<string, number> | null): number {
  return QUESTIONS.reduce((sum, q) => (done[q.id] ? sum + habitPoints(q.id, override) : sum), 0);
}

/* ─────────────────────────── FECHAS ───────────────────────────
   Todo el grupo juega en hora española y los crons del servidor ya trabajan en
   Europe/Madrid. El cliente debe usar el mismo calendario, no el del dispositivo:
   si no, el día de corte cambia según dónde esté cada uno o cómo tenga el reloj. */

export const TZ = "Europe/Madrid";

/** "YYYY-MM-DD" del instante dado, en hora de Madrid. */
export function localDate(d: Date = new Date()): string {
  return d.toLocaleDateString("sv-SE", { timeZone: TZ });
}

export function todayStr(): string {
  return localDate();
}

/** Convierte "YYYY-MM-DD" en Date al mediodía local: evita que new Date("2026-01-01")
    se interprete como medianoche UTC y se desplace un día al truncar en local. */
export function parseDay(day: string): Date {
  return new Date(`${day}T12:00:00`);
}

export function addDays(day: string, delta: number): string {
  const d = parseDay(day);
  d.setDate(d.getDate() + delta);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function yesterdayStr(): string {
  return addDays(todayStr(), -1);
}

/** Días naturales entre dos "YYYY-MM-DD" (b - a). */
export function daysBetween(a: string, b: string): number {
  return Math.round((parseDay(b).getTime() - parseDay(a).getTime()) / 86400000);
}

/* ─────────────────────────── RACHA ─────────────────────────── */

/** Racha de días consecutivos con al menos un hábito de deporte.
 *  Si hoy todavía no se ha registrado nada, la racha sigue viva con los días
 *  anteriores y se marca como pendiente — antes se mostraba 0 cada mañana. */
export function calcStreak(
  daysWithSport: Iterable<string>,
  today: string = todayStr()
): { days: number; pendingToday: boolean } {
  const set = daysWithSport instanceof Set ? daysWithSport : new Set(daysWithSport);
  const loggedToday = set.has(today);
  if (!loggedToday && !set.has(addDays(today, -1))) return { days: 0, pendingToday: false };

  let days = 0;
  for (let i = loggedToday ? 0 : 1; i < 400; i++) {
    if (set.has(addDays(today, -i))) days++;
    else break;
  }
  return { days, pendingToday: !loggedToday };
}
