<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cart'
import { useBookmarkStore } from '@/stores/bookmark'
import { Heart, ShoppingBag, Eye } from 'lucide-vue-next'
import ProductRating from './ProductRating.vue'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()
const cartStore = useCartStore()
const bookmarkStore = useBookmarkStore()

const isWishlisted = computed<boolean>(() => {
  return bookmarkStore.isBookmarked(props.product.id)
})

const inCartCount = computed<number>(() => {
  return cartStore.getItemQuantity(props.product.id)
})

const originalPrice = computed<number>(() => {
  const discount = props.product.discountPercentage || 0
  if (discount <= 0) return props.product.price
  const original = props.product.price / (1 - discount / 100)
  return Math.round(original * 100) / 100
})

const formattedPrice = computed<string>(() => {
  return `$${props.product.price.toFixed(2)}`
})

const formattedOriginalPrice = computed<string>(() => {
  return `$${originalPrice.value.toFixed(2)}`
})

const navigateToDetail = (): void => {
  router.push(`/product/${props.product.id}`)
}

const handleAddToCart = (event: MouseEvent): void => {
  event.stopPropagation()
  cartStore.addItem(props.product, 1)
}

const handleToggleWishlist = (event: MouseEvent): void => {
  event.stopPropagation()
  bookmarkStore.toggleBookmark(props.product)
}
</script>

<template>
  <div
    class="group relative flex flex-col bg-white dark:bg-dark-800 rounded-xl overflow-hidden border border-stone-200/80 dark:border-dark-700/80 shadow-sm hover:shadow-luxury hover:border-brand-500/40 dark:hover:border-brand-500/30 transition-all duration-300"
    role="article"
    :aria-label="product.title"
  >
    <!-- Card Image Container -->
    <div
      class="relative w-full aspect-square bg-stone-100 dark:bg-dark-700 overflow-hidden cursor-pointer flex items-center justify-center p-4"
      @click="navigateToDetail"
    >
      <img
        :src="product.thumbnail || product.images[0]"
        :alt="product.title"
        class="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      <!-- Discount Badge -->
      <span
        v-if="product.discountPercentage && product.discountPercentage > 5"
        class="absolute top-3 left-3 bg-stone-900 text-white dark:bg-brand-500 dark:text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase"
      >
        -{{ Math.round(product.discountPercentage) }}%
      </span>

      <!-- Wishlist Button -->
      <button
        type="button"
        class="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors"
        :class="
          isWishlisted
            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400'
            : 'bg-white/80 dark:bg-dark-800/80 text-stone-600 dark:text-stone-300 hover:text-rose-600 hover:bg-white dark:hover:bg-dark-700'
        "
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        @click="handleToggleWishlist"
      >
        <Heart
          class="w-4 h-4 transition-transform"
          :class="isWishlisted ? 'fill-rose-500 scale-110 text-rose-500' : ''"
        />
      </button>

      <!-- Quick View Hover Overlay on Desktop -->
      <div
        class="hidden sm:flex absolute inset-x-0 bottom-0 py-2 bg-stone-900/80 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Eye class="w-3.5 h-3.5" />
        Quick View
      </div>
    </div>

    <!-- Product Info Section -->
    <div class="flex-1 flex flex-col p-4 text-center">
      <!-- Category/Brand -->
      <span class="text-[11px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1 truncate">
        {{ product.brand || product.category }}
      </span>

      <!-- Title -->
      <h4
        class="text-sm md:text-base font-serif font-semibold text-stone-900 dark:text-stone-100 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer line-clamp-1 mb-1.5 transition-colors uppercase tracking-wide"
        :title="product.title"
        @click="navigateToDetail"
      >
        {{ product.title }}
      </h4>

      <!-- Rating -->
      <div class="flex justify-center mb-2">
        <ProductRating :rating="product.rating" size="sm" :review-count="product.reviews?.length" />
      </div>

      <!-- Price -->
      <div class="flex items-baseline justify-center gap-2 mb-4">
        <span class="text-base md:text-lg font-bold text-stone-900 dark:text-stone-100">
          {{ formattedPrice }}
        </span>
        <span
          v-if="product.discountPercentage && product.discountPercentage > 5"
          class="text-xs text-stone-400 dark:text-stone-500 line-through"
        >
          {{ formattedOriginalPrice }}
        </span>
      </div>

      <!-- Add to Cart Button (Figma Style: Black Pill Button) -->
      <div class="mt-auto">
        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200"
          :class="
            inCartCount > 0
              ? 'bg-stone-800 text-brand-300 dark:bg-brand-500 dark:text-black font-semibold'
              : 'bg-black text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 shadow-sm'
          "
          @click="handleAddToCart"
        >
          <ShoppingBag class="w-3.5 h-3.5" />
          <span>{{ inCartCount > 0 ? `In Cart (${inCartCount})` : 'Add to Cart' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
