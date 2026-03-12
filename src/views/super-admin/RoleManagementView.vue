<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../../components/ui/Button.vue'
import AppInput from '../../components/ui/Input.vue'
import AppModal from '../../components/ui/Modal.vue'
import AppTable from '../../components/ui/Table.vue'
import type { Column } from '../../components/ui/Table.vue'

// Add Admin Modal
const showAddModal = ref(false)
const newAdminEmail = ref('')
const newAdminName = ref('')
const newAdminRole = ref('Validator')

// Revoke Access Modal
const showRevokeModal = ref(false)
const revokeTarget = ref<Record<string, any> | null>(null)

// Work History Modal
const showHistoryModal = ref(false)
const historyTarget = ref<Record<string, any> | null>(null)

const staffColumns: Column[] = [
  { key: 'name', label: 'Nama' },
  { key: 'role', label: 'Role', align: 'center' },
  { key: 'lastActivity', label: 'Aktivitas Terakhir' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: 'Aksi', align: 'center', width: '260px' },
]

const mockStaff = ref([
  { id: 1, name: 'Ahmad Fauzan', role: 'Validator', lastActivity: 'Memverifikasi toko "Jaya Abadi" — 5 menit lalu', status: 'Online' },
  { id: 2, name: 'Siti Nurhaliza', role: 'Finance', lastActivity: 'Memproses pencairan ID#7821 — 12 menit lalu', status: 'Online' },
  { id: 3, name: 'Budi Prasetyo', role: 'Validator', lastActivity: 'Me-review dokumen merchant — 1 jam lalu', status: 'Away' },
  { id: 4, name: 'Diana Putri', role: 'Finance', lastActivity: 'Mengonfirmasi refund ID#6543 — 2 jam lalu', status: 'Offline' },
  { id: 5, name: 'Rizky Ramadhan', role: 'Validator', lastActivity: 'Menolak registrasi "FakeMerchant" — 3 jam lalu', status: 'Online' },
])

const mockWorkHistory = ref([
  { time: '14:30', action: 'Memverifikasi toko "Jaya Abadi"', result: 'Approved' },
  { time: '14:15', action: 'Me-review dokumen merchant "Berkah Jaya"', result: 'Pending' },
  { time: '13:45', action: 'Menolak registrasi "FakeMerchant"', result: 'Rejected' },
  { time: '12:00', action: 'Memverifikasi toko "Maju Bersama"', result: 'Approved' },
  { time: '11:30', action: 'Me-review perubahan data "Sukses Mandiri"', result: 'Approved' },
])

function handleAddAdmin() {
  showAddModal.value = true
}

function confirmAddAdmin() {
  if (newAdminEmail.value && newAdminName.value) {
    mockStaff.value.push({
      id: mockStaff.value.length + 1,
      name: newAdminName.value,
      role: newAdminRole.value,
      lastActivity: 'Baru ditambahkan',
      status: 'Offline',
    })
    newAdminEmail.value = ''
    newAdminName.value = ''
    newAdminRole.value = 'Validator'
    showAddModal.value = false
  }
}

function handleViewHistory(row: Record<string, any>) {
  historyTarget.value = row
  showHistoryModal.value = true
}

function handleRevokeAccess(row: Record<string, any>) {
  revokeTarget.value = row
  showRevokeModal.value = true
}

function confirmRevoke() {
  if (revokeTarget.value) {
    mockStaff.value = mockStaff.value.filter((s) => s.id !== revokeTarget.value!.id)
    revokeTarget.value = null
    showRevokeModal.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-h3 font-bold text-gray-800">Role Management</h1>
        <p class="text-body-sm text-gray-500 mt-1">Kelola akun admin internal (Validator & Finance).</p>
      </div>
      <AppButton variant="primary" @click="handleAddAdmin">
        + Tambah Admin Baru
      </AppButton>
    </div>

    <!-- Staff Table (Audit Log) -->
    <AppTable :columns="staffColumns" :data="mockStaff">
      <template #cell-role="{ value }">
        <span
          :class="[
            'px-2.5 py-1 rounded-full text-body-xs font-semibold',
            value === 'Validator'
              ? 'bg-info-light text-info'
              : 'bg-warning-light text-warning',
          ]"
        >
          {{ value }}
        </span>
      </template>
      <template #cell-status="{ value }">
        <div class="flex items-center justify-center gap-1.5">
          <span
            :class="[
              'w-2 h-2 rounded-full',
              {
                'bg-success': value === 'Online',
                'bg-warning': value === 'Away',
                'bg-gray-400': value === 'Offline',
              },
            ]"
          />
          <span class="text-body-xs text-gray-600">{{ value }}</span>
        </div>
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center justify-center gap-2">
          <AppButton variant="ghost" size="sm" @click="handleViewHistory(row)">
            Lihat Riwayat Kerja
          </AppButton>
          <AppButton variant="danger" size="sm" @click="handleRevokeAccess(row)">
            Revoke Access
          </AppButton>
        </div>
      </template>
    </AppTable>

    <!-- Add Admin Modal -->
    <AppModal
      :show="showAddModal"
      title="Tambah Admin Baru"
      @close="showAddModal = false"
    >
      <div class="space-y-4">
        <AppInput
          id="admin-name"
          label="Nama"
          placeholder="Masukkan nama admin"
          v-model="newAdminName"
          required
        />
        <AppInput
          id="admin-email"
          label="Email"
          type="email"
          placeholder="admin@marketplace.com"
          v-model="newAdminEmail"
          required
        />
        <div class="flex flex-col gap-1.5">
          <label class="text-body-sm font-medium text-gray-700">Role</label>
          <select
            v-model="newAdminRole"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-body-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
          >
            <option value="Validator">Validator</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <AppButton variant="ghost" @click="showAddModal = false">Batal</AppButton>
          <AppButton variant="primary" @click="confirmAddAdmin">Tambah Admin</AppButton>
        </div>
      </template>
    </AppModal>

    <!-- Work History Modal -->
    <AppModal
      :show="showHistoryModal"
      :title="`Riwayat Kerja — ${historyTarget?.name || ''}`"
      max-width="560px"
      @close="showHistoryModal = false"
    >
      <div class="space-y-3">
        <div
          v-for="(entry, index) in mockWorkHistory"
          :key="index"
          class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span class="text-body-xs text-gray-400 font-mono mt-0.5 flex-shrink-0">{{ entry.time }}</span>
          <div class="flex-1">
            <p class="text-body-sm text-gray-700">{{ entry.action }}</p>
            <span
              :class="[
                'text-body-xs font-semibold',
                {
                  'text-success': entry.result === 'Approved',
                  'text-danger': entry.result === 'Rejected',
                  'text-warning': entry.result === 'Pending',
                },
              ]"
            >
              {{ entry.result }}
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <AppButton variant="ghost" @click="showHistoryModal = false">Tutup</AppButton>
        </div>
      </template>
    </AppModal>

    <!-- Revoke Access Confirmation Modal -->
    <AppModal
      :show="showRevokeModal"
      title="Revoke Access"
      @close="showRevokeModal = false"
    >
      <p class="text-body-sm text-gray-600">
        Apakah Anda yakin ingin mencabut akses untuk <strong>{{ revokeTarget?.name }}</strong> ({{ revokeTarget?.role }})? Aksi ini tidak dapat dibatalkan.
      </p>
      <template #footer>
        <div class="flex justify-end gap-3">
          <AppButton variant="ghost" @click="showRevokeModal = false">Batal</AppButton>
          <AppButton variant="danger" @click="confirmRevoke">Revoke Access</AppButton>
        </div>
      </template>
    </AppModal>
  </div>
</template>
