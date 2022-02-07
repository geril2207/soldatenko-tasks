<template>
  <div class="wrapper">
    Сортировка
    <el-select
      @change="$emit('filter-arr', this.sortStr)"
      v-model="sortStr"
      placeholder="Сортировать по"
    >
      <el-option value="Имени" :label="Имени">Имени</el-option>
      <el-option value="Фамилии" :label="Фамилии">Фамилии</el-option>
      <el-option value="Отчеству" :label="Отчеству">Отчеству</el-option>
    </el-select>
  </div>
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

<style scoped>
.wrapper {
  text-align: center;
  padding: 15px;
}
</style>
