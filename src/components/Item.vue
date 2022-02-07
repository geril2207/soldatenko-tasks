<template>
  <div class="wrapp">
    <div>{{ item.id }}</div>
    <div>{{ item.title }}</div>
    <div>{{ item.price }}</div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      item: {},
    }
  },
  mounted() {
    this.item = this.$root.list.find(
      (item) => +this.$route.params.itemId === item.id
    )
  },
}
</script>

<style scoped>
.wrapp {
  margin-left: 25px;
  font-size: 24px;
}
</style>
