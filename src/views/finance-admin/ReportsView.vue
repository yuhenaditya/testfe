<script setup lang="ts">
import { ref, computed } from 'vue'

const currentStep = ref(1) // 1: Penutupan Bulanan, 2: Kalkulasi, 3: Konfirmasi

// === Step 1 Data ===
const selectedPeriod = ref('January 2026')
const periods = ['January 2026', 'February 2026', 'March 2026']

// === Step 2 Data ===
const grossRevenue = 150000000 // Fixed for demo

const costServer = ref<number | null>(10000000)
const costDomain = ref<number | null>(2000000)
const costApi = ref<number | null>(3000000)

const totalOperationalCost = computed(() => {
  return (costServer.value || 0) + (costDomain.value || 0) + (costApi.value || 0)
})

const netProfit = computed(() => {
  return grossRevenue - totalOperationalCost.value
})

const cscShare = computed(() => {
  return netProfit.value * 0.6
})

const cciShare = computed(() => {
  return netProfit.value * 0.4
})

// === Helpers ===
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val)
}

function nextStep() {
  if (currentStep.value < 3) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

function finishProcess() {
  alert('Periode Pembukuan ' + selectedPeriod.value + ' Berhasil Ditutup!')
  currentStep.value = 1
}
</script>

<template>
  <div class="space-y-6 w-full max-w-6xl mx-auto font-sans pb-20">
    
    <!-- STEP 1: Laporan & Dividen -->
    <template v-if="currentStep === 1">
      <div class="mb-8">
        <h1 class="text-[22px] font-semibold text-gray-800">Laporan & Dividen</h1>
      </div>

      <div class="bg-[#F8F9FB] border border-gray-100 rounded-3xl p-8 relative overflow-hidden">
        
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 class="text-3xl font-black text-[#0B4086] mb-2">Penutupan Bulanan</h2>
            <p class="text-gray-600 font-medium">Mulai proses rekonsiliasi akhir dan distribusi dividen.</p>
          </div>
          
          <div class="flex items-center gap-4 bg-[#F1F3F9] p-2 rounded-2xl border border-gray-200 shadow-sm">
            <div class="px-3">
              <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">FISCAL PERIOD</label>
              <div class="flex items-center gap-2 text-[#0B4086] font-bold cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <select v-model="selectedPeriod" class="bg-transparent appearance-none focus:outline-none cursor-pointer text-sm">
                  <option v-for="p in periods" :key="p" :value="p">{{ p }}</option>
                </select>
                <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <button class="bg-[#2A437E] hover:bg-[#1e305a] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Buat Laporan
            </button>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 relative z-10">
          
          <!-- GMV Card -->
          <div class="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between">
            <div class="absolute -right-8 -bottom-8 opacity-5">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M23 6l-9.5 9.5-5-5L1 18l1.5 1.5 6-6 5 5 11-11z" /></svg>
            </div>
            
            <div class="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p class="text-xs font-bold text-[#0B4086] uppercase tracking-widest mb-1">TOTAL GMV</p>
                <p class="text-xs text-gray-400 font-medium">Gross Merchandise Value</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <svg class="w-4 h-4 text-[#0B4086]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
            </div>
            
            <div class="flex items-end gap-2 mb-6 relative z-10">
              <span class="text-xl font-bold text-gray-400 mb-1">RP</span>
              <span class="text-5xl font-black text-[#0B4086] tracking-tight">14.285.4Jt</span>
            </div>
            
            <div class="flex items-center gap-3 relative z-10">
              <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-xs font-bold">
                ↑ 12.4%
              </span>
              <span class="text-sm font-medium text-gray-500">dibanding periode sebelumnya</span>
            </div>
          </div>

          <!-- Pendapatan Kotor Card -->
          <div class="bg-[#032060] rounded-[24px] p-8 shadow-md text-white flex flex-col justify-center relative overflow-hidden">
            <div class="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            
            <div class="flex justify-end mb-4 relative z-10">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span class="font-serif font-bold text-lg">$</span>
              </div>
            </div>
            
            <div class="relative z-10">
              <p class="text-lg font-medium text-white/90 mb-2">Total Pendapatan Kotor</p>
              <div class="flex items-end gap-2">
                <span class="text-xl font-bold text-white/50 mb-1">RP</span>
                <span class="text-6xl font-black tracking-tight">2,49Jt</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Analisis Komponen -->
        <h3 class="text-xl font-bold text-[#0B4086] mb-6 relative z-10">Analisis Komponen Pendapatan</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
          
          <div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-start gap-5">
            <div class="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
              <span class="text-[#0B4086] font-bold text-xl">%</span>
            </div>
            <div>
              <h4 class="font-bold text-[#0B4086] text-lg mb-2">Biaya Komisi</h4>
              <p class="text-xs text-gray-500 font-medium leading-relaxed mb-4">Biaya fasilitasi platform dari transaksi merchant di seluruh kategori.</p>
              <div class="flex items-end gap-1.5">
                <span class="text-xs font-bold text-gray-400 mb-0.5">RP</span>
                <span class="text-2xl font-black text-[#0B4086]">649.000</span>
              </div>
            </div>
          </div>

          <div class="bg-[#F8F9FC] rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-start gap-5">
            <div class="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
              <svg class="w-6 h-6 text-[#0B4086]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-[#0B4086] text-lg mb-2">Pendapatan Iklan</h4>
              <p class="text-xs text-gray-500 font-medium leading-relaxed mb-4">Pendapatan yang dihasilkan dari promosi merchant internal dan penempatan iklan premium.</p>
              <div class="flex items-end gap-1.5">
                <span class="text-xs font-bold text-gray-400 mb-0.5">RP</span>
                <span class="text-2xl font-black text-[#0B4086]">649.000</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Next Step Card -->
        <div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div class="flex items-center gap-5">
            <div class="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center shrink-0">
              <svg class="w-6 h-6 text-[#2A437E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-[#0B4086] text-base mb-1">Langkah Berikutnya: Registri Dividen</h4>
              <p class="text-xs text-gray-500 font-medium">Periksa kembali siklus pelaporan dan validasi kinerja pendapatan kotor sebelum melanjutkan ke tahap perhitungan.</p>
            </div>
          </div>
          <button @click="nextStep" class="shrink-0 bg-[#2A437E] hover:bg-[#1e305a] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-md">
            Lanjut ke Perhitungan
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>

      </div>
    </template>


    <!-- STEP 2: Kalkulasi Laba & Dividen -->
    <template v-else-if="currentStep === 2">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-semibold mb-4">
        <button @click="prevStep" class="text-gray-400 hover:text-gray-700">Laporan & Dividen</button>
        <span class="text-gray-400">/</span>
        <span class="text-[#0B4086]">Kalkulasi Laba & Dividen</span>
      </div>

      <div class="mb-8">
        <h1 class="text-3xl font-black text-[#0B4086]">Disbursement</h1>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Left Panel: Biaya Operasional -->
        <div class="w-full lg:w-1/3 bg-[#F8F9FB] rounded-[24px] p-8 border border-gray-100">
          <h2 class="text-xl font-bold text-[#0B4086] mb-8">Biaya Operasional</h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">INFRASTRUKTUR SERVER</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">RP</span>
                <input type="number" v-model="costServer" class="w-full bg-[#EBECEF] rounded-xl py-3.5 pl-12 pr-4 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B4086]/20 transition-all">
              </div>
            </div>
            
            <div>
              <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">MANAJEMEN DOMAIN & DNS</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">RP</span>
                <input type="number" v-model="costDomain" class="w-full bg-[#EBECEF] rounded-xl py-3.5 pl-12 pr-4 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B4086]/20 transition-all">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">LISENSI LAYANAN API</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">RP</span>
                <input type="number" v-model="costApi" class="w-full bg-[#EBECEF] rounded-xl py-3.5 pl-12 pr-4 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B4086]/20 transition-all">
              </div>
            </div>
          </div>

          <div class="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <span class="text-sm font-bold text-gray-600">Total Biaya Operasional</span>
            <span class="text-2xl font-black text-red-600">{{ formatCurrency(totalOperationalCost) }}</span>
          </div>
        </div>

        <!-- Right Panel: Kalkulasi -->
        <div class="w-full lg:w-2/3 space-y-6">
          
          <!-- Top Card -->
          <div class="bg-[#F3F4F8] rounded-[24px] p-8 border border-gray-100 relative overflow-hidden">
            <div class="flex justify-between items-start mb-10">
              <div>
                <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">TOTAL PENDAPATAN KOTOR</p>
                <p class="text-3xl font-black text-[#0B4086]">{{ formatCurrency(grossRevenue) }}</p>
              </div>
              <div class="text-right">
                <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">LABA BERSIH</p>
                <p class="text-3xl font-black text-[#285EEA]">{{ formatCurrency(netProfit) }}</p>
              </div>
            </div>

            <div>
              <p class="text-[11px] font-bold text-[#0B4086] uppercase tracking-wider mb-3">PEMBAGIAN DISTRIBUSI DIVIDEN</p>
              <div class="w-full flex h-16 rounded-xl overflow-hidden shadow-sm mb-4">
                <div class="bg-[#385399] h-full flex flex-col justify-center px-4 text-white" style="width: 60%;">
                  <span class="text-[10px] font-bold opacity-80 uppercase tracking-wide">CSC (60%)</span>
                  <span class="font-bold">{{ formatCurrency(cscShare) }}</span>
                </div>
                <div class="bg-[#1C64F2] h-full flex flex-col justify-center px-4 text-white text-right" style="width: 40%;">
                  <span class="text-[10px] font-bold opacity-80 uppercase tracking-wide">CCI (40%)</span>
                  <span class="font-bold">{{ formatCurrency(cciShare) }}</span>
                </div>
              </div>
              <div class="flex justify-between text-[11px] font-bold text-gray-600">
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#385399]"></span> Community Support Center</div>
                <div class="flex items-center gap-1.5">Central Computer Improvement <span class="w-2.5 h-2.5 rounded-full bg-[#1C64F2]"></span></div>
              </div>
            </div>
          </div>

          <!-- Bottom Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- CSC -->
            <div class="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
              <div class="flex justify-between items-start mb-6">
                <div class="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#385399]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-bold text-[#1C64F2] uppercase tracking-wider mb-0.5">BOBOT PEMBAGIAN</p>
                  <p class="font-black text-[#0B4086] text-xl">0.60</p>
                </div>
              </div>
              <p class="text-sm font-bold text-gray-500 mb-1">Pencairan CSC</p>
              <p class="text-2xl font-black text-[#0B4086]">{{ formatCurrency(cscShare) }}</p>
            </div>

            <!-- CCI -->
            <div class="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
              <div class="flex justify-between items-start mb-6">
                <div class="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#1C64F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-bold text-[#1C64F2] uppercase tracking-wider mb-0.5">BOBOT PEMBAGIAN</p>
                  <p class="font-black text-[#0B4086] text-xl">0.40</p>
                </div>
              </div>
              <p class="text-sm font-bold text-gray-500 mb-1">Pencairan CCI</p>
              <p class="text-2xl font-black text-[#1C64F2]">{{ formatCurrency(cciShare) }}</p>
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button @click="nextStep" class="bg-[#2A437E] hover:bg-[#1e305a] text-white text-base font-bold px-8 py-4 rounded-xl transition-colors flex items-center gap-3 shadow-lg">
              Proses Dividen
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

        </div>
      </div>
    </template>


    <!-- STEP 3: Konfirmasi -->
    <template v-else-if="currentStep === 3">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-semibold mb-4">
        <button @click="currentStep = 1" class="text-gray-400 hover:text-gray-700">Laporan & Dividen</button>
        <span class="text-gray-400">/</span>
        <button @click="currentStep = 2" class="text-gray-400 hover:text-gray-700">Kalkulasi Laba & Dividen</button>
        <span class="text-gray-400">/</span>
        <span class="text-[#0B4086]">Konfirmasi</span>
      </div>

      <div class="mb-8">
        <h1 class="text-3xl font-black text-[#0B4086]">Penutupan Buku Akhir</h1>
      </div>

      <div class="space-y-6 max-w-4xl">
        
        <!-- Top Card -->
        <div class="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
          <div class="px-8 py-5 border-b border-gray-100">
            <h3 class="font-bold text-gray-900 text-lg">Ringkasan Penutupan Bulanan</h3>
          </div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-[#F8F9FB] rounded-xl p-6">
                <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">TOTAL PENDAPATAN</p>
                <p class="text-3xl font-black text-[#0B4086]">{{ formatCurrency(grossRevenue) }}</p>
              </div>
              <div class="bg-[#F8F9FB] rounded-xl p-6">
                <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">TOTAL BIAYA</p>
                <p class="text-3xl font-black text-gray-900">{{ formatCurrency(totalOperationalCost) }}</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-gray-50">
                <span class="text-sm font-medium text-gray-600">Laba Bersih</span>
                <span class="text-sm font-bold text-emerald-600">{{ formatCurrency(netProfit) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-50">
                <span class="text-sm font-medium text-gray-600">Dividend Distribution (CCI)</span>
                <span class="text-sm font-bold text-[#0B4086]">{{ formatCurrency(cciShare) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-50">
                <span class="text-sm font-medium text-gray-600">Retained Earnings (CSC)</span>
                <span class="text-sm font-bold text-gray-900">{{ formatCurrency(cscShare) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Proof -->
        <div class="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
          <div class="mb-4">
            <h3 class="font-bold text-gray-900 text-lg">Upload Proof of Transfer</h3>
            <p class="text-sm text-gray-500">Required for CCI Dividend documentation</p>
          </div>
          
          <div class="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div class="w-12 h-12 bg-[#F0F4FF] rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#2A437E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <p class="font-bold text-gray-900 mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-gray-500 font-medium">PDF, JPG or PNG (max. 10MB)</p>
          </div>
        </div>

        <!-- Confirmation Action -->
        <div class="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1">
            <h3 class="font-bold text-[#0B4086] text-xl mb-2">Konfirmasi Akhir</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Dengan menekan "Tutup Periode Pembukuan", Anda menyatakan bahwa seluruh laporan keuangan sudah akurat. 
              Tindakan ini akan memicu pembuatan laporan fiskal secara otomatis dan mengunci periode buku besar saat ini dari perubahan lebih lanjut.
            </p>
          </div>
          <button @click="finishProcess" class="shrink-0 bg-[#1e305a] hover:bg-[#111e3d] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
            Tutup Periode Pembukuan
          </button>
        </div>

      </div>
    </template>

  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
