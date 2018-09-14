<template>
  <main class="homeUserPage">
    <h2 class="hello">Bonjour
      <span> {{ authUser.lastname }} </span>
      <el-tooltip class="tooltipLogout" effect="dark" content="Se déconnecter" placement="bottom">
        <button class="logout" @click="logout">
          <i class="el-icon-close"></i>
        </button>
      </el-tooltip>
    </h2>
    <div class="homeUserPageContent">
      <h3> Voici les derniers cours </h3>
      <ul>
        <li v-for="(course, id) in courses" :key="id" @click="goToCourse(id)">
          <article>
            <h1> {{ course.title }} </h1>
            <p class="category"> {{ course.category }} </p>
            <p class="createdBy"> Créé par <strong>{{ course.createdBy }} </strong></p>
            <p class="createdAt"> Le {{ course.createdAt.seconds | moment('dddd Do MMMM YYYY') }} </p>
            <el-rate
              :value="course.rate"
              disabled
              :colors="['#ef5b42', '#f58827', '#ffc107']"
              >
            </el-rate>
          </article>
        </li>
      </ul>
    </div>
    <el-button type="primary" class="createCourse" icon="el-icon-circle-plus-outline"> Créer un cours </el-button>
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
      courses: []
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    goToCourse (index) {
      this.$router.push(`course/${index}`)
    }
  },
  mounted () {
    this.$notify({
      title: 'Connexion réussie',
      message: 'Bienvenue sur la page d\'accueil',
      type: 'success',
      position: 'bottom-right'
    })
  },
  firestore () {
    return {
      authUser: db.collection('users').doc(firebase.auth().currentUser.uid),
      courses: db.collection('courses')
    }
  }
}
</script>

<style scoped>
  div.homeUserPageContent {
    padding: 1rem;
  }
  div.homeUserPageContent h3 {
    font-size: 1.7rem;
    color: #f44336;
    -webkit-text-emphasis-style: circle;
    -webkit-text-emphasis-position: under;
  }
  article {
    position: relative;
  }
  article h1 {
    margin: 0;
    padding: 1rem 0 0.5rem;
    text-transform: uppercase;
    color: #2196F3;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  li:hover article h1 {
    -webkit-animation-name: hvr-wobble-to-top-right;
    animation-name: hvr-wobble-to-top-right;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
  }
  /* Transition pour le titre de chaque article */
  @keyframes hvr-wobble-to-top-right{
    16.65%{-webkit-transform:translate(6px,-6px);transform:translate(6px,-6px)}33.3%{-webkit-transform:translate(-4px,4px);transform:translate(-4px,4px)}49.95%{-webkit-transform:translate(3px,-3px);transform:translate(3px,-3px)}66.6%{-webkit-transform:translate(-1px,1px);transform:translate(-1px,1px)}83.25%{-webkit-transform:translate(.4px,-.4px);transform:translate(.4px,-.4px)}100%{-webkit-transform:translate(0,0);transform:translate(0,0)}
  }
  article p {
    margin: 0;
  }
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style: none;
    background-color: white;
    box-shadow: 1px 1px 3px 1px #312c2c1c;
    padding: 1rem;
    border-radius: 3px;
    cursor: pointer;
    min-width: 215px;
    margin: 10px;
  }
  ul li:hover{
    box-shadow: 0px 0px 5px 3px #2196f375;
  }
  p.category {
    text-transform: capitalize;
    position: absolute;
    top: -20px;
    right: -22px;
    font-size: 1rem;
    color: white;
    background-color: #009688;
    padding: 0.2rem 0.3rem;
    border-radius: 3px;
  }
  button.createCourse.el-button--primary {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    color: #fff;
    background-color: #3f75ef;
    border-color: #3f75ef;
    font-family: "quicksandregular";
  }
  @media screen and (max-width: 1000px){
    main.homeUserPage {
      margin-top: 7rem;
    }
  }
  @media screen and (max-width: 600px){
    main.homeUserPage h2:not(.el-notification__title) {
      font-size: 2.4rem;
      letter-spacing: -10.1px;
    }
  }
  @media screen and (max-width: 500px){
    main.homeUserPage button.logout {
      position: absolute;
      top: 1rem;
      left: 1rem;
      height: 2rem;
      width: 2.2rem;
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 430px){
    main.homeUserPage h2:not(.el-notification__title) {
      font-size: 2.1rem;
      letter-spacing: -9.5px;
    }
  }
</style>
