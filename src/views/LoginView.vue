<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Attendre que la connexion soit terminée
    const success = await authStore.login(email.value, password.value)
    
    if (success) {
      // Vérifier que les données sont bien stockées
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      if (!storedUser || !storedToken) {
        throw new Error('Erreur lors de l\'initialisation de la session')
      }
      
      // Redirection vers le dashboard après connexion réussie
      await router.push('/dashboard')
    }
  } catch (err) {
    console.error('Erreur de connexion:', err)
    error.value = err.response?.data?.message || 'Une erreur est survenue lors de la connexion'
    // Si les données sont partiellement stockées, les nettoyer
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4">
    <div class="min-h-[80vh] flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 relative">
          Connexion
          <span class="absolute -bottom-4 left-0 w-16 h-1 bg-blue-500"></span>
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>

          <p class="text-center text-sm text-gray-600">
            Pas encore de compte ?
            <button
              @click="router.push('/register')"
              class="text-blue-600 hover:text-blue-700 font-medium"
              type="button"
            >
              S'inscrire
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>