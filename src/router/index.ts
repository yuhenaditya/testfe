import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../layouts/AuthLayout.vue'
import SuperAdminLayout from '../layouts/SuperAdminLayout.vue'

// Views
import AdminLoginView from '../views/auth/AdminLoginView.vue'
import DashboardView from '../views/super-admin/DashboardView.vue'
import SystemConfigView from '../views/super-admin/SystemConfigView.vue'
import RoleManagementView from '../views/super-admin/RoleManagementView.vue'
import UserManagementView from '../views/super-admin/UserManagementView.vue'
import ProfileView from '../views/super-admin/ProfileView.vue'
import PermintaanBandingView from '../views/super-admin/PermintaanBandingView.vue'

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
        path: 'system-config',
        name: 'SystemConfig',
        component: SystemConfigView,
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: RoleManagementView,
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagementView,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView,
      },
      {
        path: 'permintaan-banding',
        name: 'PermintaanBanding',
        component: PermintaanBandingView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
