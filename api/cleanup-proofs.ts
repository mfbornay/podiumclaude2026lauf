import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Deletes proof photos older than 24 hours from the "proofs" Storage bucket
// and clears the proof_photo_url column in daily_logs
export default async function handler(req: any, res: any) {
  const auth = (req.headers["authorization"] as string) || "";
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }

  const cutoff = new Date(Date.now() - 24 * 3600 * 1000);
  const cutoffDate = cutoff.toISOString().split("T")[0]; // YYYY-MM-DD

  // 1. Find daily_logs with proof photos older than 24h
  const { data: oldLogs } = await sb
    .from("daily_logs")
    .select("user_id, group_id, date, proof_photo_url")
    .lt("date", cutoffDate)
    .not("proof_photo_url", "is", null);

  if (!oldLogs?.length) return res.status(200).json({ deleted: 0 });

  // 2. Delete from Storage
  const paths: string[] = [];
  for (const log of oldLogs) {
    if (!log.proof_photo_url) continue;
    // Extract path from public URL: .../storage/v1/object/public/proofs/{path}
    const match = log.proof_photo_url.match(/\/proofs\/(.+)$/);
    if (match) paths.push(match[1]);
  }

  if (paths.length) {
    await sb.storage.from("proofs").remove(paths);
  }

  // 3. Clear the column in daily_logs
  await sb
    .from("daily_logs")
    .update({ proof_photo_url: null })
    .lt("date", cutoffDate)
    .not("proof_photo_url", "is", null);

  return res.status(200).json({ deleted: paths.length });
}
