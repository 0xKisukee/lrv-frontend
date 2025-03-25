<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-secondary mb-4">
        Page non trouvée
      </h2>
      <p class="text-gray-600 mb-8">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <button 
        @click="router.push('/')" 
        class="btn btn-primary"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
</template> 