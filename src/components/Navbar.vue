<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'


    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(() => {
      console.log('Navbar component mounted')
      console.log('Router instance:', router)
      console.log('Auth Store State:', {
        isLoggedIn: authStore.isLoggedIn,
        isOwner: authStore.isOwner,
        isTenant: authStore.isTenant,
        user: authStore.user,
        userRole: authStore.userRole
      })
    })

    const handleNavigation = async (route) => {
      try {
        await router.push(route)
      } catch (error) {
        console.error('Navigation error:', error)
      }
    }

    const handleLogout = async () => {
      try {
        await authStore.logout()
        await handleNavigation('/login')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    }

</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo et Titre -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-2 text-blue-600 font-semibold text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Gestion Locative
          </router-link>
        </div>
        
        <!-- Menu de Navigation -->
        <div class="flex items-center gap-4">
          <template v-if="!authStore.isLoggedIn">
            <button 
              @click="handleNavigation('/login')" 
              class="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Connexion
            </button>
            <button 
              @click="handleNavigation('/register')" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Inscription
            </button>
          </template>
          <template v-else>
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-2">
                {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
                <span 
                  class="px-2 py-1 text-sm rounded-full text-white"
                  :class="{
                    'bg-orange-500': authStore.userRole === 'owner',
                    'bg-blue-500': authStore.userRole === 'tenant'
                  }"
                >
                  {{ authStore.userRole === 'owner' ? 'Propriétaire' : 'Locataire' }}
                </span>
              </span>
              <button 
                v-if="authStore.isOwner" 
                @click="handleNavigation('/dashboard')" 
                class="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Dashboard
              </button>
              <button 
                v-if="authStore.isTenant" 
                @click="handleNavigation('/my-rentals')" 
                class="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Mes Locations
              </button>
              <button 
                @click="handleLogout" 
                class="text-gray-600 hover:text-gray-700 font-semibold"
              >
                Déconnexion
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>