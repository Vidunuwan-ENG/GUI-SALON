<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

const toastStore = useToastStore()
</script>

<template>
  <div
    class="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    aria-live="polite"
  >
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all text-sm"
        :class="{
          'bg-stone-900/95 text-white border-stone-800 dark:bg-stone-800/95 dark:border-stone-700':
            toast.type === 'info' || toast.type === 'success',
          'bg-red-900/95 text-white border-red-800': toast.type === 'error',
          'bg-amber-900/95 text-white border-amber-800': toast.type === 'warning'
        }"
        role="alert"
      >
        <!-- Icon -->
        <span class="flex-shrink-0 mt-0.5">
          <CheckCircle2 v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400" />
          <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-400" />
          <AlertTriangle v-else-if="toast.type === 'warning'" class="w-5 h-5 text-amber-400" />
          <Info v-else class="w-5 h-5 text-brand-400" />
        </span>

        <!-- Message -->
        <div class="flex-1 font-medium leading-snug">
          {{ toast.message }}
        </div>

        <!-- Close -->
        <button
          type="button"
          class="flex-shrink-0 text-stone-400 hover:text-white transition p-0.5"
          aria-label="Dismiss notification"
          @click="toastStore.remove(toast.id)"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
