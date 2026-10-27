// کش ساده‌ی شل سایت: اول شبکه، در نبود اینترنت از کش
const CACHE = 'tealoper-v3'
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/favicon.svg'])))
  self.skipWaiting()
})
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return
  e.respondWith(
    fetch(e.request)
      .then(res => { caches.open(CACHE).then(c => c.put(e.request, res.clone())); return res })
      .catch(() => caches.match(e.request))
  )
})
