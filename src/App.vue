<template>
  <div id="app">
    <Push right>
      <router-link to='home'> <span> <font-awesome-icon icon="home" /> Accueil </span> </router-link>
      <router-link to='courses'> <span> <font-awesome-icon icon="graduation-cap" /> Cours </span> </router-link>
      <router-link to='articles'> <span> <font-awesome-icon icon="newspaper" /> Articles </span> </router-link>
      <router-link to='myaccount'> <span> <font-awesome-icon icon="user-circle" /> Mon compte </span> </router-link>
      <router-link to='signup'> <span> <font-awesome-icon icon="user-plus" /> Inscription </span> </router-link>
    </Push>
    <main id="page-wrap">
     <Top />
     <router-view/>
    </main>
  </div>
</template>

<script>
import Push from './components/Push'
import Top from './components/Top'

export default {
  name: 'App',
  components: {
    Push, Top
  }
}
</script>

<style lang="scss">
   /* Importer les fonts */
  @import './assets/fonts/fonts.css';
  @import './assets/reset.css';
  /* COULEURS CSS */
  $bleu-primaire: #2196f3;
</style>
