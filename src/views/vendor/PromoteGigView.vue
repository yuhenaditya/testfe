<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../../components/ui/Button.vue'

const router = useRouter()
const gigTitle = ref('Jasa Desain Keren Banget')
const duration = ref(3)

const marks = [
  { value: 1, label: '1 Hari' },
  { value: 10, label: '10 Hari' },
  { value: 30, label: '30 Hari' },
  { value: 90, label: '90 Hari' },
  { value: 180, label: '180 Hari' }
]

function handleNext() {
  router.push('/vendor/catalog/promote/1/payment')
}
</script>

<template>
  <div class="p-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-gray-900 mb-1">Promote My Gigs</h1>
      <p class="text-sm text-gray-600 font-medium">Pilih Durasi Promote</p>
    </div>

    <div class="flex flex-col gap-8 max-w-lg">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700">Judul</label>
        <div class="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm font-medium inline-block w-fit">
          {{ gigTitle }}
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700 text-[16px]">Durasi :</span>
          <span class="text-sm font-bold text-gray-900 text-[16px]">{{ duration }} Hari</span>
        </div>

        <div class="relative pt-2 pb-8">
          <input 
            type="range" 
            v-model="duration" 
            min="1" 
            max="180" 
            class="w-full h-2 bg-brand-navy rounded-lg appearance-none cursor-pointer accent-brand-blue"
          />
          
          <div class="absolute w-full flex justify-between px-0.5 mt-2">
            <div v-for="mark in marks" :key="mark.value" class="flex flex-col items-center">
              <div class="w-px h-2 bg-gray-300"></div>
              <span class="text-[10px] text-gray-400 mt-1 whitespace-nowrap">{{ mark.label }}</span>
            </div>
          </div>
          
          <div class="absolute w-full flex justify-between px-0.5 -mt-[14px] pointer-events-none">
            <div v-for="n in 40" :key="n" class="w-px h-1 bg-gray-200"></div>
          </div>
        </div>
      </div>

      <Button @click="handleNext" variant="primary" class="w-full h-14 rounded-xl text-xl font-medium relative flex items-center justify-center mt-4">
        Next
        <span class="absolute right-4 w-8 h-8 bg-white text-brand-navy rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </span>
      </Button>
    </div>
  </div>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  background: #2F4DC4;
  border-radius: 50%;
  cursor: pointer;
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

input[type='range']::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: #2F4DC4;
  border-radius: 50%;
  cursor: pointer;
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
