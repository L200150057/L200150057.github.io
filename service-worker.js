importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
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
    self.addEventListener("push", function (event) {
        var body;
        if (event.data) {
            body = event.data.text();
        } else {
            body = "Push message no payload";
        }
        var options = {
            body: body,
            icon: "/logo.png",
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

    console.log(`Workbox gagal dimuat`);
}
