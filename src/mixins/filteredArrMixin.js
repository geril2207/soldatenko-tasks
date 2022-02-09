export default {
  props: {
    itemsList: Array,
    filter: String,
  },

  computed: {
    filteredItemsList() {
      if (this.filter === '') {
        return this.itemsList
      }
      const type = this.$parent.sortValues[this.$parent.filter.filterType]
      if (!type) return this.itemsList
      return this.itemsList.filter((item) =>
        item[type].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          ? true
          : false
      )
    },
  },
}
