<template>
  <main id="page-wrap">
    <!-- Titre de la page -->
    <h1>Bienvenue</h1>
    <!-- Bouton ouverture modale connexion -->
    <el-button type="text" @click="outerVisible = true">Se connecter</el-button>
    <!-- Modale de connexion -->
    <el-dialog title="Connexion" :visible.sync="outerVisible">
      <!-- Sous modale de mot de passe oublié -->
      <el-dialog
          width="30%"
          title="Mot de passe oublié"
          :visible.sync="innerVisible"
          append-to-body>
          <!-- Formulaire mot de passe oublié  -->
          <el-form :model="forgetForm" autocomplete="off">
            <el-input placeholder="E-mail" v-model="forgetForm.email"></el-input>
            <el-button type="warning" @click="forgetPassword">Récupérer son mot de passe</el-button>
          </el-form>
      </el-dialog>
      <!-- Formulaire d'inscription -->
      <el-form :model="connectForm" class="connexionForm" autocomplete="off">
        <el-input placeholder="E-mail" v-model="connectForm.email"></el-input>
        <el-input type="password" placeholder="Mot de passe" v-model="connectForm.password"></el-input>
        <el-button type="primary" @click="signIn">Se connecter</el-button>
        <!-- Pas encore inscrit ? -->
        <router-link to='/signup'>Je souhaite m'inscrire</router-link>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="outerVisible = false">Annuler</el-button>
        <el-button type="warning" @click="innerVisible = true">Mot de passe oublié ?</el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data () {
    return {
      connectForm: {
        email: '',
        password: ''
      },
      forgetForm: {
        email: ''
      },
      authUser: null,
      user: '',
      outerVisible: false,
      innerVisible: false
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser
      this.userMail = firebase.auth().currentUser.email
    }
  },
  methods: {
    /* Fonction de connexion au site */
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.connectForm.email, this.connectForm.password).then(
        (user) => {
          this.$router.replace({path: 'adminpage', query: {inscription: true}})
          this.outerVisible = false
          this.innerVisible = false
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    },
    /* Fonction récupération de mot de passe */
    forgetPassword: function () {
      firebase.auth().sendPasswordResetEmail(this.forgetForm.email).then(this.$router.replace('home'))
      this.forgetForm.email = ''
      this.outerVisible = false
      this.innerVisible = false
      this.$notify.info({
        title: 'Info',
        message: 'E-mail de récupération de mot de passe envoyé '
      })
    }
  }
}
</script>

<style scoped>
  /* css */
</style>
