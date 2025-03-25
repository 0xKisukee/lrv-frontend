import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { useAuthStore } from './stores/auth'
import './assets/main.css'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/login',
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('./views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./views/DashboardView.vue')
    },
    {
      path: '/my-rentals',
      component: () => import('./views/MyRentalsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./views/NotFoundView.vue')
    }
  ]
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router) // Use the router

// Vérification de l'état d'authentification au démarrage
const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')
