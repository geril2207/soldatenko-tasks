<template>
  <div class="wrapp">
    <router-link class="item__back" to="/catalog">Назад</router-link>
    <h3 v-if="loading">Идет загрузка</h3>
    <div v-else>
      <div>Название: {{ item.title }}</div>
      <div>Цена: {{ item.price }} &#8381;</div>
      <div class="form">
        <p class="input__wrapper">
          <el-input
            required
            v-model="item.title"
            type="text"
            placeholder="Название"
          />
        </p>
        <p class="input__wrapper">
          <el-input
            required
            v-model="item.price"
            type="text"
            placeholder="Цена"
          />
        </p>
        <el-button class="form__btn_submit" type="primary" @click="updateItem"
          >Добавить</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Item',
  data() {
    return {
      item: {},
      loading: false,
    }
  },
  methods: {
    async getItem() {
      this.loading = true
      const response = await axios.get(
        `http://localhost:3000/items/${this.$route.params.itemId}`
      )
      this.item = response.data
      this.loading = false
    },
    async updateItem() {
      this.loading = true
      const response = await axios.put(
        `http://localhost:3000/items/${this.$route.params.itemId}`,
        this.item
      )
      this.item = response.data
      this.loading = false
    },
  },
  mounted() {
    this.getItem()
  },
}
</script>

<style scoped>
.wrapp {
  margin-left: 25px;
  font-size: 24px;
}
.item__back {
  font-size: 24px;
  text-decoration: none;
}
.form {
  max-width: 300px;
}
</style>
