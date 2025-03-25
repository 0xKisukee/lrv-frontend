<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const credentials = ref({
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  try {
    error.value = ''
    await authStore.login(credentials.value)
    router.push('/')
  } catch (err) {
    error.value = "Erreur lors de la connexion. Vérifiez vos identifiants."
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-secondary mb-8">Connexion</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="credentials.email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            v-model="credentials.password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <button
          type="submit"
          class="w-full btn btn-primary"
        >
          Se connecter
        </button>

        <p class="text-center text-sm text-gray-600">
          Pas encore de compte ?
          <button
            @click="router.push('/register')"
            class="text-primary hover:underline font-medium"
          >
            S'inscrire
          </button>
        </p>
      </form>
    </div>
  </div>
</template>