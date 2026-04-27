/* Podium Service Worker — Push Notifications */
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Podium";
  const options = {
    body: data.body || "¡No olvides registrar tu día!",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: "podium-daily",
    renotify: true,
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
