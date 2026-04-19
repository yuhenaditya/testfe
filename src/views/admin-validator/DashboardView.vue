<script setup lang="ts">
import { ref } from 'vue'

const stats = [
  {
    title: 'Vendor baru yang membutuhkan validasi',
    value: '12',
    icon: 'store',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
  },
  {
    title: 'Laporan pengguna terkait aktivitas mencurigakan.',
    value: '5',
    icon: 'flag',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
  },
  {
    title: 'Kasus transaksi tertunda atau klaim pengembalian dana pembeli.',
    value: '3',
    icon: 'scale',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
  },
]

const pendingReviews = ref([
  { id: 1, name: 'User A', type: 'Creative Studio', email: 'creativs@untitledui.com' },
  { id: 2, name: 'User B', type: 'Event Essentials', email: 'creativs@untitledui.com' },
  { id: 3, name: 'User C', type: 'Tech & Digital', email: 'creativs@untitledui.com' },
  { id: 4, name: 'User D', type: 'Merch Apparel', email: 'creativs@untitledui.com' },
])
</script>

<template>
  <div class="space-y-8 animate-fade-in w-full pb-10">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.iconBg, stat.iconColor]">
            <!-- Icons -->
            <svg v-if="stat.icon === 'store'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <svg v-else-if="stat.icon === 'flag'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <svg v-else-if="stat.icon === 'scale'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-[32px] font-bold text-gray-900 mb-2 leading-none">{{ stat.value }}</h3>
          <p class="text-sm text-gray-500 font-medium leading-snug">{{ stat.title }}</p>
        </div>
      </div>
    </div>

    <!-- Antrian Peninjauan Segera -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-800">Antrian Peninjauan Segera</h2>
        <button class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500">
          <thead class="text-xs text-gray-400 bg-gray-50/50 uppercase border-b border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Nama Vendor</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider flex items-center gap-1">
                Tipe
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Email</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="user in pendingReviews" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4 font-semibold text-gray-800">{{ user.name }}</td>
              <td class="px-6 py-4 font-medium text-gray-600">{{ user.type }}</td>
              <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 text-right">
                <button class="bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
                  Lihat
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Previous
        </button>
        <div class="hidden sm:flex items-center gap-1">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-800 font-medium text-sm">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">3</button>
          <span class="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">8</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">9</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">10</button>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
          Next
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
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
