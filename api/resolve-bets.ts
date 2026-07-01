import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const QUESTIONS = [
  { id: "gym", pts: 10 }, { id: "running", pts: 8 }, { id: "sport", pts: 6 },
  { id: "quedada", pts: 5 }, { id: "familia", pts: 4 }, { id: "food", pts: 4 },
  { id: "screen_good", pts: 4 }, { id: "no_alcohol", pts: 2 }, { id: "sin_movil", pts: 1 },
  { id: "vitamina_d", pts: 1 }, { id: "pareja", pts: 3 }, { id: "book", pts: 3 },
  { id: "course", pts: 4 }, { id: "podcast", pts: 2 }, { id: "meditation", pts: 3 },
];
const AMBITOS: Record<string, string[]> = {
  deporte: ["gym", "running", "sport"],
  social: ["quedada", "familia", "pareja"],
  salud: ["food", "screen_good", "no_alcohol", "sin_movil", "vitamina_d", "meditation"],
  cultura: ["book", "course", "podcast"],
};

// Points scored by a user in [from, to] for a metric (ámbito id, habit id, or "total")
function scoreLogs(logs: any[], metric: string): { pts: number; count: number } {
  let pts = 0, count = 0;
  const habitIds = AMBITOS[metric] || null;
  for (const log of logs) {
    for (const q of QUESTIONS) {
      if (!log[q.id]) continue;
      if (metric === "total" || (habitIds && habitIds.includes(q.id))) pts += q.pts;
      if (metric === q.id) count++;
    }
  }
  return { pts, count };
}

async function payOutWinners(betId: string, winnerSide: 1 | 2) {
  const { data: stakes } = await sb.from("bet_stakes").select("*").eq("bet_id", betId);
  if (!stakes?.length) return;
  const winners = stakes.filter((s: any) => s.side === winnerSide);
  const loserPool = stakes.filter((s: any) => s.side !== winnerSide).reduce((a: number, x: any) => a + x.amount, 0);
  const winnerPool = winners.reduce((a: number, x: any) => a + x.amount, 0);
  for (const w of winners) {
    const share = winnerPool > 0 ? Math.round((w.amount / winnerPool) * loserPool) : 0;
    const { data: u } = await sb.from("users").select("total_pts").eq("id", w.user_id).single();
    await sb.from("users").update({ total_pts: (u?.total_pts || 0) + w.amount + share }).eq("id", w.user_id);
  }
}

async function refundAllStakes(betId: string) {
  const { data: stakes } = await sb.from("bet_stakes").select("*").eq("bet_id", betId);
  for (const s of stakes || []) {
    const { data: u } = await sb.from("users").select("total_pts").eq("id", s.user_id).single();
    await sb.from("users").update({ total_pts: (u?.total_pts || 0) + s.amount }).eq("id", s.user_id);
  }
}

// Group members are all in Spain — derive calendar-day boundaries in their
// timezone so the bet window matches the days they actually logged for
// client-side (client uses browser-local time, not UTC).
function madridDateStr(d: Date): string {
  return d.toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
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

  let resolved = 0, cancelled = 0;

  for (const bet of expiredBets) {
    const metric = bet.metric || "total";
    const from = bet.created_at ? madridDateStr(new Date(bet.created_at)) : "";
    const to = bet.ends_at ? madridDateStr(new Date(bet.ends_at)) : "";
    const betType = bet.bet_type || "duel_ambito";

    let winnerSide: 1 | 2 | null = null;
    let tie = false;

    if (betType === "prop") {
      // Did target_user reach target_value?
      if (bet.condition === "top_n") {
        const { data: rank } = await sb.from("group_ranking").select("user_id,total_pts")
          .eq("group_id", bet.group_id).order("total_pts", { ascending: false });
        const pos = (rank || []).findIndex((r: any) => r.user_id === bet.target_user_id) + 1;
        winnerSide = pos > 0 && pos <= (bet.target_value || 3) ? 1 : 2;
      } else {
        const { data: logs } = await sb.from("daily_logs").select("*")
          .eq("user_id", bet.target_user_id).eq("group_id", bet.group_id)
          .gte("date", from).lte("date", to);
        const { count } = scoreLogs(logs || [], metric);
        const achieved = bet.condition === "lte" ? count <= (bet.target_value || 0) : count >= (bet.target_value || 0);
        winnerSide = achieved ? 1 : 2;
      }
    } else {
      // Duel: compare p1 vs p2 over the bet window
      const { data: logs } = await sb.from("daily_logs").select("*")
        .in("user_id", [bet.p1_id, bet.p2_id]).eq("group_id", bet.group_id)
        .gte("date", from).lte("date", to);
      const p1Logs = (logs || []).filter((l: any) => l.user_id === bet.p1_id);
      const p2Logs = (logs || []).filter((l: any) => l.user_id === bet.p2_id);
      const s1 = scoreLogs(p1Logs, metric);
      const s2 = scoreLogs(p2Logs, metric);
      const v1 = betType === "duel_habit" ? s1.count : s1.pts;
      const v2 = betType === "duel_habit" ? s2.count : s2.pts;
      if (v1 === v2) tie = true;
      else winnerSide = v1 > v2 ? 1 : 2;
    }

    if (tie) {
      // Compare-and-set guard, then refund everyone
      const { data: upd } = await sb.from("bets").update({ status: "cancelled" })
        .eq("id", bet.id).in("status", ["betting", "locked", "open"]).select("id");
      if (upd?.length) { await refundAllStakes(bet.id); cancelled++; }
      continue;
    }

    // Compare-and-set guard, then pay out
    const { data: upd } = await sb.from("bets").update({ status: "won", winner_side: winnerSide })
      .eq("id", bet.id).in("status", ["betting", "locked", "open"]).select("id");
    if (upd?.length) { await payOutWinners(bet.id, winnerSide!); resolved++; }
  }

  console.log(`resolve-bets: resolved ${resolved}, cancelled (tie) ${cancelled} of ${expiredBets.length}`);
  return res.status(200).json({ resolved, cancelled, total: expiredBets.length });
}
