<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-secondary">
        Tableau de bord propriétaire
      </h1>
      <p class="text-gray-600 mt-2">
        Gérez vos véhicules et suivez vos locations
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Statistiques -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold text-secondary mb-4">
          Aperçu
        </h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Véhicules actifs</span>
            <span class="font-semibold">0</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Locations en cours</span>
            <span class="font-semibold">0</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Revenus du mois</span>
            <span class="font-semibold">0 €</span>
          </div>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold text-secondary mb-4">
          Actions rapides
        </h3>
        <div class="space-y-4">
          <button class="btn btn-primary w-full">
            Ajouter un véhicule
          </button>
          <button class="btn btn-secondary w-full">
            Voir les demandes
          </button>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold text-secondary mb-4">
          Notifications
        </h3>
        <div class="space-y-4">
          <p class="text-gray-600 text-sm">
            Aucune notification pour le moment
          </p>
        </div>
      </div>
    </div>
  </div>
</template>