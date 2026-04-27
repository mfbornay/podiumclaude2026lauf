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

export default async function handler(req: Request) {
  // Only allow Vercel cron or manual trigger with secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const today = new Date().toISOString().split("T")[0];

  // Get all subscriptions with their user_id
  const { data: subs } = await sb
    .from("push_subscriptions")
    .select("user_id, endpoint, p256dh, auth");

  if (!subs?.length) return new Response("No subs", { status: 200 });

  // Get users who have already logged today
  const userIds = subs.map((s: any) => s.user_id);
  const { data: logs } = await sb
    .from("daily_logs")
    .select("user_id")
    .eq("date", today)
    .in("user_id", userIds);

  const loggedToday = new Set((logs || []).map((l: any) => l.user_id));

  const pending = subs.filter((s: any) => !loggedToday.has(s.user_id));

  const results = await Promise.allSettled(
    pending.map((sub: any) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        JSON.stringify({
          title: "🏆 Podium — ¿Cómo ha ido el día?",
          body: "Faltan pocas horas. Apunta lo que has hecho hoy.",
          url: "/",
        })
      )
    )
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return new Response(`Sent ${sent}/${pending.length}`, { status: 200 });
}
