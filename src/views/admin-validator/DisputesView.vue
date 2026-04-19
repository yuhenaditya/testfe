<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const disputes = ref([
  {
    id: '#DS-90422',
    vendorName: 'Creativ Studio',
    vendorId: '#VDR-4567',
    status: 'Menunggu'
  },
  {
    id: '#DS-90423',
    vendorName: 'Creativ Studio',
    vendorId: '#VDR-4567',
    status: 'Menunggu'
  }
])

function goToDetail(id: string) {
  // Pass the id without # character in URL
  const cleanId = id.replace('#', '')
  router.push(`/admin-validator/disputes/${cleanId}`)
}
</script>

<template>
  <div class="space-y-6 animate-fade-in w-full pb-10 max-w-5xl mx-auto">
    
    <div class="flex items-center justify-between pb-4 border-b border-gray-100">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Antrean Sengketa</h1>
    </div>

    <!-- Filter Section -->
    <div class="flex justify-end pt-2">
      <div class="relative">
        <select class="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-full pl-5 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] shadow-sm cursor-pointer">
          <option>Semua Status</option>
          <option>Menunggu</option>
          <option>Diproses</option>
          <option>Selesai</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>

    <!-- Cards List -->
    <div class="space-y-4">
      <div 
        v-for="(dispute, index) in disputes" 
        :key="index"
        class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="font-extrabold text-gray-900 text-[15px]">{{ dispute.vendorName }}</h3>
            <p class="text-xs text-gray-500 font-medium mt-1">{{ dispute.vendorId }}</p>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-100 bg-yellow-50 text-xs font-bold text-yellow-600">
            <span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            {{ dispute.status }}
          </div>
        </div>
        
        <div>
          <button 
            @click="goToDetail(dispute.id)"
            class="bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-2.5 px-8 rounded-[10px] text-sm transition-colors shadow-sm"
          >
            Proses
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
