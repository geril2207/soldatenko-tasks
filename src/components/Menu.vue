<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"
      ><router-link to="/">Main</router-link></el-menu-item
    >

    <el-menu-item index="2"
      ><router-link to="/catalog">Catalog</router-link></el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style scoped>
.el-menu-demo {
  margin-bottom: 50px;
}
</style>
