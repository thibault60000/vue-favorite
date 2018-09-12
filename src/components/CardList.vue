<template>
    <div class="articlesList">
        <article v-for="(article, id) in articles" :key="id">
            <h2> <a :href=article.url> {{ article.title }} </a> </h2>
            <h3> {{ article.description }} </h3>
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
