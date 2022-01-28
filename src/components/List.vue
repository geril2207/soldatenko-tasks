<template>
  <Item :key="item.id" v-for="item in items" :item="item" />
</template>

<script>
import Item from './Item.vue'
export default {
  components: { Item },
  name: 'List',
  props: {
    itemsList: Array,
  },
  data() {
    return {
      items: this.itemsList,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
