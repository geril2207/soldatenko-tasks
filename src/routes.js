import Main from './components/Main.vue'
import Item from './components/Item.vue'
import Catalog from './components/Catalog.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Main },
  { path: '/catalog', component: Catalog },
  { path: '/item/:itemId', component: Item },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
