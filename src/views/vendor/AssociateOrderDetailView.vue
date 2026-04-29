<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = ref(route.params.id || 'ORD-20240512-9901')

const status = ref('DISPUTE') 

const steps = ref([
  { name: 'Dibayar', active: true, completed: true },
  { name: 'Pengerjaan', active: true, completed: false },
  { name: 'Dikirim', active: false, completed: false },
  { name: 'Selesai', active: false, completed: false }
])

function goBack() {
  router.push('/vendor/associate/orders')
}
</script>

<template>
  <div class="p-8 space-y-8 bg-[#FAF9F9] min-h-screen pb-20 font-sans">
    <!-- DISPUTE ALERT BANNER (Matching Screenshot) -->
    <div v-if="status === 'DISPUTE'" class="bg-red-50 border border-red-100 rounded-2xl p-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <h3 class="text-xl font-bold text-red-800 mb-2">Pesanan Dibekukan: Sengketa sedang dalam investigasi</h3>
      <p class="text-sm text-red-600 font-medium">Semua aktivitas pengiriman dan transfer dana dihentikan sementara untuk Pesanan #{{ orderId }}.</p>
    </div>

    <!-- REVISION ALERT -->
    <div v-if="status === 'REVISI'" class="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div class="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <div>
        <h3 class="text-xl font-black text-red-600">Status: DALAM REVISI</h3>
        <p class="text-sm font-bold text-red-400">Tindakan diperlukan segera</p>
      </div>
    </div>

    <div class="space-y-1">
      <div class="flex items-center gap-2">
        <button @click="goBack" class="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2 text-gray-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span class="text-sm font-bold text-[#1E3A8A] uppercase tracking-widest"># {{ orderId }}</span>
      </div>
      <h1 class="text-4xl font-black text-[#0A1D56]">Detail Pesanan</h1>
    </div>

    <div class="grid grid-cols-12 gap-8 items-start">
      <div class="col-span-8 space-y-8">
        <!-- Progress Stepper -->
        <div class="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Pengerjaan</h3>
          <div class="relative flex justify-between px-4">
            <div class="absolute top-5 left-10 right-10 h-0.5 bg-gray-100"></div>
            <div class="absolute top-5 left-10 w-1/3 h-0.5 bg-[#4B6BFB]"></div>
            <div v-for="(step, i) in steps" :key="i" class="relative z-10 flex flex-col items-center gap-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                :class="step.active ? 'bg-[#4B6BFB] text-white shadow-lg shadow-[#4B6BFB]/30' : 'bg-gray-100 text-gray-400'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="i === 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  <path v-else-if="i === 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  <path v-else-if="i === 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-xs font-bold" :class="step.active ? 'text-[#4B6BFB]' : 'text-gray-400'">{{ step.name }}</span>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-[#4B6BFB]/10 rounded-lg">
              <svg class="w-6 h-6 text-[#4B6BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h2 class="text-2xl font-bold text-[#0A1D56]">Instruksi Pekerjaan</h2>
          </div>
          <div class="bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
            <p class="text-sm font-medium text-gray-700 leading-relaxed">
              Mohon buatkan desain logo yang memadukan elemen minimalis dan futuristik. Fokus pada penggunaan warna biru navy dan aksen perak. Klien menginginkan simbol yang merepresentasikan "Kecepatan".
            </p>
          </div>
        </div>

        <!-- DISPUTE EVIDENCE SUBMISSION (Matching Screenshot) -->
        <div v-if="status === 'DISPUTE'" class="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 class="text-3xl font-bold text-[#0A1D56]">Pengajuan Bukti</h2>
          
          <div class="space-y-4">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kronologi & Catatan</label>
            <textarea 
              placeholder="Jelaskan urutan kejadian yang mengarah pada sengketa ini..."
              class="w-full px-8 py-6 bg-white border border-gray-100 rounded-[32px] text-sm font-medium focus:ring-4 focus:ring-[#4B6BFB]/5 outline-none transition-all h-48 resize-none placeholder-gray-300"
            ></textarea>
          </div>

          <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-200 rounded-[32px] p-16 flex flex-col items-center gap-4 hover:border-[#4B6BFB]/30 transition-all cursor-pointer bg-gray-50/20 group">
              <div class="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-gray-400 group-hover:text-[#4B6BFB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-sm font-bold text-gray-600 uppercase tracking-wide">Unggah Tangkapan Layar</p>
                <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button class="bg-[#1E3A8A] text-white px-16 py-5 rounded-2xl text-lg font-black shadow-2xl shadow-[#1E3A8A]/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <!-- REVISION SUBMISSION -->
        <div v-if="status === 'REVISI'" class="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 class="text-2xl font-bold text-[#0A1D56] uppercase tracking-tighter">Pengumpulan Hasil Pekerjaan</h2>
          <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-100 rounded-[32px] p-12 flex flex-col items-center gap-4 hover:border-[#4B6BFB]/30 transition-all cursor-pointer bg-gray-50/30">
              <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <svg class="w-8 h-8 text-[#4B6BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <div class="text-center">
                <p class="text-sm font-bold text-[#0A1D56]">Drop files here or <span class="text-[#4B6BFB] underline">click to browse</span></p>
                <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">PDF, JPG, or ZIP (Max 150MB)</p>
              </div>
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pesan Untuk Klien</label>
              <textarea placeholder="Jelaskan hasil yang Anda kirim atau perubahan sejak versi terakhir..." class="w-full px-8 py-6 bg-white border border-gray-100 rounded-[32px] text-sm font-medium focus:ring-4 focus:ring-[#4B6BFB]/5 outline-none transition-all h-40 resize-none placeholder-gray-300"></textarea>
            </div>
            <div class="space-y-6 text-center">
              <button class="w-full py-5 bg-[#1E3A8A] text-white rounded-2xl text-lg font-black shadow-2xl shadow-[#1E3A8A]/30 hover:scale-[1.01] active:scale-[0.99] transition-all">Kirim Hasil</button>
              <p class="text-[10px] text-gray-400 font-medium px-12 leading-relaxed">Dengan menekan "Kirim Hasil", Anda menyatakan bahwa hasil yang dikirim telah memenuhi semua persyaratan kontrak.</p>
            </div>
          </div>
        </div>

        <!-- Dispute Guidance (Secondary Info) -->
        <div v-if="status === 'DISPUTE'" class="bg-blue-50/50 p-10 rounded-[40px] border border-blue-100 space-y-4 text-[#1E3A8A]">
          <h4 class="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Panduan Eskalasi
          </h4>
          <p class="text-sm font-medium opacity-80 italic">"Silakan hubungi CS via Instagram jika ingin mengajukan komplain resmi."</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-span-4 space-y-8">
        <div class="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div class="space-y-4">
            <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Informasi Pembeli</h3>
            <div class="flex items-center gap-4 pt-2">
              <img src="https://i.pravatar.cc/150?u=budi" class="w-12 h-12 rounded-2xl object-cover" />
              <h4 class="text-base font-bold text-[#0A1D56]">Budi Santoso</h4>
            </div>
          </div>
          <div class="space-y-6 border-t border-gray-50 pt-8">
            <div class="flex justify-between items-center">
              <span class="text-[10px] font-bold text-gray-400 uppercase">Tenggat Waktu:</span>
              <span class="text-sm font-bold text-red-500">15 Mei 2026</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[10px] font-bold text-gray-400 uppercase">Total Pembayaran</span>
              <span class="text-xl font-black text-gray-900">Rp150.000</span>
            </div>
          </div>
        </div>

        <!-- Revision History Sidebar Section -->
        <div v-if="status === 'REVISI'" class="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <h2 class="text-xl font-bold text-[#0A1D56]">Riwayat Revisi</h2>
          <div class="space-y-8">
            <div class="bg-white border border-gray-50 rounded-3xl p-6 shadow-sm space-y-4">
              <div class="flex justify-between items-center">
                <span class="px-3 py-1 bg-red-50 text-red-500 text-[8px] font-black uppercase tracking-tighter rounded-full">Revisi Diminta</span>
                <span class="text-[10px] font-bold text-gray-300">2 Jam lalu</span>
              </div>
              <p class="text-sm font-black text-gray-700 italic leading-relaxed">"atur dikit warna nya jgn terlalu kontras"</p>
              <div class="flex items-center gap-2 text-[#4B6BFB] text-xs font-bold hover:underline cursor-pointer pt-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                ref_lighting_3.jpg
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
