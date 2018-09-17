<template>
  <main class="homePage">
    <!-- Titre -->
    <h1 class="glitched">Bienvenue</h1>
    <!-- Sous titre -->
    <h2> Veuillez vous connecter </h2>
    <!-- Formulaire d'inscription -->
    <el-form :model="form" class="connexionForm" autocomplete="off">
      <el-input placeholder="E-mail" v-model="form.email"></el-input>
      <el-input type="password" placeholder="Mot de passe" v-model="form.password"></el-input>
      <el-button class="btnConfirmForm" @click="signIn">Se connecter</el-button>
      <!-- Pas encore inscrit ? -->
      <router-link to='/signup'>Je souhaite m'inscrire</router-link>
    </el-form>
  </main>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      authUser: null,
      user: '',
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser
      this.userMail = firebase.auth().currentUser.email
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
        (user) => {
          this.$router.replace({path: 'adminpage', query: {inscription: true}})
          this.dialogFormVisible = false
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
  /* css */
</style>
