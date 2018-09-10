<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import 'assets/fonts/fonts.css';

  body {
    font: 100%/1.2 "quicksandregular", Helvetica, Arial, sans-serif;
    margin: 0;
  }
  nav {
    background-color : #21a3e4;
    padding: 0.8rem 2rem;
  }
</style>
