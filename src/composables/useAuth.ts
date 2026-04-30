import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth.store'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isLoggedIn = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.currentUser)
  
  const logout = () => {
    authStore.logout()
    router.push('/')
  }

  const loginMutation = {
    isPending: ref(false),
    isError: ref(false),
    mutate: (payload: any) => {
      loginMutation.isPending.value = true
      loginMutation.isError.value = false
      
      setTimeout(() => {
        loginMutation.isPending.value = false
        // Mock successful login — User login always creates a CLIENT role
        const fakeUser = {
          id: '1',
          name: 'Budi',
          email: payload.email,
          role: 'CLIENT'
        }
        authStore.setAuth(fakeUser, 'fake_token_123')
        
        // Route based on role
        const role = fakeUser.role.toUpperCase()
        if (role.includes('SUPER_ADMIN') || role === 'SUPERADMIN') {
          router.push('/super-admin/dashboard')
        } else if (role.includes('FINANCE')) {
          router.push('/finance-admin/dashboard')
        } else if (role === 'MERCHANT_OWNER' || role === 'MERCHANT' || role === 'VENDOR') {
          router.push('/vendor/dashboard')
        } else if (role === 'MERCHANT_ASSOCIATE') {
          router.push('/vendor/associate/dashboard')
        } else {
          // CLIENT and any other role → client pages
          router.push('/jelajahi')
        }
      }, 1000)
    }
  }

  const registerVendorMutation = {
    isPending: ref(false),
    isError: ref(false),
    mutate: (payload: any) => {
      registerVendorMutation.isPending.value = true
      registerVendorMutation.isError.value = false
      
      setTimeout(() => {
        registerVendorMutation.isPending.value = false
        const fakeUser = {
          id: '2',
          name: payload.storeName,
          email: 'newvendor@example.com',
          role: 'MERCHANT'
        }
        authStore.setAuth(fakeUser, 'fake_token_123')
        router.push('/daftar/vendor/upload')
      }, 1000)
    }
  }

  return {
    isLoggedIn,
    user,
    logout,
    loginMutation,
    registerVendorMutation
  }
}
