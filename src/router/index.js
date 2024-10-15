import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
     
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/games',
      name: 'games',
     
      component: () => import('../views/games.vue')
    },
    {
      path: '/getBooks',
      name: 'getBooks',
     
      component: () => import('../views/getBook.vue')
    },
    
    {
      path: '/kelimeOyunu',
      name: 'kelimeOyunu',
     
      component: () => import('../views/games/kelimeOyunu.vue')
    },
    {
      path: '/adamAsmaca',
      name: 'adamAsmaca',
     
      component: () => import('../views/games/adamAsmaca.vue')
    },
  ]
})

export default router
