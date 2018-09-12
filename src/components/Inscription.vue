<template>
  <div class='inscription'>
     <router-link class="alreadyAccount" to='/home'>Mince, j'ai deja un compte</router-link>
     <!-- INSCRIPTION -->
    <main class="inscriptionPage">
      <h2> Inscription </h2>
      <div class='inscriptionContent'>
          <el-form :model="form" autocomplete="off">
            <!-- Mail -->
            <el-form-item label="E-mail*">
              <el-input label="email" placeholder="E-mail" v-model="form.email"></el-input>
            </el-form-item>
            <!-- Mot de passe -->
            <el-form-item label="Mot de passe*">
              <el-input type="password" placeholder="Mot de passe" v-model="form.password"></el-input>
            </el-form-item>
            <!-- Statut -->
            <el-form-item label="Statut*">
                <el-select v-model="form.statut" placeholder="Selectionnez votre statut">
                  <el-option label="Etudiant" value="etudiant"></el-option>
                  <el-option label="Salarié" value="salarie"></el-option>
                </el-select>
            </el-form-item>
            <!-- Identité -->
            <el-form-item label="Nom*">
                <el-input placeholder="Nom" v-model="form.name" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="Prénom*">
                <el-input placeholder="Prénom" v-model="form.prénom" style="width: 100%;"></el-input>
            </el-form-item>
            <el-button @click="signUp">S'inscrire</el-button>
          </el-form>
      </div>
    </main>
    <Menu />
  </div>
</template>

<script>
import firebase from 'firebase'
import Menu from './Menu'

export default {
  name: 'signUp',
  data: function () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    Menu
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
  div.inscription h2 {
    margin-top: 1rem;
  }
  .el-select {
    width: 100%;
  }
</style>
