<script setup lang="ts">
import { ref } from 'vue'

const transactions = ref([
  {
    date: '2023-10-24 14:20',
    description: 'Order #ORD-8820 Payment',
    amount: 'Rp 50.000',
    type: 'Pemasukan',
    status: 'Selesai'
  },
  {
    date: '2023-10-24 11:10',
    description: 'Refund for Order #MP-82003',
    amount: 'Rp 100.000',
    type: 'Pengeluaran',
    status: 'Disetujui'
  },
  {
    date: '2023-10-24 09:30',
    description: 'Order #ORD-8815 Payment',
    amount: 'Rp 1.500.000',
    type: 'Pemasukan',
    status: 'Selesai'
  },
  {
    date: '2023-10-23 18:20',
    description: 'Withdraw (Merchant)',
    amount: 'Rp 300.000',
    type: 'Pengeluaran',
    status: 'Ditolak'
  }
])

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Selesai':
      return 'bg-[#E6F9F1] text-[#10B981]'
    case 'Disetujui':
      return 'bg-[#E6F9F1] text-[#10B981]'
    case 'Ditolak':
      return 'bg-[#FFE6E6] text-[#EF4444]'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="mb-8">
      <h1 class="text-[32px] font-bold text-gray-900 mb-1">My Wallet</h1>
    </div>

    <div class="space-y-6">
      <!-- Balance Cards -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Main Balance Card -->
        <div class="flex-1 bg-[#10B981] rounded-[24px] p-8 text-white relative overflow-hidden shadow-lg h-[220px] flex flex-col justify-between">
          <div class="relative z-10">
            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" />
              </svg>
            </div>
            <div class="space-y-1">
              <div class="text-[36px] font-bold leading-tight">Rp 350.000</div>
              <div class="text-white/80 text-sm font-medium">Saldo Anda</div>
            </div>
          </div>
          
          <div class="absolute bottom-0 left-0 right-0 bg-black/10 px-8 py-4 flex flex-col items-end">
            <div class="text-base font-bold">Rp 50.000</div>
            <div class="text-[10px] text-white/80">Uang Masuk Bulan Ini</div>
          </div>
        </div>

        <!-- On-Hold Card -->
        <div class="w-full lg:w-[320px] bg-[#FBBF24] rounded-[24px] p-8 text-white shadow-lg h-[220px] flex flex-col justify-start relative overflow-hidden">
          <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" />
            </svg>
          </div>
          <div class="space-y-1">
            <div class="text-[32px] font-bold leading-tight">Rp 200.000</div>
            <div class="text-white/90 text-sm font-medium">On-Hold</div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <router-link 
        to="/vendor/withdraw"
        class="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/95 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl group"
      >
        <span class="text-xl font-bold">Tarik Duit (Withdraw)</span>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
          <svg class="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </router-link>

      <!-- Transaction Table -->
      <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mt-8">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Aktivitas Keuangan Terbaru</h2>
          <button class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50">
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Jumlah</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Jenis</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx, index) in transactions" :key="index" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                <td class="px-6 py-5 text-xs font-medium text-gray-600">{{ tx.date }}</td>
                <td class="px-6 py-5 text-xs font-bold text-gray-800">{{ tx.description }}</td>
                <td class="px-6 py-5 text-xs font-bold text-center" :class="tx.type === 'Pemasukan' ? 'text-gray-900' : 'text-[#EF4444]'">
                  {{ tx.amount }}
                </td>
                <td class="px-6 py-5 text-center">
                  <div class="inline-flex items-center gap-1.5 text-xs font-bold" :class="tx.type === 'Pemasukan' ? 'text-[#10B981]' : 'text-[#EF4444]'">
                    <svg v-if="tx.type === 'Pemasukan'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    {{ tx.type }}
                  </div>
                </td>
                <td class="px-6 py-5 text-center">
                  <span class="px-3 py-1 rounded-full text-[10px] font-bold" :class="getStatusClasses(tx.status)">
                    {{ tx.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-50 flex justify-end gap-2">
          <button class="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 hover:border-gray-200 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button class="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:border-gray-200 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
