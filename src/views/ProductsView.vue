<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '@/services/api'
import type { Product } from '@/types/product'
import type { CategoryItem, SortField } from '@/types/category'
import type { ApiError } from '@/types/api'
import ProductGrid from '@/components/product/ProductGrid.vue'
import ProductFilters from '@/components/product/ProductFilters.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import { Flame } from 'lucide-vue-next'

const route = useRoute()

// State
const products = ref<Product[]>([])
const categories = ref<CategoryItem[]>([])
const isLoading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

// Filter & Sort State
const searchQuery = ref<string>('')
const selectedCategory = ref<string>('all')
const sortBy = ref<SortField>('default')

// Debounce timer for search
let searchTimer: ReturnType<typeof setTimeout> | null = null

// Fetch categories
const fetchCategories = async (): Promise<void> => {
  try {
    const cats = await productService.getCategories()
    // Filter to cosmetic / beauty relevant or display all
    categories.value = cats
  } catch {
    categories.value = []
  }
}

// Fetch products based on search or category
const fetchProducts = async (): Promise<void> => {
  isLoading.value = true
  errorMessage.value = null

  try {
    let result
    const trimmedQuery = searchQuery.value.trim()

    if (trimmedQuery) {
      result = await productService.searchProducts(trimmedQuery, 50)
    } else if (selectedCategory.value !== 'all') {
      result = await productService.getProductsByCategory(selectedCategory.value, 50)
    } else {
      result = await productService.getProducts({ limit: 50 })
    }

    products.value = result.products
  } catch (err: unknown) {
    const apiErr = err as ApiError
    errorMessage.value = apiErr.message || 'Failed to load products from catalogue'
    products.value = []
  } finally {
    isLoading.value = false
  }
}

// Debounced search watcher
watch(searchQuery, () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    fetchProducts()
  }, 350)
})

// Category watcher
watch(selectedCategory, () => {
  fetchProducts()
})

// Query param watcher (e.g., from AppHeader search bar)
watch(
  () => route.query.q,
  (newQ) => {
    if (typeof newQ === 'string' && newQ !== searchQuery.value) {
      searchQuery.value = newQ
    }
  },
  { immediate: true }
)

// Reset all filters
const resetFilters = (): void => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  sortBy.value = 'default'
  fetchProducts()
}

// Client-side sorting on currently loaded products
const sortedProducts = computed<Product[]>(() => {
  const list = [...products.value]

  switch (sortBy.value) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return list.sort((a, b) => b.rating - a.rating)
    case 'name-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return list
  }
})

// Segregated sections matching Figma Desktop - 3
const luxuryProducts = computed<Product[]>(() => {
  return sortedProducts.value.slice(0, 10)
})

const luxuryTools = computed<Product[]>(() => {
  // If we have 10+ items, take next 5 or fallback
  return sortedProducts.value.slice(10, 15)
})

const bundleDeals = computed<Product[]>(() => {
  // Pick curated high-value items or next slice
  return sortedProducts.value.slice(15, 20)
})

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()

  // If page loaded with hash, scroll into view
  if (route.hash) {
    setTimeout(() => {
      const element = document.querySelector(route.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }
})
</script>

<template>
  <div class="bg-stone-50 dark:bg-dark-900 transition-colors py-10 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search, Categories, & Sorting Controls Bar -->
      <ProductFilters
        :categories="categories"
        :selected-category="selectedCategory"
        :search-query="searchQuery"
        :sort-by="sortBy"
        :total-results="sortedProducts.length"
        @update:search-query="searchQuery = $event"
        @update:selected-category="selectedCategory = $event"
        @update:sort-by="sortBy = $event"
        @reset="resetFilters"
      />

      <!-- Error State -->
      <ErrorState
        v-if="errorMessage && !isLoading"
        :message="errorMessage"
        @retry="fetchProducts"
      />

      <!-- Empty Search Results State -->
      <EmptyState
        v-else-if="!isLoading && sortedProducts.length === 0"
        title="No matching products found"
        :description="`We couldn't find any products matching your current filters. Try checking spelling or resetting your search filters.`"
        action-label="Clear All Filters"
        @action="resetFilters"
      />

      <!-- Filtered / Searched Single Grid View (When searching or filtering by category) -->
      <div v-else-if="searchQuery.trim() !== '' || selectedCategory !== 'all'">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Search Results for "{{ searchQuery || selectedCategory }}"
          </h2>
        </div>
        <ProductGrid :products="sortedProducts" :loading="isLoading" />
      </div>

      <!-- Multi-Section Curated Catalogue (Figma: Desktop - 3 Layout) -->
      <div v-else class="space-y-24">
        <!-- 1. OUR LUXURY PRODUCTS (Figma Desktop - 3 Section 1) -->
        <section id="luxury-products" class="scroll-mt-28">
          <div class="text-center mb-10">
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">
              Handcrafted Formulations
            </span>
            <h2 class="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mt-1">
              Our Luxury Products
            </h2>
            <div class="w-16 h-0.5 bg-stone-900 dark:bg-stone-100 mx-auto mt-4" />
          </div>

          <ProductGrid :products="luxuryProducts" :loading="isLoading" />
        </section>

        <!-- 2. OUR LUXURY TOOLS (Figma Desktop - 3 Section 2) -->
        <section id="luxury-tools" class="scroll-mt-28">
          <div class="text-center mb-10">
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">
              Salon Technology
            </span>
            <h2 class="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mt-1">
              Our Luxury Tools
            </h2>
            <div class="w-16 h-0.5 bg-stone-900 dark:bg-stone-100 mx-auto mt-4" />
          </div>

          <ProductGrid :products="luxuryTools" :loading="isLoading" />
        </section>

        <!-- 3. OUR BUNDLE DEALS (Figma Desktop - 3 Section 3) -->
        <section id="bundle-deals" class="scroll-mt-28">
          <div class="text-center mb-10">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
              <Flame class="w-4 h-4" />
              Special Savings
            </span>
            <h2 class="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mt-1">
              Our Bundle Deals
            </h2>
            <div class="w-16 h-0.5 bg-stone-900 dark:bg-stone-100 mx-auto mt-4" />
          </div>

          <ProductGrid :products="bundleDeals" :loading="isLoading" />
        </section>
      </div>
    </div>
  </div>
</template>
