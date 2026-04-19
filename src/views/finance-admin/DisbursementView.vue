<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('All')
const tabs = ['All', 'Menunggu', 'Selesai', 'Ditolak']

const requests = ref([
  { 
    id: 1, 
    pemohon: 'User A', 
    status: 'Menunggu', 
    vendor: 'Creativ Studio', 
    email: 'creativs@untitledui.com',
    saldo: 'Rp12.450.000,00',
    penarikan: 'Rp150.500,00',
    bank: 'Bank Indonesia',
    norek: '223 3535 8829',
    penerima: 'Creativ Studio',
    reqSummary: {
      diminta: 'Rp175.500,00',
      biaya: '-Rp22.000,00',
      pajak: '-0,00',
      total: 'Rp153.500,00'
    }
  },
  { 
    id: 2, 
    pemohon: 'User B', 
    status: 'Selesai', 
    vendor: 'Event Essentials', 
    email: 'events@untitledui.com',
    saldo: 'Rp5.000.000,00',
    penarikan: 'Rp1.000.000,00',
    bank: 'BCA',
    norek: '012 3456 789',
    penerima: 'Event Essentials',
    reqSummary: {
      diminta: 'Rp1.000.000,00',
      biaya: '-Rp5.000,00',
      pajak: '-0,00',
      total: 'Rp995.000,00'
    }
  },
  { 
    id: 3, 
    pemohon: 'User C', 
    status: 'Menunggu', 
    vendor: 'Tech & Digital', 
    email: 'tech@untitledui.com',
    saldo: 'Rp8.200.000,00',
    penarikan: 'Rp2.500.000,00',
    bank: 'Bank Mandiri',
    norek: '137 000 123 4567',
    penerima: 'Tech & Digital',
    reqSummary: {
      diminta: 'Rp2.500.000,00',
      biaya: '-Rp12.500,00',
      pajak: '-0,00',
      total: 'Rp2.487.500,00'
    }
  },
  { 
    id: 4, 
    pemohon: 'User D', 
    status: 'Ditolak', 
    vendor: 'Merch Apparel', 
    email: 'merch@untitledui.com',
    saldo: 'Rp1.500.000,00',
    penarikan: 'Rp2.000.000,00',
    bank: 'BRI',
    norek: '0011 2233 4455 667',
    penerima: 'Merch Apparel',
    reqSummary: {
      diminta: 'Rp2.000.000,00',
      biaya: '-Rp10.000,00',
      pajak: '-0,00',
      total: 'Rp1.990.000,00'
    }
  },
])

const filteredRequests = computed(() => {
  if (activeTab.value === 'All') return requests.value
  return requests.value.filter(r => r.status === activeTab.value)
})

const currentView = ref<'list' | 'detail'>('list')
const selectedRequest = ref<any>(null)

function viewDetail(req: any) {
  selectedRequest.value = req
  currentView.value = 'detail'
}

function goBack() {
  currentView.value = 'list'
  selectedRequest.value = null
}

function markAsCompleted() {
  if (selectedRequest.value) {
    const idx = requests.value.findIndex(r => r.id === selectedRequest.value.id)
    if (idx !== -1) {
      const req = requests.value[idx]
      if (req) req.status = 'Selesai'
    }
  }
  goBack()
}

function getStatusClass(status: string) {
  switch (status) {
    case 'Selesai': return 'text-emerald-700 bg-emerald-50 border border-emerald-200'
    case 'Menunggu': return 'text-amber-700 bg-amber-50 border border-amber-200'
    case 'Ditolak': return 'text-red-700 bg-red-50 border border-red-200'
    default: return 'text-gray-700 bg-gray-50'
  }
}

function getStatusDotClass(status: string) {
  switch (status) {
    case 'Selesai': return 'bg-emerald-500'
    case 'Menunggu': return 'bg-amber-500'
    case 'Ditolak': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}
</script>

<template>
  <div class="space-y-6 pb-12 w-full max-w-6xl mx-auto font-sans">
    
    <!-- LIST VIEW -->
    <template v-if="currentView === 'list'">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-800">Daftar Permintaan Pencairan Dana (Withdrawal)</h1>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 flex gap-8">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          class="pb-4 text-sm font-semibold transition-colors relative"
          :class="activeTab === tab ? 'text-[#2A437E]' : 'text-gray-500 hover:text-gray-700'"
        >
          {{ tab }}
          <div v-if="activeTab === tab" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#2A437E] rounded-t-full"></div>
        </button>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <!-- Badge User Count -->
        <div class="p-5 border-b border-gray-100 flex items-center">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-[#7E56D8] bg-[#F4F0FC] border border-[#EBE4F9]">
            {{ filteredRequests.length }} User
          </span>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-white border-b border-gray-100 text-xs font-semibold text-gray-500">
                <th class="px-6 py-4">Nama Pemohon</th>
                <th class="px-6 py-4">Status <span class="text-gray-400">↓</span></th>
                <th class="px-6 py-4">Vendor <span class="text-gray-400">?</span></th>
                <th class="px-6 py-4">Email</th>
                <th class="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="req in filteredRequests" :key="req.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <span class="text-sm font-bold text-gray-900">{{ req.pemohon }}</span>
                </td>
                <td class="px-6 py-5">
                  <span :class="getStatusClass(req.status)" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(req.status)"></span>
                    {{ req.status }}
                  </span>
                </td>
                <td class="px-6 py-5">
                  <span class="text-sm font-bold text-gray-700">{{ req.vendor }}</span>
                </td>
                <td class="px-6 py-5">
                  <span class="text-sm font-bold text-gray-700">{{ req.email }}</span>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center justify-center">
                    <button 
                      @click="viewDetail(req)"
                      class="px-5 py-2 bg-[#2A437E] hover:bg-[#1e305a] text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Lihat
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <button class="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span>←</span> Previous
          </button>
          
          <div class="flex items-center gap-1">
            <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-900">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">3</button>
            <span class="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">8</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">9</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">10</button>
          </div>

          <button class="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            Next <span>→</span>
          </button>
        </div>

      </div>
    </template>

    <!-- DETAIL VIEW -->
    <template v-else-if="currentView === 'detail' && selectedRequest">
      <div class="space-y-6">
        
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <!-- Top Section: User & Saldo -->
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- User Card -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex items-center justify-between">
            <div class="flex items-center gap-5">
              <div class="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                <!-- User Avatar Placeholder -->
                <svg class="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h2 class="text-2xl font-black text-gray-900">{{ selectedRequest.vendor }}</h2>
            </div>
            <button class="px-6 py-2.5 bg-[#2A437E] hover:bg-[#1e305a] text-white text-sm font-bold rounded-lg transition-colors">
              Lihat Profil
            </button>
          </div>

          <!-- Saldo Card -->
          <div class="bg-[#1C64F2] rounded-2xl p-6 shadow-md text-white flex-1 relative overflow-hidden">
            <!-- Decorative circle -->
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <p class="text-sm text-blue-100 mb-1">Total Saldo</p>
            <h3 class="text-3xl font-bold mb-6">{{ selectedRequest.saldo }}</h3>
            
            <p class="text-xs text-blue-200 mb-1 uppercase tracking-wider font-semibold">JUMLAH PENARIKAN</p>
            <p class="text-xl font-bold">{{ selectedRequest.penarikan }}</p>
          </div>
        </div>

        <!-- Detail Pembayaran -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#2A437E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            <h3 class="font-bold text-gray-900">Detail Pembayaran</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">BANK NAME</p>
                <p class="font-bold text-gray-900">{{ selectedRequest.bank }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">NAMA PENERIMA</p>
                <p class="font-bold text-gray-900">{{ selectedRequest.penerima }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">ACCOUNT NUMBER</p>
                <p class="font-bold text-gray-900">{{ selectedRequest.norek }}</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50/80 px-6 py-4 border-t border-gray-100 flex gap-3 text-sm text-gray-500">
            <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>Pastikan detail rekening sesuai dengan data Anda sebelum memproses transfer.<br>Verifikasi kembali nama penerima dengan data registrasi perusahaan.</p>
          </div>
        </div>

        <!-- Request Summary -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-bold text-gray-900">Request Summary</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 font-medium">Jumlah Diminta</span>
              <span class="font-bold text-gray-900">{{ selectedRequest.reqSummary.diminta }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 font-medium">Biaya Layanan (0,5%)</span>
              <span class="font-bold text-red-500">{{ selectedRequest.reqSummary.biaya }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 font-medium">Potongan Pajak</span>
              <span class="font-bold text-red-500">{{ selectedRequest.reqSummary.pajak }}</span>
            </div>
          </div>
          <div class="px-6 py-5 border-t border-gray-100 flex justify-between items-center">
            <span class="font-bold text-gray-900">Total Dibayarkan</span>
            <span class="text-xl font-bold text-[#1C64F2]">{{ selectedRequest.reqSummary.total }}</span>
          </div>
        </div>

        <!-- Verifikasi Pembayaran (Opsional) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-bold text-gray-900 text-lg mb-1">Verifikasi Pembayaran (Opsional)</h3>
          <p class="text-sm text-gray-500 mb-6">Setelah melakukan pembayaran, unggah bukti transfer dan tandai permintaan ini sebagai selesai.</p>
          
          <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <p class="font-bold text-gray-900 mb-1">Drag and drop your files</p>
            <p class="text-xs text-gray-400 mb-4">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
            <button class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              Select File
            </button>
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex justify-end pt-2 pb-8">
          <button 
            @click="markAsCompleted"
            :disabled="selectedRequest.status === 'Selesai'"
            class="px-8 py-3.5 bg-[#2A437E] hover:bg-[#1e305a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
          >
            TANDAI SELESAI
          </button>
        </div>

      </div>
    </template>

  </div>
</template>

<style scoped>
</style>
