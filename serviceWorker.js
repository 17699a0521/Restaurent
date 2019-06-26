//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("restaurant-v1").then((cache) => {
      return cache.addAll([
      ]);
    })
  )
})

//Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request).then((response) => {
        return caches.open("restaurant-v1").then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        })
      })

    })
  )
})

self.addEventListener('activate', function(event) {
  var newCache = ['restaurant-v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (newCache.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
