<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const rentals = ref([])
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-secondary">
        Mes Locations
      </h1>
      <p class="text-gray-600 mt-2">
        Gérez vos locations en cours et passées
      </p>
    </header>

    <!-- Filtres -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="flex flex-wrap gap-4">
        <button 
          class="px-4 py-2 rounded-md transition-colors"
          :class="true ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'"
        >
          En cours
        </button>
        <button 
          class="px-4 py-2 rounded-md transition-colors"
          :class="false ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'"
        >
          À venir
        </button>
        <button 
          class="px-4 py-2 rounded-md transition-colors"
          :class="false ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'"
        >
          Terminées
        </button>
      </div>
    </div>

    <!-- Liste des locations -->
    <div class="space-y-4">
      <div v-if="rentals.length === 0" class="text-center py-12">
        <p class="text-gray-600">
          Vous n'avez pas encore de location
        </p>
        <button class="btn btn-primary mt-4">
          Rechercher un véhicule
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Template pour les locations -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <h3 class="font-semibold text-lg text-secondary mb-2">
              Nom du véhicule
            </h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p>Du 01/01/2024 au 05/01/2024</p>
              <p>Prix total : 250 €</p>
              <p>Statut : <span class="text-green-600">En cours</span></p>
            </div>
          </div>
          <div class="border-t px-6 py-4">
            <button class="btn btn-secondary w-full">
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>