import { HOSTNAME } from '../config/keys'
const getClubs = async (state) => {

    state.isLoading = true;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `{
                clubs{
                        club,
                        league
                    }
                }`
        })
    };
    const response = await fetch(HOSTNAME, options);
    const text = await response.text();
    const jsonRes = JSON.parse(text);
    console.log("AAll DATA "+jsonRes.data);
    state.isLoading = false;
    console.log("ALLCLUB "+jsonRes.data);
    return jsonRes.data.clubs;
}
const getPlayersClub = async (club) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `{
                findPlayersForClub(club:"${club}"){
                  nom,
                  prenom,
                  age
                }
              }
                `
        })
    };
    const response = await fetch(HOSTNAME, options);
    const text = await response.text();
    const jsonRes = JSON.parse(text);
    console.log("!!!!!! "+jsonRes.data.findPlayersForClub);
    return jsonRes.data.findPlayersForClub;
}


export { getClubs , getPlayersClub};