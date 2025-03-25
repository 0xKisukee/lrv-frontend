<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'tenant' // 'tenant' ou 'owner'
})

const error = ref('')

const handleRegister = async () => {
  try {
    if (userData.value.password !== userData.value.confirmPassword) {
      error.value = "Les mots de passe ne correspondent pas"
      return
    }

    error.value = ''
    await authStore.register(userData.value)
    router.push('/')
  } catch (err) {
    error.value = "Erreur lors de l'inscription. Veuillez réessayer."
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-secondary mb-8">Inscription</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              v-model="userData.firstName"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              id="lastName"
              type="text"
              v-model="userData.lastName"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="userData.email"
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
            v-model="userData.password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            v-model="userData.confirmPassword"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Je souhaite m'inscrire en tant que :
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              @click="userData.role = 'tenant'"
              class="p-4 rounded-lg border-2 text-center transition-all"
              :class="userData.role === 'tenant' 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-gray-200 hover:border-primary/50'"
            >
              Locataire
            </button>
            <button
              type="button"
              @click="userData.role = 'owner'"
              class="p-4 rounded-lg border-2 text-center transition-all"
              :class="userData.role === 'owner' 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-gray-200 hover:border-primary/50'"
            >
              Propriétaire
            </button>
          </div>
        </div>

        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <button
          type="submit"
          class="w-full btn btn-primary"
        >
          S'inscrire
        </button>

        <p class="text-center text-sm text-gray-600">
          Déjà inscrit ?
          <button
            @click="router.push('/login')"
            class="text-primary hover:underline font-medium"
          >
            Se connecter
          </button>
        </p>
      </form>
    </div>
  </div>
</template>