import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isLoggedIn = computed(() => !!token.value)
  const isOwner = computed(() => user.value?.role === 'owner')
  const isTenant = computed(() => user.value?.role === 'tenant')
  const userRole = computed(() => user.value?.role)

  const setUser = (userData) => {
    user.value = userData
  }

  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials)
      setToken(response.token)
      setUser(response.user)
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.register(userData)
      setToken(response.token)
      setUser(response.user)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.logout()
      setToken(null)
      setUser(null)
    } catch (error) {
      throw error
    }
  }

  const checkAuth = async () => {
    try {
      if (!token.value) return
      const response = await api.checkAuth()
      setUser(response.user)
    } catch (error) {
      setToken(null)
      setUser(null)
      throw error
    }
  }

  return {
    user,
    isLoggedIn,
    isOwner,
    isTenant,
    userRole,
    login,
    register,
    logout,
    checkAuth
  }
}) 