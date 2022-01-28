<template>
  <Form :formData="formData" :handler="addPos" @add-item="addPos" />
  <Sort :sort="sort" @filter-arr="filter" />
  <table>
    <thead>
      <tr>
        <td>Фамилия</td>
        <td>Имя</td>
        <td>Отчество</td>
        <td>Телефон</td>
        <td>Избранное</td>
      </tr>
    </thead>
    <tbody>
      <List :itemsList="favouritesList" />
      <List :itemsList="list" />
    </tbody>
  </table>
</template>

<script>
import Form from './components/Form.vue'
import Sort from './components/Sort.vue'
import List from './components/List.vue'

export default {
  components: { Form, Sort, List },
  name: 'App',
  data() {
    return {
      formData: {
        name: '',
        surname: '',
        lastname: '',
        phone: '',
        favourites: false,
      },
      list: [],
      favouritesList: [],
      sort: false,
      id: 0,
    }
  },
  methods: {
    addPos() {
      if (
        !this.formData.name ||
        !this.formData.surname ||
        !this.formData.lastname ||
        !this.formData.phone
      ) {
        alert('Форма заполнена неверно.')
        return
      }
      if (this.formData.favourites) {
        this.favouritesList.push({ ...this.formData, id: this.id++ })
      } else {
        this.list.push({ ...this.formData, id: this.id++ })
      }
      for (let key in this.formData) {
        this.formData[key] = ''
      }
    },
    filter(value) {
      const SortArray = (x, y) => {
        if (x[value].toLowerCase() < y[value].toLowerCase()) {
          return -1
        }
        if (x[value].toLowerCase() > y[value].toLowerCase()) {
          return 1
        }
        return 0
      }
      this.favouritesList.sort(SortArray)
      this.list.sort(SortArray)
    },
    delFromFavorite(id) {
      console.log(id)
      this.favouritesList.forEach((e, i) => {
        if (e.id == id) {
          e.favourites = !e.favourites
          this.list.push(e)
          this.favouritesList.splice(i, 1)
          return
        }
      })
    },
    addToFavorite(id) {
      console.log(id)
      this.list.forEach((e, i) => {
        if (e.id == id) {
          e.favourites = !e.favourites

          this.favouritesList.push(e)
          this.list.splice(i, 1)

          return
        }
      })
    },
  },
}
</script>

<style></style>
