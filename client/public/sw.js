// JAC MediaLand Service Worker - Cache-First + Streaming Video
const CACHE_VERSION = 'v7';
const STATIC_CACHE  = 'jac-static-v7';
const BUNDLE_CACHE  = 'jac-bundle-v7';
const VIDEO_CACHE   = 'jac-video-v7';
const FONT_CACHE    = 'jac-font-v7';

const PRECACHE_URLS = ['/', '/index.html', '/favicon.webp', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const KEEP = [STATIC_CACHE, BUNDLE_CACHE, VIDEO_CACHE, FONT_CACHE];
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return;
  if (url.pathname.startsWith('/v1/')) return;

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(event.request, FONT_CACHE)); return;
  }
  if (url.pathname.endsWith('.mp4') || url.pathname.includes('/videos/')) {
    event.respondWith(handleVideo(event.request)); return;
  }
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|avif)$/i)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE)); return;
  }
  if (url.pathname.match(/\.(woff2?|ttf|eot|otf)$/i)) {
    event.respondWith(cacheFirst(event.request, FONT_CACHE)); return;
  }
  if (url.pathname.match(/\.(js|css)$/i) && url.pathname.includes('/assets/')) {
    event.respondWith(cacheFirst(event.request, BUNDLE_CACHE)); return;
  }
  event.respondWith(networkFirst(event.request, STATIC_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch { return new Response('', { status: 503 }); }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response('', { status: 503 });
  }
}

async function handleVideo(request) {
  const cache = await caches.open(VIDEO_CACHE);
  const rangeHeader = request.headers.get('Range');
  const cachedFull = await cache.match(new Request(request.url));
  if (cachedFull) {
    if (rangeHeader) return makeRangeResponse(cachedFull, rangeHeader);
    return cachedFull;
  }
  try {
    const fullRequest = new Request(request.url, { headers: {}, mode: 'cors', credentials: request.credentials });
    const networkResponse = await fetch(fullRequest);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(new Request(request.url), networkResponse.clone());
    }
    if (rangeHeader) return fetch(request);
    return networkResponse;
  } catch { return fetch(request); }
}

async function makeRangeResponse(fullResponse, rangeHeader) {
  const arrayBuffer = await fullResponse.arrayBuffer();
  const totalBytes = arrayBuffer.byteLength;
  const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
  if (!match) return new Response(arrayBuffer, { status: 200, headers: fullResponse.headers });
  const start = parseInt(match[1], 10);
  const end   = match[2] ? parseInt(match[2], 10) : totalBytes - 1;
  const body  = arrayBuffer.slice(start, end + 1);
  const headers = new Headers(fullResponse.headers);
  headers.set('Content-Range',  'bytes ' + start + '-' + end + '/' + totalBytes);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges',  'bytes');
  return new Response(body, { status: 206, statusText: 'Partial Content', headers });
}
