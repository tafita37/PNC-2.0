import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/principal/Accueil.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    }
  ]
})

export default router
