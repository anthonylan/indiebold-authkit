import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Demo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('../views/Demo.vue'),
    }
  ],
})

export default router
