<script setup lang="ts">
import { computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  ariaLabel: undefined
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed<string>(() => {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-full tracking-wider uppercase',
    md: 'text-sm px-5 py-2.5 rounded-full tracking-wider uppercase',
    lg: 'text-base px-8 py-3.5 rounded-full tracking-wider uppercase font-semibold'
  }

  const variants = {
    primary:
      'bg-black text-white hover:bg-stone-800 dark:bg-brand-500 dark:text-black dark:hover:bg-brand-400 focus:ring-black dark:focus:ring-brand-500 shadow-sm',
    dark:
      'bg-black text-white hover:bg-neutral-800 focus:ring-neutral-900 shadow-sm border border-stone-800',
    secondary:
      'bg-stone-200 text-stone-900 hover:bg-stone-300 dark:bg-dark-600 dark:text-stone-100 dark:hover:bg-dark-500 focus:ring-stone-400',
    outline:
      'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white dark:border-stone-400 dark:text-stone-200 dark:hover:bg-stone-100 dark:hover:text-black focus:ring-stone-500',
    ghost:
      'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-dark-700 focus:ring-stone-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 focus:ring-red-500'
  }

  return `${base} ${sizes[props.size]} ${variants[props.variant]} ${props.fullWidth ? 'w-full' : ''}`
})

const handleClick = (event: MouseEvent): void => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    @click="handleClick"
  >
    <LoadingSpinner v-if="loading" size="sm" class="mr-2" />
    <slot />
  </button>
</template>
