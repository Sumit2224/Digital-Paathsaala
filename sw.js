const CACHE_NAME = 'paathsaala-cache-v10';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

// Naya cache install karna
self.addEventListener('install', event => {
  self.skipWaiting(); // Naye service worker ko turant active karne ke liye
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Purana kachra (Old Cache) delete karna (Yeh sabse zaroori hai)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Purana cache delete ho gaya:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Files ko cache se fetch karna
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});