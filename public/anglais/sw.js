/* Service worker de LinguaPro (portée /anglais/) : réseau d'abord, cache en secours pour le hors-ligne. */
const CACHE = 'linguapro-v1';
const ASSETS = ['./', './index.html', './app.js', './data.js', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('linguapro-') && k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((r) => {
      if (r && r.status === 200 && new URL(e.request.url).origin === location.origin) { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
