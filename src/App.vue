<template>
  <Menu />
  <router-view></router-view>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  name: 'App',
  components: { Menu },
  data() {
    return {
      list: [],
    }
  },
}
</script>

<style></style>
