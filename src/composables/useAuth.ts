import { reactive, computed } from 'vue'

interface User {
  name: string
  email: string
  avatar: string
  role: 'user' | 'vendor'
}

const state = reactive<{ user: User | null }>({
  user: null,
})

export function useAuth() {
  const isLoggedIn = computed(() => !!state.user)
  const user = computed(() => state.user)

  function login(userData: User) {
    state.user = userData
  }

  function logout() {
    state.user = null
  }

  return { isLoggedIn, user, login, logout }
}
