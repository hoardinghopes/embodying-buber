const version = "v0.0.24";
const staticCacheName = version + "staticfiles";
const imagesCacheName = "images";
const pagesCacheName = "pages";

const cacheList = [staticCacheName, imagesCacheName, pagesCacheName];

addEventListener("install", (installEvent) => {
  skipWaiting();
  console.log("The service worker is installing...");
  installEvent.waitUntil(
    caches.open(staticCacheName).then((staticCache) => {
      staticCache.addAll([
        // nice to haves
        "/stats/",
        "/statistics/",
        "/about/",
        "/images/favicon.ico",
        "/images/fallback.svg",
      ]);
      return staticCache.addAll([
        // must haves
        "/assets/main.css",
        "/assets/main.js",
        "/offline/",
      ]);
    })
  );
});

addEventListener("activate", function (activateEent) {
  console.log("The service worker is activated.");
  activateEent.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheList.includes(cacheName)) {
              console.log(`deleting cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return clients.claim();
      })
  );
});

addEventListener("fetch", (fetchEvent) => {
  const request = fetchEvent.request;
  console.log(`starting fetch(${request.url})`);

  // if URL is HTML
  if (request.headers.get("Accept").includes("text/html")) {
    // if URL is a post type
    if (/\/posts\/.+/.test(request.url)) {
      console.log(`requesting post type: ${request.url}`);
      fetchEvent.respondWith(
        caches.match(request).then((responseFromCache) => {
          if (responseFromCache) {
            fetchEvent.waitUntil(stashInCache(request, pagesCacheName));
            return responseFromCache;
          }
          return fetch(request)
            .then((responseFromFetch) => {
              const copy = responseFromFetch.clone();
              fetchEvent.waitUntil(
                caches.open(pagesCacheName).then((pagesCache) => {
                  return pagesCache.put(request, copy);
                })
              );
              return responseFromFetch;
            })
            .catch((error) => {
              return caches.match("/offline/");
            });
        })
      );
      return;
    }

    // if URL is a different HTML page (e.g. /contact/ or homepage)
    console.log(`requesting non-post HTML: ${request.url}`);
    fetchEvent.respondWith(
      fetch(request)
        .then((responseFromFetch) => {
          console.log(
            `remote request for ${request.url} returned ${responseFromFetch.status}`
          );
          const copy = responseFromFetch.clone();
          fetchEvent.waitUntil(
            caches.open(pagesCacheName).then((pagesCache) => {
              return pagesCache.put(request, copy);
            })
          );
          console.log(`returning responseFromFetch for ${request.url}`);
          return responseFromFetch;
        })
        .catch((error) => {
          console.log(`fetch(${request.url}) returned error`);
          return caches.match(request).then((responseFromCache) => {
            console.log(`look for ${request.url} in caches`);
            if (responseFromCache) {
              console.log(`found ${request.url} in cache`);
              return responseFromCache;
            }
            console.log(
              `couldn't get ${request.url} from caches or server, returning offline.html`
            );
            return caches.match("/offline/");
          });
        })
    );
    return;
  }

  if (request.headers.get("Accept").includes("image")) {
    console.log(`requesting IMG: ${request.url}`);
    fetchEvent.respondWith(
      caches.match(request).then((responseFromCache) => {
        if (responseFromCache) {
          fetchEvent.waitUntil(stashInCache(request, imagesCacheName));
          console.log(
            `response from local cache via serviceworker: ${request.url}`
          );
          return responseFromCache;
        }
        return fetch(request)
          .then((responseFromFetch) => {
            //responseFromFetch is a stream so can't be used multiple times
            const copy = responseFromFetch.clone();
            fetchEvent.waitUntil(
              caches.open(imagesCacheName).then((imageCache) => {
                imageCache.put(request, copy);
              })
            );
            return responseFromFetch;
          })
          .catch((error) => {
            console.log(`replacing ${request.url} with fallback.svg`);
            return caches.match("/images/fallback.svg");
          });
      })
    );
    return;
  }

  // for all other types of files - JS, CSS ...
  fetchEvent.respondWith(
    caches.match(request).then((responseFromCache) => {
      console.log(
        `pulling non-image/non-HTML from cache first: ${request.url}`
      );
      if (responseFromCache) {
        return responseFromCache;
      }
      console.log(`couldn't find it; fetching from server: ${request.url}`);
      return fetch(request);
    })
  );
});

addEventListener("message", (messageEvent) => {
  // console.log(`MESSAGE: ${messageEvent.data}`);
  if (messageEvent.data === "clean up caches") {
    trimCache(pagesCacheName, 20);
    trimCache(imagesCacheName, 20);
  }
});

function trimCache(cacheName, maxItems) {
  // console.log(`clearing cache: ${cacheName}`);
  caches.open(cacheName).then((cache) => {
    cache.keys().then((items) => {
      // console.log(`${items.length} items found in cache ${cacheName}`);
      if (items.length > maxItems) {
        cache.delete(items[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

function stashInCache(request, cacheName) {
  fetch(request).then((responseFromFetch) => {
    caches.open(cacheName).then((theCache) => {
      return theCache.put(request, responseFromFetch);
    });
  });
}
