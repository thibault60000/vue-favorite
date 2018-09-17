<template>
    <div id="menu">
        <vue-3d-menu title="Menu" :items="items"></vue-3d-menu>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  /* Données */
  data () {
    let user = ''
    let items = [
      'Accueil',
      'Cours',
      'Contact',
      'Présentation',
      'Outils',
      'Favoris'
    ].map(item => ({ title: item, click: () => this.openMenu(item) }))

    return {
      items, user
    }
  },
  methods: {
    /* Changer la route en fonction de l'item du menu sur lequel on clique */
    openMenu: function (item) {
      switch (item) {
        case 'Accueil':
          /* Si utilisateur existe : la page d'accueil sera AdminPage */
          if (this.userExist) {
            this.$router.replace('landingpage')
          } else {
            this.$router.replace('home')
          }
          break
        case 'Cours':
          this.$router.replace('courses')
          break
        case 'Contact':
          this.$router.replace('contact')
          break
        case 'Présentation':
          this.$router.replace('presentation')
          break
        case 'Outils':
          this.$router.replace('tools')
          break
        case 'Favoris':
          this.$router.replace('favorites')
          break
      }
    }
  },
  computed: {
    userExist () {
      return !!this.user
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser
    }
  }
}
</script>
