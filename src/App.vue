<template>
  <Menu />
  <router-view></router-view>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  name: 'App',
  components: { Menu },
  data() {
    return {
      list: [
        {
          id: 0,
          title: 'Ноутбук',
          price: '3000',
        },
        {
          id: 1,
          title: 'Машина',
          price: '3456',
        },
        {
          id: 2,
          title: 'Вертолет',
          price: '123123',
        },
        {
          id: 3,
          title: 'Телефон',
          price: '543',
        },
        {
          id: 4,
          title: 'Кристалл',
          price: '231',
        },
        {
          id: 5,
          title: 'Наушники',
          price: '30005',
        },
      ],
    }
  },
}
</script>

<style></style>
