import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, AuthResponse } from '@/types/auth'
import type { ApiError } from '@/types/api'
import { authService } from '@/services/api'
import { useToastStore } from './toast'

const TOKEN_STORAGE_KEY = 'novacart_auth_token'
const USER_STORAGE_KEY = 'novacart_auth_user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const toastStore = useToastStore()

  const isAuthenticated = computed<boolean>(() => {
    return !!token.value && !!user.value
  })

  const fullName = computed<string>(() => {
    if (!user.value) return 'Guest'
    return `${user.value.firstName} ${user.value.lastName}`.trim() || user.value.username
  })

  const initAuth = (): void => {
    try {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)
      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser) as User
      }
    } catch {
      token.value = null
      user.value = null
    }
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response: AuthResponse = await authService.login(credentials)
      token.value = response.accessToken
      user.value = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.value))

      toastStore.success(`Welcome back, ${user.value.firstName}!`)
      return true
    } catch (err: unknown) {
      const apiErr = err as ApiError
      error.value = apiErr.message || 'Invalid username or password'
      toastStore.error(error.value)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = (): void => {
    const name = user.value?.firstName || 'User'
    user.value = null
    token.value = null
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    toastStore.info(`Goodbye, ${name}. You have been logged out.`)
  }

  // Initialize immediately
  initAuth()

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    login,
    logout,
    initAuth
  }
})
