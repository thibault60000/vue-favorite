<template>
  <div class="NavigationComponent">
    <nav>
      <!-- Menu -->
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        :collapse='true'>
      <!-- Sous Menu -->
      <el-submenu index="1">
          <!-- Template du Menu -->
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">Navigator One</span>
          </template>
          <!-- Menu Item Group -->
          <el-menu-item-group>
            <el-menu-item index="1-1">Présentation</el-menu-item>
            <el-menu-item index="1-2">Cours</el-menu-item>
            <el-menu-item index="1-3">Liens favoris</el-menu-item>
            <!-- Sous Menu -->
            <el-submenu index="1-4">
              <span slot="title">Framework JS</span>
              <el-menu-item index="1-4-1">Vue.JS</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </nav>
  </div>
</template>

<style>
  .el-menu{
    border: none;
  }
  .el-menu-vertical .el-icon-menu {
    color: white;
    font-size: 1.5rem;
  }
  .el-menu-vertical .el-menu-item-group__title {
    padding: 0 !important;
  }
  .el-dropdown-menu__item--divided:before,
  .el-menu-vertical,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background-color: initial;
  }
  .el-submenu__title:focus, .el-submenu__title:hover,
  .el-submenu__title:hover {
        background-color: #1b8fc9;
  }
  nav {
    background-color : #21a3e4;
  }
</style>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>
