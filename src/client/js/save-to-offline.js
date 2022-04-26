/* eslint-disable camelcase, func-names, no-console, no-shadow, no-unused-vars */
/* eslint-env browser */

function init() {
  // console.log(`offline.init()`);
  // courtesy of @adactio's Going Offline book
  if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then(function (registration) {
        // console.log("Success!", registration.scope);
      })
      .catch(function (error) {
        console.error("Failure!", error);
      });
    if (navigator.serviceWorker.controller) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.controller.postMessage("clean up caches");
      });
    }

    const post__header = document.querySelector(".post__header");
    // post__header only exists on article pages, not list or e.g. /about pages

    if (post__header) {
      const alreadySaved = caches.match(window.location.href);
      console.log(`already saved: ${alreadySaved}`);

      const offlinebutton = document.createElement("button");
      offlinebutton.innerText = "save for reading offline";
      offlinebutton.className = "btn-offline";

      if (alreadySaved) {
        offlinebutton.disabled = true;
        offlinebutton.innerText = "saved for offline reading";
      } else {
        offlinebutton.addEventListener("click", function (event) {
          event.preventDefault();
          const offlinebutton = this;
          offlinebutton.innerText = "saving ...";

          const imgs = document.querySelectorAll("img");
          const imgURLs = Array.from(imgs).map(function (img) {
            return img.src;
          });
          caches.open("savedimages").then(function (cache) {
            cache.addAll(imgURLs);
          });
          caches.open("savedpages").then(function (cache) {
            cache.add(window.location.href).then(function () {
              const data = {
                title: document.querySelector("title").innerText,
                description: document
                  .querySelector("meta[name='description']")
                  .getAttribute("content"),
                published: document.querySelector("time").innerHTML
              };
              localStorage.setItem(window.location.href, JSON.stringify(data));
              offlinebutton.innerText = "saved for offline";
              offlinebutton.disabled = true;
              offlinebutton.removeEventListener("click");
            });
          });
        });
      }

      post__header.appendChild(offlinebutton);
    }
  }
}
module.exports = init;
