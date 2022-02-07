<template>
  <Form :formData="formData" :handler="addPos" @add-item="addPos" />
  <Sort :sort="sort" @filter-arr="filter" />
  <table class="list__table">
    <thead>
      <tr>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Телефон</th>
        <th>Избранное</th>
        <th></th>
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
      sort: '',
      id: 0,
      sortStr: '',
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
        if (key !== 'favourites') {
          this.formData[key] = ''
          continue
        }
        this.formData[key] = false
      }
    },
    filter(value) {
      const sortValue = {
        Фамилии: 'surname',
        Имени: 'name',
        Отчеству: 'lastname',
      }
      const SortArray = (x, y) => {
        if (
          x[sortValue[value]].toLowerCase() < y[sortValue[value]].toLowerCase()
        ) {
          return -1
        }
        if (
          x[sortValue[value]].toLowerCase() > y[sortValue[value]].toLowerCase()
        ) {
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

<style>
.list__table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
}
.list__table thead th {
  font-weight: bold;
  text-align: center;
  border: none;
  padding: 10px 15px;
  background: #40a0ff;
  color: white;
  font-size: 14px;
}
.list__table thead tr th:first-child {
  border-radius: 8px 0 0 8px;
}
.list__table thead tr th:last-child {
  border-radius: 0 8px 8px 0;
}
.list__table tbody td {
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.list__table tbody tr:nth-child(even) {
  background: #f3f3f3;
}
.list__table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
.list__table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
}
</style>
