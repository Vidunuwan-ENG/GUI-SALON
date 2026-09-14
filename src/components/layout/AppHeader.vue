<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useBookmarkStore } from '@/stores/bookmark'
import { useTheme } from '@/composables/useTheme'
import MobileNavigation from './MobileNavigation.vue'
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Sun,
  Moon,
  Menu
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const bookmarkStore = useBookmarkStore()
const { theme, toggleTheme } = useTheme()

const isMobileMenuOpen = ref<boolean>(false)
const showSearchBar = ref<boolean>(false)
const quickSearchQuery = ref<string>('')

const handleSearchSubmit = (): void => {
  if (quickSearchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { q: quickSearchQuery.value.trim() }
    })
    showSearchBar.value = false
    quickSearchQuery.value = ''
  }
}

const handleUserClick = (): void => {
  if (authStore.isAuthenticated) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-black text-white border-b border-stone-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo (Figma: DIBU XXTENSIONS) -->
        <router-link to="/" class="flex flex-col items-start group">
          <span class="font-serif text-xl sm:text-2xl font-bold tracking-widest text-white group-hover:text-brand-400 transition uppercase">
            DIBU
          </span>
          <span class="text-[9px] tracking-[0.3em] text-stone-400 uppercase -mt-1 font-sans">
            XXTENSIONS
          </span>
        </router-link>

        <!-- Desktop Navigation Links (Figma: HOME, ABOUT, SERVICES, PRODUCT, CONTACT) -->
        <nav class="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-stone-300">
          <router-link
            to="/"
            class="hover:text-white transition-colors py-1 relative"
            :class="{ 'text-white font-bold': route.path === '/' }"
          >
            Home
            <span
              v-if="route.path === '/'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-400"
            />
          </router-link>

          <a href="/#about" class="hover:text-white transition-colors py-1">
            About
          </a>

          <router-link
            to="/services"
            class="hover:text-white transition-colors py-1 relative"
            :class="{ 'text-white font-bold': route.path === '/services' }"
          >
            Services
            <span
              v-if="route.path === '/services'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-400"
            />
          </router-link>

          <router-link
            to="/products"
            class="hover:text-white transition-colors py-1 relative"
            :class="{ 'text-white font-bold': route.path.startsWith('/product') }"
          >
            Product
            <span
              v-if="route.path.startsWith('/product')"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-400"
            />
          </router-link>

          <a href="/#contact" class="hover:text-white transition-colors py-1">
            Contact
          </a>
        </nav>

        <!-- Right Side Icons & Actions -->
        <div class="flex items-center space-x-3 sm:space-x-4">
          <!-- Search Button -->
          <button
            type="button"
            class="p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-full transition relative"
            aria-label="Search products"
            @click="showSearchBar = !showSearchBar"
          >
            <Search class="w-5 h-5" />
          </button>

          <!-- Wishlist / Bookmarks Link -->
          <router-link
            to="/bookmarks"
            class="p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-full transition relative"
            aria-label="Wishlist"
          >
            <Heart class="w-5 h-5" />
            <span
              v-if="bookmarkStore.count > 0"
              class="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ bookmarkStore.count }}
            </span>
          </router-link>

          <!-- User / Login Link (Figma Navigation Requirement 1: opens Login page) -->
          <button
            type="button"
            class="p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-full transition relative flex items-center gap-1.5"
            :aria-label="authStore.isAuthenticated ? 'User Profile' : 'Sign In'"
            @click="handleUserClick"
          >
            <img
              v-if="authStore.isAuthenticated && authStore.user?.image"
              :src="authStore.user.image"
              :alt="authStore.fullName"
              class="w-5 h-5 rounded-full object-cover border border-brand-400"
            />
            <UserIcon v-else class="w-5 h-5" />
            <span v-if="authStore.isAuthenticated" class="hidden xl:inline text-xs font-medium text-stone-300">
              {{ authStore.user?.firstName }}
            </span>
          </button>

          <!-- Shopping Cart Link -->
          <router-link
            to="/cart"
            class="p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-full transition relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag class="w-5 h-5" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-0.5 -right-0.5 bg-brand-500 text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </router-link>

          <!-- Dark / Light Mode Toggle -->
          <button
            type="button"
            class="p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-full transition"
            :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
            @click="toggleTheme"
          >
            <Sun v-if="theme === 'dark'" class="w-5 h-5 text-amber-400" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            class="md:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded-full transition"
            aria-label="Open mobile menu"
            @click="isMobileMenuOpen = true"
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Expandable Search Bar Header Overlay -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showSearchBar" class="py-3 border-t border-stone-800">
          <form class="flex items-center gap-2 max-w-xl mx-auto" @submit.prevent="handleSearchSubmit">
            <input
              v-model="quickSearchQuery"
              type="search"
              placeholder="Search luxury hair, tools, cosmetics..."
              class="flex-1 bg-stone-900 text-white placeholder-stone-400 text-sm px-4 py-2 rounded-full border border-stone-700 focus:outline-none focus:border-brand-400"
              autofocus
            />
            <button
              type="submit"
              class="bg-brand-500 text-black px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-400 transition"
            >
              Search
            </button>
          </form>
        </div>
      </Transition>
    </div>

    <!-- Mobile Drawer Navigation -->
    <MobileNavigation :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
  </header>
</template>
