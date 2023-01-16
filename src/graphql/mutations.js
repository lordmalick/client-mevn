import { HOSTNAME } from '../config/keys';

const addClub = async (state) => {
    state.isLoading = true;
    console.log(`club: ${state.club.club_}, league: ${state.club.league}`);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                    mutation{
                        addClub(club: "${state.club.club_}", league: "${state.club.league}"){
                            club 
                            league
                        }
                    }
                `
        }),
    };
    const response = await fetch(HOSTNAME, options);
    // console.log(response);
    const text = await response.text();
    const jsonRes = JSON.parse(text);
    console.log(jsonRes);
    state.isLoading = false;
    // return jsonRes.data.clubs;
}


const deleteClub = async (state, club) => {
    state.isLoading = true;


    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                mutation{
                    deleteClub(club:"${club}"){
                        club
                    }
                }
                `
        }),
    };
    const response = await fetch(HOSTNAME, options);
    console.log("Delete item - ",response);
    state.isLoading = false;
    // return jsonRes.data.clubs;
}



const updateClub = async (state) => {
    state.isLoading = true;
console.log("in function update "+state.club.id);
console.log("in function update "+state.club.club_);
console.log("in function update "+state.club.league);


    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation{
                        updateClub(id:"${state.club.id}",club:"${state.club.club_}",league:"${state.club.league}"){
                            club
                            league
                          }
                    }`
        }),
    };
    const response = await fetch(HOSTNAME, options);
    console.log("Update clubs ",response);
    state.isLoading = false;
    // return jsonRes.data.clubs;
}





export { addClub, deleteClub, updateClub };