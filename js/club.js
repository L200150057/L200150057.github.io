import { clubs, options } from "./api.js";
import { saveForLater } from "./db.js";

const renderData = async (clubs) => {
    var clubsHTML = "";
    await clubs.forEach((club) => {
        clubsHTML += `
            <div class="col s12 m4">
                <div class="card shadow-none">
                    <div class="card-image">
                        <img src="${club.crestUrl}" class="p-2 club-image">
                        <a class="btn-floating halfway-fab waves-effect waves-light red fav" id="${club.id}"><i class="material-icons">save</i></a>
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
    return clubsHTML;
};

const favButton = () => {
    const fav = document.getElementsByClassName("fav");
    for (let index = 0; index < fav.length; index++) {
        fav[index].onclick = () => {
            console.log("jalan");
            getClub(fav[index].id).then((filter) => {
                saveForLater(filter);
                M.toast({
                    html: "Club berhasil disimpan",
                    classes: "red darken-3",
                });
            });
        };
    }
};

const getClub = async (id) => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(clubs).then(function (response) {
                if (response) {
                    response
                        .json()
                        .then(function (data) {
                            const filter = data.teams.filter(
                                (value) => value.id === parseInt(id)
                            );
                            resolve(filter);
                        })
                        .catch((error) => console.log(error));
                }
            });
        }

        fetch(clubs, options)
            .then((status) => {
                return status.json();
            })
            .then((data) => {
                const filter = data.teams.filter(
                    (value) => value.id === parseInt(id)
                );
                resolve(filter);
            })
            .catch((error) => console.log(error));
    });
};

export const getClubs = async (page) => {
    if ("caches" in window) {
        caches.match(clubs).then(function (response) {
            if (response) {
                response
                    .json()
                    .then(function (data) {
                        renderData(data.teams).then((clubsHTML) => {
                            if (page === "club") {
                                document.getElementById(
                                    "clubData"
                                ).innerHTML = clubsHTML;
                            }
                            favButton();
                        });
                    })
                    .catch((error) => console.log(error));
            }
        });
    }

    fetch(clubs, options)
        .then((status) => {
            return status.json();
        })
        .then((data) => {
            renderData(data.teams).then((clubsHTML) => {
                if (page === "club") {
                    document.getElementById("clubData").innerHTML = clubsHTML;
                }
                favButton();
            });
        })
        .catch((error) => console.log(error));
};

var page = window.location.hash.substr(1);
getClubs(page);
