<script setup lang="ts">
import { PackageOpen } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

interface Props {
  title: string
  description?: string
  actionLabel?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-20 h-20 rounded-full bg-stone-100 dark:bg-dark-700 flex items-center justify-center mb-6 text-stone-400 dark:text-stone-500">
      <slot name="icon">
        <PackageOpen class="w-10 h-10" />
      </slot>
    </div>
    <h3 class="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2">
      {{ title }}
    </h3>
    <p v-if="description" class="text-stone-500 dark:text-stone-400 max-w-md mb-8 text-sm md:text-base leading-relaxed">
      {{ description }}
    </p>
    <div v-if="actionLabel || $slots.action">
      <slot name="action">
        <BaseButton variant="primary" size="md" @click="emit('action')">
          {{ actionLabel }}
        </BaseButton>
      </slot>
    </div>
  </div>
</template>
