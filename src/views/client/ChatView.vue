<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeChat = ref(1)

const chats = [
  {
    id: 1,
    name: 'Ammi Watts',
    avatar: 'https://ui-avatars.com/api/?name=Ammi+Watts&background=3B5BDB&color=fff',
    lastMessage: 'I will check it and get back to you soon',
    time: '04:45 PM',
    isStarred: true,
  },
  {
    id: 2,
    name: 'Jennifer Markus',
    avatar: 'https://ui-avatars.com/api/?name=Jennifer+Markus&background=random',
    lastMessage: 'Hey! Did you finish the Hi-FI wireframes for flora app design?',
    time: 'Today | 05:30 PM',
    isStarred: false,
  }
]

const messages = [
  {
    id: 1,
    senderId: 1, // Ammi
    type: 'text',
    content: 'Oh, hello! All perfectly.\nI will check it and get back to you soon',
    time: '04:45 PM',
  },
  {
    id: 2,
    senderId: 'me',
    type: 'text',
    content: 'Oh, hello! All perfectly.\nI will check it and get back to you soon',
    time: '04:45 PM',
  },
  {
    id: 3,
    senderId: 1,
    type: 'text',
    content: 'p nawar',
    time: '04:45 PM',
  },
  {
    id: 4,
    senderId: 1,
    type: 'offer',
    offerDetails: {
      title: 'Desain Logo Premium (3 Konsep)',
      description: 'Pembuatan 3 alternatif desain logo minimalis premium, dan 2 kali revisi minor.',
      price: 'Rp 1.500.000',
      duration: '3 Hari'
    },
    time: '',
  }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll('.anim-in').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="chat-container">
    <div class="chat-layout anim-in">
      
      <!-- Sidebar -->
      <aside class="chat-sidebar">
        <!-- Sidebar Header -->
        <div class="chat-sidebar__header">
          <button class="chat-sidebar__filter">
            All Messages
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="chat-sidebar__more" aria-label="More options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>

        <!-- Search -->
        <div class="chat-sidebar__search">
          <div class="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search or start a new chat" />
          </div>
        </div>

        <!-- Chat List -->
        <div class="chat-list">
          <div 
            v-for="chat in chats" 
            :key="chat.id" 
            class="chat-item"
            :class="{ 'chat-item--active': activeChat === chat.id }"
            @click="activeChat = chat.id"
          >
            <img :src="chat.avatar" :alt="chat.name" class="chat-item__avatar" />
            <div class="chat-item__content">
              <div class="chat-item__top">
                <h4 class="chat-item__name">{{ chat.name }}</h4>
                <button class="chat-item__star" :class="{ 'chat-item__star--active': chat.isStarred }">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </button>
              </div>
              <p class="chat-item__last-message">{{ chat.lastMessage }}</p>
              <div class="chat-item__time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ chat.time }}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="chat-main">
        <!-- Chat Header -->
        <header class="chat-header">
          <div class="chat-header__user">
            <img :src="chats.find(c => c.id === activeChat)?.avatar" alt="User avatar" class="chat-header__avatar" />
            <h3 class="chat-header__name">{{ chats.find(c => c.id === activeChat)?.name }}</h3>
          </div>
          <button class="btn-create-offer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Buat Penawaran
          </button>
        </header>

        <!-- Chat Messages -->
        <div class="chat-messages">
          <div 
            v-for="msg in messages" 
            :key="msg.id" 
            class="message-wrapper anim-in"
            :class="msg.senderId === 'me' ? 'message-wrapper--me' : 'message-wrapper--them'"
          >
            <template v-if="msg.type === 'text'">
              <div class="message-bubble">{{ msg.content }}</div>
              <span class="message-time">{{ msg.time }}</span>
            </template>
            
            <template v-else-if="msg.type === 'offer'">
              <div class="offer-card">
                <div class="offer-card__header">
                  <h4 class="offer-card__title">Penawaran Kustom</h4>
                </div>
                <div class="offer-card__body">
                  <h5 class="offer-card__item-title">{{ msg.offerDetails?.title }}</h5>
                  <p class="offer-card__item-desc">{{ msg.offerDetails?.description }}</p>
                  
                  <div class="offer-card__meta">
                    <div class="meta-block">
                      <span class="meta-label">HARGA</span>
                      <strong class="meta-value">{{ msg.offerDetails?.price }}</strong>
                    </div>
                    <div class="meta-block">
                      <span class="meta-label">WAKTU KERJA</span>
                      <div class="meta-value-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <strong>{{ msg.offerDetails?.duration }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="offer-card__actions">
                  <button class="btn-accept">Terima Tawaran</button>
                  <button class="btn-reject">Tolak</button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Chat Input -->
        <footer class="chat-input-area">
          <div class="chat-input-container">
            <button class="btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </button>
            <div class="input-wrapper">
              <input type="text" placeholder="Type your message here ..." />
            </div>
            <button class="btn-send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </footer>
      </main>

    </div>
  </div>
</template>

<style scoped>
/* Animations */
.anim-in { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
.anim-in.visible { opacity: 1; transform: translateY(0); }

/* Layout container to respect navbar */
.chat-container {
  height: calc(100vh - 64px); /* Assuming navbar is 64px tall */
  background-color: #F8FAFC;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.chat-layout {
  width: 100%;
  max-width: 1200px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  overflow: hidden;
  border: 1px solid #E2E8F0;
}

/* Sidebar */
.chat-sidebar {
  width: 320px;
  border-right: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
}

.chat-sidebar__header {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E2E8F0;
}

.chat-sidebar__filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: #1E293B;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.chat-sidebar__more {
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-sidebar__search {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E2E8F0;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #F8FAFC;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

.search-input-wrapper input {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 0.875rem;
  color: #334155;
  outline: none;
}

.search-input-wrapper input::placeholder {
  color: #94A3B8;
}

/* Chat List */
.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #F1F5F9;
}

.chat-item:hover {
  background-color: #F8FAFC;
}

.chat-item--active {
  background-color: #F8FAFC;
}

.chat-item__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-item__content {
  flex: 1;
  min-width: 0;
}

.chat-item__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.chat-item__name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #1E293B;
  margin: 0;
}

.chat-item__star {
  background: none;
  border: none;
  color: #CBD5E1;
  cursor: pointer;
  padding: 0;
}

.chat-item__star--active {
  color: #3B5BDB;
}

.chat-item__last-message {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-item__time {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #94A3B8;
}

/* Main Chat Area */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
}

.chat-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E2E8F0;
}

.chat-header__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chat-header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-header__name {
  font-weight: 600;
  font-size: 1rem;
  color: #1E293B;
  margin: 0;
}

.btn-create-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3B5BDB;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-create-offer:hover {
  background-color: #2e4aae;
}

/* Messages Area */
.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message-wrapper--them {
  align-self: flex-start;
  align-items: flex-start;
}

.message-wrapper--me {
  align-self: flex-end;
  align-items: flex-end;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 16px;
  font-size: 0.9375rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.message-wrapper--them .message-bubble {
  background-color: #EBF1FF; /* Light blue matching design */
  color: #1E293B;
  border-bottom-left-radius: 4px;
}

.message-wrapper--me .message-bubble {
  background-color: #3B5BDB;
  color: #FFFFFF;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 0.25rem;
}

/* Offer Card */
.offer-card {
  width: 400px;
  max-width: 100%;
  background-color: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
}

.offer-card__header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E2E8F0;
}

.offer-card__title {
  color: #3B5BDB;
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
}

.offer-card__body {
  padding: 1.25rem;
}

.offer-card__item-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: #000000;
  margin: 0 0 0.5rem 0;
}

.offer-card__item-desc {
  font-size: 0.875rem;
  color: #64748B;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.offer-card__meta {
  display: flex;
  gap: 3rem;
}

.meta-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 600;
  text-transform: uppercase;
}

.meta-value {
  font-size: 1rem;
  font-weight: 700;
  color: #000000;
}

.meta-value-with-icon {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 1rem;
  color: #000000;
}

.offer-card__actions {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background-color: #FFFFFF;
  border-top: 1px solid #E2E8F0;
}

.btn-accept {
  flex: 1;
  background-color: #3B5BDB;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-accept:hover {
  background-color: #2e4aae;
}

.btn-reject {
  flex: 1;
  background-color: #FFFFFF;
  color: #3B5BDB;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-reject:hover {
  background-color: #F8FAFC;
}

/* Chat Input */
.chat-input-area {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #E2E8F0;
  background-color: #FFFFFF;
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-wrapper {
  flex: 1;
  background-color: #F8FAFC;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 1px solid #E2E8F0;
}

.input-wrapper input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  color: #334155;
  outline: none;
}

.input-wrapper input::placeholder {
  color: #94A3B8;
}

.btn-send {
  background-color: #3B5BDB;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-send:hover {
  background-color: #2e4aae;
}
</style>
