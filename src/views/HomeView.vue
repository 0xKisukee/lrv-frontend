<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-500 to-cyan-400 text-white py-24 rounded-xl my-8 mx-4">
      <div class="max-w-4xl mx-auto px-8">
        <h1 class="text-5xl font-bold mb-6">
          Simplifiez la gestion de vos locations
        </h1>
        <p class="text-xl mb-8 max-w-2xl">
          Gérez vos biens, locataires et paiements en toute simplicité.
          Connectez-vous ou inscrivez-vous dès maintenant !
        </p>
        <div class="flex gap-4">
          <button 
            v-if="!authStore.isLoggedIn"
            @click="$router.push('/login')" 
            class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Se connecter
          </button>
          <button 
            v-if="!authStore.isLoggedIn"
            @click="$router.push('/register')" 
            class="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-16 relative">
          Pourquoi choisir Gestion Locative ?
          <span class="absolute -bottom-4 left-0 w-20 h-1 bg-blue-500"></span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Gestion des biens -->
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Gestion des biens</h3>
            <p class="text-gray-600">
              Suivez et organisez vos propriétés en un seul endroit. Accédez à toutes les informations en quelques clics.
            </p>
          </div>

          <!-- Locataires -->
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Locataires</h3>
            <p class="text-gray-600">
              Communiquez et gérez vos locataires efficacement. Gardez un historique complet des interactions.
            </p>
          </div>

          <!-- Paiements -->
          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Paiements</h3>
            <p class="text-gray-600">
              Suivez les loyers et paiements en temps réel. Générez des rapports détaillés en un instant.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 