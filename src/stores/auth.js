import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // Initialiser les états avec les données du localStorage
  const storedUser = localStorage.getItem('user')
  const user = ref(storedUser ? JSON.parse(storedUser) : null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = ref(!!token.value && !!user.value)
  const isOwner = ref(user.value?.role === 'owner')

  // Configuration d'axios pour inclure le token dans les requêtes
  axios.interceptors.request.use(config => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      })
      
      const { token: newToken, user: userData } = response.data
      
      // Stockage du token et des données utilisateur
      token.value = newToken
      localStorage.setItem('token', newToken)
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      isAuthenticated.value = true
      isOwner.value = userData.role === 'owner'
      
      return true
    } catch (error) {
      console.error('Erreur de connexion:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData)
      
      const { token: newToken, user: registeredUser } = response.data
      
      // Stockage du token et des données utilisateur
      token.value = newToken
      localStorage.setItem('token', newToken)
      user.value = registeredUser
      localStorage.setItem('user', JSON.stringify(registeredUser))
      isAuthenticated.value = true
      isOwner.value = registeredUser.role === 'owner'
      
      return true
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await axios.post('http://127.0.0.1:8000/api/logout')
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      token.value = null
      user.value = null
      isAuthenticated.value = false
      isOwner.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const checkAuth = async () => {
    if (!token.value || !user.value?.id) {
      await logout()
      return false
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${user.value.id}`)
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
      isAuthenticated.value = true
      isOwner.value = user.value.role === 'owner'
      return true
    } catch (error) {
      console.error('Erreur de vérification d\'authentification:', error)
      await logout()
      return false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isOwner,
    login,
    register,
    logout,
    checkAuth
  }
}) 