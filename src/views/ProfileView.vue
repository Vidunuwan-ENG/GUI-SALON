<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useBookmarkStore } from '@/stores/bookmark'
import {
  User as UserIcon,
  Mail,
  LogOut,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Package,
  Calendar,
  Sparkles
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const bookmarkStore = useBookmarkStore()

const handleLogout = (): void => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="bg-stone-50 dark:bg-dark-900 transition-colors py-10 md:py-16 min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Top Profile Card -->
      <div class="bg-white dark:bg-dark-800 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-dark-700 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
        <!-- Avatar -->
        <div class="relative w-28 h-28 rounded-full overflow-hidden border-4 border-brand-400 bg-stone-100 dark:bg-dark-700 shadow-md flex-shrink-0">
          <img
            v-if="authStore.user?.image"
            :src="authStore.user.image"
            :alt="authStore.fullName"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-stone-400">
            <UserIcon class="w-12 h-12" />
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 text-center md:text-left space-y-2">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 class="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {{ authStore.fullName }}
            </h1>
            <span class="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-brand-100 text-brand-900 dark:bg-brand-950 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles class="w-3 h-3" />
              VIP Member
            </span>
          </div>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span class="flex items-center gap-1.5">
              <UserIcon class="w-3.5 h-3.5" />
              @{{ authStore.user?.username }}
            </span>
            <span>•</span>
            <span class="flex items-center gap-1.5">
              <Mail class="w-3.5 h-3.5" />
              {{ authStore.user?.email }}
            </span>
            <span v-if="authStore.user?.gender">•</span>
            <span v-if="authStore.user?.gender" class="capitalize">
              {{ authStore.user?.gender }}
            </span>
          </div>

          <p class="text-xs text-stone-400 dark:text-stone-500 pt-2">
            Authenticated session via DummyJSON REST API simulation.
          </p>
        </div>

        <!-- Logout Button -->
        <div>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 dark:bg-dark-700 dark:text-stone-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-xs font-semibold uppercase tracking-wider transition"
            @click="handleLogout"
          >
            <LogOut class="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <!-- Stats Overview Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <!-- Cart Items Stat -->
        <div
          class="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-stone-200 dark:border-dark-700 shadow-sm cursor-pointer hover:border-brand-500 transition"
          @click="router.push('/cart')"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs uppercase font-semibold text-stone-400 tracking-wider">Active Cart</span>
            <div class="w-10 h-10 rounded-full bg-brand-50 dark:bg-dark-700 flex items-center justify-center text-brand-500">
              <ShoppingBag class="w-5 h-5" />
            </div>
          </div>
          <span class="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
            {{ cartStore.itemCount }} Items
          </span>
          <p class="text-xs text-stone-500 mt-1">Subtotal: ${{ cartStore.subtotal.toFixed(2) }}</p>
        </div>

        <!-- Wishlist Stat -->
        <div
          class="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-stone-200 dark:border-dark-700 shadow-sm cursor-pointer hover:border-rose-400 transition"
          @click="router.push('/bookmarks')"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs uppercase font-semibold text-stone-400 tracking-wider">Wishlist</span>
            <div class="w-10 h-10 rounded-full bg-rose-50 dark:bg-dark-700 flex items-center justify-center text-rose-500">
              <Heart class="w-5 h-5" />
            </div>
          </div>
          <span class="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
            {{ bookmarkStore.count }} Saved
          </span>
          <p class="text-xs text-stone-500 mt-1">Ready for quick order</p>
        </div>

        <!-- Rewards Stat -->
        <div class="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-stone-200 dark:border-dark-700 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs uppercase font-semibold text-stone-400 tracking-wider">Salon Rewards</span>
            <div class="w-10 h-10 rounded-full bg-amber-50 dark:bg-dark-700 flex items-center justify-center text-amber-500">
              <Sparkles class="w-5 h-5" />
            </div>
          </div>
          <span class="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
            1,450 Pts
          </span>
          <p class="text-xs text-stone-500 mt-1">$15 off next appointment</p>
        </div>
      </div>

      <!-- Recent Orders Simulation List -->
      <div class="bg-white dark:bg-dark-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-dark-700 shadow-sm">
        <h3 class="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">
          Recent Order History
        </h3>

        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-stone-50 dark:bg-dark-700/50 border border-stone-200/80 dark:border-dark-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Package class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Order #DIBU-94821
                </h4>
                <p class="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                  <Calendar class="w-3 h-3" />
                  September 08, 2026 • Delivered
                </p>
              </div>
            </div>
            <div class="text-left sm:text-right">
              <span class="text-sm font-bold text-stone-900 dark:text-stone-100">$185.00</span>
              <p class="text-[10px] text-emerald-600 font-semibold uppercase">Completed</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-stone-50 dark:bg-dark-700/50 border border-stone-200/80 dark:border-dark-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <ShieldCheck class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Order #DIBU-78119
                </h4>
                <p class="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                  <Calendar class="w-3 h-3" />
                  August 22, 2026 • Delivered
                </p>
              </div>
            </div>
            <div class="text-left sm:text-right">
              <span class="text-sm font-bold text-stone-900 dark:text-stone-100">$320.00</span>
              <p class="text-[10px] text-emerald-600 font-semibold uppercase">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
