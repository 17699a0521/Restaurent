//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("sample").then((cache) => {
      return cache.addAll([]);
    })
  )
})

//Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request).then((response) => {
        caches.open("sample").then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        })
      })

    })
  )
})
