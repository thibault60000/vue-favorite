<template>
    <div id="menu">
        <vue-3d-menu title="Menu" :items="items"></vue-3d-menu>
    </div>
</template>

<script>
export default {
  data () {
    let items = [
      'Accueil',
      'Cours',
      'Contact',
      'Présentation',
      'Outils',
      'Favoris'
    ].map(item => ({ title: item, click: () => this.openMenu(item) }))

    return {
      items
    }
  },
  methods: {
    openMenu: function (item) {
      switch (item) {
        case 'Accueil':
          this.$router.replace('home')
          break
        case 'Cours':
          this.$router.replace('cours')
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
  }
}
</script>

<style scoped>
  /* css */
</style>
