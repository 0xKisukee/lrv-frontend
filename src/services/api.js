import { API_ENDPOINTS } from '../config/api'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

// Ajouter le token aux headers si présent
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { ...defaultHeaders, Authorization: `Bearer ${token}` } : defaultHeaders
}

// Gestion des erreurs
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Une erreur est survenue')
  }
  return response.json()
}

export const api = {
  // Login
  async login(credentials) {
    const response = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials)
    })
    return handleResponse(response)
  },

  // Register
  async register(userData) {
    const response = await fetch(API_ENDPOINTS.register, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(userData)
    })
    return handleResponse(response)
  },

  // Logout
  async logout() {
    const response = await fetch(API_ENDPOINTS.logout, {
      method: 'POST',
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Check Auth
  async checkAuth() {
    const response = await fetch(API_ENDPOINTS.checkAuth, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  }
} 