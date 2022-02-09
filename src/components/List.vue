<template>
  <Item :key="item.id" v-for="item in filteredItemsList" :item="item" />
</template>

<script>
import Item from './Item.vue'
import filteredArrMixin from '../mixins/filteredArrMixin'
export default {
  components: { Item },
  name: 'List',
  mixins: [filteredArrMixin],
  props: {
    itemsList: Array,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
