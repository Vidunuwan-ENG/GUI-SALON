<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'currentColor'
})
</script>

<template>
  <div
    class="inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    :class="{
      'h-4 w-4 border-2': size === 'sm',
      'h-8 w-8 border-3': size === 'md',
      'h-12 w-12 border-4': size === 'lg'
    }"
    role="status"
    aria-label="Loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
