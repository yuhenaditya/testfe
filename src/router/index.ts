import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import ClientLayout from '../layouts/ClientLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import SuperAdminLayout from '../layouts/SuperAdminLayout.vue'
import AdminFinanceLayout from '../layouts/AdminFinanceLayout.vue'
import AdminValidatorLayout from '../layouts/AdminValidatorLayout.vue'

// Views - Auth
import AdminLoginView from '../views/auth/AdminLoginView.vue'

// Views - Client
import HomeView from '../views/client/HomeView.vue'
import RoleSelectionView from '../views/auth/RoleSelectionView.vue'
import UserLoginView from '../views/auth/UserLoginView.vue'
import VendorRegisterView from '../views/auth/VendorRegisterView.vue'
import VendorRegisterUploadView from '../views/auth/VendorRegisterUploadView.vue'
import VendorRegisterBankView from '../views/auth/VendorRegisterBankView.vue'
import VendorRegisterSuccessView from '../views/auth/VendorRegisterSuccessView.vue'

// Views - Super Admin
import DashboardView from '../views/super-admin/DashboardView.vue'
import SystemConfigView from '../views/super-admin/SystemConfigView.vue'
import UserManagementView from '../views/super-admin/UserManagementView.vue'
import ProfileView from '../views/super-admin/ProfileView.vue'

// Views - Finance Admin
import FinanceDashboardView from '../views/finance-admin/DashboardView.vue'

// Vendor Layout & Views
import VendorLayout from '../layouts/VendorLayout.vue'
import VendorDashboardView from '../views/vendor/DashboardView.vue'
import DocumentVerificationView from '../views/vendor/DocumentVerificationView.vue'

const routes = [
  // ========================================
  // CLIENT ROUTES (Default — public facing)
  // ========================================
  {
    path: '/',
    component: ClientLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'jelajahi',
        name: 'Explore',
        component: () => import('../views/client/ExploreView.vue'),
      },
      {
        path: 'jelajahi/:id',
        name: 'ProductDetail',
        component: () => import('../views/client/ProductDetailView.vue'),
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('../views/client/ChatView.vue'),
      },
      {
        path: 'pesanan',
        name: 'Orders',
        component: () => import('../views/client/OrdersView.vue'),
      },
      {
        path: 'pesanan/:id',
        name: 'OrderDetail',
        component: () => import('../views/client/OrderDetailView.vue'),
      },
      {
        path: 'pesanan/:id/revisi',
        name: 'OrderRevision',
        component: () => import('../views/client/OrderRevisionView.vue'),
      },
    ],
  },

  // ========================================
  // CLIENT AUTH (Role Selection & Login)
  // ========================================
  {
    path: '/daftar',
    name: 'RoleSelection',
    component: RoleSelectionView,
  },
  {
    path: '/daftar/vendor',
    name: 'VendorRegister',
    component: VendorRegisterView,
  },
  {
    path: '/daftar/vendor/upload',
    name: 'VendorRegisterUpload',
    component: VendorRegisterUploadView,
  },
  {
    path: '/daftar/vendor/bank',
    name: 'VendorRegisterBank',
    component: VendorRegisterBankView,
  },
  {
    path: '/daftar/vendor/success',
    name: 'VendorRegisterSuccess',
    component: VendorRegisterSuccessView,
  },
  {
    path: '/masuk/user',
    name: 'UserLogin',
    component: UserLoginView,
  },

  // ========================================
  // ADMIN AUTH
  // ========================================
  {
    path: '/admin',
    component: AuthLayout,
    redirect: '/admin/login',
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: AdminLoginView,
      },
    ],
  },

  // ========================================
  // SUPER ADMIN
  // ========================================
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

  // ========================================
  // FINANCE ADMIN
  // ========================================
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

  // ========================================
  // ADMIN VALIDATOR
  // ========================================
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

  // ========================================
  // VENDOR ROUTES
  // ========================================
  {
    path: '/vendor',
    component: VendorLayout,
    redirect: '/vendor/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'VendorDashboard',
        component: VendorDashboardView,
      },
      {
        path: 'documents',
        name: 'VendorDocuments',
        component: DocumentVerificationView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
