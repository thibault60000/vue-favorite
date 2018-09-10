<template>
    <div class="articlesList">
        <article v-for="(article, id) in articles" :key="id">
            <h2> {{ article.title }} <span> {{ id }} </span> </h2>
            <el-card shadow="hover">
                <h3> {{ article.description }} </h3>
                <a :href=article.url> <el-button type="primary" icon="el-icon-search" circle></el-button> Voir </a>
                <p> <span>Catégorie :</span> {{ article.category }} </p>
            </el-card>
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
 div.articlesList {
    display: grid;
    grid-gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-auto-rows: minmax(100px, auto);
    grid-auto-flow: dense;
    padding: 0.5rem 1rem;
 }
 div.articlesList article {
    display: block;
 }
 div.articlesList article h2 {
     margin-bottom: 0.2rem;
 }
 h2 {
   color: #4692d6;
 }
 h3 {
    font-family: "quicksanditalic";
    margin: 0;
    font-size: 1.1rem;
    color: #e05d5d;
 }
 div.el-card__body > a {
   font-size: 1.1rem;
    text-decoration: none;
    color: #409eff;
    font-weight: bold;
    margin: 1rem 0;
    display: block;
 }
 div.el-card__body > p {
   font-family: "quicksanditalic";
 }
 div.el-card__body > p > span {
    font-weight: bold;
    font-family: "quicksandregular"
 }
</style>
