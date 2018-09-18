<template>
  <div id="app">
    <Push right>
      <router-link to='home'> <span> Accueil </span> </router-link>
      <router-link to='courses'> <span> Cours </span> </router-link>
      <router-link to='articles'> <span> Articles </span> </router-link>
    </Push>
    <router-view/>
  </div>
</template>

<script>
import Push from './components/Push'

export default {
  name: 'App',
  components: {
    Push
  }
}
</script>

<style>
   /* Importer les fonts */
  @import './assets/fonts/fonts.css';
  /* RESET CSS PAR DEFAULT */
  html {
    display: block;
    width: 100%;
    height: 100%;
  }
  #app {
    height: 100%;
    width: 100%;
    display: block;
  }
  body {
    font: 100%/1.2 "quicksandregular", Helvetica, Arial, sans-serif;
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: #F9F8F8;
  }
  /* Déactiver le focus jaune sur les inputs autocomplete du navigateur */
  @keyframes autofill{to{color:#000;background:#fff}}input:-webkit-autofill{animation-name:autofill;animation-fill-mode:both}
</style>
