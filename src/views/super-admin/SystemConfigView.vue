<script setup lang="ts">
import { ref } from 'vue'

const currentFee = ref('5%')
const newFee = ref('')
const maintenanceMode = ref(false)
const maintenanceMessage = ref('')
const newCategoryName = ref('')
const newCategoryType = ref('AI/Tech')

const categories = ref([
  { id: 1, name: 'Desain Grafis', count: 2 },
  { id: 2, name: 'Pengembangan Web', count: 2 },
  { id: 3, name: 'Data', count: 2 },
])

// Security Modal
const showSecurityModal = ref(false)
const adminPassword = ref('')
const pendingAction = ref('')

// Pricing Modal
const showPricingModal = ref(false)
const pricingCategory = ref('')
const pricingBiaya = ref('1200.00')
const pricingPersentase = ref('5.2')

function openSecurityModal(action: string) {
  pendingAction.value = action
  adminPassword.value = ''
  showSecurityModal.value = true
}

function confirmAction() {
  if (pendingAction.value === 'add-category' && newCategoryName.value.trim()) {
    categories.value.push({ id: Date.now(), name: newCategoryName.value, count: 0 })
    newCategoryName.value = ''
  } else if (pendingAction.value === 'update-fee' && newFee.value) {
    currentFee.value = newFee.value + '%'
    newFee.value = ''
  } else if (pendingAction.value === 'toggle-maintenance') {
    maintenanceMode.value = !maintenanceMode.value
  }
  showSecurityModal.value = false
}

function openPricingModal(catName: string) {
  pricingCategory.value = catName
  pricingBiaya.value = '1200.00'
  pricingPersentase.value = '5.2'
  showPricingModal.value = true
}

function savePricing() {
  console.log('Save pricing:', pricingCategory.value, pricingBiaya.value, pricingPersentase.value)
  showPricingModal.value = false
}

function deleteCategory(id: number) {
  categories.value = categories.value.filter(c => c.id !== id)
}

function handleAddCategory() {
  if (newCategoryName.value.trim()) openSecurityModal('add-category')
}
</script>

<template>
  <div class="space-y-6 pb-12 w-full max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-200 pb-4 h-16">
      <h1 class="text-[22px] font-semibold text-gray-900">Konfigurasi Sistem</h1>
      <button class="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full border border-white bg-red-500"></span>
      </button>
    </div>

    <!-- Card 1: Fee & Komisi Platform -->
    <section class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 class="text-base font-bold text-gray-900">Fee & Komisi Platform</h2>
            <p class="text-xs text-gray-400 mt-0.5">Potongan otomatis dari setiap transaksi</p>
          </div>
        </div>
        <span class="text-blue-600 text-xs font-medium">Berlaku Otomatis</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-2">Komisi Platform Saat ini</label>
          <input type="text" disabled :value="currentFee" class="w-full bg-brand-navy text-white font-semibold rounded-xl px-4 py-3 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-2">Ubah Fee Komisi <span class="text-gray-400 font-normal">(angka masih tentatif)</span></label>
          <div class="relative">
            <input type="number" v-model="newFee" placeholder="" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 pr-10 transition-colors" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">%</span>
          </div>
          <p class="text-[11px] text-gray-400 mt-1.5 italic">Berlaku untuk transaksi berikutnya</p>
        </div>
      </div>
    </section>

    <!-- Card 2: Emergency Maintenance Mode -->
    <section class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 class="text-base font-bold text-gray-900">Emergency Maintenance Mode</h2>
            <p class="text-xs text-gray-400 mt-0.5">Nonaktifkan akses user saat server down atau bug kritis</p>
          </div>
        </div>
        <span :class="maintenanceMode ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'" class="px-3 py-1 rounded-full text-xs font-semibold border">
          {{ maintenanceMode ? 'System Down' : 'Sistem Normal' }}
        </span>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <div class="flex-1 w-full space-y-4">
          <!-- Status Alert -->
          <div :class="maintenanceMode ? 'bg-red-50 border-l-4 border-l-red-500' : 'bg-green-50 border-l-4 border-l-green-500'" class="rounded-xl p-4">
            <div class="flex items-start gap-2">
              <span :class="maintenanceMode ? 'bg-red-500' : 'bg-green-500'" class="w-2 h-2 rounded-full mt-1.5 shrink-0"></span>
              <div>
                <h4 :class="maintenanceMode ? 'text-red-800' : 'text-green-800'" class="text-sm font-semibold">{{ maintenanceMode ? 'Platform Nonaktif' : 'Platform Aktif' }}</h4>
                <p :class="maintenanceMode ? 'text-red-600' : 'text-green-600'" class="text-xs mt-0.5">{{ maintenanceMode ? 'User tidak dapat login atau bertransaksi saat ini.' : 'Semua user dapat login dan menggunakan layanan platform secara normal.' }}</p>
              </div>
            </div>
          </div>

          <!-- Pesan untuk User -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Pesan untuk User (opsional)</label>
            <textarea v-model="maintenanceMessage" rows="2" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="Contoh: Kami sedang melakukan pemeliharaan sistem. Mohon tunggu 30 menit."></textarea>
          </div>

          <div class="flex items-start gap-2 text-gray-400">
            <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p class="text-[11px]">Maintenance mode akan langsung memblokir semua sesi login aktif, buatkan hanya saat server down atau ada bug kritis.</p>
          </div>
        </div>

        <!-- Toggle -->
        <div class="flex flex-col items-center justify-center shrink-0 lg:pl-6 lg:border-l border-gray-100 pt-4 lg:pt-0">
          <button @click="openSecurityModal('toggle-maintenance')" :class="maintenanceMode ? 'bg-[#6EE75E]' : 'bg-gray-200'" class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none">
            <span :class="maintenanceMode ? 'translate-x-7' : 'translate-x-1'" class="inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300" />
          </button>
          <span class="text-xs font-bold text-gray-600 mt-2">{{ maintenanceMode ? 'ON' : 'OFF' }}</span>
          <span class="text-[10px] text-gray-400 text-center">Aktifkan saat<br/>darurat</span>
        </div>
      </div>
    </section>

    <!-- Card 3: Manajemen Kategori Jasa -->
    <section class="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <h2 class="text-base font-bold text-gray-900">Manajemen Kategori Jasa</h2>
            <p class="text-xs text-gray-400 mt-0.5">Tambah, edit, atau hapus kategori layanan platform</p>
          </div>
        </div>
      </div>

      <!-- Add New Category -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-3">+ Tambah Kategori Baru</label>
        <div class="bg-gray-50 rounded-2xl p-3 flex flex-col md:flex-row items-center gap-3 border border-gray-100">
          <input type="text" v-model="newCategoryName" placeholder="Nama Kategori Baru (misal: Jasa AI Prompter)" class="flex-1 w-full bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <div class="flex items-center gap-2 shrink-0">
            <div class="relative">
              <select v-model="newCategoryType" class="appearance-none bg-white rounded-xl pl-8 pr-8 py-2.5 text-sm font-medium border border-gray-100 focus:outline-none cursor-pointer">
                <option>AI/Tech</option>
                <option>Design</option>
                <option>Data</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 left-2.5 flex items-center">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
              </div>
              <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <button @click="handleAddCategory" class="bg-brand-navy hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <span class="text-base leading-none">+</span> Tambah
            </button>
          </div>
        </div>
      </div>

      <!-- Category List -->
      <div class="space-y-3">
        <div v-for="cat in categories" :key="cat.id" class="bg-gray-50 rounded-xl px-5 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
          <div>
            <h3 class="text-sm font-bold text-gray-900">{{ cat.name }}</h3>
            <p class="text-xs text-gray-400 mt-0.5">{{ cat.count }} Layanan Aktif</p>
          </div>
          <div class="flex items-center gap-3">
            <button @click="openPricingModal(cat.name)" class="bg-brand-navy hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
              Kustom harga
            </button>
            <button @click="deleteCategory(cat.id)" class="text-red-400 hover:text-red-600 transition-colors p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showSecurityModal" class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="showSecurityModal = false">
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showSecurityModal = false"></div>
          <Transition name="modal-scale">
            <div v-if="showSecurityModal" class="relative bg-white rounded-3xl w-full max-w-sm mx-4 p-8 z-10 shadow-2xl">
              <h3 class="text-lg font-bold text-gray-900 mb-1">Anda akan melakukan perubahan.</h3>
              <p class="text-sm text-gray-400 mb-6">Masukkan kata sandi untuk mengizinkan perubahan.</p>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Kata sandi</label>
                <div class="relative">
                  <input type="password" v-model="adminPassword" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 pr-10" placeholder="Masukkan kata sandi akun anda" />
                  <button class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <button @click="confirmAction" class="w-full bg-brand-navy hover:bg-blue-800 text-white py-3 rounded-xl font-medium transition-colors text-sm">Simpan Perubahan & Terapkan</button>
                <button @click="showSecurityModal = false" class="w-full text-gray-500 hover:text-gray-800 py-2 font-medium text-sm transition-colors">Batalkan</button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Pricing Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showPricingModal" class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="showPricingModal = false">
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showPricingModal = false"></div>
          <Transition name="modal-scale">
            <div v-if="showPricingModal" class="relative bg-white rounded-3xl w-full max-w-md mx-4 p-6 z-10 shadow-2xl">
              <!-- Close -->
              <button @click="showPricingModal = false" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <h3 class="text-lg font-bold text-gray-900 mb-5">Perbarui Harga Produk</h3>

              <!-- Vendor Info -->
              <div class="bg-gray-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">CS</div>
                  <span class="text-sm font-semibold text-gray-900">Creative Studio</span>
                </div>
                <span class="text-[10px] text-gray-400 font-mono">ID · CG · BIS</span>
              </div>

              <!-- Price Fields -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Biaya</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">Rp</span>
                    <input type="text" v-model="pricingBiaya" class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Penyesuaian Persentase</label>
                  <div class="relative">
                    <input type="text" v-model="pricingPersentase" class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500 pr-8" />
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex justify-end gap-3">
                <button @click="showPricingModal = false" class="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Batal</button>
                <button @click="savePricing" class="bg-brand-navy hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">Simpan Perubahan</button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-scale-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-scale-leave-active { transition: all 0.2s ease-in; }
.modal-scale-enter-from { opacity: 0; transform: scale(0.92) translateY(10px); }
.modal-scale-leave-to { opacity: 0; transform: scale(0.95) translateY(5px); }
</style>
