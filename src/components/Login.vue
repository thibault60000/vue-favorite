<template>
    <div class='Login'>
        <h1>{{ msg }}</h1>
        <input type="text" v-model="email" placeholder="E-mail"><br>
        <input type="password" v-model="password" placeholder="Mot de passe"><br>
        <button v-on:click="signIn">Se Connecter</button>
        <p>Vous n'avez pas de compte ? Vous pouvez <router-link to="/sign-up">en créer un ! </router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Page de Connexion',
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
    /* CSS */
</style>
