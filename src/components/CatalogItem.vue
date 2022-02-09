<template>
  <div class="item_wrapper">
    {{ index + 1 }}.
    {{ itemData.title }}
    {{ itemData.price }} &#8381;
    <div>
      <el-button
        class="item__btn"
        type="primary"
        @click="$router.push(`/item/${itemData.id}`)"
        >Редактировать</el-button
      >
      <el-button class="item__btn" type="danger" @click="deleteItem"
        >Удалить</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CatalogItem',
  props: {
    itemData: Object,
    index: Number,
  },

  methods: {
    async deleteItem() {
      await axios.delete(`http://localhost:3000/items/${this.itemData.id}`)
      await this.$parent.fetchItems()
    },
  },
}
</script>

<style scoped>
.item_wrapper {
  margin-left: 40px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  margin: 5px 0;
}
.item__btn {
  color: white;
  text-decoration: none;
}
</style>
