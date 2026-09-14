<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useBookmarkStore } from '@/stores/bookmark'
import { useTheme } from '@/composables/useTheme'
import {
  X,
  Home,
  Sparkles,
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  LogOut,
  LogIn
} from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const bookmarkStore = useBookmarkStore()
const { theme, toggleTheme } = useTheme()

const navigate = (path: string): void => {
  router.push(path)
  emit('close')
}

const handleLogout = (): void => {
  authStore.logout()
  emit('close')
  router.push('/')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
        @click="emit('close')"
      >
        <div
          class="fixed inset-y-0 right-0 max-w-xs w-full bg-stone-900 text-white shadow-2xl p-6 flex flex-col justify-between"
          @click.stop
        >
          <!-- Top section -->
          <div>
            <!-- Header bar with logo and close -->
            <div class="flex items-center justify-between pb-6 border-b border-stone-800">
              <span class="font-serif text-lg font-bold tracking-widest text-brand-400">
                DIBU XXTENSIONS
              </span>
              <button
                type="button"
                class="p-2 text-stone-400 hover:text-white rounded-full transition"
                aria-label="Close menu"
                @click="emit('close')"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <!-- Navigation Links -->
            <nav class="mt-6 flex flex-col space-y-3">
              <button
                type="button"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition text-left"
                @click="navigate('/')"
              >
                <Home class="w-4 h-4 text-brand-400" />
                <span>Home</span>
              </button>

              <button
                type="button"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition text-left"
                @click="navigate('/services')"
              >
                <Sparkles class="w-4 h-4 text-brand-400" />
                <span>Our Services</span>
              </button>

              <button
                type="button"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition text-left"
                @click="navigate('/products')"
              >
                <ShoppingBag class="w-4 h-4 text-brand-400" />
                <span>Our Products</span>
              </button>

              <button
                type="button"
                class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition text-left"
                @click="navigate('/bookmarks')"
              >
                <div class="flex items-center gap-3">
                  <Heart class="w-4 h-4 text-brand-400" />
                  <span>Wishlist</span>
                </div>
                <span
                  v-if="bookmarkStore.count > 0"
                  class="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold"
                >
                  {{ bookmarkStore.count }}
                </span>
              </button>

              <button
                type="button"
                class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition text-left"
                @click="navigate('/cart')"
              >
                <div class="flex items-center gap-3">
                  <ShoppingBag class="w-4 h-4 text-brand-400" />
                  <span>Shopping Cart</span>
                </div>
                <span
                  v-if="cartStore.itemCount > 0"
                  class="bg-brand-500 text-stone-950 text-xs px-2 py-0.5 rounded-full font-bold"
                >
                  {{ cartStore.itemCount }}
                </span>
              </button>

              <button
                type="button"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition text-left"
                @click="navigate(authStore.isAuthenticated ? '/profile' : '/login')"
              >
                <User class="w-4 h-4 text-brand-400" />
                <span>{{ authStore.isAuthenticated ? authStore.fullName : 'Sign In' }}</span>
              </button>
            </nav>
          </div>

          <!-- Bottom controls -->
          <div class="pt-6 border-t border-stone-800 space-y-4">
            <!-- Theme Toggle -->
            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm bg-stone-800/60 hover:bg-stone-800 transition"
              @click="toggleTheme"
            >
              <span class="flex items-center gap-2 text-stone-300">
                <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
                <Moon v-else class="w-4 h-4 text-stone-400" />
                <span>Theme</span>
              </span>
              <span class="text-xs uppercase font-semibold text-brand-400">
                {{ theme }}
              </span>
            </button>

            <!-- Logout if authenticated -->
            <button
              v-if="authStore.isAuthenticated"
              type="button"
              class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/40 text-sm font-medium transition"
              @click="handleLogout"
            >
              <LogOut class="w-4 h-4" />
              <span>Log Out</span>
            </button>
            <button
              v-else
              type="button"
              class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand-500 text-stone-950 hover:bg-brand-400 text-sm font-semibold uppercase tracking-wider transition"
              @click="navigate('/login')"
            >
              <LogIn class="w-4 h-4" />
              <span>Login / Register</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
