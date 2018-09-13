<template>
    <div class="articlesList">
        <article v-for="(article, id) in articles" :key="id">
            <h3> <a :href=article.url> {{ article.title }} </a> </h3>
            <p> {{ article.description }} </p>
            <p class="etiquette"> {{ article.category }} </p>
        </article>
    </div>
</template>

<script>
import { db } from '../main'

export default {
  name: 'CardList',
  data () {
    return {
      articles: []
    }
  },
  firestore () {
    return {
      articles: db.collection('articles').orderBy('createdAt')
    }
  }
}
</script>

<style scoped>
  /* css */
</style>
