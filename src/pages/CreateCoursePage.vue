<template>
    <div class="createCoursePage">
        <h2> Création
          <span v-if="!!this.course.title">du</span>
          <span v-else> de </span>
          cours
          <span class="courseTitle">
            {{ this.course.title }}
          </span>
        </h2>
        <!-- Formulaire de création de cours -->
        <el-form :model="course" class="createCourseForm" autocomplete="off">
            <el-input placeholder="Titre" v-model="course.title"></el-input>
        </el-form>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      course: {
        title: ''
      }
    }
  }
}
</script>

<style>
  /* test */
</style>
