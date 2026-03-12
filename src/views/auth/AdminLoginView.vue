<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '../../components/ui/Input.vue'
import AppButton from '../../components/ui/Button.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

// TODO: Implement max 3x failed login IP Block logic

function handleLogin() {
  isLoading.value = true

  // Mock login: simulate a brief delay then redirect
  setTimeout(() => {
    isLoading.value = false
    router.push('/super-admin/dashboard')
  }, 800)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Logo -->
    <div class="mb-8 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center shadow-lg">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h1 class="text-h3 font-bold text-gray-800">Vendor Marketplace</h1>
      <p class="text-body-sm text-gray-500 mt-1">Admin Panel — Silakan masuk untuk melanjutkan</p>
    </div>

    <!-- Login Card -->
    <div class="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 class="text-body-lg font-semibold text-gray-800 mb-6">Masuk ke Dashboard</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <AppInput
          id="login-email"
          label="Email"
          type="email"
          placeholder="admin@marketplace.com"
          v-model="email"
          required
        />

        <AppInput
          id="login-password"
          label="Password"
          type="password"
          placeholder="Masukkan password"
          v-model="password"
          required
        />

        <div class="pt-2">
          <AppButton
            type="submit"
            variant="primary"
            size="lg"
            full-width
            :disabled="isLoading"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ isLoading ? 'Memproses...' : 'Login' }}
          </AppButton>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <p class="mt-6 text-caption text-gray-400">
      © 2026 Vendor Marketplace. Hak cipta dilindungi.
    </p>
  </div>
</template>
