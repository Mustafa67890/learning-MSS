const CACHE_NAME = 'eco-lms-v1';
const OFFLINE_URL = 'index.html';

const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'dashboard.html',
  'css/style.css',
  'js/main.js',
  'js/localStorage.js',
  'js/course-content.js',
  'js/quiz.js',
  'js/assignments.js',
  'js/forum.js',
  'js/gamification.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // ignore failures for optional resources
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Optionally cache new requests
        return response;
      }).catch(() => {
        // If offline and request is navigation, serve offline page
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
