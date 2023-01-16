<template>
  <div class="home">
    <section class="hero is-medium is-info mb-6">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Welcome to UEFA Player Agency
            </p>
            <p class="subtitle">
                Online Player Management
            </p>
        </div>
    </section>

    <div class="columns is-multiline">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Club from './Club.vue';
export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  components: {
    Club
  },
  mounted() {
    document.title = 'Home | Agency'
  }
}
</script>