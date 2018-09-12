<template>
  <main>
    <nav>
      <div v-if="!userExist" class='login'>
        <h1> SourceDevDesign </h1>
      </div>
      <div v-else class="login">
        <h1>Bonjour <span> {{ this.userMail }} </span></h1>
        <el-button v-on:click="logout" type="danger">Se déconnecter</el-button>
      </div>
    </nav>
    <CreateFavorite />
    <CardList />
  </main>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
import CardList from './CardList'
import CreateFavorite from './CreateFavorite'

export default {
  name: 'adminPage',
  data () {
    return {
      user: '',
      userMail: '',
      users: []
    }
  },
  components: {
    CardList, CreateFavorite
  },
  computed: {
    userExist () {
      return !!this.user
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('createdAt')
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  created () {
    this.user = firebase.auth().currentUser
    this.userMail = firebase.auth().currentUser.email
  }
}
</script>

<style scoped>
  /* css */
</style>
