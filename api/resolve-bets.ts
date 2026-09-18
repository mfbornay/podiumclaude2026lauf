import { createClient } from "@supabase/supabase-js";
import { QUESTIONS, AMBITOS, habitPoints, localDate } from "../src/habits";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const AMBITO_HABITS: Record<string, string[]> = Object.fromEntries(
  AMBITOS.map((a) => [a.id, a.habits])
);

// Puntos y veces conseguidas por un usuario en el periodo, para la métrica de la apuesta
// (ámbito, hábito concreto o "total"). Usa los puntos personalizados del grupo, igual
// que la app y que el trigger de la base de datos.
function scoreLogs(
  logs: any[],
  metric: string,
  override?: Record<string, number> | null
): { pts: number; count: number } {
  let pts = 0,
    count = 0;
  const habitIds = AMBITO_HABITS[metric] || null;
  for (const log of logs) {
    for (const q of QUESTIONS) {
      if (!log[q.id]) continue;
      if (metric === "total" || (habitIds && habitIds.includes(q.id))) pts += habitPoints(q.id, override);
      if (metric === q.id) count++;
    }
  }
  return { pts, count };
}

export default async function handler(req: any, res: any) {
  const auth = (req.headers["authorization"] as string) || "";
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }
  const now = new Date().toISOString();

  const { data: expiredBets, error: fetchErr } = await sb
    .from("bets")
    .select("*")
    .in("status", ["betting", "locked", "open"])
    .lte("ends_at", now)
    .not("ends_at", "is", null);

  if (fetchErr) {
    console.error("resolve-bets fetch error:", fetchErr);
    return res.status(500).json({ error: fetchErr.message });
  }
  if (!expiredBets?.length) return res.status(200).json({ resolved: 0 });

  // Puntos personalizados por grupo (groups.habit_pts)
  const groupIds = [...new Set(expiredBets.map((b: any) => b.group_id).filter(Boolean))];
  const { data: groups } = await sb.from("groups").select("id,habit_pts").in("id", groupIds);
  const ptsByGroup: Record<string, Record<string, number> | null> = {};
  (groups || []).forEach((g: any) => { ptsByGroup[g.id] = g.habit_pts || null; });

  let resolved = 0, cancelled = 0, failed = 0;

  for (const bet of expiredBets) {
    try {
      const metric = bet.metric || "total";
      const override = ptsByGroup[bet.group_id] || null;
      // El periodo se mide en días naturales españoles, igual que los registros diarios
      const from = bet.created_at ? localDate(new Date(bet.created_at)) : "";
      const to = bet.ends_at ? localDate(new Date(bet.ends_at)) : "";
      const betType = bet.bet_type || "duel_ambito";

      let winnerSide: 1 | 2 | null = null;
      let tie = false;

      if (betType === "prop") {
        if (bet.condition === "top_n") {
          const { data: rank } = await sb.from("group_ranking").select("user_id,total_pts")
            .eq("group_id", bet.group_id).order("total_pts", { ascending: false });
          const pos = (rank || []).findIndex((r: any) => r.user_id === bet.target_user_id) + 1;
          winnerSide = pos > 0 && pos <= (bet.target_value || 3) ? 1 : 2;
        } else {
          const { data: logs } = await sb.from("daily_logs").select("*")
            .eq("user_id", bet.target_user_id).eq("group_id", bet.group_id)
            .gte("date", from).lte("date", to);
          const { count } = scoreLogs(logs || [], metric, override);
          const achieved = bet.condition === "lte" ? count <= (bet.target_value || 0) : count >= (bet.target_value || 0);
          winnerSide = achieved ? 1 : 2;
        }
      } else {
        // Duelo: los jugadores son player1_id / player2_id (antes se leían p1_id/p2_id,
        // que no existen en la tabla, así que el duelo siempre acababa en empate)
        const p1 = bet.player1_id, p2 = bet.player2_id;
        if (!p1 || !p2) {
          console.error(`resolve-bets: apuesta ${bet.id} sin jugadores`);
          failed++;
          continue;
        }
        const { data: logs } = await sb.from("daily_logs").select("*")
          .in("user_id", [p1, p2]).eq("group_id", bet.group_id)
          .gte("date", from).lte("date", to);
        const s1 = scoreLogs((logs || []).filter((l: any) => l.user_id === p1), metric, override);
        const s2 = scoreLogs((logs || []).filter((l: any) => l.user_id === p2), metric, override);
        const v1 = betType === "duel_habit" ? s1.count : s1.pts;
        const v2 = betType === "duel_habit" ? s2.count : s2.pts;
        if (v1 === v2) tie = true;
        else winnerSide = v1 > v2 ? 1 : 2;
      }

      // La liquidación (marcar estado + pagar o devolver) es atómica en la base de datos
      if (tie) {
        const { error } = await sb.rpc("bet_refund", { p_bet_id: bet.id });
        if (error) { console.error(`bet_refund ${bet.id}:`, error); failed++; continue; }
        cancelled++;
      } else {
        const { error } = await sb.rpc("bet_settle", { p_bet_id: bet.id, p_winner_side: winnerSide });
        if (error) { console.error(`bet_settle ${bet.id}:`, error); failed++; continue; }
        resolved++;
      }
    } catch (e) {
      console.error(`resolve-bets: fallo en la apuesta ${bet.id}:`, e);
      failed++;
    }
  }

  console.log(`resolve-bets: ${resolved} resueltas, ${cancelled} empates devueltos, ${failed} con error, de ${expiredBets.length}`);
  return res.status(200).json({ resolved, cancelled, failed, total: expiredBets.length });
}
