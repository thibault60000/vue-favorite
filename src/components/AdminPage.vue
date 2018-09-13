<template>
  <main class="homeUserPage">
    <h2>Bonjour <span> {{ authUser.lastname }} </span> <button class="logout" @click="logout"><i class="el-icon-close"></i></button></h2>
  </main>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'adminPage',
  data () {
    return {
      authUser: '',
      articles: []
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  firestore () {
    return {
      authUser: db.collection('users').doc(firebase.auth().currentUser.uid),
      articles: db.collection('articles')
    }
  }
}
</script>

<style scoped>
  /* css */
</style>
