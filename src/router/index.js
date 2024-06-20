import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/principal/Accueil.vue'
import APropos from '@/components/principal/APropos.vue'
import LoginClient from '@/components/principal/LoginClient.vue'
import DashboardClient from '@/components/principal/DashboardClient.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'reception',
      component: Accueil
    },
    {
      path: '/reception',
      name: 'reception2',
      component: Accueil
    },
    {
      path: '/about',
      name: 'about',
      component: APropos
    },
    {
      path: '/customerLogin',
      name: 'customerLogin',
      component: LoginClient
    },
    {
      path: '/customerDashboard',
      name: 'customerDashboard',
      component: DashboardClient
    }
  ]
})

export default router