import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  const auth = (req.headers["authorization"] as string) || "";
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }
  const today = new Date().toISOString().slice(0, 10);

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

    // Compute new end date
    const newEnd = new Date();
    newEnd.setDate(newEnd.getDate() + durationDays);
    const newEndStr = newEnd.toISOString().slice(0, 10);

    // Apply next config to active
    const { error: updateErr } = await sb
      .from("groups")
      .update({
        active_habits: cfg?.active_habits ?? null,
        season_name: cfg?.name || "Nueva temporada",
        next_season_config: null,
        season_end_date: newEndStr,
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
