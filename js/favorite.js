import { getAll } from "./db.js";
import { dbPromised } from "./db.js";

export const getSavedClub = (page) => {
    let favHTML = "";
    getAll()
        .then(async (res) => {
            await res.forEach((club) => {
                favHTML += `
                <div class="col s12 m4 favorite">
                    <div class="card shadow-none">
                        <div class="card-image">
                            <img alt="gambar-club-${club.shortName}" src="${club.crestUrl}" class="p-2 club-image">
                            <a class="btn-floating halfway-fab waves-effect waves-light red delete" id="${club.id}"><i class="material-icons">delete</i></a>
                        </div>
                        <div class="card-content">
                            <div class="card-title center-align">
                                <span>${club.shortName}</span>
                            </div>
                        </div>
                        <div class="card-action center-align red darken-3">
                            <a class="white-text" href="${club.website}">WEBSITE</a>
                        </div>
                    </div>
                </div>
            `;
            });
            if (page === "favorite") {
                document.getElementById("favoriteData").innerHTML = favHTML;
            }
        })
        .then(() => {
            deleteButton();
        });
};

var page = window.location.hash.substr(1);
getSavedClub(page);

const deleteButton = () => {
    let db = document.getElementsByClassName("delete");
    for (let index = 0; index < db.length; index++) {
        db[index].onclick = async () => {
            console.log("Item deleted");
            deleteDB(db[index].id);
            db[index].closest(".favorite").remove();
            M.toast({
                html: "Club berhasil dihapus",
                classes: "red darken-3",
            });
        };
    }
};

const deleteDB = (id) => {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("clubs", "readwrite");
            var clubs = tx.objectStore("clubs");
            clubs.delete(parseInt(id));
            return tx.complete;
        })
        .then(function () {
            console.log("Item deleted");
        });
};
