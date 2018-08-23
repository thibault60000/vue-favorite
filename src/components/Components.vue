<template>
  <el-row>
    <el-col :span="24">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-col>

    <el-col :span="24">
      <span class="demonstration">Selection de couleur avec valeur par defaut</span>
      <el-color-picker v-model="color1"></el-color-picker>
    </el-col>

    <el-col :span="24">
      <span class="demonstration">Selection de couleur sans valeur par defaut</span>
      <el-color-picker v-model="color2"></el-color-picker>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      color1: '#409EFF',
      color2: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
