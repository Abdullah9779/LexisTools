/* ============================================================
   Lexis Tools – Production PWA Service Worker
   Safe updates • Offline support • Scalable caching
   ============================================================ */

const VERSION = 'lexis-2.0.0';

const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

/* ------------------------------------------------------------
   Files safe to precache
   (NO JS here – JS must update freely)
------------------------------------------------------------- */
const PRECACHE_URLS = [
  '/',
  '/sign-in/',
  '/sign-up/',
  '/translate/',
  '/text-summarizer/',
  '/privacy-policy/',
  '/terms-of-service/',
  '/about/',
  '/blog/',
  '/static/css/landing-page.css',
  '/static/css/sign-in-page.css',
  '/static/css/sign-up-page.css',
  '/static/css/dashboard-page.css',
  '/static/css/translation-page.css',
  '/static/css/text-summarizer.css',
  '/static/favicons/favicon.ico',
  '/static/logos/logo.svg',
];

/* ------------------------------------------------------------
   INSTALL – precache critical assets
------------------------------------------------------------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

/* ------------------------------------------------------------
   ACTIVATE – cleanup old caches & take control
------------------------------------------------------------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => !key.includes(VERSION))
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();

  // Notify open tabs that update is ready
  self.clients.matchAll().then(clients => {
    clients.forEach(client =>
      client.postMessage({ type: 'APP_UPDATED' })
    );
  });
});

/* ------------------------------------------------------------
   FETCH – intelligent routing
------------------------------------------------------------- */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // API calls → always fresh
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // JS & CSS → safe updates
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // HTML pages → fresh content
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else
  event.respondWith(cacheFirst(request));
});

/* ------------------------------------------------------------
   STRATEGIES
------------------------------------------------------------- */

// Network first (HTML, APIs)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request) ||
      new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate (JS/CSS)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then(response => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });

  return cached || networkFetch;
}

// Cache first (images, fonts, misc)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached || fetch(request);
}

/* ------------------------------------------------------------
   PUSH NOTIFICATIONS (optional)
------------------------------------------------------------- */
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/static/favicons/android-chrome-192.png',
      badge: '/static/favicons/android-chrome-192.png',
    })
  );
});

/* ------------------------------------------------------------
   NOTIFICATION CLICK
------------------------------------------------------------- */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('Lexis Tools Service Worker loaded');
