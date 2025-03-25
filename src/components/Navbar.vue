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
  <nav class="bg-secondary text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo et Titre -->
        <div class="flex items-center">
          <h1 class="text-xl font-semibold">Mon Application</h1>
        </div>
        
        <!-- Menu de Navigation -->
        <div class="flex items-center gap-4">
          <template v-if="!authStore.isLoggedIn">
            <button 
              @click="handleNavigation('/login')" 
              class="btn btn-primary"
            >
              Connexion
            </button>
            <button 
              @click="handleNavigation('/register')" 
              class="btn btn-secondary"
            >
              Inscription
            </button>
          </template>
          <template v-else>
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-2">
                {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
                <span 
                  class="px-2 py-1 text-sm rounded-full"
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
                class="btn btn-primary"
              >
                Dashboard
              </button>
              <button 
                v-if="authStore.isTenant" 
                @click="handleNavigation('/my-rentals')" 
                class="btn btn-primary"
              >
                Mes Locations
              </button>
              <button 
                @click="handleLogout" 
                class="btn btn-secondary"
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

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
}

.role-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: #42b983;
}

.role-badge.owner {
  background-color: #e67e22;
}

.role-badge.tenant {
  background-color: #3498db;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #3aa876;
}
</style>