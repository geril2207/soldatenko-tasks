<template>
  <tr>
    <td>{{ item.surname }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.lastname }}</td>
    <td>{{ item.phone }}</td>
    <td>{{ item.favourites ? 'да' : 'нет' }}</td>
    <td>
      <el-button @click="favHandler(item.id)" type="primary">
        {{ item.favourites ? 'Удалить из избранного' : 'Добавить в избранное' }}
      </el-button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: Object,
  },
  methods: {
    favHandler(id) {
      return this.item.favourites
        ? this.$root.delFromFavorite(id)
        : this.$root.addToFavorite(id)
    },
    filters: {
      upperCase(str) {
        return str.toUpperCase()
      },
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  text-align: center;
}
</style>
