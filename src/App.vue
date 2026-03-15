<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ToastNotification from '@/components/common/ToastNotification.vue'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useBookmarkStore } from '@/stores/bookmark'

const { initTheme } = useTheme()
const authStore = useAuthStore()
const cartStore = useCartStore()
const bookmarkStore = useBookmarkStore()

onMounted(() => {
  initTheme()
  authStore.initAuth()
  cartStore.initCart()
  bookmarkStore.initBookmarks()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Global Toast Notifications -->
    <ToastNotification />

    <!-- Application Top Navigation -->
    <AppHeader />

    <!-- Dynamic Routed Views -->
    <main class="flex-1" id="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Application Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
