/* InverterLab — service worker (funciona offline depois do primeiro acesso).
   Ao publicar uma versão nova, troque o número em VERSION para forçar a atualização do cache. */
const VERSION = 'inverterlab-1.5.2';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const gfont = /(^|\.)(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !gfont) return;
  if (req.mode === 'navigate') {              // página: rede primeiro, cache como reserva (offline)
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html').then(r => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {   // demais arquivos: cache primeiro, atualiza em segundo plano
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
