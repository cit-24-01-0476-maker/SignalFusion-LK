const CACHE_NAME = "signalfusion-shell-v1.4.0";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/speedtest",
  "/map",
  "/download"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network first, cache fallback for navigation
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/");
      })
    );
    return;
  }

  // Live telemetry and speed tests are never served from cache
  if (
    event.request.url.includes("/speedtest/") ||
    event.request.url.includes("/api/v1/measurements") ||
    event.request.url.includes("/realtime/")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
