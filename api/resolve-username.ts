import { createClient } from "@supabase/supabase-js";

/* Resuelve @usuario → email para poder iniciar sesión con el nombre de usuario.
   Antes esto lo hacía la función get_email_by_username de Postgres, que era
   invocable por cualquiera sin iniciar sesión: bastaba probar nombres para ir
   sacando los emails de la gente. Aquí el acceso pasa por el servidor, con un
   límite de intentos por IP. */

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const WINDOW_MS = 60_000;
const MAX_TRIES = 10;
const hits = new Map<string, { n: number; t: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 500) {
    for (const [k, v] of hits) if (now - v.t > WINDOW_MS) hits.delete(k);
  }
  const rec = hits.get(ip);
  if (rec && now - rec.t < WINDOW_MS) {
    rec.n++;
    return rec.n > MAX_TRIES;
  }
  hits.set(ip, { n: 1, t: now });
  return false;
}

export default async function handler(req: any, res: any) {
  const uname = String(req.query?.u || "").trim().toLowerCase().replace("@", "");
  if (!uname || uname.length > 40) return res.status(400).json({ email: null });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return res.status(429).json({ email: null });

  const { data, error } = await sb.from("users").select("email").eq("username", uname).maybeSingle();
  if (error) {
    console.error("resolve-username:", error);
    return res.status(500).json({ email: null });
  }
  return res.status(200).json({ email: data?.email || null });
}
