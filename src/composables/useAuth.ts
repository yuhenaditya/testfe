import { ref } from 'vue'
import { useAuthStore } from '../store/auth.store'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const loginMutation = {
    isPending: ref(false),
    isError: ref(false),
    mutate: (payload: any) => {
      loginMutation.isPending.value = true
      loginMutation.isError.value = false
      
      setTimeout(() => {
        loginMutation.isPending.value = false
        // Mock successful login
        const fakeUser = {
          id: '1',
          name: 'Vendor User',
          email: payload.email,
          role: 'MERCHANT'
        }
        authStore.setAuth(fakeUser, 'fake_token_123')
        
        const role = fakeUser.role.toUpperCase()
        if (role.includes('SUPER_ADMIN') || role === 'SUPERADMIN') {
          router.push('/super-admin/dashboard')
        } else if (role.includes('FINANCE')) {
          router.push('/finance-admin/dashboard')
        } else if (role.includes('VALIDATOR') || role === 'ADMIN_VALIDATOR') {
          router.push('/admin-validator/dashboard')
        } else if (role === 'MERCHANT_OWNER' || role === 'MERCHANT' || role === 'VENDOR') {
          router.push('/vendor/dashboard')
        } else if (role === 'MERCHANT_ASSOCIATE') {
          router.push('/vendor/associate/dashboard')
        } else {
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
    loginMutation,
    registerVendorMutation
  }
}
