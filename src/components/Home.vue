<template>
  <div class="homePage">
     <router-link class="noAccount" to='/inscription'>Je souhaite m'inscrire</router-link>
    <!-- WELCOME MESSAGE -->
    <main class="homePageContent">
      <h1 class="glitched">Bienvenue
        <div class="glitch-window">
          <h1 class="glitched">Bienvenue</h1>
          </div>
      </h1>
      <h2> Veuillez vous connecter </h2>
      <!-- LOGIN FORM -->
      <div class='login'>
          <el-form :model="form" autocomplete="off">
            <el-input placeholder="E-mail" v-model="form.email"></el-input>
            <el-input type="password" placeholder="Mot de passe" v-model="form.password"></el-input>
            <el-button @click="signIn">Se connecter</el-button>
          </el-form>
      </div>
    </main>
    <Menu />
  </div>
</template>

<script>
import firebase from 'firebase'
import CardList from './CardList'
import Menu from './Menu'

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
  components: {
    CardList, Menu
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
          this.$router.replace('adminpage')
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
