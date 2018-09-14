<template>
  <main class="homeUserPage">
    <h2>Bonjour <span> {{ authUser.lastname }} </span> <button class="logout" @click="logout"><i class="el-icon-close"></i></button></h2>
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
              :colors="['#ef5b42', '#f58827', '#e6a426']"
              >
            </el-rate>
          </article>
        </li>
      </ul>

    </div>
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
  article h1 {
    margin: 0;
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
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(6, auto);
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
  }
  ul li:hover{
    box-shadow: 0px 0px 5px 3px #2196f375;
  }
  p.category {
    text-transform: capitalize
  }
</style>
