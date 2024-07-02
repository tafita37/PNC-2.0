import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/mada',
      name : 'mada',
      component : () => import('../components/principal/MadagascarMap.vue')
    },
    {
      path: '/',
      name: 'reception',
      component: () => import('../components/principal/Accueil.vue')
    },
    {
      path: '/userLists/:numPage',
      name: 'users',
      component: () => import('../components/principal/UserList.vue')
    },
    {
      path: '/entityList/:numPage',
      name: 'entities',
      component: () => import('../components/principal/EntityList.vue')
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
      path : '/customer',
      children : [
        {
          path: 'login',
          name: 'customerLogin',
          component: () => import('@/components/principal/LoginClient.vue')
        },
        {
          path: 'registration',
          children : [
            {
              path : '',
              name: 'customerRegistration',
              component: () => import('@/components/principal/InscriptionClient.vue')
            },
            {
              path : 'saveMdp',
              name : 'saveMdp',
              component: () => import('@/components/principal/SaveMdp.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/customerDashboard',
      name: 'customerDashboard',
      component: () => import('@/components/principal/DashboardClient.vue')
    }
  ]
});

export default router