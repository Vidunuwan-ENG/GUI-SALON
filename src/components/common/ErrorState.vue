<script setup lang="ts">
import { AlertTriangle, RefreshCw } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  message: string
  retryLabel?: string
  canRetry?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  retryLabel: 'Try Again',
  canRetry: true
})

const emit = defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
      <AlertTriangle class="w-8 h-8" />
    </div>
    <h3 class="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2">
      {{ title }}
    </h3>
    <p class="text-stone-500 dark:text-stone-400 max-w-md mb-8 text-sm md:text-base leading-relaxed">
      {{ message }}
    </p>
    <div v-if="canRetry">
      <BaseButton variant="outline" size="md" @click="emit('retry')">
        <RefreshCw class="w-4 h-4 mr-2" />
        {{ retryLabel }}
      </BaseButton>
    </div>
  </div>
</template>
