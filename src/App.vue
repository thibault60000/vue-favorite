<template>
  <div id="app">
    <!-- MENU -->
    <Push right>
      <router-link to='home'> <span> <font-awesome-icon icon="home" /> Accueil </span> </router-link>
      <router-link to='courses'> <span> <font-awesome-icon icon="graduation-cap" /> Cours </span> </router-link>
      <router-link to='articles'> <span> <font-awesome-icon icon="newspaper" /> Articles </span> </router-link>
      <router-link v-if="authUserExist" to='myaccount'> <span> <font-awesome-icon icon="user-circle" /> Mon compte </span> </router-link>
      <router-link class="registerLink" v-if="!authUserExist" to='signup'> <span> <font-awesome-icon icon="user-plus" /> Inscription </span> </router-link>
      <p class="logoutLink" v-if="authUserExist" @click="logout"> <span> <font-awesome-icon icon="door-open" /> Déconnexion </span> </p>
    </Push>
    <!-- CONTENU PRINCIPAL -->
    <main id="page-wrap">
     <router-view/>
    </main>
  </div>
</template>

<script>
import Push from './components/Push'
import firebase from 'firebase'

export default {
  name: 'App',
  components: {
    Push
  },
  data () {
    return {
      authUser: ''
    }
  },
  computed: {
    /* Converti en booléen l'existance ou non d'un utilisateur authentifié */
    authUserExist () {
      return !!this.authUser
    }
  },
  created () {
    this.authUser = firebase.auth().currentUser
  },
  updated () {
    this.authUser = firebase.auth().currentUser
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style lang="scss">
   /* Importer les fonts */
  @import './assets/fonts/fonts.css';
  @import './assets/reset.css';
  /* INPUTS */
  form > div.el-input {
    margin: 1rem 0;
  }
  /* VARIABLES CSS */
  $blue: #3a8ee6;
  /* BODY  */
  body{
    background-color: $blue;
  }
  /* SECTION */
  section {
    background-color: white;
    display: block;
    border-radius: 3.5px;
    padding: 1.5rem;
    width: calc(100% - 3rem);
    margin-bottom: 1.5rem;
  }
  /* MAIN */
  main {
    transition: all 0.5s ease 0s;
    display: block;
    padding: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
  }
  @media screen and (min-width: 800px) {
    main {
      transition: all 0.5s ease 0s;
      display: block;
      padding: 2rem;
      width: calc(100% - 4rem);
      height: calc(100% - 4rem);
    }
  }
  .el-form-item__label {
    text-align: left !important;
    display: block !important;
    position: static !important;
    float: none !important;
    font-family: "quicksandbold";
  }
  .el-radio-group {
    margin: 0 0 1rem;
  }
  p.logoutLink span {
    color: #e85858;
  }
  p.logoutLink span:hover {
    text-decoration-color: #e85858;
  }
  a.registerLink span {
    color: #4CAF50;
  }
  a.registerLink span:hover {
    text-decoration-color: #4CAF50;
  }
</style>
