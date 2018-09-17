<template>
  <main class='inscriptionPage'>
    <h2> Inscription </h2>
    <el-form :model="form" class="inscriptionForm" autocomplete="off">
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
            <el-option label="Association" value="association"></el-option>
            <el-option label="Etudiant" value="etudiant"></el-option>
            <el-option label="Retraité" value="retraite"></el-option>
            <el-option label="Salarié" value="salarie"></el-option>
            <el-option label="Sans emploi" value="sansemploi"></el-option>
          </el-select>
      </el-form-item>
      <!-- Identité -->
      <el-form-item label="Identité*">
          <el-input placeholder="Nom" v-model="form.name" style="width: 100%;"></el-input>
          <el-input placeholder="Prénom" v-model="form.lastname" style="width: 100%;"></el-input>
      </el-form-item>
      <el-form-item label="Date de naissance*">
          <el-date-picker type="date" placeholder="Selectionnez une date" v-model="form.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-button class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
      <router-link to='/home'>Mince, j'ai deja un compte</router-link>
    </el-form>
  </main>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'signUp',
  data: function () {
    return {
      form: {
        email: '',
        password: '',
        statut: '',
        name: '',
        lastname: '',
        birthday: ''
      }
    }
  },
  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          object => {
            console.log(object)
            db.collection('users').doc(object.user.uid).set({
              id: object.user.uid,
              email: this.form.email,
              statut: this.form.statut,
              name: this.form.name,
              lastname: this.form.lastname,
              birthday: this.form.birthday
            }).then(function (docRef) {
              console.log('Nouvel utilisateur créé, ID : ', docRef.id)
            }).catch(function (error) {
              console.error('Erreur pendant la création : ', error)
            })
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
  /* css */
</style>
