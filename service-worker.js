const CACHE_NAME = 'nurse-woyz-demo-v63';
const APP_SHELL = [
  './',
  './index.html',
  './ward.html',
  './nurse-desktop.html',
  './care-plan.html',
  './careplan.html',
  './handover-notes.html',
  './documentation-template.css',
  './documentation-template.js',
  './template-rhfra.html',
  './template-modified-dvt-assessment.html',
  './template-rhpass-icu.html',
  './template-braden-score.html',
  './template-restraint-monitoring.html',
  './template-rhpass-ward.html',
  './template-neuro-assessment-part-1.html',
  './template-neuro-assessment-part-2.html',
  './template-in-house-transfer.html',
  './template-patient-movement.html',
  './template-nursing-initial-assessment-adult.html',
  './manager.html',
  './nursewoyzadmin.html',
  './ot.html',
  './cathlab.html',
  './qr-generator.html',
  './firebase-config.js',
  './access-control.js',
  './manifest.webmanifest',
  './offline.html',
  './images/wristband-template.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./offline.html'))
    );
    return;
  }

  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        if (response.ok && new URL(request.url).origin === self.location.origin) {
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
