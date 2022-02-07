<template>
  <div class="item_wrapper">
    {{ itemData.id }}
    {{ itemData.title }}
    {{ itemData.price }}
    <el-button
      class="item__btn"
      type="primary"
      @click="$router.push(`/item/${itemData.id}`)"
      >К описанию</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'CatalogItem',
  props: {
    itemData: Object,
  },
}
</script>

<style scoped>
.item_wrapper {
  margin-left: 40px;
  width: 500px;
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
