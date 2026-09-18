import { createClient } from "@supabase/supabase-js";
import { localDate, addDays } from "../src/habits";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const madridDateStr = localDate;

export default async function handler(req: any, res: any) {
  const auth = (req.headers["authorization"] as string) || "";
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }
  const today = madridDateStr();

  // Find groups whose season_end_date has passed
  const { data: groups, error: fetchErr } = await sb
    .from("groups")
    .select("id, season_name, next_season_config, season_duration_days")
    .lte("season_end_date", today)
    .not("season_end_date", "is", null);

  if (fetchErr) {
    console.error("season-rotate fetch error:", fetchErr);
    return res.status(500).json({ error: fetchErr.message });
  }

  if (!groups?.length) {
    return res.status(200).json({ rotated: 0 });
  }

  let rotated = 0;

  for (const group of groups) {
    const cfg = group.next_season_config;
    const durationDays = group.season_duration_days || 56;

    // Archive current season
    await sb.from("seasons").insert({
      group_id: group.id,
      name: group.season_name || "Temporada",
      ended_at: new Date().toISOString(),
      status: "closed",
    });

    const newEndStr = addDays(today, durationDays);

    // Apply next config to active — start_date resets so group_ranking (which
    // sums points from start_date onward) only counts the new season
    const { error: updateErr } = await sb
      .from("groups")
      .update({
        active_habits: cfg?.active_habits ?? null,
        season_name: cfg?.name || "Nueva temporada",
        next_season_config: null,
        season_end_date: newEndStr,
        start_date: today,
      })
      .eq("id", group.id);

    if (!updateErr) {
      rotated++;
      console.log(`Rotated season for group ${group.id} → ends ${newEndStr}`);
    } else {
      console.error(`season-rotate group ${group.id}:`, updateErr);
    }
  }

  return res.status(200).json({ rotated, total: groups.length });
}
