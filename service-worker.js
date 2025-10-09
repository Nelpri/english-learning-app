const CACHE_NAME = 'english-learning-app-v1';
const STATIC_CACHE = 'english-learning-static-v1';
const DYNAMIC_CACHE = 'english-learning-dynamic-v1';

// Recursos estáticos a cachear
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/writing-styles.css',
    '/feedback-styles.css',
    '/gamification-styles.css',
    '/multimedia-styles.css',
    '/responsive-styles.css',
    '/interaction-styles.css',
    '/conversation-styles.css',
    '/script.js',
    '/script1.js/data.js',
    '/script1.js/utils.js',
    '/script1.js/storage.js',
    '/script1.js/auth.js',
    '/script1.js/diagnostic.js',
    '/script1.js/navigation.js',
    '/script1.js/lesson.js',
    '/script1.js/vocabulary.js',
    '/script1.js/practice.js',
    '/script1.js/progress.js',
    '/script1.js/achievements.js',
    '/script1.js/writing.js',
    '/script1.js/feedback-system.js',
    '/script1.js/gamification.js',
    '/script1.js/audio-system.js',
    '/script1.js/image-system.js',
    '/script1.js/interaction-system.js',
    '/script1.js/personalization-system.js',
    '/script1.js/spaced-repetition-system.js',
    '/script1.js/conversation-system.js',
    '/script1.js/module-progress.js',
    '/script1.js/level-tests.js',
    '/script1.js/test-interface.js',
    '/script1.js/level-test-manager.js',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Datos JSON a cachear
const DATA_ASSETS = [
    '/data/lessons/level1.json',
    '/data/lessons/level2.json',
    '/data/lessons/level3.json',
    '/data/lessons/level4.json',
    '/data/lessons/level5.json',
    '/data/lessons/level6.json',
    '/data/lessons/level7.json',
    '/data/vocabulary/greetings.json',
    '/data/vocabulary/colors.json',
    '/data/vocabulary/family.json',
    '/data/vocabulary/food.json',
    '/data/vocabulary/animals.json',
    '/data/vocabulary/weather.json',
    '/data/vocabulary/time.json'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Cacheando recursos estáticos...');
                return cache.addAll(STATIC_ASSETS);
            }),
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('Cacheando datos...');
                return cache.addAll(DATA_ASSETS);
            })
        ]).then(() => {
            console.log('Service Worker: Instalación completa');
            return self.skipWaiting();
        })
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activación completa');
            return self.clients.claim();
        })
    );
});

// Interceptar requests
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Estrategia Cache First para recursos estáticos y datos
    if (STATIC_ASSETS.includes(request.url) || DATA_ASSETS.includes(request.url) ||
        request.url.includes('/data/') || request.url.includes('.css') ||
        request.url.includes('.js') || request.url.includes('chart.js')) {

        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(request).then(response => {
                    // Cachear dinámicamente si es exitoso
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    } else {
        // Network First para otros recursos
        event.respondWith(
            fetch(request).then(response => {
                return response;
            }).catch(() => {
                // Fallback a cache si falla la red
                return caches.match(request);
            })
        );
    }
});