import { createClient } from "@supabase/supabase-js";
import { localDate, addDays } from "../src/habits";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Borra las fotos de prueba de más de 24h del bucket "proofs" y limpia la columna
// proof_photo_url, salvo las de días con una disputa en curso: esa foto es justo la
// prueba que el grupo tiene que mirar para votar.
export default async function handler(req: any, res: any) {
  const auth = (req.headers["authorization"] as string) || "";
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }

  const cutoffDate = addDays(localDate(), -1); // día natural español

  const { data: oldLogs, error } = await sb
    .from("daily_logs")
    .select("user_id, group_id, date, proof_photo_url")
    .lt("date", cutoffDate)
    .not("proof_photo_url", "is", null);

  if (error) {
    console.error("cleanup-proofs fetch error:", error);
    return res.status(500).json({ error: error.message });
  }
  if (!oldLogs?.length) return res.status(200).json({ deleted: 0 });

  // Días con disputa aún viva (la votación dura 24h; se deja margen hasta 48h)
  const since = new Date(Date.now() - 48 * 3600 * 1000).toISOString();
  const { data: disputes } = await sb
    .from("disputes")
    .select("disputed_user, day")
    .gte("created_at", since);
  const protegidos = new Set((disputes || []).map((d: any) => `${d.disputed_user}:${d.day}`));

  const borrables = oldLogs.filter((l: any) => !protegidos.has(`${l.user_id}:${l.date}`));
  if (!borrables.length) return res.status(200).json({ deleted: 0, protected: protegidos.size });

  const paths: string[] = [];
  for (const log of borrables) {
    const match = String(log.proof_photo_url).match(/\/proofs\/(.+)$/);
    if (match) paths.push(match[1]);
  }

  if (paths.length) {
    const { error: rmErr } = await sb.storage.from("proofs").remove(paths);
    if (rmErr) console.error("cleanup-proofs storage error:", rmErr);
  }

  // Se limpian solo las filas cuyas fotos se han borrado
  for (const log of borrables) {
    const { error: updErr } = await sb
      .from("daily_logs")
      .update({ proof_photo_url: null })
      .eq("user_id", log.user_id)
      .eq("date", log.date);
    if (updErr) console.error(`cleanup-proofs update ${log.user_id}/${log.date}:`, updErr);
  }

  return res.status(200).json({ deleted: paths.length, protected: protegidos.size });
}
