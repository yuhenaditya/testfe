<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Mock data
const isRejected = ref(false) // Toggle this to see rejected state
const rejectReason = ref('')

const vendor = ref({
  id: route.params.id,
  name: 'Creativ Studio',
  status: isRejected.value ? 'Ditolak' : 'Menunggu',
  logo: 'https://ui-avatars.com/api/?name=C+S&background=f3f4f6&color=374151',
  businessName: 'Rivers Creative Studio LLC',
  regNumber: '0111111',
  foundingDate: 'January 12, 2026',
  marketCategory: 'Digital Design Services',
})

const documents = ref([
  { id: 1, name: 'Kartu Identitas', subtitle: 'Creativ Studio', type: 'identity', isValid: isRejected.value ? false : null },
  { id: 2, name: 'Website Portofolio', subtitle: 'https://alexrivers.design', type: 'link', isValid: isRejected.value ? true : null },
])

const timeline = ref([
  { title: 'Pengajuan Dikirim', date: '14 - 16 Februari 2026', status: 'completed' },
  { title: 'Analisis Selesai', desc: 'Menunggu keputusan akhir.', date: '17 Februari 2026', status: 'completed' },
  ...(isRejected.value ? [{ title: 'Pengajuan Ditolak', desc: 'Creativ Studio', date: '20 Februari 2026', status: 'rejected' }] : [])
])

const showRejectModal = ref(false)

function goBack() {
  router.push('/admin-validator/vendor-verification')
}

function openRejectModal() {
  showRejectModal.value = true
}

function closeRejectModal() {
  showRejectModal.value = false
  rejectReason.value = ''
}

function submitReject() {
  isRejected.value = true
  vendor.value.status = 'Ditolak'
  
  if (documents.value[0]) {
    documents.value[0].isValid = false
  }
  if (documents.value[1]) {
    documents.value[1].isValid = true
  }
  
  timeline.value.push({ title: 'Pengajuan Ditolak', desc: 'Creativ Studio', date: '20 Februari 2026', status: 'rejected' })
  closeRejectModal()
}

function submitApprove() {
  vendor.value.status = 'Disetujui'
  // Logic to approve
  goBack()
}
</script>

<template>
  <div class="space-y-6 animate-fade-in w-full pb-20 max-w-[900px] mx-auto">
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4">
      <button @click="goBack" class="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-800 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
      </button>
    </div>

    <!-- Profile Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-50 border border-gray-100">
          <img :src="vendor.logo" alt="Logo" class="w-full h-full object-cover" />
        </div>
        <h2 class="text-2xl font-extrabold text-[#0B152A]">{{ vendor.name }}</h2>
      </div>
      <button class="bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-[10px] text-sm transition-colors shadow-sm">
        Lihat Profil
      </button>
    </div>

    <!-- Rejected Alert -->
    <div v-if="isRejected" class="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-6 flex gap-4 animate-fade-in">
      <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-red-100 text-red-500">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <div>
        <h3 class="text-[#9B2C2C] font-bold text-base mb-1">Alasan Penolakan</h3>
        <p class="text-[#9B2C2C] font-medium text-sm mb-2">Foto Blur - Harap unggah ulang foto identitas yang jelas dan terbaca</p>
        <p class="text-[#C53030] text-xs">Diverifikasi oleh: Admin Validator @Budiman (Oct 26, 2025)</p>
      </div>
    </div>

    <!-- Dokumen Verifikasi -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h3 class="font-extrabold text-gray-900 text-[15px]">Dokumen Verifikasi</h3>
      </div>
      <div class="p-6 space-y-4">
        <div v-for="doc in documents" :key="doc.id" class="border border-gray-100 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1E3A8A]">
              <svg v-if="doc.type === 'identity'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
              <svg v-if="doc.type === 'link'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-sm">{{ doc.name }}</h4>
              <p class="text-xs text-gray-500 mt-0.5">{{ doc.subtitle }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Badges -->
            <div v-if="doc.isValid === false" class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100 uppercase tracking-wide">
              INVALID
            </div>
            <div v-if="doc.isValid === true" class="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1">
              Terverifikasi
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            
            <button class="text-gray-400 hover:text-gray-600">
              <svg v-if="doc.type === 'identity'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-if="doc.type === 'link'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Riwayat Verifikasi -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h3 class="font-extrabold text-gray-900 text-[15px]">Riwayat Verifikasi</h3>
      </div>
      <div class="p-8">
        <div class="relative pl-4 border-l-2 border-blue-200 space-y-8">
          <div v-for="(item, index) in timeline" :key="index" class="relative">
            <div class="absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 border-white" :class="item.status === 'rejected' ? 'bg-red-500' : 'bg-[#5FA3FB]'"></div>
            <div class="flex justify-between items-start w-full">
              <div>
                <h4 class="font-extrabold text-gray-900 text-sm">{{ item.title }}</h4>
                <p v-if="item.desc" class="text-xs text-gray-500 mt-1">{{ item.desc }}</p>
              </div>
              <span class="text-xs text-gray-400 font-medium">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Informasi Bisnis -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h3 class="font-extrabold text-gray-900 text-[15px]">Informasi Bisnis</h3>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Badan Usaha Terdaftar</p>
          <p class="font-extrabold text-gray-900 text-sm">{{ vendor.businessName }}</p>
        </div>
        <div>
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nomor Registrasi</p>
          <p class="font-extrabold text-gray-900 text-sm">{{ vendor.regNumber }}</p>
        </div>
        <div>
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Tanggal Pendirian</p>
          <p class="font-extrabold text-gray-900 text-sm">{{ vendor.foundingDate }}</p>
        </div>
        <div>
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Kategori Market</p>
          <p class="font-extrabold text-gray-900 text-sm">{{ vendor.marketCategory }}</p>
        </div>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div v-if="!isRejected" class="flex flex-col items-end gap-3 mt-8 pt-4">
      <button @click="submitApprove" class="bg-green-500 hover:bg-green-600 text-white font-extrabold py-3.5 px-10 rounded-xl uppercase tracking-wide text-sm transition-colors shadow-sm w-auto min-w-[200px]" style="background-color: #16A34A;">
        Setujui Vendor
      </button>
      <button @click="openRejectModal" class="bg-red-500 hover:bg-red-600 text-white font-extrabold py-3.5 px-10 rounded-xl uppercase tracking-wide text-sm transition-colors shadow-sm w-auto min-w-[200px]" style="background-color: #DC2626;">
        Tolak Pengajuan
      </button>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div class="absolute inset-0" @click="closeRejectModal"></div>
      <div class="relative w-full max-w-[450px] bg-white rounded-[20px] shadow-2xl overflow-hidden animate-scale-in">
        <div class="bg-[#DF4A4A] px-6 py-5 flex items-center justify-between">
          <h3 class="text-white font-bold text-lg">Tolak Pengajuan</h3>
          <button @click="closeRejectModal" class="text-white hover:text-red-200 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-8">
          <p class="text-sm text-gray-600 mb-6">Berikan alasan yang jelas agar customer dapat melakukan perbaikan data.</p>
          <label class="block text-base font-bold text-gray-900 mb-3">Catatan</label>
          <textarea 
            v-model="rejectReason"
            rows="5"
            placeholder="Tulis instruksi perbaikan untuk customer di sini..."
            class="w-full p-4 border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#DF4A4A] focus:border-transparent resize-none bg-white"
          ></textarea>
          
          <div class="flex justify-end mt-8">
            <button @click="submitReject" class="bg-[#DF4A4A] hover:bg-red-700 text-white font-bold py-3 px-10 rounded-[12px] transition-colors text-base shadow-sm">
              Tolak
            </button>
          </div>
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
