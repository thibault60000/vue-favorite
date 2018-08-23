<template>
  <div class='sign-up'>
    <p>Création d'un nouveau compte </p>
    <input type='text' v-model='email' placeholder='E-mail'><br>
    <input type='password' v-model='password' placeholder='Mot de passe'><br>
    <button v-on:click='signUp'>S'inscrire'</button>
    <span>Si vous possédez deja un compte, vous pouvez <router-link to='/login'>vous connectez ici</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('home')
          },
          err => {
            alert('Oops. ' + err.message)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
