<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FileUpload from '../../components/ui/FileUpload.vue'
import Button from '../../components/ui/Button.vue'

const router = useRouter()
const ktmFile = ref<File | null>(null)
const portofolioFile = ref<File | null>(null)

function handleSubmit() {
  // Navigation to success or dashboard
  router.push('/vendor/dashboard')
}
</script>

<template>
  <div class="p-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-gray-900 mb-2">Upload Dokumen Verifikasi</h1>
      <p class="text-gray-700 text-base">Untuk menjaga keamanan sistem, upload dokumen disini!</p>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 max-w-xl">
      <FileUpload 
        v-model:file="ktmFile"
        accept=".docx,.pdf,.txt"
        dragText="Choose Document or drag and drop it here"
        formatText="DOCX, PDF, and TXT"
      >
        <template #label>
          Doc - Upload <span class="font-bold">KTM / SK Organisasi</span> disini
        </template>
      </FileUpload>

      <FileUpload 
        v-model:file="portofolioFile"
        accept=".docx,.pdf,.txt"
        dragText="Choose Document or drag and drop it here"
        formatText="DOCX, PDF, and TXT"
      >
        <template #label>
          Doc - Upload <span class="font-bold">Portofolio</span> disini
        </template>
      </FileUpload>

      <Button type="submit" variant="primary" class="w-full mt-2 h-14 rounded-xl text-xl font-medium relative flex items-center justify-center">
        Submit For Review
        <span class="absolute right-4 w-8 h-8 bg-white text-brand-navy rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </span>
      </Button>
    </form>
  </div>
</template>
