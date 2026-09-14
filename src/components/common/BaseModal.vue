<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 'lg'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Modal Dialog'"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full rounded-2xl bg-white dark:bg-dark-800 p-6 shadow-2xl border border-stone-200 dark:border-dark-600 transition-all max-h-[90vh] overflow-y-auto"
          :class="{
            'max-w-sm': maxWidth === 'sm',
            'max-w-md': maxWidth === 'md',
            'max-w-lg': maxWidth === 'lg',
            'max-w-xl': maxWidth === 'xl',
            'max-w-2xl': maxWidth === '2xl'
          }"
        >
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-stone-100 dark:border-dark-700">
            <h3 v-if="title" class="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {{ title }}
            </h3>
            <div v-else></div>
            <button
              type="button"
              class="rounded-full p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:text-stone-200 dark:hover:bg-dark-700 transition"
              aria-label="Close modal"
              @click="emit('close')"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body text-stone-700 dark:text-stone-300">
            <slot />
          </div>

          <!-- Footer slot if needed -->
          <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-stone-100 dark:border-dark-700 flex justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
