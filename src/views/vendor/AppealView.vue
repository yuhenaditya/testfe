<script setup lang="ts">
import { ref } from 'vue'

const isAppealModalOpen = ref(false)

const openAppealModal = () => {
  isAppealModalOpen.value = true
}

const closeAppealModal = () => {
  isAppealModalOpen.value = false
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="mb-10">
      <h1 class="text-[32px] font-bold text-gray-900 mb-1">Deskripsi Tugas</h1>
      <p class="text-gray-500 italic font-medium">Pesanan Dalam Investigasi Admin</p>
    </div>

    <div class="max-w-4xl bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-8">
      <div class="flex justify-between items-start">
        <div class="space-y-1">
          <span class="text-xs font-bold text-[#4B6BFB]">#ORD-8790</span>
          <h2 class="text-2xl font-bold text-gray-900">Penulisan Konten</h2>
          <p class="text-sm font-medium text-gray-500">Paket Premium</p>
        </div>
        <span class="px-4 py-1.5 bg-[#FFF2EB] text-[#FF6B00] text-xs font-bold rounded-full">Due Today</span>
      </div>

      <div class="flex items-center gap-3">
        <img src="https://i.pravatar.cc/150?u=ammi" class="w-10 h-10 rounded-full object-cover" />
        <span class="font-bold text-gray-900">Ammi Watts</span>
      </div>

      <div class="space-y-4">
        <h3 class="text-base font-bold text-gray-900">Penjelasan dari Client</h3>
        <div class="p-6 border border-[#4B6BFB] rounded-2xl bg-white">
          <p class="text-sm text-gray-500 leading-relaxed italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-12 max-w-4xl">
      <button 
        @click="openAppealModal"
        class="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/95 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl group"
      >
        <span class="text-xl font-bold">Hubungi Super Admin</span>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
          <svg class="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>

    <!-- Appeal Modal -->
    <Teleport to="body">
      <div v-if="isAppealModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div class="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center text-white">
            <h3 class="text-xl font-bold">Ajukan Banding</h3>
            <button @click="closeAppealModal" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- Info Alert -->
            <div class="bg-[#F8F9FA] rounded-xl p-4 flex gap-4 items-start border border-gray-100">
              <div class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p class="text-sm text-gray-500 font-medium pt-1 leading-relaxed">
                Mohon konfirmasi dan komunikasi dengan client, terkait jasa atau barang yang ditawarkan
              </p>
            </div>

            <!-- Order Data Card -->
            <div class="border border-gray-100 rounded-2xl p-6 space-y-4 bg-[#FFFAF5]/30">
              <h4 class="text-base font-bold text-gray-900">Data Pesanan:</h4>
              <ul class="space-y-3 text-sm">
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Client: <span class="underline">Ammi Watts</span></span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Nomor Pesanan: ORD-8790</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Di Ajukan Jam: 00:00</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Pembayaran: Transfer Bank-Bank Mandiri (VA)</span>
                </li>
              </ul>
            </div>

            <!-- Screenshot Proof -->
            <div class="border border-gray-100 rounded-2xl p-6 space-y-4">
              <h4 class="text-base font-bold text-gray-900">Bukti Screenshot</h4>
              <div class="flex flex-wrap gap-3">
                <div class="bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  File_1234.JPEG
                </div>
                <div class="bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  File_1234.JPEG
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button class="px-8 py-4 bg-[#1E3A8A] text-white font-bold rounded-2xl hover:bg-[#1E3A8A]/95 transition-all shadow-xl">
                Laporkan Ke Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
