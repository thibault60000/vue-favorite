<template>
  <div id="app">
    <!-- Mettre le code pour le menu burger ici -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
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
    background-color: #F9F8F8;
  }
  /* Déactiver le focus jaune sur les inputs autocomplete du navigateur */
  @keyframes autofill{to{color:#000;background:#fff}}input:-webkit-autofill{animation-name:autofill;animation-fill-mode:both}
</style>
