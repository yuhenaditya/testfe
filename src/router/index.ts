import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../layouts/AuthLayout.vue'
import SuperAdminLayout from '../layouts/SuperAdminLayout.vue'
import AdminFinanceLayout from '../layouts/AdminFinanceLayout.vue'
import AdminValidatorLayout from '../layouts/AdminValidatorLayout.vue'

// Views - Auth
import AdminLoginView from '../views/auth/AdminLoginView.vue'

// Views - Super Admin
import DashboardView from '../views/super-admin/DashboardView.vue'
import SystemConfigView from '../views/super-admin/SystemConfigView.vue'
import UserManagementView from '../views/super-admin/UserManagementView.vue'
import ProfileView from '../views/super-admin/ProfileView.vue'

// Views - Finance Admin
import FinanceDashboardView from '../views/finance-admin/DashboardView.vue'

const routes = [
  {
    path: '/',
    redirect: '/admin/login',
  },
  {
    path: '/admin',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: AdminLoginView,
      },
    ],
  },
  {
    path: '/super-admin',
    component: SuperAdminLayout,
    redirect: '/super-admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagementView,
      },
      {
        path: 'system-config',
        name: 'SystemConfig',
        component: SystemConfigView,
      },
      {
        path: 'disputes',
        name: 'Disputes',
        component: () => import('../views/super-admin/DisputesView.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView,
      },
    ],
  },
  {
    path: '/finance-admin',
    component: AdminFinanceLayout,
    redirect: '/finance-admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'FinanceDashboard',
        component: FinanceDashboardView,
      },
      {
        path: 'payment-verification',
        name: 'PaymentVerification',
        component: () => import('../views/finance-admin/PaymentVerificationView.vue'),
      },
      {
        path: 'payment-history',
        name: 'PaymentHistory',
        component: () => import('../views/finance-admin/PaymentHistoryView.vue'),
      },
      {
        path: 'disbursement',
        name: 'Disbursement',
        component: () => import('../views/finance-admin/DisbursementView.vue'),
      },
      {
        path: 'refund',
        name: 'Refund',
        component: () => import('../views/finance-admin/RefundView.vue'),
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../views/finance-admin/ReportsView.vue'),
      },
      {
        path: 'profile',
        name: 'FinanceProfile',
        component: () => import('../views/finance-admin/ProfileView.vue'),
      },
    ],
  },
  {
    path: '/admin-validator',
    component: AdminValidatorLayout,
    redirect: '/admin-validator/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'ValidatorDashboard',
        component: () => import('../views/admin-validator/DashboardView.vue'),
      },
      {
        path: 'profile',
        name: 'ValidatorProfile',
        component: () => import('../views/admin-validator/ProfileView.vue'),
      },
      {
        path: 'user-moderation',
        name: 'ValidatorUserModeration',
        component: () => import('../views/admin-validator/UserModerationView.vue'),
      },
      {
        path: 'user-moderation/:id/activity',
        name: 'ValidatorUserActivity',
        component: () => import('../views/admin-validator/UserActivityView.vue'),
      },
      {
        path: 'vendor-verification',
        name: 'ValidatorVendorVerification',
        component: () => import('../views/admin-validator/VendorVerificationView.vue'),
      },
      {
        path: 'vendor-verification/:id',
        name: 'ValidatorVendorVerificationDetail',
        component: () => import('../views/admin-validator/VendorVerificationDetailView.vue'),
      },
      {
        path: 'disputes',
        name: 'ValidatorDisputes',
        component: () => import('../views/admin-validator/DisputesView.vue'),
      },
      {
        path: 'disputes/:id',
        name: 'ValidatorDisputeDetail',
        component: () => import('../views/admin-validator/DisputeDetailView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
