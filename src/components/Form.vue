<template>
  <div class="form__wrapper">
    <div class="form">
      <form action="">
        <p>
          Фамиилия
          <br />
          <el-input
            required
            v-model="form.surname"
            type="text"
            placeholder=""
            v-styles="{ value: '123' }"
          />
        </p>
        <p>
          Имя
          <br />
          <el-input required v-model="form.name" type="text" />
        </p>
        <p>
          Отчество
          <br />
          <el-input required v-model="form.lastname" type="text" />
        </p>
        <p>
          Телефон
          <br />
          <el-input required v-model="form.phone" type="tel" placeholder="" />
        </p>
        <p class="p-checkbox-inner">
          <el-checkbox
            class="p-checkbox"
            label="Избранное"
            required
            v-model="form.favourites"
            size="large"
          />
        </p>
      </form>
      <el-button class="form__btn_submit" type="primary" @click="formHandler"
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
  directives: {
    styles: {
      mounted(el, bindings) {
        console.log(el, bindings.value)
        el.value = bindings.value.value
      },
    },
  },
}
</script>

<style scoped>
.form {
  max-width: 300px;
  text-align: center;
  margin: 0 auto;
}
.p-checkbox-inner {
  display: flex;
  align-items: center;
}
.el-checkbox {
  width: 30px;
  height: 30px;
  margin-left: 15px;
}

.line div {
  margin-top: 10px;
  width: 100%;
  height: 0;
  border-bottom: 1px solid var(--el-border-color-base);
}
.form__btn_submit {
  width: 100%;
}
</style>
