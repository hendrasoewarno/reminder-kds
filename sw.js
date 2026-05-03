const CACHE_NAME = 'kds-reminder-v1.0'; // Ganti ini setiap ada perubahan
const assets = [
  './',
  './index.html',
  './icon.png',
  // ... aset lainnya
];

// 1. Install & Skip Waiting
self.addEventListener('install', evt => {
  self.skipWaiting(); // Memaksa SW baru menjadi aktif segera
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. Activate & Hapus Cache Lama (Clean up)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key)) // Menghapus v1 saat v1.1 aktif
      );
    })
  );
});

// 3. Fetch data
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});