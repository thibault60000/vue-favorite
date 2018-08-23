<template>
    <div class='Home'>
        <h1>{{ msg }}</h1>
        <button v-on:click="logout">Logout</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Bienvenue'
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style scoped>
    /* CSS */
</style>
