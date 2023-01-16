<template>
    <div class="column is-4" v-for="(item, i) in playerList" v-bind:key="i">
        <div class="box">
            <h1 class="is-size-4">{{ item.nom}}</h1>
            <h3 class="is-size-4">{{ item.prenom}}</h3>

        </div>
    </div>

</template>

<script>
import { getPlayersClub } from "../graphql/queries";
import { reactive, onMounted } from "vue";

export default {
    name: 'Player',
    props: {
        club: String
    },
    data() {
    return {
      playerList: []
    }
  },
    mounted() {
    this.getPlayersClubFunction()
    document.title = 'Home | Player'
  },
  methods: {
      async getPlayersClubFunction(){
        this.playerList = await getPlayersClub(this.club);
        console.log("CLUB "+this.club);
        this.$store.commit('setIsLoading', false);
    }
  },
  
}
</script>