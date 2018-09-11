<template>
    <el-form class="createForm" ref="form" :model="form" >
        <el-form-item label="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="description">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="url">
            <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="category">
            <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addFavory" >Créer</el-button>
    </el-form>
</template>

<script>
import { db } from '../main'

export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        url: '',
        category: ''
      }
    }
  },
  methods: {
    addFavory (event) {
      db.collection('articles').add({
        title: this.form.title,
        description: this.form.description,
        category: this.form.category,
        url: this.form.url,
        createdAt: Date.now()
      }).then(function (docRef) {
        console.log('Nouvel objet créé, ID : ', docRef.id)
      }).catch(function (error) {
        console.error('Erreur pendant la création : ', error)
      })
      this.form.title = this.form.description = this.form.category = this.form.url = ''
    }
  }
}
</script>

<style>
    form.createForm {
        max-width: 400px;
        margin: 0.5rem 2rem;
        display: block;
    }
</style>
