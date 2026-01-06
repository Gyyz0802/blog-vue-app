import { ref, computed } from 'vue'

export function useAuth() {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = computed(() => !!localStorage.getItem('isAuthenticated'))
  
  const login = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }
  
  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser
  }
}