var webPush = require("web-push");

const vapidKeys = {
    publicKey:
        "BHx05i6nHMBqllH-8tK8rRIVwZB3emg-PSmzay9xCl-7lFojgcwetBE4EY5T0NcLRddT7jYXjv_qz7ohW3FKjw0",
    privateKey: "3elJxnt0c_CK1Y3LQdxJimbMV1A3g7iT2skW4yNcCQY",
};

webPush.setVapidDetails(
    "mailto:example@yourdomain.org",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var pushSubscription = {
    endpoint:
        "https://fcm.googleapis.com/fcm/send/c5ey8XflqnQ:APA91bENGctXIf3OO1KrtgmMAnfBUApLtvGi1nX5IkO_G1XpUmATTNfIcZIZVBjZNcWlgP0DH92KJ1P0yk41PvzdMB7RTcMVusPBcelUUWaVSQoM_3dZsJIVLoLmNCmtG2VnPeB2cP76",
    keys: {
        p256dh:
            "BMKZG7oKuQiilqRG4XFp8lN3RCJ3Hi9u4+PyDbYguOr48mjVaWZZiLTqTaCeT1mdDqLhSHpcVxMxsrTTkvb/zU4=",
        auth: "lO5JlV0zN7mRvkKJYIA/dg==",
    },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "588417893702",
    TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
