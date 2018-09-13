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
  @import './assets/fonts/fonts.css';

  body {
    font: 100%/1.2 "quicksandregular", Helvetica, Arial, sans-serif;
    margin: 0;
    background-color: #F9F8F8;
  }

  /* Disable Yellow Hover Chrome */
  @-webkit-keyframes autofill {
    to {
        color: black;
        background: white;
    }
  }
  input:-webkit-autofill {
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
  }
  .el-form-item__label{
    line-height: 18px;
  }
  /* Pour le menu */
  div.menu-item {
    box-shadow: 0.4px 0.1px 2.6px 0px #d6d1d1;
  }
  div.vue-3d-menu .menu-wrap .vue-3d-menu-title {
    background: url('./assets/menuFloat.png') center no-repeat !important;
  }
  div.menu-item .menu-item-title{
    color: #3f75ef !important;
  }
  .menu-item .menu-item-title:hover{
    background-color: #7ccaffe0 !important;
  }
  main {
    padding: 1rem;
  }
  div.vue-3d-menu {
    position: fixed !important;
    top: -5.1px;
    left: 84.2%;
  }

  /* ANIMATED TEXT */
  body {
    background: #F9F8F8;
  }
  main.homePageContent,
  main.inscriptionPage {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    width: calc(100% - 2rem);
  }
  div.homePage {
    font-family: 'Raleway', sans-serif;
  }
  main.homePageContent h1 {
    font-size: 8rem;
    color: #222222;
    text-align: center;
    margin-top: 0;
    text-transform: uppercase;
    font-weight: 900;
  }
  .glitch-window {
    position: absolute;
    top: 0;
    left: -2px;
    width: 100%;
    color: #222222;
    text-shadow: 2px 0 #F9F8F8, -1px 0 yellow, -2px 0 green;
    overflow: hidden;
    animation: crt-me 2500ms infinite linear alternate-reverse;
  }

  @keyframes crt-me {
    0% {
          clip: rect(31px, 9999px, 94px, 0)
      }
      10% {
          clip: rect(112px, 9999px, 76px, 0)
      }
      20% {
          clip: rect(85px, 9999px, 77px, 0)
      }
      30% {
          clip: rect(27px, 9999px, 97px, 0)
      }
      40% {
          clip: rect(64px, 9999px, 98px, 0)
      }
      50% {
          clip: rect(61px, 9999px, 85px, 0)
      }
      60% {
          clip: rect(99px, 9999px, 114px, 0)
      }
      70% {
          clip: rect(34px, 9999px, 115px, 0)
      }
      80% {
          clip: rect(98px, 9999px, 129px, 0)
      }
      90% {
          clip: rect(43px, 9999px, 96px, 0)
      }
      100% {
          clip: rect(82px, 9999px, 64px, 0)
      }
  }

  .inspiration-button{
    font-family: Helvetica, sans-serif;
    position: fixed;
    display: inline-block;
    z-index: 100;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%, 0%);
    color: white;
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 80px;
    background: linear-gradient(270deg,#1e80dc,#c61590);
    transition: transform 250ms ease;
  }
    .inspiration-button:hover,
    .inspiration-button:focus,
    .inspiration-button:active{
      transform: translate(-50%, -10%);
  }

   /* H2 */
   h2 {
    font-family: 'CoreCircus', sans-serif;
    text-transform: uppercase;
    font-size: 3.2rem;
    text-align: center;
    line-height: 1;
    display: block;
    color: #3f75ef;
    letter-spacing: -0.8rem;
    word-spacing: 0.6rem;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white, 1px 0px 0px #98b5cc, 0px 1px 0px #98b5cc, 2px 1px 0px #98b5cc, 1px 2px 0px #98b5cc, 3px 2px 0px #98b5cc, 2px 3px 0px #98b5cc, 4px 3px 0px #98b5cc, 3px 4px 0px #98b5cc, 5px 4px 0px #98b5cc, 4px 5px 0px #98b5cc, 6px 5px 0px #98b5cc, 5px 6px 0px #98b5cc, 7px 6px 0px #98b5cc, 8px 7px 0px white, 9px 8px 0px white;
    text-align: center;
    width: 100%;
    margin-top: -4.9rem;
   }
   h2:before {
    content: attr(data-heading);
    position: absolute;
    left: 0;
    color: white;
    font-family: 'CoreCircus2DDot1';
    text-shadow: none;
    transform: translateY(-2px);
   }
  /* Login */
  div.login form,
  div.inscription form {
    width: 30rem;
    display: block;
    margin: 1rem auto;
    text-align: center;
  }
    div.login form input,
    div.inscriptionContent form input {
      margin: 0.5rem 0;
      box-shadow: 1.4px 1.4px 4px 0.9px #3f75efb3;
      background-color: white !important;
    }
    div.login form button {
      color: #fff;
      background-color: #3969d6;
      font-weight: bold;
      border: none;
      margin-top: 1rem;
      font-family: "quicksanditalic";
      font-size: 1rem;
      box-shadow: 1px 1px 1px 1px #d2c9c9;
      vertical-align: middle;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    div.homePage > a,
    div.inscription > a {
      position: absolute;
      bottom: 1.3rem;
      right: 1.3rem;
      text-decoration: underline;
      font-family: "quicksanditalic";
      color: #544e4e;
      font-weight: bold;
      font-size: 1.1rem;
    }
    div.login form button:before {
      content: "";
      position: absolute;
      z-index: -1;
      left: 51%;
      right: 51%;
      bottom: 0;
      background: black;
      height: 4px;
      -webkit-transition-property: left, right;
      transition-property: left, right;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
    }
    div.login form button.el-button:hover,
    div.login form button.el-button:focus{
      color: #fff;
      background-color: #3969d6;
    }
    div.login form button:hover:before,
     div.login form button:focus:before,
       div.login form button:active:before {
      left: 0;
      right: 0;
    }

    /* SCREEN < 1000px */
    @media screen and (max-width: 1000px) {
      div.vue-3d-menu {
        left: 80%;
      }
      main.homePageContent h1 {
        font-size: 7rem;
      }
      main.homePageContent h2 {
        font-size: 2.7rem;
      }
      div.login form,
      div.inscriptionContent form {
        width: 40%;
      }
    }
    @media screen and (max-width: 830px) {
      div.vue-3d-menu {
        left: 70%;
      }
      main.homePageContent h1 {
        font-size: 4.8rem;
        margin-bottom: 4.8rem;
      }
      main.homePageContent h2 {
        font-size: 2.4rem;
      }
      div.login form,
      div.inscriptionContent form {
        width: 40%;
      }
    }
    @media screen and (max-width: 580px) {
      div.vue-3d-menu {
        left: 57%;
      }
      main.homePageContent h1 {
        font-size: 3.7rem;
        margin-bottom: 5.6rem;
      }
      main.homePageContent h2 {
        font-size: 2rem;
        letter-spacing: 1px;
      }
      div.login form,
      div.inscriptionContent form {
        width: 60%;
      }
      div.login form input,
      div.inscriptionContent form input{
        font-size: 1rem;
      }
    }
    @media screen and (max-width: 430px) {
      div.vue-3d-menu {
        left: 50%;
      }
      main.homePageContent h1 {
        font-size: 2.5rem;
        margin-bottom: 5.6rem;
      }
      main.homePageContent h2 {
        font-size: 1.5rem;
        line-height: 2.3rem;
      }
    }

</style>
