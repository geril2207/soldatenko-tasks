<template>
  <tr>
    <td>{{ item.surname }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.lastname }}</td>
    <td>{{ item.phone }}</td>
    <td>{{ item.favourites ? 'да' : 'нет' }}</td>
    <td>
      <button @click="favHandler(item.id)">
        {{ item.favourites ? 'Удалить из избранного' : 'Добавить в избранное' }}
      </button>
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
