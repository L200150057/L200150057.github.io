importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
    workbox.precaching.precacheAndRoute([
        { url: "/", revision: "1" },
        { url: "/nav.html", revision: "1" },
        { url: "/index.html", revision: "1" },
        { url: "/pages/home.html", revision: "1" },
        { url: "/pages/standing.html", revision: "1" },
        { url: "/pages/match.html", revision: "1" },
        { url: "/pages/club.html", revision: "1" },
        { url: "/pages/favorite.html", revision: "1" },
        { url: "/css/materialize.min.css", revision: "1" },
        { url: "/css/custom.css", revision: "1" },
        { url: "/css/icon.css", revision: "1" },
        { url: "/js/materialize.min.js", revision: "1" },
        { url: "/manifest.json", revision: "1" },
        { url: "/js/nav.js", revision: "1" },
        { url: "/js/api.js", revision: "1" },
        { url: "/js/standing.js", revision: "1" },
        { url: "/js/match.js", revision: "1" },
        { url: "/js/idb.js", revision: "1" },
        { url: "/js/db.js", revision: "1" },
        { url: "/favicon.ico", revision: "1" },
        { url: "/images/icon-512.png", revision: "1" },
        { url: "/images/maskable-icon.png", revision: "1" },
        { url: "/images/Bundesliga.svg", revision: "1" },
    ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: "images-cache",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: "google-fonts-webfonts",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        new RegExp("https://api.football-data.org/v2/"),
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: "google-fonts-stylesheets",
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "static-resources",
        })
    );

    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

self.addEventListener("push", function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }
    const options = {
        body: body,
        icon: "/favicon.ico",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});
