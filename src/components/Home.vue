<template>
    <div class='Home'>
        <NavigationMenu />
        <h1>{{ msg }}</h1>
        <button v-on:click="logout">Logout</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import NavigationMenu from './NavigationMenu'

export default {
  name: 'home',
  components: {
    NavigationMenu
  },
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
