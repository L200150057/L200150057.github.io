const api_key = "9a7307bd9c5241a5893301543a97cfdd";
const base_url = "https://api.football-data.org/v2/";
const league_id = 2002;

export const matches = `${base_url}competitions/${league_id}/matches`;
export const standings = `${base_url}competitions/${league_id}/standings`;
export const clubs = `${base_url}competitions/${league_id}/teams`;

export const options = {
    headers: {
        "X-Auth-Token": api_key,
    },
};
