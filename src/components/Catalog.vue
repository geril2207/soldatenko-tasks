<template>
  <div class="catalog__wrapper">
    <h3>Каталог сайта</h3>
    <Form @addItem="addItem" />
    <div>
      <h3 v-if="loading">Идет загрузка...</h3>
      <CatalogItem
        v-else
        v-for="(item, index) of list"
        :key="item.id"
        :index="index"
        :itemData="item"
      />
    </div>
  </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue'
import Form from './Form.vue'
import axios from 'axios'
export default {
  name: 'Catalog',
  components: { CatalogItem, Form },
  data() {
    return {
      list: this.$root.list,
      loading: false,
    }
  },
  methods: {
    async fetchItems() {
      this.loading = true
      // setTimeout(async () => {
      //   const response = await axios.get('http://localhost:3000/items')
      //   this.list = response.data
      //   this.loading = false
      //   this.$root.list = this.list
      // }, 3000)
      const response = await axios.get('http://localhost:3000/items')
      this.list = response.data
      this.loading = false
      this.$root.list = this.list
    },
    async addItem(item) {
      try {
        await axios.post('http://localhost:3000/items', item)
        this.fetchItems()
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted() {
    this.fetchItems()
  },
}
</script>

<style scoped>
.catalog__wrapper {
  max-width: 800px;
  margin: 0 auto;
}
</style>
