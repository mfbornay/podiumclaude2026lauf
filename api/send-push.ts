import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

webpush.setVapidDetails(
  "mailto:manfer.98.bor@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// ─── Pool de mensajes personalizados ───────────────────────────────────────
// {nombre} = usuario que no ha apuntado
// {rival}  = persona 1 puesto por encima en el ranking (o por debajo si eres 1º)
// {lider}  = el primero del ranking general
const MSGS = [
  { title:"⏰ Podium te llama", body:"Ey {nombre}, llevas todo el día sin meterlo. ¿Y toda la vida sin meterla?" },
  { title:"🏆 Podium", body:"Son las 10. Como no metas los puntos {nombre}, {rival} te mea en la cara mañana." },
  { title:"💀 Despierta {nombre}", body:"{rival} ya tiene sus puntos del día. Tú sigues a cero. Das vergüenza." },
  { title:"🔥 Último aviso", body:"Llevas el día entero veagueando, {nombre}. Mete aunque sea un hábito, perro." },
  { title:"😤 En serio {nombre}?", body:"Son las 10 de la noche. {rival} lleva apuntando desde las 8. Espabila home." },
  { title:"🐌 {nombre}...", body:"Eres el único del grupo sin apuntar hoy. Literalmente el único. ¿Qué haces?" },
  { title:"⚡ Oye {nombre}", body:"Hoy tiene puntos: {rival}. No tiene puntos: tú. Adivina quién está ganando." },
  { title:"🤡 Podium", body:"{nombre} hoy = 0 puntos. {rival} hoy = puntos. El baile sigue. Tú decides." },
  { title:"📵 Aquí Podium", body:"Llevas el día mirando el móvil para todo menos para apuntar tus hábitos. lol." },
  { title:"🏋️ {nombre}!", body:"El gym no se apunta solo. ¿Fuiste o no fuiste? Mete los puntos ya." },
  { title:"🌙 Casi medianoche {nombre}", body:"Última llamada. Después no hay marcha atrás y {rival} se aleja en el ranking." },
  { title:"😴 No te duermas {nombre}", body:"¿Vas a irse a dormir sin apuntar? {rival} no lo haría. Pero tú sí, claro." },
  { title:"👀 Te estamos mirando", body:"{nombre}, el grupo sabe que no has apuntado hoy. Están decepcionados. Sobre todo {rival}." },
  { title:"🎯 Podium te recuerda", body:"Hoy han apuntado sus hábitos todos tus compañeros. Todos. Menos tú, lógicamente." },
  { title:"🥊 {nombre} vs {rival}", body:"Marcador actual: {rival} con puntos, {nombre} con excusas. Cambia algo." },
  { title:"💅 {nombre}!", body:"Has terminado la mani-pedi?. No olvides tu skin care routine... Todo menos tus puntos..." },
  { title:"🚨 Alerta vago", body:"{nombre} sin puntos hoy. {rival} sumando. Ni la paja te habrás hecho..." },
  { title:"🙄 Podium aquí", body:"Ni gym, ni running, ni nada. ¿Has salido de la cama hoy, {nombre}?" },
  { title:"📢 Atención {nombre}", body:"Este mensaje es tu recordatorio diario de que {rival} sí apuntó. Tú no. Por ahora." },
  { title:"⏳ Se acaba el día", body:"{nombre}, quedan horas. Después toca ver cómo {rival} te saca más puntos mañana." },
  { title:"🏃 Mueve el culo {nombre}", body:"O apuntas ahora o mañana explicas al grupo por qué llevas dos días a cero." },
  { title:"💪 Vamos {nombre}", body:"Sé que puedes. De hecho {rival} pensaba lo mismo antes de apuntar sus puntos. Arriba." },
  { title:"🎪 El circo llama", body:"{nombre} hoy: 0 pts. El grupo hoy: pts. El show debe continuar, ¿no?" },
  { title:"😂 Anda {nombre}", body:"Llevas todo el día haciendo el canelo. ¿Crees que {rival} también está rascándoselos?" },
  { title:"🔔 Notificación de Podium", body:"Hola {nombre}. Esto es un recordatorio de que sigues siendo el único sin puntos hoy." },
  { title:"🤨 {nombre}...", body:"Los hábitos no se hacen solos. Ni los puntos se meten solos. Apunta ya." },
  { title:"📉 Tu ranking cae", body:"{nombre}, cada hora que pasa sin apuntar es una hora que {rival} sigue por delante." },
  { title:"🌟 Oye {nombre}", body:"Hoy puedes remontar. Mete los puntos ahora y mañana {rival} te mira desde abajo." },
  { title:"🦥 Modo vago activado", body:"{nombre}: detectado. ¿Lo desactivamos juntos? Abre la app y apunta algo." },
  { title:"📱 Podium", body:"Llevas el día con el móvil en la mano y no has abierto Podium. Prioridades, {nombre}." },
  { title:"👑 {lider} manda", body:"Mientras {lider} sigue primero, tú, {nombre}, ni has abierto la app. Reflexiona." },
  { title:"🔝 {nombre}", body:"{lider} lleva semanas arriba. Hoy podrías acercarte. O no apuntar. Como siempre." },
];

function pickMsg(nombre: string, rival: string, lider: string): { title: string; body: string } {
  // Seed by day so same message all night, different each day
  const dayIdx = Math.floor(Date.now() / 86400000);
  const userHash = nombre.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const idx = (dayIdx + userHash) % MSGS.length;
  const m = MSGS[idx];
  return {
    title: m.title
      .replace(/{nombre}/g, nombre)
      .replace(/{rival}/g, rival)
      .replace(/{lider}/g, lider),
    body: m.body
      .replace(/{nombre}/g, nombre)
      .replace(/{rival}/g, rival)
      .replace(/{lider}/g, lider),
  };
}

// ─── Handler ───────────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  // Vercel cron sends Authorization: Bearer {CRON_SECRET}
  const auth = (req.headers["authorization"] as string) || "";
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }

  const now = new Date();
  const isMonday = now.getUTCDay() === 1; // 0=Sun, 1=Mon
  const today = now.toISOString().split("T")[0];

  // ── Monday 9am: send weekly summary to all group chats ─────────────────
  if (isMonday) {
    try {
      await sendWeeklySummary(today);
    } catch (e) {
      console.error("Weekly summary error:", e);
    }
  }

  // ── Daily 22:00 reminder to users who haven't logged today ─────────────
  const { data: subs } = await sb
    .from("push_subscriptions")
    .select("user_id, group_id, endpoint, p256dh, auth");

  if (!subs?.length) return res.status(200).send("No subscriptions");

  const userIds = [...new Set(subs.map((s: any) => s.user_id))];

  // Who already logged today?
  const { data: logs } = await sb
    .from("daily_logs")
    .select("user_id")
    .eq("date", today)
    .in("user_id", userIds);

  const loggedToday = new Set((logs || []).map((l: any) => l.user_id));
  const pendingSubs = subs.filter((s: any) => !loggedToday.has(s.user_id));

  if (!pendingSubs.length) return res.status(200).send("All logged today!");

  // Get user names
  const pendingIds = [...new Set(pendingSubs.map((s: any) => s.user_id))];
  const { data: users } = await sb
    .from("users")
    .select("id, name")
    .in("id", pendingIds);
  const nameMap: Record<string, string> = {};
  (users || []).forEach((u: any) => { nameMap[u.id] = u.name || "tío"; });

  // Get full weekly ranking per group to find rival (adjacent position) and lider (1st)
  const groupIds = [...new Set(pendingSubs.map((s: any) => s.group_id))];
  // rankingMap: group_id → ordered array of { user_id, name }
  const rankingMap: Record<string, Array<{ user_id: string; name: string }>> = {};
  for (const gid of groupIds) {
    if (!gid) continue;
    const { data: ranking } = await sb
      .from("group_ranking")
      .select("user_id")
      .eq("group_id", gid)
      .order("total_pts", { ascending: false });
    if (!ranking?.length) continue;
    const uids = ranking.map((r: any) => r.user_id);
    const { data: unames } = await sb.from("users").select("id, name").in("id", uids);
    const umap: Record<string, string> = {};
    (unames || []).forEach((u: any) => { umap[u.id] = u.name || "alguien"; });
    rankingMap[gid] = ranking.map((r: any) => ({ user_id: r.user_id, name: umap[r.user_id] || "alguien" }));
  }

  // Send notifications
  const results = await Promise.allSettled(
    pendingSubs.map(async (sub: any) => {
      const nombre = nameMap[sub.user_id] || "tío";
      const ranked = rankingMap[sub.group_id] || [];
      const pos = ranked.findIndex((r) => r.user_id === sub.user_id);
      // rival = person 1 above (pos-1), or 1 below if already 1st
      let rival = "tu rival";
      if (ranked.length > 1) {
        if (pos <= 0) rival = ranked[1].name; // 1st: rival is 2nd
        else rival = ranked[pos - 1].name;    // others: rival is person above
      }
      const lider = ranked[0]?.name || "el líder";
      const msg = pickMsg(nombre.split(" ")[0], rival.split(" ")[0], lider.split(" ")[0]);
      return webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        JSON.stringify({ title: msg.title, body: msg.body, url: "/" })
      );
    })
  );

  // Clean up expired subscriptions
  const failed = pendingSubs.filter((_: any, i: number) => results[i].status === "rejected");
  if (failed.length) {
    const deadEndpoints = failed.map((s: any) => s.endpoint);
    await sb.from("push_subscriptions").delete().in("endpoint", deadEndpoints);
  }

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return res.status(200).json({ sent, total: pendingSubs.length, monday: isMonday });
}

// ─── Weekly summary → inserta mensaje en chat de cada grupo ───────────────
async function sendWeeklySummary(today: string) {
  const lastMonday = getPrevMonday(today);
  const lastSunday = getDayBefore(today); // today is Monday, so yesterday is Sunday

  // Get all groups
  const { data: groups } = await sb.from("groups").select("id, name, emoji");
  if (!groups?.length) return;

  for (const group of groups) {
    try {
      // Ranking for last week: sum daily_logs between lastMonday and lastSunday
      const { data: logs } = await sb
        .from("daily_logs")
        .select("user_id, total_pts, gym")
        .eq("group_id", group.id)
        .gte("date", lastMonday)
        .lte("date", lastSunday);

      if (!logs?.length) continue;

      // Aggregate
      const ptsByUser: Record<string, number> = {};
      const gymByUser: Record<string, number> = {};
      for (const log of logs) {
        ptsByUser[log.user_id] = (ptsByUser[log.user_id] || 0) + (log.total_pts || 0);
        if (log.gym) gymByUser[log.user_id] = (gymByUser[log.user_id] || 0) + 1;
      }

      const sorted = Object.entries(ptsByUser).sort((a, b) => b[1] - a[1]);
      if (!sorted.length) continue;

      // Get user names
      const uids = sorted.map(([uid]) => uid);
      const { data: users } = await sb.from("users").select("id, name, avatar").in("id", uids);
      const umap: Record<string, any> = {};
      (users || []).forEach((u: any) => { umap[u.id] = u; });

      const medals = ["🥇", "🥈", "🥉"];
      const podium = sorted
        .slice(0, 3)
        .map(([uid, pts], i) => `${medals[i]} ${umap[uid]?.name || "?"} — ${pts} pts`)
        .join("\n");

      const gymKing = Object.entries(gymByUser).sort((a, b) => b[1] - a[1])[0];
      const gymLine = gymKing
        ? `\n💪 Más gym: ${umap[gymKing[0]]?.name || "?"} (${gymKing[1]} días)`
        : "";

      const weekNum = getWeekNum(new Date(today));
      const winner = umap[sorted[0][0]];

      const text =
        `🏆 SEMANA ${weekNum - 1} — RESULTADOS\n\n` +
        podium +
        gymLine +
        `\n\n${winner?.avatar || "👑"} ${winner?.name || "?"} manda esta semana con ${sorted[0][1]} pts.\n` +
        `Semana ${weekNum} arranca HOY. ¿Quién manda?`;

      // Find a bot/system user_id or use the winner's id as sender
      // We'll use a special null-safe insert — group_id required, user_id optional
      await sb.from("chat_messages").insert({
        group_id: group.id,
        user_id: null, // system message — make sure your RLS allows null or use a bot user
        text,
        is_bot: true,
      });
    } catch (e) {
      console.error(`Summary error for group ${group.id}:`, e);
    }
  }
}

// ─── Date helpers ─────────────────────────────────────────────────────────
function localDate(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function getWeekMonday(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  const dow = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dow);
  return localDate(d);
}
function getPrevMonday(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() - 7);
  const dow = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dow);
  return localDate(d);
}
function getDayBefore(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() - 1);
  return localDate(d);
}
function getWeekNum(d = new Date()) {
  const jan1 = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
}
