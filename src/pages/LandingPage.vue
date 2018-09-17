<template>
  <main class="homeUserPage">
    <h2 class="hello">Bonjour
      <span> {{ authUser.lastname }} </span>
      <el-tooltip class="tooltipLogout" effect="dark" content="Se déconnecter" placement="bottom">
        <button class="logout" @click="logout">
          <i class="el-icon-close"></i> Se déconnecter
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
    <router-link class="createCourse" to="/createcourse"> <i class="el-icon-circle-plus-outline" /> Créer un cours </router-link>
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
    console.log(this.$route.query.inscription)
    if (this.$route.query.inscription) {
      this.$notify({
        title: 'Connexion réussie',
        message: 'Bienvenue sur la page d\'accueil',
        type: 'success',
        position: 'bottom-right'
      })
    }
  },
  firestore () {
    return {
      authUser: db.collection('users').doc(firebase.auth().currentUser.uid),
      courses: db.collection('courses').orderBy('createdAt')
    }
  }
}
</script>

<style scoped>
  /* CSS */
</style>
