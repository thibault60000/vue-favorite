<template>
  <section class='signUpPage'>
    <h2> Inscription </h2>
    <el-form :model="form" class="inscriptionForm" autocomplete="off">
      <p> Attention le choix de <strong> Statut </strong> impactera votre expérience sur le site </p>
      <br>
      <!-- IMAGE DE PROFIL -->
      <p>Image de profil (non obligatoire)</p>
      <div class="file-upload-form">
          <el-button type="primary"> Ajouter une image </el-button>
          <input type="file" @change="previewImage" accept="image/*">
      </div>
      <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData">
      </div>
      <!-- Statut -->
      <el-form-item label="Statut*">
        <el-radio v-model="form.statut" label="Autre" border>Utilisateur Standard</el-radio>
        <el-radio v-model="form.statut" label="Etudiant" border>Etudiant</el-radio>
        <el-radio v-model="form.statut" label="Professeur" border>Professeur</el-radio>
      </el-form-item>
      <!-- Mail -->
      <el-form-item label="E-mail*">
        <el-input label="email" placeholder="E-mail" v-model="form.email"></el-input>
      </el-form-item>
      <!-- Etablissement -->
      <el-form-item v-if="statutOfUser == 'Etudiant' || statutOfUser == 'Professeur' " label="Etablissement*">
        <el-input label="etablissement" placeholder="Nom de l'école / collège / lycée / université ..." v-model="form.etablissement"></el-input>
      </el-form-item>
      <!-- Niveau scolaire -->
      <el-form-item v-if="statutOfUser == 'Etudiant'" label="Niveau scolaire*">
        <el-cascader
            v-model="form.niveauScolaire"
            :options="optionsSchoolLevel"
            :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <!-- Mot de passe -->
      <el-form-item label="Mot de passe*">
        <el-input type="password" placeholder="Mot de passe" v-model="form.password"></el-input>
      </el-form-item>
      <!-- Nom -->
      <el-form-item label="Nom*">
          <el-input placeholder="Nom" v-model="form.name"></el-input>
      </el-form-item>
      <!-- Prenom -->
      <el-form-item label="Prénom*">
          <el-input placeholder="Prénom" v-model="form.lastname"></el-input>
      </el-form-item>
      <!-- Date de naissance -->
      <el-form-item label="Date de naissance*">
          <el-date-picker type="date" placeholder="Selectionnez une date" v-model="form.birthday"></el-date-picker>
      </el-form-item>
      <!-- Bouton validation -->
      <el-button v-if="this.form.statut === 'Etudiant'" :disabled="studentFormComplete" class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
      <el-button v-if="this.form.statut === 'Professeur'" :disabled="professeurFormComplete" class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
      <el-button v-if="this.form.statut === 'Autre'" :disabled="autreFormComplete" class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
      <!-- Lien d'inscription -->
      <router-link to='/home'>Mince, j'ai deja un compte</router-link>
    </el-form>
  </section>
</template>

<script>
import firebase from 'firebase'
import { db, st } from '../main'

export default {
  name: 'signUp',
  data: function () {
    return {
      imageData: '',
      avatarImg: '',
      form: {
        email: '',
        password: '',
        statut: '',
        etablissement: 'non specifié',
        niveauScolaire: [],
        name: '',
        lastname: '',
        birthday: ''
      },
      optionsSchoolLevel: [{
        value: 'college',
        label: 'College',
        children: [{
          value: '6eme',
          label: '6ème'
        }, {
          value: '4eme',
          label: '4ème'
        }]
      },
      {
        value: 'lycee',
        label: 'Lycée',
        children: [{
          value: 'premiere',
          label: 'Première'
        }, {
          value: 'terminale',
          label: 'Terminale'
        }]
      },
      {
        value: 'université',
        label: 'Université',
        children: [{
          value: 'licence',
          label: 'Licence',
          children: [{
            value: 'histoire',
            label: 'Histoire'
          }, {
            value: 'physique',
            label: 'Physique'
          }]
        },
        {
          value: 'master',
          label: 'Master',
          children: [{
            value: 'miage',
            label: 'MIAGE'
          }]
        }]
      }]
    }
  },
  computed: {
    statutOfUser () {
      return this.form.statut
    },
    studentFormComplete () {
      return !this.form.email || !this.form.password || !this.form.name || !this.form.lastname || !this.form.birthday || !this.avatarImg || !this.form.etablissement || !this.form.niveauScolaire
    },
    professeurFormComplete () {
      return !this.form.email || !this.form.password || !this.form.name || !this.form.lastname || !this.form.birthday || !this.avatarImg || !this.form.etablissement
    },
    autreFormComplete () {
      return !this.form.email || !this.form.password || !this.form.name || !this.form.lastname || !this.form.birthday || !this.avatarImg
    }
  },
  created () {
    this.form.statut = 'Autre'
  },
  methods: {
    previewImage: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        this.avatarImg = input.files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    signUp: function () {
      /* SI L'UTILISATEUR EST UN ETUDIANT */
      if (this.statutOfUser === 'Etudiant') {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(
            object => {
              db.collection('users').doc(object.user.uid).set({
                id: object.user.uid,
                email: this.form.email,
                statut: this.form.statut,
                etablissment: this.form.etablissement,
                niveauScolaire: this.form.niveauScolaire,
                name: this.form.name,
                lastname: this.form.lastname,
                birthday: this.form.birthday
              }).then(() => {
                var storageImageRef = st.child('images/' + object.user.uid + '/photo de profil')
                storageImageRef.put(this.avatarImg)
              }).catch(function (error) {
                console.error('Erreur pendant la création : ', error)
              })
              this.$router.replace('landingpage')
            },
            err => {
              alert('Oops. ' + err.message)
            }
          )
        /* SI L'UTILISATEUR EST UN PROFESSEUR */
      } else if (this.statutOfUser === 'Professeur') {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(
            object => {
              db.collection('users').doc(object.user.uid).set({
                id: object.user.uid,
                email: this.form.email,
                statut: this.form.statut,
                etablissment: this.form.etablissment,
                name: this.form.name,
                lastname: this.form.lastname,
                birthday: this.form.birthday
              }).then(() => {
                var storageImageRef = st.child('images/' + object.user.uid + '/photo de profil')
                storageImageRef.put(this.avatarImg)
              }).catch(function (error) {
                console.error('Erreur pendant la création : ', error)
              })
              this.$router.replace('landingpage')
            },
            err => {
              alert('Oops. ' + err.message)
            }
          )
        /* SI L'UTILISATEUR N'EST NI UN PROFESSEUR NI UN ETUDIANT */
      } else if (this.statutOfUser === 'Autre') {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(
            object => {
              db.collection('users').doc(object.user.uid).set({
                id: object.user.uid,
                email: this.form.email,
                statut: this.form.statut,
                name: this.form.name,
                lastname: this.form.lastname,
                birthday: this.form.birthday
              }).then(() => {
                var storageImageRef = st.child('images/' + object.user.uid + '/photo de profil')
                storageImageRef.put(this.avatarImg)
              }).catch(function (error) {
                console.error('Erreur pendant la création : ', error)
              })
              this.$router.replace('landingpage')
            },
            err => {
              alert('Oops. ' + err.message)
            }
          )
      }
    }
  }
}
</script>

<style>
  img.preview {
      width: 200px;
      background-color: white;
      border: 1px solid #DDD;
      padding: 5px;
  }
  .file-upload-form {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
    .file-upload-form input[type=file] {
      font-size: 100px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
</style>
