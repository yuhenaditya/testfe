<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const dummyUsers = [
  { username: 'superadmin', password: 'super123', role: 'super-admin', redirect: '/super-admin/dashboard' },
  { username: 'finance', password: 'finance123', role: 'finance-admin', redirect: '/finance-admin/dashboard' },
  { username: 'validator', password: 'validator123', role: 'admin-validator', redirect: '/admin-validator/dashboard' },
]

function handleLogin() {
  errorMessage.value = ''
  const user = dummyUsers.find(u => u.username === email.value && u.password === password.value)

  if (!user) {
    errorMessage.value = 'Username atau password salah.'
    return
  }

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    localStorage.setItem('userRole', user.role)
    router.push(user.redirect)
  }, 800)
}
</script>

<template>
  <div class="login-bg min-h-screen w-full flex font-sans overflow-hidden">
    
    <!-- Left Section: Form -->
    <div class="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10">
      
      <div class="w-full max-w-[400px] mx-auto lg:mx-0">
        <!-- Title adjusted for Admin login -->
        <h1 class="text-4xl font-extrabold text-[#2D333A] mb-12">Login Admin</h1>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Email -->
          <div>
            <input 
              v-model="email" 
              type="text" 
              required
              placeholder="Masukkan username" 
              class="w-full px-5 py-3.5 rounded-[14px] border border-gray-200 text-sm font-medium placeholder-gray-300 focus:outline-none focus:border-[#5FA3FB] focus:ring-1 focus:ring-[#5FA3FB] transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                required
                placeholder="Masukkan kata sandi" 
                class="w-full px-5 py-3.5 rounded-[14px] border border-gray-200 text-sm font-medium placeholder-gray-300 focus:outline-none focus:border-[#5FA3FB] focus:ring-1 focus:ring-[#5FA3FB] transition-colors pr-12"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-black focus:outline-none"
              >
                <!-- Eye Slash icon from image -->
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
            </div>
            
            <div class="flex justify-end mt-3">
              <a href="#" class="text-[13px] font-bold text-[#5FA3FB] hover:text-blue-500 transition-colors">Lupa Password</a>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-[#5FA3FB] hover:bg-blue-500 text-white font-bold py-4 rounded-[14px] transition-colors mt-2 text-sm tracking-wide"
          >
            <span v-if="isLoading">Memproses...</span>
            <span v-else>Masuk</span>
          </button>
          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-500 text-sm font-medium text-center mt-3">{{ errorMessage }}</p>

        </form>
      </div>
    </div>

    <!-- Right Section: Illustration -->
    <div class="hidden lg:flex lg:w-[55%] relative items-center justify-end pl-10 pr-4">
      <img src="/img/login.png" alt="Login Illustration" class="w-full h-full object-contain object-right" />
    </div>

  </div>
</template>

<style scoped>
.login-bg {
  background:
    linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 50%, rgba(78,165,252,0.15) 85%, rgba(78,165,252,0.35) 100%),
    linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 40%, rgba(78,165,252,0.08) 70%, rgba(78,165,252,0.2) 100%);
}
</style>
