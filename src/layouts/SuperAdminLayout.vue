<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarCollapsed = ref(false)

const menuItems = [
  {
    name: 'Beranda',
    path: '/super-admin/dashboard',
    icon: 'home',
  },
  {
    name: 'Manajemen Pengguna',
    path: '/super-admin/user-management',
    icon: 'users',
  },
  {
    name: 'Ringkasan Pendapatan',
    path: '/super-admin/revenue-summary',
    icon: 'wallet',
  },
  {
    name: 'Permintaan Banding',
    path: '/super-admin/appeal-requests',
    icon: 'gavel',
  },
  {
    name: 'Konfigurasi Sistem',
    path: '/super-admin/system-config',
    icon: 'config',
  },
  {
    name: 'Manajemen Peran',
    path: '/super-admin/role-management',
    icon: 'role',
  },
  {
    name: 'Log Audit Admin',
    path: '/super-admin/audit-log',
    icon: 'document',
  },
  {
    name: 'Banding Sengketa',
    path: '/super-admin/disputes',
    icon: 'alert',
  },
  {
    name: 'Kontrol Pemeliharaan',
    path: '/super-admin/maintenance',
    icon: 'wrench',
  },
]

const currentPath = computed(() => route.path)

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="min-h-screen bg-[#F9F7F7] flex p-6 gap-6 font-sans text-gray-800">
    <!-- Sidebar Container -->
    <aside
      :class="[
        'sticky top-6 h-[calc(100vh-3rem)] transition-all duration-300 z-40 flex flex-col',
        sidebarCollapsed ? 'w-[72px]' : 'w-64',
      ]"
    >
      <!-- Main Float Menu -->
      <div class="bg-[#1E3A8A] text-white rounded-[32px] flex flex-col flex-1 shadow-lg py-6 overflow-hidden">
        <!-- Navigation -->
        <nav class="flex-1 space-y-2 px-3 overflow-y-auto w-full">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-200 group w-full',
              currentPath === item.path
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/60 hover:bg-white/5 hover:text-white',
              sidebarCollapsed ? 'justify-center' : 'justify-start'
            ]"
            :title="sidebarCollapsed ? item.name : ''"
          >
            <!-- Icons -->
            <div class="w-6 h-6 shrink-0 flex items-center justify-center">
              <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <svg v-else-if="item.icon === 'users'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else-if="item.icon === 'wallet'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>
              <svg v-else-if="item.icon === 'gavel'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M14 6l-6 6M10 10l-6 6a2.828 2.828 0 104 4l6-6M12 4a3 3 0 013-3h2a3 3 0 013 3v2a3 3 0 01-3 3h-2A3 3 0 0112 6z" />
              </svg>
              <svg v-else-if="item.icon === 'config'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else-if="item.icon === 'role'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 19v-6.5l3.5 3.5L12 9l3.5 7L19 12.5V19H5zM5 19h14v2H5v-2z" />
              </svg>
              <svg v-else-if="item.icon === 'document'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-else-if="item.icon === 'alert'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg v-else-if="item.icon === 'wrench'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.486-2.95 1.414l-4.5 6.096A3.75 3.75 0 013 18.75v-.825a1.5 1.5 0 01.44-1.06l1.06-1.06a1.5 1.5 0 011.06-.44h.825a3.75 3.75 0 002.772-1.22l6.095-4.5c.929-.685 1.506-1.873 1.415-2.95-.084-1.065.516-2.193 1.583-2.61a4.5 4.5 0 013.51.52z" />
              </svg>
            </div>
            
            <div
              class="w-full text-body-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 flex-1"
              :class="sidebarCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100 block'"
            >
              {{ item.name }}
            </div>
          </router-link>
        </nav>
      </div>

      <!-- Settings and Avatar outside the blue box -->
      <div class="mt-8 flex flex-col gap-6 w-full items-center">
        <!-- Toggle Button for Sidebar (Instead of gear if needed, but let's keep gear) -->
        <button
          @click="toggleSidebar"
          class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-md bg-white border border-gray-100 hover:shadow-lg transition-shadow"
          :class="!sidebarCollapsed && 'px-4 w-full justify-start gap-4 rounded-xl'"
        >
          <img src="https://i.pravatar.cc/150?img=11" alt="User Profile" class="w-full h-full object-cover" v-if="sidebarCollapsed" />
          <img src="https://i.pravatar.cc/150?img=11" alt="User Profile" class="w-8 h-8 rounded-full object-cover" v-if="!sidebarCollapsed" />
          <span v-if="!sidebarCollapsed" class="font-semibold text-sm">Super Admin</span>
        </button>

        <button class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors" @click="toggleSidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 w-full max-w-[1240px] mx-auto">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles removed because tailwind handles everything */
</style>

