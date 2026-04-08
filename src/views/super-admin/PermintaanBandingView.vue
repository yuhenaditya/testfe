<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const selectedStatus = ref('Semua Status')
const selectedPriority = ref('Semua Prioritas')

const stats = [
  {
    icon: 'clock',
    value: 7,
    label: 'Banding yang Menunggu',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: 'x-circle',
    value: 5,
    label: 'Sengketa Aktif',
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600',
  },
  {
    icon: 'check-circle',
    value: 5,
    label: 'Diselesaikan Hari Ini',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
]

const bandingList = [
  {
    id: '#VDR-4567',
    name: 'Creativ Studio',
    priority: 'Tinggi',
    status: 'Menunggu Review',
  },
  {
    id: '#VDR-4567',
    name: 'Creativ Studio',
    priority: 'Tinggi',
    status: 'Menunggu Review',
  },
  {
    id: '#VDR-4567',
    name: 'Creativ Studio',
    priority: 'Tinggi',
    status: 'Menunggu Review',
  },
]

const statusOptions = ['Semua Status', 'Menunggu Review', 'Dalam Proses', 'Selesai']
const priorityOptions = ['Semua Prioritas', 'Tinggi', 'Sedang', 'Rendah']

const showStatusDropdown = ref(false)
const showPriorityDropdown = ref(false)

const goToProfile = () => {
  router.push({ name: 'Profile' })
}
</script>

<template>
  <div class="w-full font-sans">
    <!-- Page Title -->
    <h1 class="text-xl font-bold text-gray-900 mb-6">Permintaan Banding</h1>

    <!-- Stats Section with Background -->
    <div class="bg-[#FFF5F0] rounded-2xl p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(stat, idx) in stats"
          :key="idx"
          class="bg-white rounded-2xl p-5 shadow-sm"
        >
          <!-- Icon -->
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            :class="stat.bgColor"
          >
            <!-- Clock Icon -->
            <svg
              v-if="stat.icon === 'clock'"
              class="w-5 h-5"
              :class="stat.iconColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <!-- X Circle Icon -->
            <svg
              v-if="stat.icon === 'x-circle'"
              class="w-5 h-5"
              :class="stat.iconColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <!-- Check Circle Icon -->
            <svg
              v-if="stat.icon === 'check-circle'"
              class="w-5 h-5"
              :class="stat.iconColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Value -->
          <p class="text-3xl font-bold text-gray-900 mb-1">{{ stat.value }}</p>

          <!-- Label -->
          <p class="text-sm text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <!-- Search Input -->
      <div class="flex-1">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="cari nama toko atau ID..."
            class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Filter Dropdowns -->
      <div class="flex gap-3">
        <!-- Status Dropdown -->
        <div class="relative">
          <button
            @click="showStatusDropdown = !showStatusDropdown"
            @blur="setTimeout(() => showStatusDropdown = false, 150)"
            class="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {{ selectedStatus }}
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showStatusDropdown"
            class="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[160px] py-2"
          >
            <button
              v-for="option in statusOptions"
              :key="option"
              @click="selectedStatus = option; showStatusDropdown = false"
              class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
              :class="selectedStatus === option ? 'text-blue-600 font-medium' : 'text-gray-700'"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Priority Dropdown -->
        <div class="relative">
          <button
            @click="showPriorityDropdown = !showPriorityDropdown"
            @blur="setTimeout(() => showPriorityDropdown = false, 150)"
            class="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {{ selectedPriority }}
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showPriorityDropdown"
            class="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[160px] py-2"
          >
            <button
              v-for="option in priorityOptions"
              :key="option"
              @click="selectedPriority = option; showPriorityDropdown = false"
              class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
              :class="selectedPriority === option ? 'text-blue-600 font-medium' : 'text-gray-700'"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Banding List -->
    <div class="space-y-4">
      <div
        v-for="(item, idx) in bandingList"
        :key="idx"
        class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <!-- Name and Priority Badge -->
            <div class="flex items-center gap-3 mb-1">
              <h3 class="text-base font-bold text-gray-900">{{ item.name }}</h3>
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200">
                {{ item.priority }}
              </span>
            </div>
            <!-- ID -->
            <p class="text-sm text-gray-500">{{ item.id }}</p>
          </div>

          <!-- Status -->
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-orange-400"></span>
            <span class="text-sm font-medium text-orange-500">{{ item.status }}</span>
          </div>
        </div>

        <!-- Review Button -->
        <button
          @click="goToProfile"
          class="inline-flex items-center gap-2 bg-brand-navy hover:bg-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Review Banding
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No scoped styles needed */
</style>
