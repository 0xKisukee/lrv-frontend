<script setup>
import { ref } from 'vue'

defineProps({
  tickets: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="p-4 border-b flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
          <path d="M13 2.5L5 5v2.5h14V5l-6-2.5zM3 9v10.5C3 20.33 3.67 21 4.5 21h15c.83 0 1.5-.67 1.5-1.5V9H3zm4 8h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
        </svg>
        Tickets récents
      </h3>
      <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
        {{ tickets.length }} tickets
      </span>
    </div>
    
    <div class="divide-y">
      <div v-if="tickets.length === 0" class="p-6 text-center text-gray-500">
        Aucun ticket pour le moment
      </div>
      
      <div v-for="ticket in tickets" :key="ticket.id" class="p-4 hover:bg-gray-50">
        <div class="flex gap-4">
          <div :class="ticket.status === 'opened' ? 'text-green-500' : 'text-gray-400'">
            <svg v-if="ticket.status === 'opened'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h4 class="font-medium text-gray-900">{{ ticket.category }}</h4>
              <span class="text-sm text-gray-500">{{ new Date(ticket.updatedAt).toLocaleDateString('fr-FR') }}</span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ ticket.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 bg-gray-50 flex justify-between">
      <button class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        Voir tous
      </button>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Nouveau ticket
      </button>
    </div>
  </div>
</template> 