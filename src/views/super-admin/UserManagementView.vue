<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../../components/ui/Button.vue'
import AppModal from '../../components/ui/Modal.vue'
import AppTable from '../../components/ui/Table.vue'
import type { Column } from '../../components/ui/Table.vue'

// Active Tab
const activeTab = ref<'users' | 'appeals' | 'disputes'>('users')

const tabs = [
  { key: 'users' as const, label: 'Daftar User' },
  { key: 'appeals' as const, label: 'Permintaan Banding (Appeal)' },
  { key: 'disputes' as const, label: 'Sengketa Eskalasi' },
]

// --- Users Tab ---
const userColumns: Column[] = [
  { key: 'name', label: 'Nama User' },
  { key: 'email', label: 'Email' },
  { key: 'type', label: 'Tipe', align: 'center' },
  { key: 'joinDate', label: 'Tanggal Bergabung' },
  { key: 'status', label: 'Status', align: 'center' },
]

const mockUsers = ref([
  { name: 'Toko Jaya Abadi', email: 'jaya@mail.com', type: 'Merchant', joinDate: '01 Jan 2026', status: 'Aktif' },
  { name: 'PT Maju Bersama', email: 'maju@corp.co', type: 'Client', joinDate: '15 Feb 2026', status: 'Aktif' },
  { name: 'CV Sukses Mandiri', email: 'sukses@mail.com', type: 'Merchant', joinDate: '20 Feb 2026', status: 'Suspended' },
  { name: 'Toko Berkah', email: 'berkah@mail.com', type: 'Merchant', joinDate: '01 Mar 2026', status: 'Aktif' },
  { name: 'PT Global Sentosa', email: 'global@corp.co', type: 'Client', joinDate: '05 Mar 2026', status: 'Aktif' },
])

// --- Appeals Tab ---
const appealColumns: Column[] = [
  { key: 'storeName', label: 'Nama Toko' },
  { key: 'reason', label: 'Alasan Banding' },
  { key: 'validatorLog', label: 'Log Validator' },
  { key: 'actions', label: 'Aksi', align: 'center', width: '160px' },
]

const mockAppeals = ref([
  {
    id: 1,
    storeName: 'CV Sukses Mandiri',
    reason: 'Dokumen sudah diperbarui sesuai persyaratan, mohon ditinjau ulang.',
    validatorLog: 'Ditolak oleh Ahmad Fauzan — Dokumen tidak lengkap (10 Mar 2026)',
  },
  {
    id: 2,
    storeName: 'Toko Sejahtera',
    reason: 'Suspend tidak sesuai, kami tidak melanggar T&C yang disebutkan.',
    validatorLog: 'Di-suspend oleh Rizky Ramadhan — Pelanggaran T&C pasal 4.2 (08 Mar 2026)',
  },
  {
    id: 3,
    storeName: 'Jasa Bersih Prima',
    reason: 'Kesalahpahaman terkait verifikasi identitas pemilik.',
    validatorLog: 'Ditolak oleh Budi Prasetyo — Identitas tidak cocok (05 Mar 2026)',
  },
])

// --- Disputes Tab ---
const disputeColumns: Column[] = [
  { key: 'orderId', label: 'ID Order' },
  { key: 'parties', label: 'Pihak Terlibat' },
  { key: 'amount', label: 'Nominal', align: 'right' },
  { key: 'disputeStatus', label: 'Status Sengketa', align: 'center' },
  { key: 'actions', label: 'Aksi', align: 'center', width: '180px' },
]

const mockDisputes = ref([
  {
    id: 1,
    orderId: 'ORD-2026-1234',
    parties: 'Toko Jaya Abadi vs PT Maju Bersama',
    amount: 'Rp 5.500.000',
    disputeStatus: 'Menunggu Keputusan',
  },
  {
    id: 2,
    orderId: 'ORD-2026-0987',
    parties: 'Jasa Bersih Prima vs PT Global Sentosa',
    amount: 'Rp 12.000.000',
    disputeStatus: 'Dalam Investigasi',
  },
  {
    id: 3,
    orderId: 'ORD-2026-0765',
    parties: 'Toko Berkah vs CV Teknologi Nusantara',
    amount: 'Rp 3.200.000',
    disputeStatus: 'Menunggu Keputusan',
  },
])

// Executive Decision Modal
const showDecisionModal = ref(false)
const decisionTarget = ref<Record<string, any> | null>(null)

function handleLiftSuspend(appeal: Record<string, any>) {
  mockAppeals.value = mockAppeals.value.filter((a) => a.id !== appeal.id)
}

function handleExecutiveDecision(dispute: Record<string, any>) {
  decisionTarget.value = dispute
  showDecisionModal.value = true
}

function executeDecision(_type: 'refund' | 'release') {
  if (decisionTarget.value) {
    mockDisputes.value = mockDisputes.value.filter((d) => d.id !== decisionTarget.value!.id)
    decisionTarget.value = null
    showDecisionModal.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-h3 font-bold text-gray-800">User Management</h1>
      <p class="text-body-sm text-gray-500 mt-1">Intervensi darurat, kelola banding, dan sengketa eskalasi.</p>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex gap-0">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-5 py-3 text-body-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap cursor-pointer',
            activeTab === tab.key
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Users Tab -->
    <div v-if="activeTab === 'users'">
      <AppTable :columns="userColumns" :data="mockUsers">
        <template #cell-type="{ value }">
          <span
            :class="[
              'px-2.5 py-1 rounded-full text-body-xs font-semibold',
              value === 'Merchant'
                ? 'bg-info-light text-info'
                : 'bg-brand-lighter text-brand-navy',
            ]"
          >
            {{ value }}
          </span>
        </template>
        <template #cell-status="{ value }">
          <span
            :class="[
              'px-2.5 py-1 rounded-full text-body-xs font-semibold',
              value === 'Aktif'
                ? 'bg-success-light text-success'
                : 'bg-danger-light text-danger',
            ]"
          >
            {{ value }}
          </span>
        </template>
      </AppTable>
    </div>

    <!-- Appeals Tab -->
    <div v-if="activeTab === 'appeals'">
      <AppTable :columns="appealColumns" :data="mockAppeals">
        <template #cell-reason="{ value }">
          <p class="text-body-sm text-gray-700 max-w-xs">{{ value }}</p>
        </template>
        <template #cell-validatorLog="{ value }">
          <p class="text-body-xs text-gray-500 max-w-sm italic">{{ value }}</p>
        </template>
        <template #cell-actions="{ row }">
          <AppButton variant="success" size="sm" @click="handleLiftSuspend(row)">
            ✓ Lift Suspend
          </AppButton>
        </template>
      </AppTable>
      <div v-if="mockAppeals.length === 0" class="text-center py-10">
        <p class="text-body-sm text-gray-400">Tidak ada permintaan banding saat ini.</p>
      </div>
    </div>

    <!-- Disputes Tab -->
    <div v-if="activeTab === 'disputes'">
      <AppTable :columns="disputeColumns" :data="mockDisputes">
        <template #cell-disputeStatus="{ value }">
          <span
            :class="[
              'px-2.5 py-1 rounded-full text-body-xs font-semibold',
              value === 'Menunggu Keputusan'
                ? 'bg-warning-light text-warning'
                : 'bg-info-light text-info',
            ]"
          >
            {{ value }}
          </span>
        </template>
        <template #cell-actions="{ row }">
          <AppButton variant="danger" size="sm" @click="handleExecutiveDecision(row)">
            Executive Decision
          </AppButton>
        </template>
      </AppTable>
      <div v-if="mockDisputes.length === 0" class="text-center py-10">
        <p class="text-body-sm text-gray-400">Tidak ada sengketa eskalasi saat ini.</p>
      </div>
    </div>

    <!-- Executive Decision Modal -->
    <AppModal
      :show="showDecisionModal"
      title="Executive Decision"
      @close="showDecisionModal = false"
    >
      <div class="space-y-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-body-xs text-gray-500 mb-1">ID Order</p>
          <p class="text-body-sm font-semibold text-gray-800">{{ decisionTarget?.orderId }}</p>
          <p class="text-body-xs text-gray-500 mt-2 mb-1">Pihak Terlibat</p>
          <p class="text-body-sm text-gray-700">{{ decisionTarget?.parties }}</p>
          <p class="text-body-xs text-gray-500 mt-2 mb-1">Nominal</p>
          <p class="text-body font-bold text-brand-navy">{{ decisionTarget?.amount }}</p>
        </div>
        <p class="text-body-sm text-gray-600">
          Pilih keputusan akhir untuk sengketa ini:
        </p>
      </div>
      <template #footer>
        <div class="flex justify-between items-center">
          <AppButton variant="ghost" @click="showDecisionModal = false">Batal</AppButton>
          <div class="flex gap-3">
            <AppButton variant="danger" @click="executeDecision('refund')">
              Force Refund
            </AppButton>
            <AppButton variant="success" @click="executeDecision('release')">
              Force Release
            </AppButton>
          </div>
        </div>
      </template>
    </AppModal>
  </div>
</template>
