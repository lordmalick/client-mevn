<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add Player</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Nom</label>
                        <div class="control">
                            <input type="text" class="input">
                        </div>
                    </div>

                    <div class="field">
                        <label>Prenom</label>
                        <div class="control">
                            <input type="text" class="input" >
                        </div>
                    </div>

                    <div class="field">
                        <label>Age</label>
                        <div class="control">
                            <input type="Number" class="input" >
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Submit</button>
                        </div>
                    </div>

                    <hr>

                    <router-link to="/club">click here</router-link> to add a club!
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'FormAddPlayer',
    data() {
        return {
            errors: []
        }
    },
    methods: {
        submitForm() {
            this.errors = []

            if (this.username === '') {
                this.errors.push('Le Nom est manquant')
            }

            if (this.password === '') {
                this.errors.push('Le Prenom est Manquant')
            }

            if (this.password === '' ) {
                this.errors.push('L\'age est manquant')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }
                 toast({
                    message: ' Fonctionnalité Pas Encore Implementé Pour le Front !',
                    dismissible: true,
                    pauseOnHover: true,
                    type: 'is-success',
                    duration: 2000,
                    position: 'bottom-right',
                    
                })
                console.log(formData);

    
            }
        }
    }
}
</script>