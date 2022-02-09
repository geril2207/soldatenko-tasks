<template>
  <div class="form__wrapper">
    <h4>Добавление предмета</h4>
    <div class="form">
      <p class="input__wrapper">
        <el-input
          required
          v-model="formData.title"
          type="text"
          placeholder="Название"
        />
      </p>
      <p class="input__wrapper">
        <el-input
          required
          v-model="formData.price"
          type="text"
          placeholder="Цена"
        />
      </p>
      <el-button class="form__btn_submit" type="success" @click="formHandler"
        >Добавить</el-button
      >
    </div>
    <div class="line">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      formData: {
        title: '',
        price: '',
      },
    }
  },
  methods: {
    formHandler() {
      const newItem = { ...this.formData, id: new Date().valueOf() }
      this.$emit('addItem', newItem)
    },
  },
}
</script>

<style scoped>
h4 {
  padding: 0;
  margin: 0;
}
.form {
  display: flex;
  align-items: center;
  width: 100%;
}
.input__wrapper {
  width: 100%;
  flex: 1 1 auto;
  margin-right: 8px;
  margin-left: 8px;
}
.input__wrapper:first-child {
  margin-left: 0;
}
.form__btn_submit {
  width: 600px;
}
</style>
