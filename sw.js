const CACHE_NAME = 'agni-v1';

const ASSETS = [
    './',
    './index.html',
    './manifest.json',

    // Scripts
    './js/phaser.min.js',
    './js/gl.js',
    './js/jquery.min.js',

    // Fonts
    './fonts/armalite.ttf',

    // Images
    './images/favicon.ico',
    './images/startscreen.jpg',
    './images/start.png',
    './images/next.png',
    './images/restart.png',
    './images/back.png',
    './images/bg1.jpg',
    './images/bg2.jpg',
    './images/rubble.png',
    './images/Bgbuildings_Sprite.png',
    './images/milestone.png',
    './images/explode.png',
    './images/panicker.png',
    './images/fullvolume.png',
    './images/novolume.png',
    './images/ground.png',
    './images/friend1.png',
    './images/enemy1.png',
    './images/launcher.png',
    './images/spacer.png',
    './images/smoke-puff.png',
    './images/pointer.png',
    './images/popup.png',
    './images/rain.png',
    './images/bd1.png',
    './images/bd2.png',
    './images/bd3.png',
    './images/bd4.png',
    './images/bd5.png',
    './images/bd6.png',
    './images/bd7.png',
    './images/bd8.png',
    './images/bd10.png',
    './images/bd12.png',
    './images/bd14.png',
    './images/icon-48.png',
    './images/icon-72.png',
    './images/icon-96.png',
    './images/icon-128.png',
    './images/icon-144.png',
    './images/icon-152.png',
    './images/icon-192.png',
    './images/icon-384.png',
    './images/icon-512.png',

    // Sounds
    './sounds/bg.mp3',
    './sounds/bg.ogg',
    './sounds/Agni.mp3',
    './sounds/Agni.ogg',
    './sounds/Exp.mp3',
    './sounds/Exp.ogg',
    './sounds/Exp-bd.mp3',
    './sounds/Exp-bd.ogg',
    './sounds/Exp-hit.mp3',
    './sounds/Exp-hit.ogg',
    './sounds/click.mp3',
    './sounds/click.ogg'
];

// Install: cache all assets
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ASSETS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

// Activate: delete old caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// Fetch: cache-first strategy
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(function (networkResponse) {
                // Cache any new valid responses dynamically
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    var responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            });
        })
    );
});
