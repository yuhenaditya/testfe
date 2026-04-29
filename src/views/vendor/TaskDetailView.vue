<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const task = {
  id: '#ORD-8821',
  title: 'Design Postingan Media Sosial',
  package: 'Paket Premium',
  date: '25 Okt 2026',
  client: {
    name: 'Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah1'
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="mb-8">
      <h1 class="text-[32px] font-bold text-gray-900 mb-1">Deskripsi Tugas</h1>
      <p class="text-gray-500 italic text-sm">Pesanan Aktif Anda</p>
    </div>

    <div class="max-w-4xl space-y-8">
      <div class="bg-[#FFFAF5] rounded-3xl border border-[#F5EBE0] p-10 relative shadow-sm">
        <div class="flex justify-between items-start mb-8">
          <div>
            <span class="text-xs font-bold text-[#4B6BFB] mb-2 block">{{ task.id }}</span>
            <h2 class="text-[28px] font-bold text-gray-900 leading-tight mb-1">{{ task.title }}</h2>
            <p class="text-gray-900 font-medium italic text-sm">{{ task.package }}</p>
          </div>
          
          <div class="bg-[#1E3A8A] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {{ task.date }}
          </div>
        </div>

        <div class="flex items-center gap-3 mb-10">
          <img :src="task.client.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
          <span class="text-lg font-bold text-gray-900">{{ task.client.name }}</span>
        </div>

        <div class="space-y-4">
          <h3 class="text-base font-bold text-gray-900">Penjelasan dari Client</h3>
          <div class="border-2 border-[#4B6BFB] rounded-2xl p-6 bg-white/50">
            <p class="text-xs text-gray-700 leading-relaxed italic font-medium">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>

      <button class="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/95 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl group">
        <span class="text-xl font-bold">Deliver Work</span>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
          <svg class="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
