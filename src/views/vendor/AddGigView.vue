<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '../../components/ui/Toast.vue'

const router = useRouter()
const title = ref('')
const description = ref('')
const showToast = ref(false)
const toastData = reactive<{type: 'info' | 'success' | 'error', title: string, subtitle: string}>({
  type: 'info',
  title: '',
  subtitle: ''
})

const tiers = ref([
  { id: 'TIER 01', name: 'Basic', price: '0.00' },
  { id: 'TIER 02', name: 'Standard', price: '0.00', isHighlighted: true },
  { id: 'TIER 03', name: 'Premium', price: '0.00' },
])

function handleComplete() {
  toastData.type = 'success'
  toastData.title = 'Berhasil Terbit'
  toastData.subtitle = 'Layanan Anda sedang dikirim untuk moderasi'
  showToast.value = true
  
  setTimeout(() => {
    router.push('/vendor/associate/catalog')
  }, 2000)
}
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto space-y-12 pb-24">
    <div v-if="showToast" class="fixed top-8 right-8 z-50">
      <Toast :type="toastData.type" :title="toastData.title" :subtitle="toastData.subtitle" />
    </div>

    <!-- Header -->
    <div class="flex items-center gap-4">
      <button @click="router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
      </button>
    </div>

    <div class="bg-white rounded-[40px] shadow-sm border border-gray-100 p-12 space-y-10">
      <h1 class="text-2xl font-bold text-gray-900">Buat Layanan Baru</h1>

      <!-- Name Section -->
      <div class="space-y-3">
        <label class="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">Nama Layanan</label>
        <input 
          v-model="title"
          type="text" 
          placeholder="contoh: Desain Logo"
          class="w-full px-6 py-4 bg-gray-100/80 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:border-[#4B6BFB] focus:ring-1 focus:ring-[#4B6BFB] outline-none transition-all"
        />
      </div>

      <!-- Description Section -->
      <div class="space-y-3">
        <label class="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">Deskripsi</label>
        <textarea 
          v-model="description"
          placeholder="Jelaskan nilai utama layanan dan dampak operasionalnya..."
          class="w-full px-6 py-4 bg-gray-100/80 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:border-[#4B6BFB] focus:ring-1 focus:ring-[#4B6BFB] outline-none transition-all h-32 resize-none"
        ></textarea>
      </div>

      <!-- Pricing Section -->
      <div class="space-y-6">
        <h2 class="text-base font-bold text-gray-900">Harga & Ketentuan</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="tier in tiers" 
            :key="tier.id"
            class="p-8 rounded-[32px] border transition-all space-y-6"
            :class="tier.isHighlighted ? 'border-[#4B6BFB] bg-[#F8F9FF] shadow-lg scale-105 ring-1 ring-[#4B6BFB]/20' : 'border-[#E6F0FF] bg-white'"
          >
            <span class="px-3 py-1 bg-[#E6F0FF] text-[#4B6BFB] text-[8px] font-bold rounded-full uppercase tracking-widest">
              {{ tier.id }}
            </span>
            <h3 class="text-lg font-bold text-gray-900">{{ tier.name }}</h3>
            
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rp</span>
              <input 
                type="text" 
                v-model="tier.price"
                class="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:border-[#4B6BFB] outline-none"
              />
            </div>

            <textarea 
              placeholder="Fitur yang termasuk dalam paket ini"
              class="w-full p-4 border border-gray-100 rounded-xl text-xs text-gray-500 min-h-[100px] resize-none focus:border-[#4B6BFB] outline-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Portfolio Section -->
      <div class="space-y-4">
        <h2 class="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest">Portfolio Assets</h2>
        <div class="border-2 border-dashed border-[#E6F0FF] rounded-3xl p-12 flex flex-col items-center justify-center space-y-3 bg-[#FAF9F9]/50 hover:bg-[#F8F9FF] transition-colors cursor-pointer group">
          <div class="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          </div>
          <div class="text-center">
            <p class="text-sm font-medium text-gray-900">
              Drag and drop assets or <span class="text-[#4B6BFB] font-bold">browse</span>
            </p>
            <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
              High-resolution PNG, JPG (Min 1080p recommended)
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex justify-between items-center pt-8">
        <button class="px-12 py-4 border-2 border-[#4B6BFB] text-[#4B6BFB] rounded-2xl text-sm font-bold hover:bg-[#4B6BFB] hover:text-white transition-all">
          Simpan Draf
        </button>
        <button 
          @click="handleComplete"
          class="px-16 py-4 bg-[#0A1D56] text-white rounded-2xl text-sm font-bold hover:bg-[#051030] transition-all shadow-xl shadow-[#0A1D56]/20"
        >
          Selesai
        </button>
      </div>
    </div>
  </div>
</template>

