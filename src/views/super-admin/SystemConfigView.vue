<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '../../components/ui/Input.vue'
import AppButton from '../../components/ui/Button.vue'
import AppModal from '../../components/ui/Modal.vue'
import AppTable from '../../components/ui/Table.vue'
import type { Column } from '../../components/ui/Table.vue'

// Fee Configuration
const mockFeePercentage = ref(5)

// Maintenance Mode
const mockMaintenanceMode = ref(false)
const showMaintenanceModal = ref(false)

// Password Confirmation Modal
const showPasswordModal = ref(false)
const confirmPassword = ref('')
const pendingAction = ref('')

// Category Management
const showCategoryModal = ref(false)
const newCategoryName = ref('')

const categoryColumns: Column[] = [
  { key: 'id', label: 'ID', width: '80px', align: 'center' },
  { key: 'name', label: 'Nama Kategori' },
  { key: 'total', label: 'Total Jasa', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: 'Aksi', align: 'center', width: '120px' },
]

const mockCategories = ref([
  { id: 1, name: 'Cleaning Service', total: 45, status: 'Aktif' },
  { id: 2, name: 'Catering', total: 32, status: 'Aktif' },
  { id: 3, name: 'Security', total: 18, status: 'Aktif' },
  { id: 4, name: 'IT Support', total: 27, status: 'Aktif' },
  { id: 5, name: 'Maintenance', total: 14, status: 'Non-Aktif' },
])

function handleUpdateFee() {
  pendingAction.value = 'update-fee'
  showPasswordModal.value = true
}

function handleToggleMaintenance() {
  showMaintenanceModal.value = true
}

function confirmMaintenance() {
  showMaintenanceModal.value = false
  pendingAction.value = 'toggle-maintenance'
  showPasswordModal.value = true
}

function handlePasswordConfirm() {
  // Mock: just close and reset
  showPasswordModal.value = false
  confirmPassword.value = ''

  if (pendingAction.value === 'toggle-maintenance') {
    mockMaintenanceMode.value = !mockMaintenanceMode.value
  }

  pendingAction.value = ''
}

function handleAddCategory() {
  showCategoryModal.value = true
}

function confirmAddCategory() {
  if (newCategoryName.value.trim()) {
    mockCategories.value.push({
      id: mockCategories.value.length + 1,
      name: newCategoryName.value,
      total: 0,
      status: 'Aktif',
    })
    newCategoryName.value = ''
    showCategoryModal.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-h3 font-bold text-gray-800">System Configuration</h1>
      <p class="text-body-sm text-gray-500 mt-1">Kelola konfigurasi global sistem marketplace.</p>
    </div>

    <!-- Section 1: Fee Configuration -->
    <section class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 class="text-body-lg font-semibold text-gray-700 mb-4">Pengaturan Fee Platform</h2>
      <p class="text-body-sm text-gray-500 mb-4">Atur persentase komisi yang diambil platform dari setiap transaksi.</p>
      <div class="flex items-end gap-4 max-w-md">
        <div class="flex-1">
          <AppInput
            id="fee-percentage"
            label="Persentase Komisi (%)"
            type="number"
            placeholder="Masukkan persentase"
            v-model="mockFeePercentage"
          />
        </div>
        <AppButton variant="primary" @click="handleUpdateFee">
          Update Fee
        </AppButton>
      </div>
    </section>

    <!-- Section 2: Emergency Maintenance -->
    <section class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 class="text-body-lg font-semibold text-gray-700 mb-4">Mode Maintenance</h2>
      <p class="text-body-sm text-gray-500 mb-4">Aktifkan mode darurat untuk menonaktifkan sementara seluruh layanan marketplace.</p>
      <div class="flex items-center gap-4">
        <button
          @click="handleToggleMaintenance"
          :class="[
            'relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer',
            mockMaintenanceMode
              ? 'bg-danger focus:ring-danger'
              : 'bg-gray-300 focus:ring-gray-400',
          ]"
        >
          <span
            :class="[
              'inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300',
              mockMaintenanceMode ? 'translate-x-6' : 'translate-x-1',
            ]"
          />
        </button>
        <div>
          <span
            :class="[
              'text-body-sm font-semibold',
              mockMaintenanceMode ? 'text-danger' : 'text-gray-600',
            ]"
          >
            {{ mockMaintenanceMode ? '🔴 Emergency Maintenance AKTIF' : 'Emergency Maintenance' }}
          </span>
          <p class="text-body-xs text-gray-400 mt-0.5">
            {{ mockMaintenanceMode ? 'Semua layanan sedang dinonaktifkan.' : 'Layanan berjalan normal.' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Section 3: Category Management -->
    <section class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-body-lg font-semibold text-gray-700">Manajemen Kategori Jasa</h2>
          <p class="text-body-sm text-gray-500 mt-1">Kelola daftar kategori jasa yang tersedia di marketplace.</p>
        </div>
        <AppButton variant="primary" @click="handleAddCategory">
          + Tambah Kategori Baru
        </AppButton>
      </div>
      <AppTable :columns="categoryColumns" :data="mockCategories">
        <template #cell-status="{ value }">
          <span
            :class="[
              'px-2.5 py-1 rounded-full text-body-xs font-semibold',
              value === 'Aktif'
                ? 'bg-success-light text-success'
                : 'bg-gray-100 text-gray-500',
            ]"
          >
            {{ value }}
          </span>
        </template>
        <template #cell-actions>
          <AppButton variant="ghost" size="sm">Edit</AppButton>
        </template>
      </AppTable>
    </section>

    <!-- Maintenance Confirmation Modal -->
    <AppModal
      :show="showMaintenanceModal"
      title="Konfirmasi Maintenance Mode"
      @close="showMaintenanceModal = false"
    >
      <p class="text-body-sm text-gray-600">
        {{ mockMaintenanceMode
          ? 'Apakah Anda yakin ingin MENONAKTIFKAN mode maintenance? Semua layanan akan kembali online.'
          : 'Apakah Anda yakin ingin MENGAKTIFKAN mode maintenance darurat? Semua layanan akan dinonaktifkan untuk seluruh pengguna.'
        }}
      </p>
      <template #footer>
        <div class="flex justify-end gap-3">
          <AppButton variant="ghost" @click="showMaintenanceModal = false">Batal</AppButton>
          <AppButton :variant="mockMaintenanceMode ? 'success' : 'danger'" @click="confirmMaintenance">
            {{ mockMaintenanceMode ? 'Nonaktifkan Maintenance' : 'Aktifkan Maintenance' }}
          </AppButton>
        </div>
      </template>
    </AppModal>

    <!-- Password Confirmation Modal -->
    <AppModal
      :show="showPasswordModal"
      title="Validasi Keamanan"
      @close="showPasswordModal = false"
    >
      <p class="text-body-sm text-gray-600 mb-4">
        Masukkan password admin untuk melanjutkan aksi ini.
      </p>
      <AppInput
        id="confirm-password"
        label="Password Admin"
        type="password"
        placeholder="Masukkan password"
        v-model="confirmPassword"
      />
      <template #footer>
        <div class="flex justify-end gap-3">
          <AppButton variant="ghost" @click="showPasswordModal = false">Batal</AppButton>
          <AppButton variant="primary" @click="handlePasswordConfirm">Konfirmasi</AppButton>
        </div>
      </template>
    </AppModal>

    <!-- Add Category Modal -->
    <AppModal
      :show="showCategoryModal"
      title="Tambah Kategori Baru"
      @close="showCategoryModal = false"
    >
      <AppInput
        id="new-category"
        label="Nama Kategori"
        placeholder="Masukkan nama kategori"
        v-model="newCategoryName"
      />
      <template #footer>
        <div class="flex justify-end gap-3">
          <AppButton variant="ghost" @click="showCategoryModal = false">Batal</AppButton>
          <AppButton variant="primary" @click="confirmAddCategory">Simpan</AppButton>
        </div>
      </template>
    </AppModal>
  </div>
</template>
