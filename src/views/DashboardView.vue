<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import StatCard from '../components/StatCard.vue'
import TicketsList from '../components/TicketsList.vue'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()
const stats = ref({
  properties: 0,
  tenants: 0,
  monthlyRevenue: 0,
  unpaidAmount: 0
})
const tickets = ref([])
const loading = ref(true)
const error = ref(null)

// Configuration d'axios pour inclure le token dans les requêtes
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Fonction pour charger les données du propriétaire
const loadOwnerData = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser?.id) {
      throw new Error('Utilisateur non trouvé')
    }

    const [propertiesResponse, paymentsResponse, ticketsResponse] = await Promise.all([
      axios.get(`http://127.0.0.1:8000/api/users/${storedUser.id}/properties`),
      axios.get(`http://127.0.0.1:8000/api/users/${storedUser.id}/payments`),
      axios.get(`http://127.0.0.1:8000/api/users/${storedUser.id}/tickets`)
    ])

    // Calculer les statistiques à partir des données
    const properties = propertiesResponse.data
    const payments = paymentsResponse.data

    // Calculer le revenu mensuel (somme des loyers des propriétés)
    const monthlyRevenue = properties.reduce((sum, property) => {
      return sum + (property.rent_amount || 0)
    }, 0)

    // Calculer les impayés (somme des paiements non effectués)
    const unpaidAmount = payments.reduce((sum, payment) => {
      if (!payment.paid) {
        return sum + payment.amount
      }
      return sum
    }, 0)

    stats.value = {
      properties: properties.length,
      tenants: properties.filter(p => p.tenant).length,
      monthlyRevenue,
      unpaidAmount
    }
    tickets.value = ticketsResponse.data
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des données'
    if (err.response?.status === 401) {
      router.push('/login')
    }
  }
}

// Fonction pour charger les données du locataire
const loadTenantData = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser?.id) {
      throw new Error('Utilisateur non trouvé')
    }

    const [propertiesResponse, paymentsResponse, ticketsResponse] = await Promise.all([
      axios.get(`http://127.0.0.1:8000/api/users/${storedUser.id}/properties`),
      axios.get(`http://127.0.0.1:8000/api/users/${storedUser.id}/payments`),
      axios.get(`http://127.0.0.1:8000/api/users/${storedUser.id}/tickets`)
    ])

    // Pour un locataire, on prend la première propriété (et seule)
    const property = propertiesResponse.data[0]
    const payments = paymentsResponse.data

    // Trouver le prochain paiement non effectué
    const nextPayment = payments.find(p => !p.paid)

    stats.value = {
      nextPayment: nextPayment ? new Date(nextPayment.due_date).toLocaleDateString('fr-FR') : 'Aucun',
      rentAmount: property?.rent_amount || 0,
      propertyAddress: property?.address || 'Non assigné',
      propertyType: property?.type || 'Non spécifié'
    }
    tickets.value = ticketsResponse.data
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des données'
    if (err.response?.status === 401) {
      router.push('/login')
    }
  }
}

onMounted(async () => {
  try {
    loading.value = true
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/login')
      return
    }

    if (storedUser.role === 'owner') {
      await loadOwnerData()
    } else {
      await loadTenantData()
    }
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des données'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4">
    <!-- En-tête -->
    <header class="py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4 relative">
        {{ authStore.isOwner ? 'Tableau de bord propriétaire' : 'Mon espace locataire' }}
        <span class="absolute -bottom-2 left-0 w-20 h-1 bg-blue-500"></span>
      </h1>
      <p class="text-gray-600">
        {{ authStore.isOwner ? 'Gérez vos biens et suivez vos locations' : 'Gérez votre location et vos paiements' }}
      </p>
    </header>

    <!-- Message d'erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Contenu -->
    <template v-else>
      <!-- Section Propriétaire -->
      <template v-if="authStore.isOwner">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="house-door"
            title="Mes biens"
            :value="stats.properties"
            color="blue"
            subtitle="Propriétés en gestion"
          />
          <StatCard
            icon="people"
            title="Mes locataires"
            :value="stats.tenants"
            color="green"
            subtitle="Locataires actifs"
          />
          <StatCard
            icon="cash"
            title="Revenus mensuels"
            :value="`${stats.monthlyRevenue} €`"
            color="yellow"
            subtitle="Ce mois-ci"
          />
          <StatCard
            icon="exclamation-circle"
            title="Impayés"
            :value="`${stats.unpaidAmount} €`"
            color="red"
            subtitle="Montant total"
          />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TicketsList :tickets="tickets" />
          
          <!-- Actions rapides -->
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Actions rapides</h3>
            <div class="space-y-4">
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Ajouter un bien
              </button>
              <button class="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Gérer les locataires
              </button>
              <button class="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
                Voir les paiements
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Section Locataire -->
      <template v-else>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" class="w-6 h-6 text-blue-500" fill="currentColor">
                  <path d="M20 12l-8-8-8 8h2v8h12v-8h2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ stats.propertyType }}</h3>
                <p class="text-gray-500">{{ stats.propertyAddress }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500">Prochain paiement</p>
                <p class="text-lg font-semibold text-gray-900">{{ stats.nextPayment }}</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500">Montant du loyer</p>
                <p class="text-lg font-semibold text-blue-600">{{ stats.rentAmount }} €</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Actions rapides</h3>
            <div class="space-y-4">
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
                Payer mon loyer
              </button>
              <button class="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Nouveau ticket
              </button>
            </div>
          </div>
        </div>

        <TicketsList :tickets="tickets" />
      </template>
    </template>
  </div>
</template>