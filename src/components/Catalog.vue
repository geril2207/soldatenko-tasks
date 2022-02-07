<template>
  <div>
    <h3>Каталог сайта</h3>
    <div>
      <CatalogItem v-for="item of list" :key="item.id" :itemData="item" />
    </div>
  </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue'
export default {
  name: 'Catalog',
  components: { CatalogItem },
  data() {
    return {
      list: this.$root.list,
    }
  },
}
</script>

<style scoped>
h3 {
  margin-left: 25px;
}
</style>
