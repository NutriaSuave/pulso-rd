const CACHE = "pulso-rd-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./favicon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for the page itself, so prices stay fresh when online.
// Falls back to cache when offline, so the app still opens.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }
  // Cache-first for static assets (icons, manifest).
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).catch(() => cached))
  );
});
