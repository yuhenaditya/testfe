<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

const route = useRoute()
const authStore = useAuthStore()

const userRole = computed(() => authStore.user?.role?.toUpperCase() || 'MERCHANT_OWNER')

const menuItems = computed(() => {
  const baseItems = [
    { 
      name: 'Beranda', 
      path: userRole.value === 'MERCHANT_ASSOCIATE' ? '/vendor/associate/dashboard' : '/vendor/dashboard', 
      icon: 'home' 
    },
    { 
      name: 'Katalog', 
      path: userRole.value === 'MERCHANT_ASSOCIATE' ? '/vendor/associate/catalog' : '/vendor/catalog', 
      icon: 'catalog' 
    },
    { name: 'Keuangan', path: '/vendor/finance', icon: 'wallet' },
    { 
      name: 'Pesanan', 
      path: userRole.value === 'MERCHANT_ASSOCIATE' ? '/vendor/associate/orders' : '/vendor/orders', 
      icon: 'hammer' 
    },
    { name: 'Pengaturan', path: '/vendor/settings', icon: 'settings' },
    { name: 'Laporan', path: '/vendor/reports', icon: 'report' },
    { name: 'Pesan', path: userRole.value === 'MERCHANT_ASSOCIATE' ? '/vendor/associate/messages' : '/vendor/messages', icon: 'document' },
    { name: 'Peringatan', path: '/vendor/alerts', icon: 'alert' },
    { name: 'Bantuan', path: '/vendor/help', icon: 'wrench' },
  ]

  // Filter Keuangan for associates
  if (userRole.value === 'MERCHANT_ASSOCIATE') {
    return baseItems.filter(item => item.icon !== 'wallet')
  }

  return baseItems
})

const currentPath = computed(() => route.path)
</script>

<template>
  <div class="min-h-screen bg-[#FAF9F9] flex p-6 gap-8 font-sans text-gray-800">
    <!-- Sidebar Container (Collapsed by default for Vendor design) -->
    <aside class="sticky top-6 self-start transition-all duration-300 z-40 flex flex-col w-[72px]">
      <div class="bg-[#1E3A8A] text-white rounded-3xl flex flex-col items-center py-6 shadow-xl overflow-hidden min-h-[600px]">
        <nav class="flex flex-col gap-4 px-3 w-full items-center">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 group',
              currentPath === item.path
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-white/60 hover:bg-white/10 hover:text-white',
            ]"
            :title="item.name"
          >
            <!-- Icons -->
            <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <svg v-else-if="item.icon === 'catalog'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            <svg v-else-if="item.icon === 'wallet'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            <svg v-else-if="item.icon === 'hammer'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
            <svg v-else-if="item.icon === 'settings'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <svg v-else-if="item.icon === 'report'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <svg v-else-if="item.icon === 'document'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <svg v-else-if="item.icon === 'alert'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <svg v-else-if="item.icon === 'wrench'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 w-full max-w-[1400px] mx-auto bg-[#FAF9F9]">
      <router-view />
    </div>
  </div>
</template>
