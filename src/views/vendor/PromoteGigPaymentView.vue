<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../../components/ui/Button.vue'
import Toast from '../../components/ui/Toast.vue'

const router = useRouter()
const paymentMethod = ref('wallet')
const showToast = ref(false)

const summary = {
  title: 'Jasa Desain Keren Banget',
  duration: '3 Hari',
  nominal: 'Rp. 50.000'
}

function handlePayment() {
  showToast.value = true
  setTimeout(() => {
    router.push('/vendor/catalog')
  }, 2000)
}
</script>

<template>
  <div class="p-8 max-w-4xl relative">
    <div v-if="showToast" class="fixed top-8 right-8 z-50">
      <Toast type="info" title="Berhasil di Submit" subtitle="PENDING_APPROVAL" />
    </div>

    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-gray-900 mb-1">Promote My Gigs</h1>
      <p class="text-sm text-gray-600 font-medium">Pilih Metode Pembayaran</p>
    </div>

    <div class="flex gap-4 mb-10">
      <div class="flex flex-col gap-1.5">
        <label class="text-[11px] font-medium text-gray-500">Judul</label>
        <div class="bg-brand-navy text-white px-4 py-1.5 rounded-lg text-xs font-medium">
          {{ summary.title }}
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-[11px] font-medium text-gray-500">Durasi :</label>
        <div class="bg-brand-navy text-white px-4 py-1.5 rounded-lg text-xs font-medium">
          {{ summary.duration }}
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-[11px] font-medium text-gray-500">Nominal :</label>
        <div class="bg-brand-navy text-white px-4 py-1.5 rounded-lg text-xs font-medium">
          {{ summary.nominal }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 max-w-3xl mb-10">
      <label 
        class="relative border rounded-2xl p-8 flex flex-col items-center gap-6 cursor-pointer transition-all h-[260px] justify-center"
        :class="paymentMethod === 'wallet' ? 'border-brand-blue ring-1 ring-brand-blue' : 'border-gray-200'"
      >
        <input type="radio" v-model="paymentMethod" value="wallet" class="absolute top-4 left-4 w-5 h-5 accent-brand-blue" />
        <div class="text-gray-900">
          <svg class="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <span class="text-sm font-bold text-gray-900">Bayar Dengan Saldo Wallet</span>
      </label>

      <label 
        class="relative border rounded-2xl p-8 flex flex-col items-center gap-6 cursor-pointer transition-all h-[260px] justify-center"
        :class="paymentMethod === 'bank' ? 'border-brand-blue ring-1 ring-brand-blue' : 'border-gray-200'"
      >
        <input type="radio" v-model="paymentMethod" value="bank" class="absolute top-4 left-4 w-5 h-5 accent-brand-blue" />
        <div class="text-gray-900">
          <svg class="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <span class="text-sm font-bold text-gray-900">Bayar Dengan Transfer Bank</span>
      </label>
    </div>

    <Button @click="handlePayment" variant="primary" class="max-w-3xl w-full h-14 rounded-xl text-xl font-medium relative flex items-center justify-center">
      Proceed Payment
      <span class="absolute right-4 w-8 h-8 bg-white text-brand-navy rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
        </svg>
      </span>
    </Button>
  </div>
</template>
