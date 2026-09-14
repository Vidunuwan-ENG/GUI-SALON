<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryItem, SortField } from '@/types/category'
import { Search, X, SlidersHorizontal } from 'lucide-vue-next'

interface Props {
  categories: CategoryItem[]
  selectedCategory: string
  searchQuery: string
  sortBy: SortField
  totalResults: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedCategory', value: string): void
  (e: 'update:sortBy', value: SortField): void
  (e: 'reset'): void
}>()

const sortOptions: { label: string; value: SortField }[] = [
  { label: 'Featured / Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
  { label: 'Name: A to Z', value: 'name-asc' }
]

const hasActiveFilters = computed<boolean>(() => {
  return (
    props.selectedCategory !== 'all' ||
    props.searchQuery.trim() !== '' ||
    props.sortBy !== 'default'
  )
})
</script>

<template>
  <div class="flex flex-col gap-5 mb-8">
    <!-- Top Bar: Search and Sort -->
    <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <!-- Search Box -->
      <div class="relative flex-1 max-w-lg">
        <label for="product-search" class="sr-only">Search products</label>
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search class="w-4 h-4" />
        </div>
        <input
          id="product-search"
          type="search"
          :value="searchQuery"
          placeholder="Search products, brands, or categories..."
          class="w-full pl-10 pr-10 py-2.5 rounded-full border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-brand-500 transition shadow-sm"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          aria-label="Clear search"
          @click="emit('update:searchQuery', '')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Right Controls: Sort & Filter indicator -->
      <div class="flex items-center justify-between md:justify-end gap-3">
        <!-- Results count -->
        <span class="text-xs text-stone-500 dark:text-stone-400 font-medium">
          {{ totalResults }} {{ totalResults === 1 ? 'product' : 'products' }}
        </span>

        <!-- Sort Select -->
        <div class="flex items-center gap-2">
          <label for="sort-select" class="sr-only">Sort products</label>
          <select
            id="sort-select"
            :value="sortBy"
            class="py-2 px-3 pr-8 rounded-full border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-stone-800 dark:text-stone-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-brand-500 shadow-sm cursor-pointer"
            @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value as SortField)"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Reset Button -->
        <button
          v-if="hasActiveFilters"
          type="button"
          class="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 underline decoration-stone-300 transition"
          @click="emit('reset')"
        >
          <SlidersHorizontal class="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>

    <!-- Category Pills Horizontal Scroll -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        type="button"
        class="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200"
        :class="
          selectedCategory === 'all'
            ? 'bg-black text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm'
            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-dark-800 dark:text-stone-300 dark:hover:bg-dark-700'
        "
        @click="emit('update:selectedCategory', 'all')"
      >
        All Products
      </button>

      <button
        v-for="cat in categories"
        :key="cat.slug"
        type="button"
        class="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200"
        :class="
          selectedCategory === cat.slug
            ? 'bg-black text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm'
            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-dark-800 dark:text-stone-300 dark:hover:bg-dark-700'
        "
        @click="emit('update:selectedCategory', cat.slug)"
      >
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>
