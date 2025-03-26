<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const rentals = ref([])
</script>

<template>
  <div class="max-w-6xl mx-auto px-4">
    <header class="py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4 relative">
        Mes Locations
        <span class="absolute -bottom-2 left-0 w-20 h-1 bg-blue-500"></span>
      </h1>
      <p class="text-gray-600">
        Gérez vos locations en cours et passées
      </p>
    </header>

    <!-- Filtres -->
    <div class="bg-white p-4 rounded-xl shadow-lg mb-6">
      <div class="flex flex-wrap gap-4">
        <button 
          class="px-4 py-2 rounded-lg transition-colors"
          :class="true ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'"
        >
          En cours
        </button>
        <button 
          class="px-4 py-2 rounded-lg transition-colors"
          :class="false ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'"
        >
          À venir
        </button>
        <button 
          class="px-4 py-2 rounded-lg transition-colors"
          :class="false ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'"
        >
          Terminées
        </button>
      </div>
    </div>

    <!-- Liste des locations -->
    <div class="space-y-4">
      <div v-if="rentals.length === 0" class="text-center py-12">
        <p class="text-gray-600 mb-4">
          Vous n'avez pas encore de location
        </p>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Rechercher un véhicule
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Template pour les locations -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-6">
            <h3 class="font-semibold text-lg text-gray-900 mb-2">
              Nom du véhicule
            </h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p>Du 01/01/2024 au 05/01/2024</p>
              <p>Prix total : 250 €</p>
              <p>Statut : <span class="text-green-600 font-medium">En cours</span></p>
            </div>
          </div>
          <div class="border-t px-6 py-4">
            <button class="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition-colors">
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>