<template>
  <section class='signUpPage'>
    <h2> Inscription </h2>
    <el-form :model="form" class="inscriptionForm" autocomplete="off">
      <!-- IMAGE DE PROFIL -->
      <el-form-item label="Image de profil*">
        <!-- Choix entre vraie photo de profil ou avatar  -->
        <el-switch
          @change="needPhotoChange"
          class="switchImageChoose"
          style="display: block"
          v-model="needImage"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="Photo"
          inactive-text="Avatar">
        </el-switch>
        <!-- Choix du genre de l'avatar si pas de vraie photo de profil -->
        <el-radio-group v-if="!needImage" @change="onChangeGender" v-model="avatarGender">
          <el-radio-button label="Masculin"></el-radio-button>
          <el-radio-button label="Féminin"></el-radio-button>
        </el-radio-group>
        <!-- Vraie image de profil -->
        <div v-if="needImage" class="file-upload-form">
            <el-button type="primary"> Ajouter une image </el-button>
            <input type="file" @change="previewImage" accept="image/*">
        </div>
        <div class="image-preview" v-if="imageData.length > 0">
            <img class="preview" :src="imageData">
        </div>
      </el-form-item>
      <!-- Statut -->
      <el-form-item class="statutFormItem" label="Vous êtes un :">
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
        <el-input label="etablissement" placeholder="Etablissement scolaire" v-model="form.etablissement"></el-input>
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
      <el-form-item class="validationBtn">
        <el-button v-if="this.form.statut === 'Etudiant'" :disabled="studentFormComplete" class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
        <el-button v-if="this.form.statut === 'Professeur'" :disabled="professeurFormComplete" class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
        <el-button v-if="this.form.statut === 'Autre'" :disabled="autreFormComplete" class="btnConfirmForm" @click="signUp">S'inscrire</el-button>
      </el-form-item>
      <!-- Lien d'inscription -->
    </el-form>
    <router-link class="noAccountLink" to='/home'>  Oooups <font-awesome-icon icon="grin-beam-sweat" /> J'ai deja un compte !</router-link>
  </section>
</template>

<script>
import firebase from 'firebase'
import { db, st } from '../main'
import avatarH from '@/assets/avatarhomme.png'
import avatarF from '@/assets/avatarfemme.png'

export default {
  name: 'signUp',
  data: function () {
    return {
      imageData: '',
      avatarImg: '',
      needImage: true,
      avatarGender: '',
      form: {
        email: '',
        password: '',
        statut: '',
        etablissement: '',
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
    },
    avatarGenderChange () {
      return this.avatarGender
    }
  },
  created () {
    this.form.statut = 'Autre'
    this.avatarGender = 'Masculin'
  },
  methods: {
    /* FONCTION LORSQUE L'ON CHANGE LE GENRE DE L'AVATAR */
    onChangeGender () {
      if (this.avatarGender === 'Masculin') {
        this.avatarImg = avatarH
      } else if (this.avatarGender === 'Féminin') {
        this.avatarImg = avatarF
      }
      this.imageData = this.avatarImg
    },
    /* FONCTION LORSQUE L'ON PASSE DE PHOTO DE PROFIL A PHOTO D'AVATAR */
    needPhotoChange () {
      if (this.needImage === false) {
        this.avatarImg = avatarH
        this.imageData = this.avatarImg
      } else {
        this.imageData = ''
      }
    },
    /* FONCTION D'APERCU DE L'IMAGE DE PROFIL */
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
    /* FONCTION D'INSCRIPTION AU SITE */
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
                if (!this.needImage) {
                  db.collection('users').doc(object.user.uid).set({
                    avatar: true,
                    gender: this.avatarGender
                  }, { merge: true })
                } else {
                  var storageImageRef = st.child('images/' + object.user.uid + '/photo de profil')
                  storageImageRef.put(this.avatarImg)
                }
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
                if (!this.needImage) {
                  db.collection('users').doc(object.user.uid).set({
                    avatar: true,
                    gender: this.avatarGender
                  }, { merge: true })
                } else {
                  var storageImageRef = st.child('images/' + object.user.uid + '/photo de profil')
                  storageImageRef.put(this.avatarImg)
                }
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
                if (!this.needImage) {
                  db.collection('users').doc(object.user.uid).set({
                    avatar: true,
                    gender: this.avatarGender
                  }, { merge: true })
                } else {
                  var storageImageRef = st.child('images/' + object.user.uid + '/photo de profil')
                  storageImageRef.put(this.avatarImg)
                }
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
    width: 130px;
    background-color: white;
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
  /* COULEUR DU SWITCH */
  .el-switch__label.is-active.el-switch__label--left {
    color: #ff4949;
  }
    .el-switch__label.is-active.el-switch__label--right {
    color: #13ce66;
  }
  .el-switch.switchImageChoose {
    display: block;
    margin: 0.2rem 0 1.2rem;
  }
  a.noAccountLink {
    display: block;
    margin-top: 1rem;
    font-family: "quicksandbold";
    color: #463e3e;
    font-size: 0.9rem;
  }
  /* TYPE D'UTILISATEUR */
  .el-radio.is-bordered {
    display: block;
    margin-bottom: 0.5rem;
  }
  .el-radio.is-bordered+.el-radio.is-bordered {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-form-item .el-cascader {
    width: 100%;
  }
  @media screen and (min-width: 500px) {
    .el-form-item .el-form-item__content {
      max-width: 420px;
    }
  }
  @media screen and (min-width: 800px) {
    .el-form.inscriptionForm {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
    }
      .el-form.inscriptionForm .el-form-item {
        min-width: calc(50% - 2rem);
        margin: 1rem;
      }
      .el-form.inscriptionForm .el-form-item:first-of-type,
      .el-form.inscriptionForm .el-form-item.statutFormItem {
        min-width:100%;
        margin: 0 0 1rem 0.8rem;
      }
      .statutFormItem .el-form-item__content {
        max-width: 100%;
      }
      .statutFormItem .el-radio.is-bordered {
        display: inline-block;
        min-width: 200px;
      }
      .el-form-item.validationBtn .el-button {
        display: inline-block;
        margin-top: 2.5rem;
      }
      a.noAccountLink {
        margin: 1.5rem 0 1rem 1rem;
        font-size: 1rem;
      }
  }
  @media screen and (min-width: 1400px) {
    .el-form.inscriptionForm .el-form-item {
      min-width: calc(25% - 2rem);
    }
  }
</style>
