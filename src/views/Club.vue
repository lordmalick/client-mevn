<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4" >
                <h1 class="title has-text-centered">Club</h1>

                <form class="box">
                    <div class="field">
                        <label>Club Name</label>
                        <div class="control">
                            <input class="input is-medium" type="text" id="name" v-model="state.club.club_">
                        </div>
                    </div>

                    <div class="field">
                        <label>League</label>
                        <div class="control">
                            <input class="input is-medium" type="text" id="league" v-model="state.club.league">
                        </div>
                    </div>


                    <div class="field">
                        <div class="control">
                            <button class="button is-dark"  v-on:click="submitItemHandler">Submit</button>
                        </div>
                    </div>

                    <hr>

                    <router-link to="/form-add">click here</router-link> To add Player to club!
                </form>
            </div>
        </div>
    </div>
<hr>
<div class="has-text-centered">
<h2>All Clubs</h2> <br>
</div>
<form class="box" v-for="(item, i) in state.clubList" v-bind:key="i">
  <div class="field">
    <label class="label"><router-link :to="{name:'Player',params:{club:item.club }}">{{ item.club }}</router-link></label>
    <div class="control">
      
    </div>
  </div>

  <div class="field has-text-right">
    <h5> {{ item.league }}</h5>
    <div class="control">
    </div>
  </div>
  <div class="buttons"> 
    <button class="button is-danger" v-on:click="(e) => deleteItemHandler(e, item.club)">Delete</button>
    <button class="button is-info" v-on:click="(e) => updateItemHandler(e, item.club)">Update</button>
  </div>
 
</form>

</template>

<script>
import { toast }  from 'bulma-toast'
import { reactive, onMounted } from "vue";
import { getClubs } from "../graphql/queries";
import { addClub, deleteClub, updateClub } from "../graphql/mutations";
import Player from './Player.vue';
export default {
    name: "Club",
    components:{
      Player
    },
  setup(props) {
    const state = reactive({
      club: {
        club_: null,
        league: null,
        id:null
      },
      clubList: [],
      update: false,
      isLoading: false,
    });

    onMounted(async () => {
      const allClubs = await getClubs(state);
      console.log(allClubs);
      state.clubList = allClubs;
    });

    const submitItemHandler = async (e) => {
      e.preventDefault();
      // console.log(state.club.name);
      // ADDING NEW CLUB

      if (state.update === true) {
        const updatedClub = await updateClub(state);
        toast({
            message: 'Club updated successfully !',
            dismissible: true,
            pauseOnHover: true,
            type: 'is-success',
            duration: 2000,
            position: 'bottom-right',
            
        })
        console.log("OBJECT UPDATECLUB "+updateClub);
      } else {
        const newClub = await addClub(state);
         toast({
            message: 'Club added successfully !',
            dismissible: true,
            pauseOnHover: true,
            type: 'is-success',
            duration: 2000,
            position: 'bottom-right',
            
        })

      }

      
      const allClubs = await getClubs(state);
      // console.log(allClubs);
      state.clubList = allClubs;
      state.club = { id:null,club_: null, league: null };
      state.update = false;
    };

    const deleteItemHandler = async (e, club) => {
      e.preventDefault();
      console.log('club name  '+club);
      // console.log(itemID);
      const deletedClubs = await deleteClub(state, club);
       toast({
            message: 'Club deleted successfully !',
            dismissible: true,
            pauseOnHover: true,
            type: 'is-danger',
            duration: 2000,
            position: 'bottom-right',
            
        })
      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      const allClubs = await getClubs(state);
      // console.log(allClubs);
      state.clubList = allClubs;
    };

    const updateItemHandler = async (e, club_name) => {
      e.preventDefault();
      const selectedClub = state.clubList.filter(
        (club, i) => club.club === club_name)[0];
      console.log("SELECTED CLUB "+selectedClub);
      state.club.club_ = selectedClub.club;
      state.club.league = selectedClub.league;
      state.club.id=selectedClub.club;
      // console.log(state);
      state.update = true;
    };

    return {
      updateItemHandler,
      submitItemHandler,
      deleteItemHandler,
      state,
    };
  },
};
</script>