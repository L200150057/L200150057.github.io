import { standings, options } from "./api.js";

const htmlData = async (data) => {
    const standings = data.standings[0].table;
    var articlesHTML = "";
    await standings.forEach((standing) => {
        articlesHTML += `
            <tr>
                <td>
                    <img class="club-image-sm" src="${standing.team.crestUrl}" />
                </td>
                <td>
                    ${standing.team.name}
                </td>
                <td>${standing.playedGames}</td>
                <td>${standing.points}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
            </tr>
        `;
    });
    return articlesHTML;
};

export const getStandings = (page) => {
    if ("caches" in window) {
        caches.match(standings).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    const seasonStart = data.season.startDate;
                    const seasonEnd = data.season.endDate;
                    const currentMatchday = data.season.currentMatchday;
                    htmlData(data).then((articlesHTML) => {
                        if (page === "standing") {
                            document.getElementById(
                                "standings"
                            ).innerHTML = articlesHTML;
                            document.getElementById(
                                "standing-title"
                            ).innerHTML = `Standing | Season ${seasonStart.substring(
                                0,
                                4
                            )}/${seasonEnd.substring(
                                0,
                                4
                            )} | Matchday ${currentMatchday}`;
                        }
                    });
                });
            }
        });
    }

    fetch(standings, options)
        .then((status) => {
            return status.json();
        })
        .then((data) => {
            const seasonStart = data.season.startDate;
            const seasonEnd = data.season.endDate;
            const currentMatchday = data.season.currentMatchday;
            htmlData(data).then((articlesHTML) => {
                if (page === "standing") {
                    document.getElementById(
                        "standings"
                    ).innerHTML = articlesHTML;
                    document.getElementById(
                        "standing-title"
                    ).innerHTML = `Standing | Season ${seasonStart.substring(
                        0,
                        4
                    )}/${seasonEnd.substring(
                        0,
                        4
                    )} | Matchday ${currentMatchday}`;
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

var page = window.location.hash.substr(1);
getStandings(page);
