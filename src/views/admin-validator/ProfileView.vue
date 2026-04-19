<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: 'Admin Validator',
  email: 'validator@example.com',
  role: 'Admin Validator',
  department: 'Moderation & Verification',
})

function handleLogout() {
  // Clear any auth tokens or state here if needed
  router.push('/admin/login')
}
</script>

<template>
  <div class="space-y-8 animate-fade-in w-full pb-10">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Profil Pengguna</h1>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-start">
      <div class="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-gray-50">
        <img src="https://i.pravatar.cc/150?img=12" alt="User Profile" class="w-full h-full object-cover" />
      </div>
      
      <div class="flex-1 w-full space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Nama Lengkap</label>
            <p class="text-gray-900 font-medium">{{ user.name }}</p>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Alamat Email</label>
            <p class="text-gray-900 font-medium">{{ user.email }}</p>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Peran Sistem</label>
            <div class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
              {{ user.role }}
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Departemen</label>
            <p class="text-gray-900 font-medium">{{ user.department }}</p>
          </div>
        </div>
        
        <div class="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div class="flex gap-4">
            <button class="bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-sm shadow-sm">
              Edit Profil
            </button>
            <button class="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition-colors text-sm shadow-sm">
              Ubah Password
            </button>
          </div>
          <button @click="handleLogout" class="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-2.5 px-6 rounded-xl transition-colors text-sm shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Keluar (Logout)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
