<template>
    <section>
        <h1> Bienvenue sur ton compte <strong> {{ authUser.lastname }} </strong> </h1>
        <!-- FORMULAIRE AVEC DATA DISABLED -->
        <el-form>
            <img ref="profilPhoto" />
            <!-- EMAIL -->
            <el-form-item label="Email actuel">
                <el-input
                    :placeholder="authUser.email"
                    :disabled="true">
                </el-input>
                <el-button @click="emailDialogEditVisible = true" type="primary" icon="el-icon-edit">Modifier l'email</el-button>
                <el-dialog title="Modification d'email" :visible.sync="emailDialogEditVisible">
                    <el-form :model="form">
                        <el-form-item label="Nouvel email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="emailDialogEditVisible = false">Annuler</el-button>
                        <el-button :disabled="!emailIsNull" type="primary" @click="editEmail">Confirmer</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <!-- PRENOM -->
            <el-form-item label="Nom actuel">
                <el-input
                    :placeholder="authUser.name"
                    :disabled="true">
                </el-input>
                <el-button @click="nameDialogEditVisible = true" type="primary" icon="el-icon-edit">Modifier le nom</el-button>
                <el-dialog title="Modification du Nom" :visible.sync="nameDialogEditVisible">
                    <el-form :model="form">
                        <el-form-item label="Nouveau Nom">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="nameDialogEditVisible = false">Annuler</el-button>
                        <el-button :disabled="!nameIsNull" type="primary" @click="editNom">Confirmer</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <!-- NOM -->
            <el-form-item label="Prénom actuel">
                <el-input
                    :placeholder="authUser.lastname"
                    :disabled="true">
                </el-input>
                <el-button @click="lastnameDialogEditVisible = true" type="primary" icon="el-icon-edit">Modifier le prénom</el-button>
                <el-dialog title="Modification du Prénom" :visible.sync="lastnameDialogEditVisible">
                    <el-form :model="form">
                        <el-form-item label="Nouveau Prénom">
                            <el-input v-model="form.lastname"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="lastnameDialogEditVisible = false">Annuler</el-button>
                        <el-button :disabled="!lastnameIsNull" type="primary" @click="editPrenom">Confirmer</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
import firebase from 'firebase'
import { db, st } from '../main'

export default {
  data () {
    return {
      authUser: '',
      emailDialogEditVisible: false,
      nameDialogEditVisible: false,
      lastnameDialogEditVisible: false,
      form: {
        email: '',
        name: '',
        lastname: ''
      }
    }
  },
  computed: {
    emailIsNull () {
      return !!this.form.email
    },
    nameIsNull () {
      return !!this.form.name
    },
    lastnameIsNull () {
      return !!this.form.lastname
    },
    birthdayDate () {
      console.log(this.authUser.birthday.seconds)
      return this.authUser.birthday.seconds
    }
  },
  methods: {
    /* MODIFICATION MAIL */
    editEmail () {
      this.emailDialogEditVisible = false
      /* Change l'adresse mail du compte */
      firebase.auth().currentUser.updateEmail(this.form.email).then(() => {
        /* En cas de succès de changement d'adresse mail, On modifie la variable mail de l'objet User actuel */
        db.collection('users').doc(firebase.auth().currentUser.uid).set({
          email: this.form.email
        }, { merge: true })
          .then(() => {
            this.$notify({
              title: 'Succès',
              message: 'Adresse mail modifiée',
              type: 'success'
            })
            this.form.email = ''
          })
          .catch((error) => {
            this.$notify.error({
              title: 'Erreur',
              message: error
            })
            console.log('erreur', error)
          })
      }).catch((error) => {
        this.$notify.error({
          title: 'Erreur',
          message: error
        })
        console.log('erreur', error)
      })
    },
    /* MODIFICATION DU NOM */
    editNom () {
      this.nameDialogEditVisible = false
      /* Change le nom du compte */
      db.collection('users').doc(firebase.auth().currentUser.uid).set({
        name: this.form.name
      }, { merge: true })
        .then(() => {
          this.$notify({
            title: 'Succès',
            message: 'Le nom est modifié',
            type: 'success'
          })
          this.form.name = ''
        })
        .catch((error) => {
          this.$notify.error({
            title: 'Erreur',
            message: error
          })
          console.log('erreur', error)
        })
    },
    editPrenom () {
      this.lastnameDialogEditVisible = false
      /* Change le nom du compte */
      db.collection('users').doc(firebase.auth().currentUser.uid).set({
        lastname: this.form.lastname
      }, { merge: true })
        .then(() => {
          this.$notify({
            title: 'Succès',
            message: 'Le prénom est modifié',
            type: 'success'
          })
          this.form.lastname = ''
        })
        .catch((error) => {
          this.$notify.error({
            title: 'Erreur',
            message: error
          })
          console.log('erreur', error)
        })
    }
  },
  firestore () {
    return {
      authUser: db.collection('users').doc(firebase.auth().currentUser.uid)
    }
  },
  created () {
    st.child('images/f4UkBMC3zHMOs66FyMRFwbXmw0p1/photo de profil').getDownloadURL().then((url) => {
      this.$refs.profilPhoto.src = url
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>
