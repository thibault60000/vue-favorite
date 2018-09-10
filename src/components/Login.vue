<template>
  <main>
    <nav>
      <!-- Menu -->
      <div v-if="!userExist" class='login'>
        <h1> SourceDevDesign </h1>
        <el-button type="danger" @click="dialogFormVisible = true">Administrateur</el-button>
        <el-dialog title="Connexion en tant qu'Administrateur" width='30%' :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-input placeholder="E-mail" v-model="form.email"></el-input>
            <el-input type="password" placeholder="Mot de passe" v-model="form.password"></el-input>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Retour</el-button>
            <el-button @click="signIn" type="success">Se connecter</el-button>
          </span>
        </el-dialog>
      </div>
      <div v-else class="login">
        Hello {{ this.userMail }}
      </div>
    </nav>
    <CardList />
  </main>
</template>

<script>
import firebase from 'firebase'
import CardList from './CardList'

export default {
  name: 'home',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      displayName: null,
      photoURL: null,
      authUser: null,
      user: '',
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  components: {
    CardList
  },
  computed: {
    userExist () {
      return !!this.user
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
          this.$router.replace('home')
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
  h1 {
    color: #f5f5f5;
  }
  div.login > button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

</style>
