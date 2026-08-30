const CACHE_NAME = "sbm-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/style.css",
  "./js/app.js",

  "./assets/logo/sbm-icon-192.png",
  "./assets/logo/sbm-icon-512.png",
  "./assets/logo/sbm-apple-touch-icon.png",
  "./assets/logo/sbm-logo-32.png",
  "./assets/logo/sbm-logo-16.png",
];

/* =========================================
   INSTALL
========================================= */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_FILES);
    }),
  );

  self.skipWaiting();
});

/* =========================================
   ACTIVATE
========================================= */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );

  self.clients.claim();
});

/* =========================================
   FETCH
========================================= */

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
      .catch(() => {
        return caches.match("./index.html");
      }),
  );
});
