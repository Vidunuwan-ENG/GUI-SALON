<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from './ProductCard.vue'
import ProductSkeleton from './ProductSkeleton.vue'

interface Props {
  products?: Product[]
  loading?: boolean
  skeletonCount?: number
}

withDefaults(defineProps<Props>(), {
  products: () => [],
  loading: false,
  skeletonCount: 8
})
</script>

<template>
  <div>
    <!-- Skeletons while loading -->
    <div
      v-if="loading"
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
    >
      <ProductSkeleton v-for="n in skeletonCount" :key="n" />
    </div>

    <!-- Loaded Products Grid -->
    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Slot for empty state -->
    <slot v-else />
  </div>
</template>
