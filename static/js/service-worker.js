// Lexis Tools Service Worker
// Provides offline support, caching, and background sync

const CACHE_VERSION = 'lexis-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/sign-up/',
  '/sign-in/',
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
  '/static/js/base.js',
  '/static/js/dashboard-page.js',
  '/static/logos/logo.svg',
  '/static/favicons/favicon.ico',
];

// Install Service Worker and cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Service Worker: Some static assets could not be cached', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('Service Worker: Deleting old cache', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Cache-first for static, Network-first for dynamic
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external origins
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }

  // API requests: Network-first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Static assets: Cache-first, fallback to network
  if (
    url.pathname.startsWith('/static/') ||
    url.pathname.includes('.css') ||
    url.pathname.includes('.js') ||
    url.pathname.includes('.png') ||
    url.pathname.includes('.jpg') ||
    url.pathname.includes('.gif') ||
    url.pathname.includes('.svg')
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML pages: Network-first, fallback to cache
  if (
    url.pathname === '/' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/')
  ) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Default: Network-first
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (!response || response.status !== 200 || response.type === 'error') {
      return response;
    }

    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.error('Cache-first strategy error:', err);
    return new Response('Service Unavailable', { status: 503 });
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('Network request failed, using cached version:', err);
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Fallback response for offline
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/') || new Response('Offline - Page not available', { status: 503 });
    }

    return new Response('Service Unavailable', { status: 503 });
  }
}

// Background sync for offline form submissions (optional)
// Note: Implement IndexedDB storage and sync functions as needed for your use case
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-translations') {
    // event.waitUntil(syncPendingRequests());
    console.log('Background sync triggered:', event.tag);
  }
});

// Push notifications (optional)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/static/favicons/android-chrome-192.png',
    badge: '/static/favicons/android-chrome-192.png',
    tag: 'lexis-notification',
    requireInteraction: false,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

console.log('Lexis Tools Service Worker loaded');
