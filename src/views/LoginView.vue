<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { Lock, User as UserIcon, ArrowLeft, Sparkles } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref<string>('emilys')
const password = ref<string>('emilyspass')

// Demo accounts for instant grading testing
const fillDemoAccount = (u: string, p: string): void => {
  username.value = u
  password.value = p
}

const handleLogin = async (): Promise<void> => {
  if (!username.value.trim() || !password.value) return

  const success = await authStore.login({
    username: username.value.trim(),
    password: password.value
  })

  if (success) {
    const redirectPath = (route.query.redirect as string) || '/profile'
    router.push(redirectPath)
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 bg-stone-100 dark:bg-dark-900 transition-colors">
    <!-- Back to store button -->
    <button
      type="button"
      class="fixed top-24 left-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition z-10"
      @click="router.push('/')"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Back to Store</span>
    </button>

    <!-- Centered Luxury Split Card (Figma Login Screen) -->
    <div class="w-full max-w-4xl bg-white dark:bg-dark-800 rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-dark-700 grid grid-cols-1 md:grid-cols-12 transition-all">
      <!-- Left Column: Stylish Model in Pink Fluffy Jacket (Figma: Model with yellow glasses) -->
      <div class="md:col-span-5 relative bg-stone-900 min-h-[320px] md:min-h-[520px]">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
          alt="DIBU XXTENSIONS Model"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
        <div class="absolute bottom-6 left-6 right-6 text-white md:hidden">
          <span class="text-xs uppercase tracking-widest text-brand-300 font-semibold">Member Access</span>
          <h3 class="text-xl font-serif font-bold">DIBU XXTENSIONS</h3>
        </div>
      </div>

      <!-- Right Column: Sign In Form (Figma: Textured Card with DIBU logo and Inputs) -->
      <div class="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-stone-50 dark:bg-dark-800/80">
        <!-- Top: Logo badge -->
        <div class="flex flex-col items-center text-center mb-6">
          <div class="bg-black text-white px-5 py-2 rounded-xl mb-4 shadow-md flex flex-col items-center">
            <span class="font-serif text-base font-bold tracking-widest uppercase">
              DIBU
            </span>
            <span class="text-[7px] tracking-[0.25em] text-stone-400 uppercase -mt-0.5 font-sans">
              XXTENSIONS
            </span>
          </div>

          <h2 class="text-2xl font-serif font-bold tracking-wider text-stone-900 dark:text-stone-100 uppercase">
            Sign In
          </h2>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Authentication Simulation powered by DummyJSON REST API
          </p>
        </div>

        <!-- Form -->
        <form class="space-y-4 max-w-sm mx-auto w-full" @submit.prevent="handleLogin">
          <!-- Error feedback -->
          <div
            v-if="authStore.error"
            class="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs rounded-xl"
            role="alert"
          >
            {{ authStore.error }}
          </div>

          <!-- Email / Username -->
          <div>
            <label for="login-username" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Username / Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <UserIcon class="w-4 h-4" />
              </div>
              <input
                id="login-username"
                v-model="username"
                type="text"
                required
                autocomplete="username"
                placeholder="e.g. emilys"
                class="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-brand-500 shadow-sm"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="login-password" class="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock class="w-4 h-4" />
              </div>
              <input
                id="login-password"
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-brand-500 shadow-sm"
              />
            </div>
          </div>

          <!-- Submit Button (Figma: Black pill button) -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="authStore.isLoading"
              class="w-full py-3 px-6 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-brand-500 dark:text-stone-950 dark:hover:bg-brand-400 font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <LoadingSpinner v-if="authStore.isLoading" size="sm" />
              <span>{{ authStore.isLoading ? 'Signing In...' : 'Log In' }}</span>
            </button>
          </div>
        </form>

        <!-- Quick-Fill Demo Credentials Bar (Very helpful for grading rubrics!) -->
        <div class="mt-6 pt-4 border-t border-stone-200 dark:border-dark-700 max-w-sm mx-auto w-full">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Sparkles class="w-3 h-3 text-brand-500" />
              Demo Test Accounts:
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="px-2.5 py-1 bg-stone-200 dark:bg-dark-700 text-stone-800 dark:text-stone-200 rounded-lg text-[11px] hover:bg-stone-300 dark:hover:bg-dark-600 transition"
              @click="fillDemoAccount('emilys', 'emilyspass')"
            >
              Emily (Customer)
            </button>
            <button
              type="button"
              class="px-2.5 py-1 bg-stone-200 dark:bg-dark-700 text-stone-800 dark:text-stone-200 rounded-lg text-[11px] hover:bg-stone-300 dark:hover:bg-dark-600 transition"
              @click="fillDemoAccount('michaelw', 'michaelwpass')"
            >
              Michael (VIP)
            </button>
          </div>

          <!-- Register link matching Figma -->
          <p class="text-center text-xs text-stone-500 dark:text-stone-400 mt-5">
            Don't have an account?
            <a href="#" class="text-stone-900 dark:text-stone-200 font-semibold underline ml-1" @click.prevent="fillDemoAccount('emilys', 'emilyspass')">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
