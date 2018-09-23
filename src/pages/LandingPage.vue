<template>
  <section>
    <!-- Titre de la page -->
    <h2>Bonjour
      <span> {{ authUser.lastname }} </span>
    </h2>
    <!-- Les derniers cours -->
    <div class="lastCourses">
      <h3> Voici les derniers cours </h3>
      <ul class="lastCoursesList">
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
    <!-- Les derniers articles -->
    <div class="lastArticles">
      <h3> Voici les derniers articles </h3>
      <ul class="lastArticlesList">
        <li v-for="(article, id) in articles" :key="id">
          <article>
            <h1> {{ article.title }} </h1>
            <p class="category"> {{ article.category }} </p>
          </article>
        </li>
      </ul>
    </div>
    <div class="createList">
      <ul>
        <li><router-link class="createCourse" to="/createcourse"> <i class="el-icon-circle-plus-outline" /> Créer un cours </router-link></li>
        <li><router-link class="createArticle" to="/createarticle"> <i class="el-icon-circle-plus-outline" /> Créer un article </router-link></li>
      </ul>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'adminPage',
  data () {
    return {
      authUser: '',
      courses: [],
      articles: []
    }
  },
  methods: {
    goToCourse (index) {
      this.$router.push(`course/${index}`)
    }
  },
  firestore () {
    return {
      authUser: db.collection('users').doc(firebase.auth().currentUser.uid),
      courses: db.collection('courses').orderBy('createdAt').limit(5),
      articles: db.collection('articles').limit(3)
    }
  }
}
</script>

<style scoped>
  h3 {
    margin: 1rem 0;
    color: #3a8ee6;
    font-size: 1.2rem;
  }
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .lastArticlesList li,
  .lastCoursesList li {
    background-color: #332e2e;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 4px 4px 6px 1px #b7b0b0;
    margin: 0 1rem 1rem 0;
    max-width: calc(25% + 2rem);
  }
  .createList {
    position: absolute;
    bottom: 1.5rem;
    right: 0.5rem;
  }
    .createList li {
      display: inline-block;
      margin: 0 0.5rem;
    }
      .createList li a {
        text-decoration: none;
        padding: 0.5rem;
        border-radius: 5px;
        border-radius: 5px;
        color: #ffffff;
        box-shadow: 2px 2px 5px 1px #675b5bad;
      }
        .createList li a.createCourse {
          background-color: #F44336;
        }
        .createList li a.createArticle {
          background-color: #4CAF50;
        }
</style>
