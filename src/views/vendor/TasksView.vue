<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  {
    id: '#ORD-8821',
    title: 'Desain Postingan Media Sosial - Paket Premium',
    status: 'BARU',
    buyer: {
      name: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?u=sarah1'
    },
    timestamp: '13 Jam',
    hasIndicator: true
  },
  {
    id: '#ORD-8815',
    title: 'Fotografi Produk - Gadget Teknologi',
    status: 'SEDANG DIPROSES',
    buyer: {
      name: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?u=sarah2'
    },
    timestamp: '24 Okt 2023',
    hasIndicator: false
  },
  {
    id: '#ORD-8790',
    title: 'Penulisan Konten',
    status: 'DALAM REVISI',
    buyer: {
      name: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?u=sarah3'
    },
    timestamp: 'Due Today',
    hasIndicator: false
  }
])

const messages = ref([
  {
    id: 1,
    name: 'Andi',
    avatar: 'https://i.pravatar.cc/150?u=andi',
    time: '10m ago',
    text: 'Misi bang, boleh buat penawaran khusus untuk 3 video...',
    unread: 1,
  },
  {
    id: 2,
    name: 'Dani',
    avatar: 'https://i.pravatar.cc/150?u=dani',
    time: '10m ago',
    text: 'P, Mau buat design untuk toko cookies aku dong',
    unread: 1,
  },
  {
    id: 3,
    name: 'Aisyah',
    avatar: 'https://i.pravatar.cc/150?u=aisyah',
    time: '10m ago',
    text: 'Permisi, apakah jasa fotografi untuk wisuda masih ter...',
    unread: 1,
  }
])

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'BARU': return 'bg-[#E6F0FF] text-[#4B6BFB]'
    case 'PROSES': return 'bg-[#FFF2EB] text-[#FF6B00]'
    case 'REVISI': return 'bg-[#FEE2E2] text-[#EF4444]'
    case 'DISPUTE': return 'bg-gray-100 text-gray-600 border border-gray-200'
    case 'SELESAI': return 'bg-green-50 text-green-600'
    default: return 'bg-gray-100 text-gray-500'
  }
}

const isAcceptModalOpen = ref(false)
const isRejectModalOpen = ref(false)
const selectedTask = ref<any>(null)
const rejectReason = ref('')

const openAcceptModal = (task: any) => {
  selectedTask.value = task
  isAcceptModalOpen.value = true
}

const openRejectModal = (task: any) => {
  selectedTask.value = task
  isRejectModalOpen.value = true
}

const closeModals = () => {
  isAcceptModalOpen.value = false
  isRejectModalOpen.value = false
  selectedTask.value = null
  rejectReason.value = ''
}

</script>

<template>
  <div class="py-6 px-4">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-[32px] font-bold text-gray-900 mb-1">Daftar Tugas</h1>
      <p class="text-gray-500 italic">Pesanan Aktif Anda</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Left Column: List Pesanan -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-[#1E3A8A]">List Pesanan</h2>
          <button class="text-sm font-bold text-[#1E3A8A] hover:underline">View All</button>
        </div>

        <div class="p-6 flex flex-col gap-4">
          <div 
            v-for="task in tasks" 
            :key="task.id"
            class="relative bg-[#FFFAF5] border border-[#F5EBE0] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md"
          >
            <!-- Red Indicator Dot -->
            <div 
              v-if="task.hasIndicator" 
              class="absolute -left-2 -top-2 w-5 h-5 bg-[#EF4444] rounded-full border-4 border-white shadow-sm z-10"
            ></div>

            <!-- Task Info -->
            <div class="flex-1">
              <span class="text-xs font-bold text-[#4B6BFB] mb-1 block">{{ task.id }}</span>
              <h3 class="text-base font-bold text-gray-900 mb-3">{{ task.title }}</h3>
              
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-2">
                  <img :src="task.buyer.avatar" alt="Avatar" class="w-6 h-6 rounded-full object-cover shadow-sm" />
                  <span class="text-sm font-bold text-[#1E3A8A]">{{ task.buyer.name }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-orange-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span class="text-sm font-bold" :class="task.timestamp === 'Due Today' ? 'text-orange-500' : 'text-orange-300'">{{ task.timestamp }}</span>
                </div>
              </div>
            </div>

            <!-- Actions & Status -->
            <div class="flex items-center gap-4 shrink-0">
              <span 
                class="px-2 py-1 rounded text-[10px] font-bold tracking-wider"
                :class="getStatusClasses(task.status)"
              >
                {{ task.status }}
              </span>

              <div v-if="task.status === 'BARU'" class="flex items-center gap-2">
                <button 
                  @click="openAcceptModal(task)"
                  class="bg-[#4B6BFB] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#4B6BFB]/90 transition-all shadow-sm"
                >
                  Terima
                </button>
                <button 
                  @click="openRejectModal(task)"
                  class="bg-white text-gray-800 px-4 py-2 rounded-lg text-xs font-bold border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
                >
                  Tolak
                </button>
              </div>

              <div v-else-if="task.status === 'DISPUTE'" class="flex items-center gap-2">
                <router-link 
                  :to="`/vendor/orders/${task.id.replace('#', '')}/appeal`"
                  class="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#1E3A8A]/95 transition-all shadow-md"
                >
                  Banding
                </router-link>
              </div>

              <router-link 
                v-else
                :to="`/vendor/orders/${task.id.replace('#', '')}`"
                class="bg-white text-gray-800 px-4 py-2 rounded-lg text-xs font-bold border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
              >
                Lihat
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Pesan Belum Dibaca -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Pesan Belum Dibaca</h2>
          <span class="w-6 h-6 rounded-full bg-orange-400 text-white text-xs font-bold flex items-center justify-center">3</span>
        </div>
        
        <div class="flex flex-col">
          <router-link 
            v-for="msg in messages" 
            :key="msg.id"
            to="/vendor/messages"
            class="p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4"
          >
            <img :src="msg.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <h4 class="font-bold text-gray-900 text-sm">{{ msg.name }}</h4>
                <span class="text-xs text-[#4B6BFB] font-medium">{{ msg.time }}</span>
              </div>
              <p class="text-xs text-gray-600 truncate">{{ msg.text }}</p>
            </div>
            <div v-if="msg.unread" class="flex flex-col justify-center shrink-0">
              <span class="w-5 h-5 rounded-full bg-[#4B6BFB] text-white text-[10px] font-bold flex items-center justify-center">{{ msg.unread }}</span>
            </div>
          </router-link>
        </div>
        
        <!-- Empty space for height matching the design -->
        <div class="h-32"></div>
      </div>
    </div>

    <!-- Modals -->
    <Teleport to="body">
      <!-- Accept Modal -->
      <div v-if="isAcceptModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div class="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center text-white">
            <h3 class="text-xl font-bold">Konfirmasi Terima Pekerjaan</h3>
            <button @click="closeModals" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- Info Alert -->
            <div class="bg-[#F8F9FA] rounded-xl p-4 flex gap-4 items-start border border-gray-100">
              <div class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p class="text-sm text-gray-500 font-medium pt-1">
                Mohon konfirmasi dan komunikasi dengan client, terkait jasa atau barang yang ditawarkan
              </p>
            </div>

            <!-- Order Data Card -->
            <div class="border border-gray-100 rounded-2xl p-6 space-y-4">
              <h4 class="text-base font-bold text-gray-900">Data Pesanan:</h4>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="text-sm font-medium text-gray-900">Client: <span class="underline">{{ selectedTask?.buyer.name }}</span></span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="text-sm font-medium text-gray-900">Nomor Pesanan: {{ selectedTask?.id.replace('#', '') }}</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="text-sm font-medium text-gray-900">Di Ajukan Jam: 00:00</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="text-sm font-medium text-gray-900">Pembayaran: Transfer Bank-Bank Mandiri (VA)</span>
                </li>
              </ul>
            </div>

            <!-- Client Message -->
            <div class="border border-gray-100 rounded-2xl p-6">
              <h4 class="text-base font-bold text-gray-900 mb-1">Pesan Dari Client</h4>
              <p class="text-sm text-gray-400">Pembuatan design sosial media lorem ipsum sir dolot amer</p>
            </div>

            <div class="flex justify-end pt-2">
              <button class="px-10 py-3 bg-[#5E9761] text-white font-bold rounded-xl hover:bg-[#4E8050] transition-colors shadow-lg">
                Terima
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reject Modal -->
      <div v-if="isRejectModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div class="bg-[#CD5C5C] px-6 py-4 flex justify-between items-center text-white">
            <h3 class="text-xl font-bold">Tolak Pekerjaan</h3>
            <button @click="closeModals" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <button @click="closeModals" class="text-gray-900 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div class="space-y-4">
              <p class="text-base text-gray-600">Berikan alasan yang jelas</p>
              
              <div class="space-y-2">
                <h4 class="text-base font-bold text-gray-900">Catatan</h4>
                <div class="border border-gray-100 rounded-2xl p-4 min-h-[160px]">
                  <textarea 
                    v-model="rejectReason"
                    placeholder="Tulis permohonan maaf kepada client di sini..."
                    class="w-full h-full border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400 bg-transparent resize-none"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button class="px-10 py-3 bg-[#CD5C5C] text-white font-bold rounded-xl hover:bg-[#B45050] transition-colors shadow-lg">
                Tolak
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Custom fonts and refinements if needed */
</style>
