<template>
  Сортировка
  <select
    @change="$emit('filter-arr', this.sortStr)"
    v-model="sortStr"
    size="1"
  >
    <option disabled>Отсортировать по</option>
    <option value="name">Имени</option>
    <option value="surname">Фамилии</option>
    <option value="lastname">Отчеству</option>
  </select>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    sort: String,
  },
  data() {
    return {
      sortStr: this.sort,
    }
  },
}
</script>

<style></style>
