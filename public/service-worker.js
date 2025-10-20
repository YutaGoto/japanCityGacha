const CACHE_NAME = 'japan-city-gacha-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/ogp.png',
  '/crash-cymbal.mp3',
  '/noise-drum-loop.mp3',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/src/types.ts',
  '/src/vite-env.d.ts',
  '/src/assets/react.svg',
  '/src/components/index.tsx',
  '/src/components/Navigation.tsx',
  '/src/components/PickedCities.tsx',
  '/src/constants/cities.ts',
  '/src/constants/index.ts',
  '/src/constants/prefectures.ts',
  '/src/reducers/gachaReducer.ts',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});