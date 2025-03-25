<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <section class="text-center py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-secondary mb-6">
        Bienvenue sur Location de Véhicules
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        La plateforme qui simplifie la location de véhicules entre propriétaires et locataires
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          v-if="!authStore.isLoggedIn" 
          @click="$router.push('/register')" 
          class="btn btn-primary"
        >
          Commencer maintenant
        </button>
        <button 
          v-if="!authStore.isLoggedIn" 
          @click="$router.push('/login')" 
          class="btn btn-secondary"
        >
          Se connecter
        </button>
      </div>
    </section>

    <section class="py-12">
      <h2 class="text-3xl font-bold text-center text-secondary mb-12">
        Pourquoi nous choisir ?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-semibold text-primary mb-4">Pour les Propriétaires</h3>
          <p class="text-gray-600 leading-relaxed">
            Mettez votre véhicule en location et générez des revenus supplémentaires facilement.
          </p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-semibold text-primary mb-4">Pour les Locataires</h3>
          <p class="text-gray-600 leading-relaxed">
            Trouvez le véhicule parfait pour vos besoins à des prix compétitifs.
          </p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-semibold text-primary mb-4">Sécurité Garantie</h3>
          <p class="text-gray-600 leading-relaxed">
            Transactions sécurisées et vérification des utilisateurs pour une expérience en toute confiance.
          </p>
        </div>
      </div>
    </section>
  </div>
</template> 