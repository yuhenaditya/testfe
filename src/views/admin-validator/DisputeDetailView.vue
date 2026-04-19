<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const disputeId = route.params.id ? `#${route.params.id}` : '#DS-90422'
const status = ref('Menunggu')

// Modal state
const showConfirmModal = ref(false)
const confirmAction = ref<'approve' | 'reject' | null>(null)

function goBack() {
  router.push('/admin-validator/disputes')
}

function handleAction(action: 'approve' | 'reject') {
  confirmAction.value = action
  showConfirmModal.value = true
}

function closeConfirmModal() {
  showConfirmModal.value = false
  confirmAction.value = null
}

function submitDecision() {
  // Sistem Logic (SOP step 5)
  status.value = 'WAITING_FINANCE'
  closeConfirmModal()
  // Di aplikasi nyata, kirim payload ke API di sini, 
  // lalu bisa redirect atau beri notifikasi sukses.
  setTimeout(() => {
    goBack()
  }, 1000)
}
</script>

<template>
  <div class="space-y-6 animate-fade-in w-full pb-20 max-w-[800px] mx-auto">
    
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4">
      <button @click="goBack" class="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-800 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
      </button>
    </div>

    <!-- Title and Status Badge -->
    <div class="flex items-center gap-4">
      <h2 class="text-3xl font-extrabold text-[#0B152A]">{{ disputeId }}</h2>
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-100 bg-yellow-50 text-xs font-bold text-yellow-600">
        <span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
        {{ status }}
      </div>
    </div>

    <!-- Bukti Section -->
    <div class="bg-[#F8F9FA] rounded-[20px] p-8 border border-gray-100">
      <h3 class="font-extrabold text-[#0B152A] text-lg mb-6">Bukti</h3>
      
      <div class="space-y-4">
        <!-- Bukti File 1 -->
        <div class="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">Logo</h4>
              <p class="text-[11px] text-gray-500 mt-0.5">File Format: PNG &nbsp;&nbsp; File Size: 2MB</p>
            </div>
          </div>
          <button class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>

        <!-- Bukti File 2 -->
        <div class="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">Asset</h4>
              <p class="text-[11px] text-gray-500 mt-0.5">File Format: PNG &nbsp;&nbsp; File Size: 1.5MB</p>
            </div>
          </div>
          <button class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Ringkasan Kasus -->
    <div class="bg-white rounded-[20px] p-8 border border-gray-100 shadow-sm">
      <h3 class="font-extrabold text-[#1E3A8A] text-lg mb-8">Ringkasan Kasus</h3>
      
      <div class="space-y-6">
        <div class="flex justify-between items-center border-b border-gray-100 pb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">ID TRANSAKSI</span>
          <span class="text-sm font-medium text-gray-800">#TXN-882-1004</span>
        </div>
        
        <div class="flex justify-between items-center border-b border-gray-100 pb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">TOTAL PESANAN</span>
          <span class="text-base font-bold text-[#1E3A8A]">Rp428.050</span>
        </div>
        
        <div class="flex justify-between items-center pb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">KATEGORI</span>
          <span class="text-sm font-bold text-gray-800">Home & Decor</span>
        </div>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div v-if="status === 'Menunggu'" class="flex flex-col items-end gap-3 pt-6">
      <button 
        @click="handleAction('approve')" 
        class="bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 px-8 rounded-xl uppercase tracking-wide text-sm transition-colors shadow-sm w-auto min-w-[280px]"
        style="background-color: #16A34A;"
      >
        Setujui Pengembalian Dana
      </button>
      <button 
        @click="handleAction('reject')" 
        class="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl uppercase tracking-wide text-sm transition-colors shadow-sm w-auto min-w-[280px]"
        style="background-color: #DC2626;"
      >
        Tolak Keluhan
      </button>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div class="absolute inset-0" @click="closeConfirmModal"></div>
      <div class="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in p-8 text-center">
        <div class="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#1E3A8A] mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 class="text-xl font-extrabold text-gray-900 mb-2">Konfirmasi Putusan</h3>
        <p class="text-sm text-gray-500 mb-8">
          Apakah Anda yakin ingin <strong>{{ confirmAction === 'approve' ? 'menyetujui pengembalian dana (Refund)' : 'menolak keluhan (Lanjutkan Pembayaran)' }}</strong> untuk sengketa ini? Keputusan ini tidak dapat dibatalkan.
        </p>
        
        <div class="flex gap-3 w-full">
          <button @click="closeConfirmModal" class="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">
            Batal
          </button>
          <button @click="submitDecision" class="flex-1 py-3 px-4 bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold rounded-xl transition-colors">
            Ya, Lanjutkan
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

.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
