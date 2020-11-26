export const dbPromised = idb.open("news-reader", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("clubs", {
        keyPath: "id",
    });
    articlesObjectStore.createIndex("name", "shortName", {
        unique: false,
    });
});

export const saveForLater = (club) => {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("clubs", "readwrite");
            var store = tx.objectStore("clubs");
            console.log(club[0]);
            store.add(club[0]);
            return tx.complete;
        })
        .then(function () {
            console.log("Club berhasil di simpan.");
        });
};

export const getAll = () => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("clubs", "readonly");
                var store = tx.objectStore("clubs");
                return store.getAll();
            })
            .then(function (articles) {
                resolve(articles);
            });
    });
};

function getAllByTitle(title) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("articles", "readonly");
            var store = tx.objectStore("articles");
            var titleIndex = store.index("post_title");
            var range = IDBKeyRange.bound(title, title + "\uffff");
            return titleIndex.getAll(range);
        })
        .then(function (articles) {
            console.log(articles);
        });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.get(id);
            })
            .then(function (article) {
                resolve(article);
            });
    });
}
