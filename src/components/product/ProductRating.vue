<script setup lang="ts">
import { computed } from 'vue'
import { Star } from 'lucide-vue-next'

interface Props {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
  showNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  reviewCount: undefined,
  size: 'sm',
  showNumber: true
})

const roundedRating = computed<number>(() => {
  return Math.round(props.rating * 10) / 10
})

const starList = computed<number[]>(() => [1, 2, 3, 4, 5])
</script>

<template>
  <div class="flex items-center gap-1.5" :aria-label="`Rating: ${roundedRating} out of 5 stars`">
    <div class="flex items-center">
      <Star
        v-for="star in starList"
        :key="star"
        :class="{
          'w-3.5 h-3.5': size === 'sm',
          'w-5 h-5': size === 'md',
          'fill-amber-400 text-amber-400': star <= Math.round(rating),
          'fill-stone-200 text-stone-300 dark:fill-dark-700 dark:text-dark-600':
            star > Math.round(rating)
        }"
      />
    </div>
    <span
      v-if="showNumber"
      class="text-xs font-semibold text-stone-700 dark:text-stone-300"
    >
      {{ roundedRating }}
    </span>
    <span
      v-if="reviewCount !== undefined"
      class="text-xs text-stone-400 dark:text-stone-500"
    >
      ({{ reviewCount }})
    </span>
  </div>
</template>
