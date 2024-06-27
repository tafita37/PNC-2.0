import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/adminBack',
      component: () => import('../components/principal/LoginAdmin.vue'),
      children: [
        {
          path: '',
          name: 'loginAdminPage',
          component: () => import('../components/principal/LoginAdmin.vue')
        },
        {
          path: 'back',
          name: 'backend',
          component: () => import('../components/principal/Accueil.vue')
        },
        {
          path: 'entityLists',
          name: 'entities',
          component: () => import('../components/principal/EntityList.vue')
        }
      ]
    },
    {
      path: '/userLists',
      name: 'users',
      component: () => import('../components/principal/UserList.vue')
    },
    {
      path: '/',
      name: 'reception',
      component: () => import('../components/principal/Accueil.vue')
    },
    {
      path: '/reception',
      name: 'reception2',
      component: () => import('../components/principal/Accueil.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/components/principal/APropos.vue')
    },
    {
      path: '/customerLogin',
      name: 'customerLogin',
      component: () => import('@/components/principal/LoginClient.vue')
    },
    {
      path: '/customerDashboard',
      name: 'customerDashboard',
      component: () => import('@/components/principal/DashboardClient.vue')
    }
  ]
});

export default router