self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // Basic fetch listener - PWA install trigger karne ke liye zaroori hai
});