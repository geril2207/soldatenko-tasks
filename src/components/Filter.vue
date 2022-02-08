<template>
  <div>
    <el-input class="" type="text" v-model="filterStr" />
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    filter: String,
  },
  data() {
    return {
      filterStr: this.filter,
    }
  },
}
</script>

<style></style>
