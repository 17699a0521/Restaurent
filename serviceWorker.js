    
// installation
self.addEventListener("install", (event)=>{
	event.waitUntil(
    caches.open("restaurant-v1").then((cache)=> {
		return cache.addAll([
			'./',
			'./index.html',
			'./restaurant.html',
			'./serviceWorker.js',
			'./js/dbhelper.js',
			'./js/main.js',
			'./js/restaurant_info.js',
			'./css/styles.css',
			'./data/restaurants.json',
			'./img/1.jpg',
			'./img/2.jpg',
			'./img/3.jpg',
			'./img/4.jpg',
			'./img/5.jpg',
			'./img/6.jpg',
			'./img/7.jpg',
			'./img/8.jpg',
			'./img/9.jpg',
			'./img/10.jpg'
		]);
	}))
})
// fetch event
self.addEventListener("fetch", (event) => {
	event.respondWith(caches.match(event.request).then((respons) => {
		return respons || fetch(event.request).then((response) => {
			return caches.open("restaurant-v1").then((cache) => {
				cache.put(event.request, response.clone());
				return response;
			})
		})
	}))
})
