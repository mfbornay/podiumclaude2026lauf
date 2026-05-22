import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  const today = new Date().toISOString().slice(0, 10);

  // Find open bets whose ends_at has passed
  const { data: expiredBets, error: fetchErr } = await sb
    .from("bets")
    .select("id, group_id, p1_id, p2_id, pot")
    .eq("status", "open")
    .lte("ends_at", today)
    .not("ends_at", "is", null);

  if (fetchErr) {
    console.error("resolve-bets fetch error:", fetchErr);
    return res.status(500).json({ error: fetchErr.message });
  }

  if (!expiredBets?.length) {
    return res.status(200).json({ resolved: 0 });
  }

  let resolved = 0;

  for (const bet of expiredBets) {
    // Get ranking for both players in their group
    const { data: ranking } = await sb
      .from("group_ranking")
      .select("user_id, total_pts")
      .eq("group_id", bet.group_id)
      .in("user_id", [bet.p1_id, bet.p2_id]);

    const ptsMap: Record<string, number> = {};
    (ranking || []).forEach((r: any) => {
      ptsMap[r.user_id] = r.total_pts || 0;
    });

    const p1pts = ptsMap[bet.p1_id] ?? 0;
    const p2pts = ptsMap[bet.p2_id] ?? 0;

    // Determine winner; tie goes to p1
    const winner_side = p2pts > p1pts ? 2 : 1;

    const { error: updateErr } = await sb
      .from("bets")
      .update({ status: "won", winner_side })
      .eq("id", bet.id);

    if (!updateErr) resolved++;
    else console.error(`resolve bet ${bet.id}:`, updateErr);
  }

  console.log(`resolve-bets: resolved ${resolved}/${expiredBets.length}`);
  return res.status(200).json({ resolved, total: expiredBets.length });
}
