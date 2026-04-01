<script setup lang="ts">
import { ref } from 'vue'

const showAddModal = ref(false)
const showDetailModal = ref(false)
const selectedUser = ref<any>(null)

const stats = [
  {
    title: 'Total Admin Aktif',
    value: '7',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    icon: 'group'
  },
  {
    title: 'Active Validator',
    value: '5',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    icon: 'shield'
  },
  {
    title: 'Admin Finance',
    value: '5',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    icon: 'dollar'
  }
]

const users = ref([
  {
    name: 'Olivia Rhye',
    emailSub: 'olivia@gmail.com',
    status: 'Active',
    role: 'Admin Validator',
    email: 'olivia@untitledui.com',
    lastActive: '22menit lalu',
  },
  {
    name: 'Phoenix Baker',
    emailSub: 'phoenix@gmail.com',
    status: 'Active',
    role: 'Admin Validator',
    email: 'phoenix@untitledui.com',
    lastActive: '2 hari lalu',
  },
  {
    name: 'Lana Steiner',
    emailSub: 'lana@gmail.com',
    status: 'Active',
    role: 'Finance',
    email: 'lana@untitledui.com',
    lastActive: '1 jam lalu',
  },
  {
    name: 'Demi Wilkinson',
    emailSub: 'demiWilkinson@gmail.com',
    status: 'Active',
    role: 'Finance',
    email: 'demi@untitledui.com',
    lastActive: '1 minggu lalu',
  },
])

const openDetailModal = (user: any) => {
  selectedUser.value = user
  showDetailModal.value = true
}

const getRoleClass = (role: string) => {
  if (role === 'Admin Validator') return 'bg-blue-50 text-blue-700'
  if (role === 'Finance') return 'bg-orange-50 text-orange-700'
  return 'bg-gray-50 text-gray-700'
}
</script>

<template>
  <div class="space-y-6 pb-12 w-full max-w-6xl mx-auto font-sans relative">
    
    <!-- Modals Overlay -->
    <div v-if="showAddModal || showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
      
      <!-- Tambah Admin Baru Modal -->
      <div v-if="showAddModal" class="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative" @click.stop>
        <button @click="showAddModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Tambah Admin Baru</h3>
        <p class="text-sm text-gray-500 mb-8 leading-relaxed">Tambahkan pengguna admin baru ke sistem. Email undangan akan dikirim ke alamat email mereka.</p>
        
        <form class="space-y-5" @submit.prevent="showAddModal = false">
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-1.5">Nama lengkap</label>
            <input type="text" placeholder="Masukkan nama lengkap" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-1.5">Email</label>
            <input type="email" placeholder="admin@example.com" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-1.5">Peran</label>
            <div class="relative">
              <select class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white">
                <option>Validator</option>
                <option>Finance</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </div>
          <div class="pt-4">
            <button type="submit" class="w-full bg-brand-navy hover:bg-blue-800 text-white font-semibold rounded-xl px-4 py-2.5 transition-colors">
              Kirim Undangan
            </button>
          </div>
        </form>
      </div>

      <!-- Detail Admin Modal -->
      <div v-if="showDetailModal" class="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl relative" @click.stop>
        <button @click="showDetailModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        
        <!-- Modal Header Row -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Detail Admin</h3>
            <p class="text-sm text-gray-500 mt-1">Lihat informasi detail dan riwayat aktivitas</p>
          </div>
          <div class="flex flex-col gap-2 items-end">
             <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white text-gray-700 gap-1.5 shadow-sm">
               <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
               Active
             </span>
             <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold" :class="getRoleClass(selectedUser?.role)">
               {{ selectedUser?.role }}
             </span>
          </div>
        </div>

        <!-- User Info -->
        <div class="mb-6">
          <h4 class="text-lg font-bold text-gray-900">{{ selectedUser?.name || 'Olivia Rhye' }}</h4>
          <div class="flex items-center gap-1.5 mt-1 text-blue-500 text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a :href="'mailto:' + (selectedUser?.emailSub || 'olivia@gmail.com')">{{ selectedUser?.emailSub || 'olivia@gmail.com' }}</a>
          </div>
        </div>

        <!-- Info Boxes -->
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
            <div class="mt-0.5 text-red-500 bg-red-50 p-1.5 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-medium">Bergabung</p>
              <p class="text-sm font-bold text-gray-900 mt-0.5">Jan 15, 2026</p>
            </div>
          </div>
          <div class="border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
            <div class="mt-0.5 text-green-500 bg-green-50 p-1.5 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-medium">Terakhir aktif</p>
              <p class="text-sm font-bold text-gray-900 mt-0.5">{{ selectedUser?.lastActive || '22 menit lalu' }}</p>
            </div>
          </div>
        </div>

        <!-- Riwayat Aktivitas -->
        <div>
          <h4 class="text-base font-bold text-gray-900 mb-4">Riwayat Aktivitas</h4>
          <div class="border border-gray-200 rounded-2xl overflow-hidden flex flex-col p-1 gap-1">
             <!-- Activity 1 -->
             <div class="flex items-start justify-between p-3 pb-2 border-b border-gray-100">
               <div class="space-y-1 w-3/4">
                 <p class="text-xs font-bold text-gray-900">Menambahkan admin baru</p>
                 <p class="text-[11px] text-gray-500">User: Robert Martinez</p>
                 <p class="text-[11px] text-gray-500 truncate">Menambahkan peran Keuangan untuk operasional finansial</p>
               </div>
               <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap pt-1">2 jam<br/>lalu</span>
             </div>
             <!-- Activity 2 -->
             <div class="flex items-start justify-between p-3 pb-4">
               <div class="space-y-1 w-3/4">
                 <p class="text-xs font-bold text-gray-900">Menambahkan admin baru</p>
                 <p class="text-[11px] text-gray-500">User: Robert Martinez</p>
                 <p class="text-[11px] text-gray-500 truncate">Menambahkan peran Keuangan untuk operasional finansial</p>
               </div>
               <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap pt-1">2 jam<br/>lalu</span>
             </div>
             
             <!-- Audit Log Button -->
             <div class="p-3 pt-0 flex justify-end">
                <button class="bg-brand-navy hover:bg-blue-800 text-white font-semibold rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 transition-colors">
                  Buka Audit Log
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-200 pb-4 h-16">
      <h1 class="text-[22px] font-semibold text-gray-900 border-none">Manajemen Peran</h1>
      <button class="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full border border-white bg-red-500"></span>
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      <div v-for="(stat, idx) in stats" :key="idx" class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-start gap-4">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-xl flex items-center justify-center p-2.5" :class="stat.iconBg">
          <svg v-if="stat.icon === 'group'" class="w-full h-full" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else-if="stat.icon === 'shield'" class="w-full h-full" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <svg v-else-if="stat.icon === 'dollar'" class="w-full h-full" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 class="text-[32px] font-bold text-gray-900 leading-none mb-1">{{ stat.value }}</h2>
          <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
        </div>
      </div>
    </div>

    <!-- Filters and Action bar -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-center py-2">
      <!-- Search -->
      <div class="relative w-full sm:max-w-md flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="cari member"
          class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all"
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Status Dropdown -->
        <div class="relative">
          <button class="flex items-center justify-between w-full sm:w-auto gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-gray-50 focus:outline-none shadow-sm transition-all">
            Semua Status
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Role Dropdown -->
        <div class="relative">
          <button class="flex items-center justify-between w-full sm:w-auto gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-gray-50 focus:outline-none shadow-sm transition-all">
            Semua Role
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Add Admin Button -->
        <button @click="showAddModal = true" class="flex items-center justify-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-blue-800 shadow-sm transition-all whitespace-nowrap">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Tambah Admin
        </button>
      </div>
    </div>

    <!-- Main Card Content (Table) -->
    <div class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      <!-- Card Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center gap-3 bg-white">
        <h2 class="text-lg font-bold text-gray-900 leading-none">Team members</h2>
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
          4 users
        </span>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50/50">
            <tr>
              <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 tracking-wider">
                <div class="flex items-center gap-1.5 cursor-pointer">
                  Status
                  <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 tracking-wider">
                <div class="flex items-center gap-1.5 cursor-pointer">
                  Role
                  <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 tracking-wider whitespace-nowrap">
                Aktivitas Terakhir
              </th>
              <th scope="col" class="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 tracking-wider">
                <span class="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(user, index) in users" :key="index">
              <tr class="hover:bg-gray-50 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-gray-900">{{ user.name }}</span>
                    <span class="text-[13px] text-gray-500">{{ user.emailSub }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white text-gray-700 gap-1.5 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full" :class="user.status === 'Active' ? 'bg-green-500' : 'bg-green-500'"></span>
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shadow-sm border border-transparent" :class="getRoleClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                   <span class="text-sm text-gray-600">{{ user.email }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                   <span class="text-sm text-gray-500">{{ user.lastActive }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-3">
                    <button class="text-gray-400 hover:text-red-500 transition-colors" title="Buka Detail" @click="openDetailModal(user)"> <!-- Assigned trigger to trash bin strictly for mock although it's odd, or eye is better -->
                      <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button @click="openDetailModal(user)" class="text-gray-400 hover:text-gray-600 transition-colors" title="Lihat">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="bg-white px-6 py-4 flex items-center border-t border-gray-200 justify-between">
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Previous
        </button>

        <!-- Page Numbers -->
        <div class="hidden md:flex items-center gap-1.5">
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg bg-gray-100 text-gray-900 transition-colors">1</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">2</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">3</button>
          <span class="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-600">...</span>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">8</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">9</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">10</button>
        </div>

        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none">
          Next
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Scoped styles are not needed, all custom styling handled by layout/tailwind */
</style>
