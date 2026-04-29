<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Message {
  id?: number
  sender: string
  time: string
  type?: string
  text?: string
  title?: string
  description?: string
  price?: string
  duration?: string
}

const contacts = ref([
  { id: 1, name: 'Jennifer Markus', lastMsg: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?', time: 'Today | 05:30 PM', avatar: 'https://i.pravatar.cc/150?u=jennifer' },
  { id: 2, name: 'Iva Ryan', lastMsg: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?', time: 'Today | 05:30 PM', avatar: 'https://i.pravatar.cc/150?u=iva' },
  { id: 3, name: 'Jerry Helfer', lastMsg: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?', time: 'Today | 05:30 PM', avatar: 'https://i.pravatar.cc/150?u=jerry' }
])

const activeChat = ref({
  name: 'Ammi Watts',
  avatar: 'https://i.pravatar.cc/150?u=ammi',
  messages: [
    { sender: 'other', text: 'Oh, hello! All perfectly. I will check it and get back to you soon', time: '04:45 PM' },
    { sender: 'self', text: 'Oh, hello! All perfectly. I will check it and get back to you soon', time: '04:45 PM' },
    { sender: 'other', text: 'p nawar', time: '04:45 PM' },
    { 
      type: 'custom_offer',
      sender: 'other',
      time: '04:45 PM',
      title: 'Desain Logo Premium (3 Konsep)',
      description: 'Pembuatan 3 alternatif desain logo minimalis premium, dan 2 kali revisi minor.',
      price: 'Rp 1.500.000',
      duration: '3 Hari'
    }
  ] as Message[]
})

const showOfferModal = ref(false)
const offerForm = reactive({
  description: '',
  price: '',
  deadline: ''
})

function sendOffer() {
  if (!offerForm.description || !offerForm.price) return
  
  activeChat.value.messages.push({
    sender: 'self',
    time: '05:45 PM',
    type: 'custom_offer',
    title: 'Penawaran Kustom Baru',
    description: offerForm.description,
    price: `Rp ${offerForm.price}`,
    duration: offerForm.deadline || '7 Hari'
  })
  showOfferModal.value = false
  offerForm.description = ''
  offerForm.price = ''
  offerForm.deadline = ''
}
</script>

<template>
  <div class="flex h-[calc(100vh-48px)] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
    <Teleport to="body">
      <div v-if="showOfferModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div class="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center text-white">
            <h3 class="text-xl font-bold">Buat Penawaran Kustom</h3>
            <button @click="showOfferModal = false" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700">Deskripsi Penawaran</label>
              <textarea 
                v-model="offerForm.description"
                placeholder="Jelaskan apa yang akan Anda kerjakan..."
                class="w-full px-4 py-3 bg-[#F8F9FE] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#4B6BFB]/10 outline-none h-32 resize-none"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700">Total Harga</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                  <input 
                    v-model="offerForm.price"
                    type="number" 
                    class="w-full pl-10 pr-4 py-3 bg-[#F8F9FE] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#4B6BFB]/10 outline-none font-bold"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700">Waktu Kerja</label>
                <input 
                  v-model="offerForm.deadline"
                  type="text" 
                  placeholder="Contoh: 3 Hari"
                  class="w-full px-4 py-3 bg-[#F8F9FE] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#4B6BFB]/10 outline-none"
                />
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button @click="showOfferModal = false" class="px-6 py-3 text-gray-500 font-bold hover:text-gray-700">Batal</button>
              <button @click="sendOffer" class="px-8 py-3 bg-[#1E3A8A] text-white font-bold rounded-xl hover:bg-[#1E3A8A]/90 shadow-lg">Kirim Penawaran</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

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
          v-for="contact in contacts" 
          :key="contact.id"
          :class="[
            'p-6 flex gap-4 cursor-pointer transition-colors border-b border-gray-50',
            contact.id === 1 ? 'bg-[#F8F9FE]' : 'hover:bg-gray-50'
          ]"
        >
          <img :src="contact.avatar" class="w-12 h-12 rounded-2xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-gray-900 truncate mb-1">{{ contact.name }}</h4>
            <p class="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{{ contact.lastMsg }}</p>
            <div class="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ contact.time }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col bg-white">
      <div class="px-8 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img :src="activeChat.avatar" class="w-10 h-10 rounded-xl object-cover" />
          <h3 class="font-bold text-gray-900">{{ activeChat.name }}</h3>
        </div>
        <button @click="showOfferModal = true" class="bg-[#4B6BFB] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#1E3A8A] transition-all shadow-lg shadow-[#4B6BFB]/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Buat Penawaran
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
        <div v-for="(msg, index) in activeChat.messages" :key="index" class="flex flex-col" :class="msg.sender === 'self' ? 'items-end' : 'items-start'">
          <div v-if="msg.type === 'custom_offer'" class="w-full max-w-[500px]">
            <div class="bg-[#F8F9FE] border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
              <div class="p-6 border-b border-gray-50 bg-white/50">
                <h4 class="text-sm font-bold text-[#4B6BFB]">Penawaran Kustom</h4>
              </div>
              <div class="p-8 space-y-6">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">{{ msg.title }}</h3>
                  <p class="text-xs text-gray-500 leading-relaxed">{{ msg.description }}</p>
                </div>
                
                <div class="flex gap-12">
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Harga</p>
                    <p class="text-sm font-bold text-gray-900">{{ msg.price }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Waktu Kerja</p>
                    <div class="flex items-center gap-1.5 text-gray-900">
                      <svg class="w-4 h-4 text-[#4B6BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span class="text-sm font-bold">{{ msg.duration }}</span>
                    </div>
                  </div>
                </div>

                <button disabled class="w-full py-3.5 rounded-xl bg-gray-50 text-gray-300 text-sm font-bold cursor-not-allowed border border-gray-100">
                  Menunggu Respon
                </button>
              </div>
            </div>
          </div>

          <div v-else class="max-w-[70%] flex flex-col" :class="msg.sender === 'self' ? 'items-end' : 'items-start'">
            <div 
              :class="[
                'p-5 rounded-3xl text-sm leading-relaxed',
                msg.sender === 'self' 
                  ? 'bg-[#4B6BFB] text-white rounded-tr-none shadow-lg shadow-[#4B6BFB]/20' 
                  : 'bg-[#E6F0FF] text-gray-800 rounded-tl-none'
              ]"
            >
              {{ msg.text }}
            </div>
            <span class="text-[10px] font-bold text-gray-400 mt-2">{{ msg.time }}</span>
          </div>
        </div>
      </div>

      <div class="px-8 py-6 border-t border-gray-100">
        <div class="flex items-center gap-4 bg-[#F8F9FE] rounded-2xl px-5 py-2">
          <button class="text-gray-400 hover:text-[#4B6BFB] transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
          </button>
          <input 
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
  </div>
</template>
