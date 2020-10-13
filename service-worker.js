const CACHE_NAME = 'firstpwa-1';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/manifest.json',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/profile.html',
	'./pages/history.html',
	'./images/Flag.png',
	'./images/history.png',
	'./images/map.png',
	'./images/Home.png',
	'/icon.png',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/script.js'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
		.then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + "Deleted");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request, {
			cacheName: CACHE_NAME
		})
		.then(function (response) {
			if (response) {
				console.log("ServiceWorker:Using from cache: ", response.url);
				return response;
			}

			console.log("ServiceWorker: Load asset form server: ", event.request.url);
			return fetch(event.request);
		})
	);
});