<script setup lang="ts">
import { ref } from 'vue'

const chats = ref([
  {
    id: 1,
    name: 'Jennifer Markus',
    avatar: 'https://i.pravatar.cc/150?u=jennifer',
    lastMessage: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?',
    time: 'Today | 05:30 PM',
    unread: false,
    starred: true
  },
  {
    id: 2,
    name: 'Ammi Watts',
    avatar: 'https://i.pravatar.cc/150?u=ammi',
    lastMessage: 'Oh, hello! All perfectly.',
    time: 'Yesterday | 10:20 AM',
    unread: true,
    starred: false
  }
])

const activeChat = ref({
  name: 'Ammi Watts',
  avatar: 'https://i.pravatar.cc/150?u=ammi',
  messages: [
    {
      id: 1,
      sender: 'other',
      text: 'Oh, hello! All perfectly. I will check it and get back to you soon',
      time: '04:45 PM'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Oh, hello! All perfectly. I will check it and get back to you soon',
      time: '04:45 PM'
    },
    {
      id: 3,
      sender: 'other',
      text: 'Saya ingin mengajukan komplain',
      time: '04:45 PM'
    },
    {
      id: 4,
      type: 'order_status',
      orderId: '#ORD-8790',
      title: 'Penulisan Konten',
      status: 'DALAM REVISI',
      deadline: 'Due Today'
    },
    {
      id: 5,
      sender: 'other',
      text: 'Saya tidak puas dengan hasil revisi Anda. Saya akan laporkan ini.',
      time: '05:00 PM'
    },
    {
      id: 6,
      type: 'order_status',
      orderId: '#ORD-8790',
      title: 'Penulisan Konten',
      status: 'DISPUTE_IN_PROGRESS',
      deadline: 'Frozen',
      isDispute: true
    }
  ]
})

const messageInput = ref('')

const isComplaintModalOpen = ref(false)

const openComplaintModal = () => {
  isComplaintModalOpen.value = true
}

const closeComplaintModal = () => {
  isComplaintModalOpen.value = false
}
</script>

<template>
  <div class="flex h-[calc(100vh-48px)] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
    <!-- Sidebar: Message List -->
    <div class="w-[360px] border-r border-gray-100 flex flex-col">
      <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 cursor-pointer group">
            <h2 class="text-xl font-bold text-gray-900">All Messages</h2>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
        </div>

        <div class="relative">
          <span class="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search or start a new chat"
            class="w-full pl-11 pr-4 py-3 bg-[#F8F9FE] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#4B6BFB]/10 outline-none"
          />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="chat in chats" 
          :key="chat.id"
          :class="[
            'p-6 flex gap-4 cursor-pointer transition-colors border-b border-gray-50',
            chat.id === 1 ? 'bg-[#F8F9FE]' : 'hover:bg-gray-50'
          ]"
        >
          <img :src="chat.avatar" class="w-12 h-12 rounded-2xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-bold text-gray-900 truncate">{{ chat.name }}</h4>
              <svg v-if="chat.starred" class="w-5 h-5 text-[#4B6BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{{ chat.lastMessage }}</p>
            <div class="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ chat.time }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col bg-white">
      <!-- Chat Header -->
      <div class="px-8 py-4 border-b border-gray-100 flex items-center gap-4">
        <img :src="activeChat.avatar" class="w-10 h-10 rounded-xl object-cover" />
        <h3 class="font-bold text-gray-900">{{ activeChat.name }}</h3>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
        <template v-for="msg in activeChat.messages" :key="msg.id">
          <!-- Normal Chat Bubble -->
          <div v-if="!msg.type" :class="['flex flex-col', msg.sender === 'me' ? 'items-end' : 'items-start']">
            <div 
              :class="[
                'max-w-[70%] p-5 rounded-3xl text-sm leading-relaxed',
                msg.sender === 'me' 
                  ? 'bg-[#4B6BFB] text-white rounded-tr-none shadow-lg shadow-[#4B6BFB]/20' 
                  : 'bg-[#E6F0FF] text-gray-800 rounded-tl-none'
              ]"
            >
              {{ msg.text }}
            </div>
            <span class="text-[10px] font-bold text-gray-400 mt-2">{{ msg.time }}</span>
          </div>

          <!-- Order Status Card -->
          <div v-else-if="msg.type === 'order_status'" class="w-full max-w-[500px]">
            <div class="bg-[#F8F9FE] border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
              <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-white/50">
                <h4 class="text-lg font-bold text-[#4B6BFB]">Status Pesanan</h4>
                <span 
                  class="px-3 py-1 text-[10px] font-bold rounded-full"
                  :class="msg.isDispute ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-[#FFF2EB] text-[#FF6B00]'"
                >
                  {{ msg.status }}
                </span>
              </div>
              <div class="p-8 space-y-6">
                <div>
                  <span class="text-xs font-bold text-[#1E3A8A] mb-1 block">{{ msg.orderId }}</span>
                  <h3 class="text-xl font-bold text-gray-900">{{ msg.title }}</h3>
                </div>
                
                <div class="flex gap-12">
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Harga</p>
                    <p class="text-sm font-bold text-gray-900">-</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deadline</p>
                    <div class="flex items-center gap-1.5" :class="msg.isDispute ? 'text-gray-400' : 'text-orange-400'">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span class="text-sm font-bold">{{ msg.deadline }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="!msg.isDispute" class="grid grid-cols-2 gap-4 pt-2">
                  <button class="bg-[#4B6BFB] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#4B6BFB]/90 transition-all shadow-md shadow-[#4B6BFB]/20">
                    Terima Komplain
                  </button>
                  <button 
                    @click="openComplaintModal"
                    class="bg-white text-gray-800 py-3 rounded-xl text-sm font-bold border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
                  >
                    Tolak
                  </button>
                </div>
                <div v-else class="pt-2">
                  <router-link 
                    :to="`/vendor/orders/${msg.orderId.replace('#', '')}/appeal`"
                    class="w-full bg-[#1E3A8A] text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E3A8A]/95 transition-all shadow-xl"
                  >
                    Lihat Detail Sengketa
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Chat Input -->
      <div class="px-8 py-6 border-t border-gray-100">
        <div class="flex items-center gap-4 bg-[#F8F9FE] rounded-2xl px-5 py-2">
          <button class="text-gray-400 hover:text-[#4B6BFB] transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
          </button>
          <input 
            v-model="messageInput"
            type="text" 
            placeholder="Type your message here ..."
            class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder-gray-400 text-gray-800"
          />
          <button class="bg-[#4B6BFB] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4B6BFB]/90 transition-all shadow-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Complaint Modal -->
    <Teleport to="body">
      <div v-if="isComplaintModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div class="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center text-white">
            <h3 class="text-xl font-bold">Lapor Komplain Client</h3>
            <button @click="closeComplaintModal" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- Info Alert -->
            <div class="bg-[#F8F9FA] rounded-xl p-4 flex gap-4 items-start border border-gray-100">
              <div class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p class="text-sm text-gray-500 font-medium pt-1 leading-relaxed">
                Mohon konfirmasi dan komunikasi dengan client, terkait jasa atau barang yang ditawarkan
              </p>
            </div>

            <!-- Order Data Card -->
            <div class="border border-gray-100 rounded-2xl p-6 space-y-4 bg-[#FFFAF5]/30">
              <h4 class="text-base font-bold text-gray-900">Data Pesanan:</h4>
              <ul class="space-y-3 text-sm">
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Client: <span class="underline">Ammi Watts</span></span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Nomor Pesanan: ORD-8790</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Di Ajukan Jam: 00:00</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                  <span class="font-medium text-gray-900">Pembayaran: Transfer Bank-Bank Mandiri (VA)</span>
                </li>
              </ul>
            </div>

            <!-- Screenshot Proof -->
            <div class="border border-gray-100 rounded-2xl p-6 space-y-4">
              <h4 class="text-base font-bold text-gray-900">Bukti Screenshot</h4>
              <div class="flex flex-wrap gap-3">
                <div class="bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  File_1234.JPEG
                </div>
                <div class="bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  File_1234.JPEG
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button class="px-8 py-4 bg-[#1E3A8A] text-white font-bold rounded-2xl hover:bg-[#1E3A8A]/95 transition-all shadow-xl">
                Laporkan Ke CS
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
