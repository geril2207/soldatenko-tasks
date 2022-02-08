<template>
  <div>
    Фильтрация
    <el-input class="input" type="text" v-model="filterStr" />
    <el-select
      v-model="filterType"
      placeholder="Фильтровать по"
      @change="$emit('filter-type', this.filterType)"
    >
      <el-option value="Имени" :label="Имени">Имени</el-option>
      <el-option value="Фамилии" :label="Фамилии">Фамилии</el-option>
      <el-option value="Отчеству" :label="Отчеству">Отчеству</el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    filter: String,
    filterT: String,
  },
  data() {
    return {
      filterStr: this.$parent.filter.filterStr,
      filterType: this.$parent.filter.filterT,
    }
  },
  watch: {
    filterStr(newValue) {
      this.$parent.filter.filterStr = newValue
    },
    filterType(newValue) {
      this.$parent.filter.filterType = newValue
    },
  },
}
</script>

<style scoped>
div {
  max-width: 600px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.input {
  max-width: 300px;
}
</style>
