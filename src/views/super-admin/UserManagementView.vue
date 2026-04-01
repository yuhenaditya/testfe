<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  {
    id: 'ID0001',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    status: 'Suspend',
  },
  {
    id: 'ID0002',
    name: 'Phoenix Baker',
    email: 'phoenix@untitledui.com',
    status: 'Active',
  },
  {
    id: 'ID0003',
    name: 'Lana Steiner',
    email: 'lana@untitledui.com',
    status: 'Active',
  },
  {
    id: 'ID0004',
    name: 'Demi Wilkinson',
    email: 'demi@untitledui.com',
    status: 'Active',
  },
  {
    id: 'ID0003',
    name: 'Lana Steiner',
    email: 'lana@untitledui.com',
    status: 'Active',
  },
  {
    id: 'ID0004',
    name: 'Demi Wilkinson',
    email: 'demi@untitledui.com',
    status: 'Active',
  },
])
</script>

<template>
  <div class="space-y-6 pb-12 w-full max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-200 pb-4 h-16">
      <h1 class="text-[22px] font-semibold text-gray-900 border-none">Manajemen User</h1>
      <!-- Top header notification bell -->
      <button class="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full border border-white bg-red-500"></span>
      </button>
    </div>

    <!-- Filters and Action bar -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#F9F7F7] pt-2">
      <!-- Search -->
      <div class="relative w-full sm:max-w-md flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="cari member"
          class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all"
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Status Dropdown -->
        <div class="relative">
          <button class="flex items-center justify-between w-full sm:w-auto gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-gray-50 focus:outline-none shadow-sm transition-all">
            Semua Status
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Role Dropdown -->
        <div class="relative">
          <button class="flex items-center justify-between w-full sm:w-auto gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-gray-50 focus:outline-none shadow-sm transition-all">
            Semua Role
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Add Admin Button -->
        <button class="flex items-center justify-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-blue-800 shadow-sm transition-all whitespace-nowrap">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Tambah Admin
        </button>
      </div>
    </div>

    <!-- Main Card Content -->
    <div class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      <!-- Card Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center gap-3 bg-white">
        <h2 class="text-lg font-bold text-gray-900 leading-none">Total User</h2>
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
          32 users
        </span>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-white">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                <div class="flex items-center gap-1">
                  Status
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                Email address
              </th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-500 tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(user, index) in users" :key="index">
              <tr class="hover:bg-gray-50 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-900">{{ user.name }}</span>
                    <span class="text-sm text-gray-500">{{ user.id }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-gray-300 gap-1.5"
                    :class="user.status === 'Active' ? 'text-gray-700 bg-white' : 'text-gray-700 bg-white'"
                  >
                    <!-- Dot -->
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="user.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'"
                    ></span>
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">{{ user.email }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-gray-400 hover:text-gray-600 transition-colors">
                    <span class="sr-only">View</span>
                    <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="bg-white px-6 py-4 flex items-center border-t border-gray-200 justify-between">
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Previous
        </button>

        <!-- Page Numbers -->
        <div class="hidden md:flex items-center gap-1.5">
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg bg-gray-100 text-gray-900 transition-colors">1</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">2</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">3</button>
          <span class="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-600">...</span>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">8</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">9</button>
          <button class="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">10</button>
        </div>

        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none">
          Next
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* No specific styles needed since Tailwind handles all standard design tokens. */
</style>
