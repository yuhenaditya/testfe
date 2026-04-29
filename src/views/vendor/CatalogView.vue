<script setup lang="ts">
import { ref } from 'vue'
import Button from '../../components/ui/Button.vue'

const gigs = ref([
  {
    id: 1,
    title: 'Jasa Desain Keren Banget',
    description: 'Lorem ipsum dolor sit...',
    packages: ['basic', 'standard', 'premium'],
    isPromoted: true,
    media: [
      { type: 'image', name: 'File_1234.JPEG' },
      { type: 'video', name: 'File_1234.MOV' }
    ]
  },
  {
    id: 2,
    title: 'Jasa Fotografi Wisuda',
    description: 'Lorem ipsum dolor sit...',
    packages: ['standard', 'premium'],
    media: [
      { type: 'video', name: 'File_1234.MOV' }
    ]
  },
  {
    id: 3,
    title: 'Jasa Videogafi Gokil',
    description: 'Lorem ipsum dolor sit...',
    packages: ['basic', 'standard'],
    media: [
      { type: 'image', name: 'File_1234.JPEG' }
    ]
  },
  {
    id: 4,
    title: 'Stock Photo 32 Pcs',
    description: 'Lorem ipsum dolor sit...',
    packages: ['premium'],
    media: [
      { type: 'image', name: 'File_1234.JPEG' },
      { type: 'video', name: 'File_1234.MOV' }
    ]
  }
])
</script>

<template>
  <div class="py-2 pb-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-xl font-medium text-gray-800">Dashboard Overview</h1>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <!-- Card 1 -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">12</div>
        <p class="text-gray-500 text-sm leading-relaxed">Vendor baru yang membutuhkan validasi</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
        <div class="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">5</div>
        <p class="text-gray-500 text-sm leading-relaxed">Laporan pengguna terkait aktivitas mencurigakan.</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
        <div class="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">3</div>
        <p class="text-gray-500 text-sm leading-relaxed">Kasus transaksi tertunda atau klaim pengembalian dana pembeli.</p>
      </div>
    </div>

    <!-- My Gigs Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-10 ml-12">
      <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl">
        <h2 class="text-lg font-bold text-gray-900">My Gigs</h2>
        <router-link to="/vendor/catalog/add" class="px-5 py-2 text-sm font-medium rounded-lg bg-brand-navy text-white hover:bg-brand-navy/90 transition-colors">Add New</router-link>
      </div>
      
      <div class="">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-gray-100">
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Judul</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Deskripsi</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Harga Paket</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Media Sampul</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="gig in gigs" :key="gig.id" class="hover:bg-gray-50 transition-colors bg-white group">
              <td class="py-5 px-6 relative">
                <div v-if="gig.isPromoted" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex flex-col items-end">
                  <div class="w-12 h-12 bg-[#F1B44C] rounded-tl-lg flex items-center justify-center text-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="w-12 h-1.5 bg-gray-100 rounded-bl-lg overflow-hidden border-t border-white/10">
                    <div class="h-full bg-[#5FC48C] countdown-animate"></div>
                  </div>
                </div>
                <span class="font-bold text-sm text-gray-900">{{ gig.title }}</span>
              </td>
              <td class="py-5 px-6">
                <span class="text-sm font-bold text-gray-500">{{ gig.description }}</span>
              </td>
              <td class="py-5 px-6">
                <div class="flex items-center gap-1.5">
                  <div v-if="gig.packages.includes('basic')" class="w-8 h-8 rounded-lg bg-gray-500 text-white flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
                  </div>
                  <div v-if="gig.packages.includes('standard')" class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
                  </div>
                  <div v-if="gig.packages.includes('premium')" class="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
                  </div>
                </div>
              </td>
              <td class="py-5 px-6">
                <div class="flex items-center gap-2 relative">
                  <div 
                    v-for="(item, idx) in gig.media" 
                    :key="idx" 
                    class="flex items-center gap-2 bg-brand-navy text-white text-xs px-3 py-1.5 rounded-lg shrink-0 z-10"
                    :class="idx > 0 ? '-ml-8 opacity-50 relative' : 'relative z-20'"
                  >
                    <svg v-if="item.type === 'image'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span v-if="idx === 0" class="max-w-[80px] truncate">{{ item.name }}</span>
                    <span v-else class="max-w-[40px] truncate">...</span>
                  </div>
                </div>
              </td>
              <td class="py-5 px-6 text-center">
                <router-link :to="`/vendor/catalog/edit/${gig.id}`" class="bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded inline-block">
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Previous
        </button>
        
        <div class="flex items-center gap-2">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-900 font-bold text-sm">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 font-bold text-sm hover:bg-gray-50">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 font-bold text-sm hover:bg-gray-50">3</button>
          <span class="w-8 h-8 flex items-center justify-center text-gray-500 font-bold text-sm">...</span>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 font-bold text-sm hover:bg-gray-50">8</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 font-bold text-sm hover:bg-gray-50">9</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 font-bold text-sm hover:bg-gray-50">10</button>
        </div>
        
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Next
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-animate {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: 
    shimmer 2s infinite linear,
    countdown 15s infinite linear;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes countdown {
  0% { width: 100%; }
  100% { width: 0%; }
}
</style>
