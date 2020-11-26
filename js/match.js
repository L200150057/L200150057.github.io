import { matches, options } from "./api.js";

const htmlData = async (data) => {
    const matches = data.matches;
    var matchData = "";
    await matches.forEach((v) => {
        if (v.matchday === v.season.currentMatchday) {
            matchData += `
                <div class="col s12">
                    <div class="card shadow-none">
                        <div class="card-content">
                            <div class="row m-0">
                                <div class="col s5 right-align">
                                    ${v.homeTeam.name}
                                </div>
                                <div class="col s2 center-align">
                                    ${
                                        v.status === "FINISHED"
                                            ? `<b>${v.score.fullTime.homeTeam} : ${v.score.fullTime.awayTeam}</b>`
                                            : "-"
                                    }
                                </div>
                                <div class="col s5 left-align">
                                    ${v.awayTeam.name}
                                </div>
                            </div>
                        </div>
                        <div class="card-action center-align red darken-3 white-text">
                            <span>
                            ${v.utcDate.split("T")[0]}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    return matchData;
};

const htmlTitle = (datas) => {
    const data = datas.matches[0];
    const seasonStart = data.season.startDate;
    const seasonEnd = data.season.endDate;
    const currentMatchday = data.season.currentMatchday;
    document.getElementById(
        "matchTitle"
    ).innerHTML = `Fixtures & Results | Season ${seasonStart.substring(
        0,
        4
    )}/${seasonEnd.substring(0, 4)} | Matchday ${currentMatchday}`;
};

export const getMatches = (page) => {
    if ("caches" in window) {
        caches.match(matches).then(function (response) {
            if (response) {
                let matchData = "";
                response.json().then(function (data) {
                    htmlData(data).then((matchData) => {
                        if (page === "match") {
                            document.getElementById(
                                "matchData"
                            ).innerHTML = matchData;
                            htmlTitle(data);
                        }
                    });
                });
            }
        });
    }

    fetch(matches, options)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            htmlData(data).then((matchData) => {
                if (page === "match") {
                    document.getElementById("matchData").innerHTML = matchData;
                    htmlTitle(data);
                }
            });
        });
};

var page = window.location.hash.substr(1);
getMatches(page);
