<template>
  <div class="form">
    <form action="">
      <p>
        Фамиилия
        <br />
        <input required v-model="form.surname" type="text" placeholder="" />
      </p>
      <p>
        Имя
        <br />
        <input required v-model="form.name" type="text" placeholder="" />
      </p>
      <p>
        Отчество
        <br />
        <input required v-model="form.lastname" type="text" placeholder="" />
      </p>
      <p>
        Телефон
        <br />
        <input required v-model="form.phone" type="tel" placeholder="" />
      </p>
      <p>
        Избранное
        <input required v-model="form.favourites" type="checkbox" />
      </p>
    </form>
    <button @click="formHandler">Добавить</button>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    formData: Object,
    list: Array,
    favourites: Array,
  },
  data() {
    return {
      form: this.formData,
    }
  },
  methods: {
    formHandler() {
        this.$emit('add-item')
    },
  },
}
</script>

<style scoped></style>
