export const dbPromised = idb.open("favorite-club", 1, function (upgradeDb) {
    const favoriteClubStore = upgradeDb.createObjectStore("clubs", {
        keyPath: "id",
    });
    favoriteClubStore.createIndex("name", "shortName", {
        unique: false,
    });
});

export const saveForLater = (club) => {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("clubs", "readwrite");
            const store = tx.objectStore("clubs");
            console.log(club[0]);
            store.put(club[0]);
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
                const tx = db.transaction("clubs", "readonly");
                const store = tx.objectStore("clubs");
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
