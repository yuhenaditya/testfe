<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '../../composables/useAuth'

const { loginMutation } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const rememberMe = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  if (!form.email || !form.password) return
  loginMutation.mutate({
    email: form.email,
    password: form.password,
  })
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__inner">
      <!-- Left - Illustration -->
      <div class="login-page__left">
        <div class="login-page__brand">
          <router-link to="/" class="login-page__logo" aria-label="Home">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#3B5BDB"/>
              <path d="M10 10C10 10 14 22 16 22C18 22 22 10 22 10" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="16" cy="10" r="2" fill="white"/>
            </svg>
            <span>LayananPro</span>
          </router-link>
        </div>
        <div class="login-page__illustration-wrapper">
          <img
            src="/images/marketplace-illustration.png"
            alt="Marketplace illustration"
            class="login-page__illustration"
            loading="eager"
          />
          <div class="login-page__tagline">
            <h2>Temukan Vendor Terbaik</h2>
            <p>Hubungkan bisnis Anda dengan profesional terverifikasi di seluruh Indonesia.</p>
          </div>
        </div>
      </div>

      <!-- Right - Form -->
      <div class="login-page__right">
        <div class="login-page__form-container">
          <router-link to="/daftar" class="login-page__back" aria-label="Kembali">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Kembali</span>
          </router-link>

          <div class="login-page__form-header">
            <h1 class="login-page__form-title">Masuk sebagai User</h1>
            <p class="login-page__form-subtitle">Selamat datang kembali! Masukkan kredensial Anda.</p>
          </div>

          <!-- Form -->
          <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <div class="form-input-wrapper">
                <svg class="form-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="contoh@email.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="form-input-wrapper">
                <svg class="form-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Masukkan password"
                  required
                  autocomplete="current-password"
                />
                <button type="button" class="form-toggle-password" @click="togglePassword" :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'">
                  <!-- Eye open -->
                  <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <!-- Eye closed -->
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="form-checkbox">
                <input v-model="rememberMe" type="checkbox" />
                <span class="form-checkbox__mark"></span>
                <span class="form-checkbox__label">Ingat saya</span>
              </label>
              <a href="#" class="form-forgot">Lupa password?</a>
            </div>

            <button
              type="submit"
              class="login-submit"
              :class="{ 'login-submit--loading': loginMutation.isPending.value }"
              :disabled="loginMutation.isPending.value"
            >
              <svg v-if="loginMutation.isPending.value" class="login-submit__spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 019.95 9"/></svg>
              <span v-if="!loginMutation.isPending.value">Masuk</span>
              <span v-else>Memproses...</span>
            </button>
            <p v-if="loginMutation.isError.value" class="text-red-500 text-sm font-medium text-center mt-2">Email atau password salah.</p>
          </form>

          <p class="login-page__register-text">
            Belum punya akun?
            <router-link to="/daftar" class="login-page__register-link">Daftar sekarang</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  background: #fff;
}

.login-page__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  min-height: 100vh;
}

/* LEFT PANEL */
.login-page__left {
  background: linear-gradient(160deg, #E8EEFF 0%, #F0F4FF 40%, #F5F3FF 100%);
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
}

.login-page__brand {
  flex-shrink: 0;
}

.login-page__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: #111827;
  text-decoration: none;
  transition: opacity 0.2s;
}

.login-page__logo:hover {
  opacity: 0.8;
}

.login-page__illustration-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.login-page__illustration {
  width: 100%;
  max-width: 380px;
  height: auto;
  object-fit: contain;
}

.login-page__tagline {
  text-align: center;
  max-width: 320px;
}

.login-page__tagline h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.375rem;
}

.login-page__tagline p {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
}

/* RIGHT PANEL */
.login-page__right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
}

.login-page__form-container {
  width: 100%;
  max-width: 400px;
  animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

.login-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6B7280;
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
  cursor: pointer;
}

.login-page__back:hover {
  color: #3B5BDB;
}

.login-page__form-header {
  margin-bottom: 1.5rem;
}

.login-page__form-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.login-page__form-subtitle {
  font-size: 0.875rem;
  color: #6B7280;
  margin-top: 0.375rem;
}

/* SOCIAL BUTTONS */
.login-page__social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #fff;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: #D1D5DB;
  background: #F9FAFB;
  transform: translateY(-1px);
}

/* DIVIDER */
.login-page__divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.login-page__divider::before,
.login-page__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.login-page__divider span {
  font-size: 0.75rem;
  color: #9CA3AF;
  white-space: nowrap;
}

/* FORM */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
}

.form-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input-icon {
  position: absolute;
  left: 14px;
  color: #9CA3AF;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 0.75rem 0.875rem 0.75rem 2.75rem;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  outline: none;
  transition: all 0.2s;
}

.form-input::placeholder {
  color: #9CA3AF;
}

.form-input:focus {
  border-color: #3B5BDB;
  box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.08);
}

.form-toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px;
  display: flex;
  transition: color 0.2s;
}

.form-toggle-password:hover {
  color: #374151;
}

/* OPTIONS */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #4B5563;
}

.form-checkbox input {
  display: none;
}

.form-checkbox__mark {
  width: 18px;
  height: 18px;
  border: 1.5px solid #D1D5DB;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.form-checkbox input:checked + .form-checkbox__mark {
  background: #3B5BDB;
  border-color: #3B5BDB;
}

.form-checkbox input:checked + .form-checkbox__mark::after {
  content: '';
  display: block;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-top: -1px;
}

.form-forgot {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #3B5BDB;
  text-decoration: none;
  transition: color 0.2s;
}

.form-forgot:hover {
  color: #2F4DC4;
  text-decoration: underline;
}

/* SUBMIT */
.login-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: #3B5BDB;
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;
  margin-top: 0.25rem;
}

.login-submit:hover:not(:disabled) {
  background: #2F4DC4;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(59, 91, 219, 0.3);
}

.login-submit:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.login-submit__spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* REGISTER TEXT */
.login-page__register-text {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.8125rem;
  color: #6B7280;
}

.login-page__register-link {
  color: #3B5BDB;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.login-page__register-link:hover {
  color: #2F4DC4;
  text-decoration: underline;
}

/* ANIMATIONS */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .login-page__left {
    padding: 2rem;
  }

  .login-page__right {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .login-page__inner {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .login-page__left {
    display: none;
  }

  .login-page__right {
    min-height: 100vh;
    padding: 2rem 1.5rem;
  }

  .login-page__form-container {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .login-page__right {
    padding: 1.5rem 1rem;
  }

  .login-page__form-title {
    font-size: 1.5rem;
  }

  .social-btn {
    padding: 0.5rem;
    font-size: 0.8125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-page__illustration-wrapper,
  .login-page__form-container {
    animation: none;
  }

  .login-submit__spinner {
    animation: none;
  }

  .social-btn,
  .login-submit,
  .form-input,
  .role-btn {
    transition: none;
  }
}
</style>
