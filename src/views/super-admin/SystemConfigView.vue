<script setup lang="ts">
import { ref } from 'vue'

// Data fee
const currentFee = ref('5%')
const newFee = ref('7')

// Maintenance Mode
const maintenanceMode = ref(false)
const maintenanceMessage = ref('')

// Categories
const newCategoryName = ref('')
const newCategoryStatus = ref('Aktif')
const categories = ref([
  { id: 1, name: 'Desain Grafis', count: 3 },
  { id: 2, name: 'Desain Grafis', count: 3 },
  { id: 3, name: 'Desain Grafis', count: 3 },
  { id: 4, name: 'Desain Grafis', count: 3 },
  { id: 5, name: 'Desain Grafis', count: 3 },
  { id: 6, name: 'Desain Grafis', count: 3 },
])

// Modal State
const showSecurityModal = ref(false)
const adminPassword = ref('')
const pendingActionName = ref('')

function openSecurityModal(action: string) {
  pendingActionName.value = action
  showSecurityModal.value = true
}

function handleAddCategory() {
  if (newCategoryName.value.trim()) {
    openSecurityModal('add-category')
  }
}

function confirmAction() {
  if (pendingActionName.value === 'add-category') {
    categories.value.push({
      id: categories.value.length + 1,
      name: newCategoryName.value,
      count: 0
    })
    newCategoryName.value = ''
  } else if (pendingActionName.value === 'update-fee') {
    // mock update fee
    currentFee.value = newFee.value + '%'
  } else if (pendingActionName.value === 'toggle-maintenance') {
    // mock toggle
    maintenanceMode.value = !maintenanceMode.value
  }
  
  showSecurityModal.value = false
  adminPassword.value = ''
}
</script>

<template>
  <div class="pb-10 font-sans">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-[28px] font-semibold text-gray-800 leading-tight">Konfigurasi Sistem</h1>
    </header>

    <div class="space-y-6">
      
      <!-- Card 1: Fee & Komisi Platform -->
      <section class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
        <div class="flex items-start justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#3D4ED8]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-[17px] font-semibold text-gray-800">Fee & Komisi Platform</h2>
              <p class="text-sm text-gray-500 mt-0.5">Atur persentase dari setiap transaksi</p>
            </div>
          </div>
          <div class="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold">
            Sistem Otomatis
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Ganti Platform Saat Ini -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ganti Platform Saat ini</label>
            <input 
              type="text" 
              disabled 
              :value="currentFee"
              class="w-full bg-gray-50 border border-gray-200 text-blue-600 font-medium rounded-xl px-4 py-3 focus:outline-none"
            />
          </div>
          
          <!-- Ubah Fee Komisi -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">Ubah Fee Komisi <span class="text-gray-400 font-normal">(angka masih tentatif)</span></label>
            </div>
            <div class="relative flex items-center">
              <input 
                type="number" 
                v-model="newFee"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 pr-12 transition-colors"
                placeholder="7"
              />
              <span class="absolute right-4 text-gray-500 font-medium">%</span>
            </div>
            <p class="text-xs text-gray-400 mt-2">*Berlaku untuk transaksi ke depan.</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
             <button @click="openSecurityModal('update-fee')" class="bg-brand-navy hover:bg-[#152e75] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
               Simpan Perubahan
             </button>
        </div>
      </section>

      <!-- Card 2: Emergency Maintenance Mode -->
      <section class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 class="text-[17px] font-semibold text-gray-800">Emergency Maintenance Mode</h2>
              <p class="text-sm text-gray-500 mt-0.5">Nyalakan ketika awal server down atau ada bug kritis</p>
            </div>
          </div>
          <div :class="maintenanceMode ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'" class="px-4 py-1.5 rounded-full text-xs font-semibold">
            {{ maintenanceMode ? 'System Down' : 'Sistem Normal' }}
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 items-start">
          <div class="flex-1 w-full space-y-5">
            <!-- Alert Box -->
            <div :class="maintenanceMode ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'" class="border rounded-xl p-4 flex gap-3">
              <div class="mt-0.5">
                 <span v-if="!maintenanceMode" class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                 <span v-else class="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
              </div>
              <div>
                <h4 :class="maintenanceMode ? 'text-red-800' : 'text-green-800'" class="text-sm font-semibold mb-1">
                  {{ maintenanceMode ? 'Platform Nonaktif' : 'Platform Aktif' }}
                </h4>
                <p :class="maintenanceMode ? 'text-red-700' : 'text-green-700'" class="text-xs">
                  {{ maintenanceMode ? 'User tidak dapat login atau bertransaksi saat ini.' : 'Semua user dapat login dan menggunakan layanan platform secara normal.' }}
                </p>
              </div>
            </div>

            <!-- Pesan untuk User -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pesan untuk User (opsional)</label>
              <textarea 
                v-model="maintenanceMessage"
                rows="3"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                placeholder="Contoh: Kami sedang melakukan pemeliharaan sistem. Mohon tunggu 30 menit."
              ></textarea>
            </div>

            <div class="flex items-start gap-2 text-gray-400 mt-4">
              <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p class="text-xs">Maintenance mode akan langsung memblokir semua aksi login serta interaksi endpoint bagi seluruh entitas.</p>
            </div>
          </div>

          <!-- Toggle Switch -->
          <div class="flex flex-col items-center justify-center shrink-0 lg:mt-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
             <button 
                @click="openSecurityModal('toggle-maintenance')"
                :class="maintenanceMode ? 'bg-brand-navy' : 'bg-gray-200'" 
                class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none"
              >
                <span 
                  :class="maintenanceMode ? 'translate-x-7' : 'translate-x-1'" 
                  class="inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300"
                />
              </button>
              <span class="text-xs font-semibold text-gray-600 mt-2">{{ maintenanceMode ? 'ON' : 'OFF' }}</span>
              <span class="text-[10px] text-gray-400">Aktifkan mode<br/>darurat</span>
          </div>
        </div>
      </section>

      <!-- Card 3: Manajemen Kategori Jasa -->
      <section class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
        <div class="flex items-start justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h2 class="text-[17px] font-semibold text-gray-800">Manajemen Kategori Jasa</h2>
              <p class="text-sm text-gray-500 mt-0.5">Tambah, edit, atau hapus kategori layanan platform</p>
            </div>
          </div>
        </div>

        <!-- Add New Category Action Bar -->
        <div class="mb-8">
          <label class="block text-sm font-semibold text-gray-700 mb-3">+ Tambah Kategori Baru</label>
          <div class="bg-gray-50 rounded-[16px] p-2 flex flex-col md:flex-row items-center gap-3 border border-gray-100">
            <div class="flex-1 w-full">
              <input 
                type="text" 
                v-model="newCategoryName"
                placeholder="Nama Kategori Baru (misal: Jasa AI Prompter)"
                class="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
            
            <div class="flex gap-2 w-full md:w-auto shrink-0">
              <div class="relative w-full md:w-32">
                 <select v-model="newCategoryStatus" class="w-full appearance-none bg-white rounded-xl pl-4 pr-10 py-3 text-sm font-medium focus:outline-none shadow-sm cursor-pointer border border-gray-100">
                   <option value="Aktif">Aktif</option>
                   <option value="Non-Aktif">Non-Aktif</option>
                 </select>
                 <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                   <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                 </div>
              </div>
              
              <button @click="handleAddCategory" class="bg-brand-navy hover:bg-[#152e75] text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors w-full md:w-auto whitespace-nowrap text-center shadow-sm flex items-center gap-2">
                <span>+</span> Tambah
              </button>
            </div>
          </div>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="cat in categories" :key="cat.id" class="bg-gray-50 rounded-xl p-4 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100 cursor-pointer">
            <div>
              <h3 class="text-sm font-bold text-gray-800">{{ cat.name }}</h3>
              <p class="text-xs text-gray-500 mt-1">{{ cat.count }} Layanan Aktif</p>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button class="p-1.5 text-gray-400 hover:text-blue-600 bg-white rounded-lg shadow-sm">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
               </button>
               <button class="p-1.5 text-gray-400 hover:text-red-600 bg-white rounded-lg shadow-sm">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Security Validation Modal -->
    <div v-if="showSecurityModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="showSecurityModal = false"></div>
      
      <div class="bg-white rounded-[24px] w-full max-w-[400px] p-8 relative z-10 shadow-xl">
        <h3 class="text-[20px] font-bold text-gray-800 mb-2">Anda akan melakukan perubahan.</h3>
        <p class="text-sm text-gray-500 mb-6">Masukkan kata sandi untuk mengizinkan perubahan.</p>
        
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-2">Kata sandi</label>
          <div class="relative">
            <input 
              type="password" 
              v-model="adminPassword"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 pr-10"
              placeholder="Masukkan kata sandi akun anda"
            />
            <button class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </button>
          </div>
        </div>
        
        <div class="flex flex-col gap-3">
          <button @click="confirmAction" class="w-full bg-brand-navy hover:bg-[#152e75] text-white py-3.5 rounded-xl font-medium transition-colors shadow-sm">
            Simpan Perubahan & Terapkan
          </button>
          <button @click="showSecurityModal = false" class="w-full text-gray-500 hover:text-gray-800 py-2.5 font-medium transition-colors text-sm">
            Batalkan
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
