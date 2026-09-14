<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { CartItem as CartItemType } from '@/types/cart'
import { useCartStore } from '@/stores/cart'
import { Trash2, Plus, Minus } from 'lucide-vue-next'

interface Props {
  item: CartItemType
}

const props = defineProps<Props>()
const router = useRouter()
const cartStore = useCartStore()

const lineTotal = computed<string>(() => {
  return `$${(props.item.product.price * props.item.quantity).toFixed(2)}`
})

const navigateToDetail = (): void => {
  router.push(`/product/${props.item.product.id}`)
}
</script>

<template>
  <div class="flex items-center gap-4 py-4 border-b border-stone-200 dark:border-dark-700">
    <!-- Thumbnail -->
    <div
      class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-stone-100 dark:bg-dark-700 flex-shrink-0 p-2 cursor-pointer overflow-hidden flex items-center justify-center border border-stone-200 dark:border-dark-600"
      @click="navigateToDetail"
    >
      <img
        :src="item.product.thumbnail || item.product.images[0]"
        :alt="item.product.title"
        class="w-full h-full object-contain hover:scale-105 transition-transform"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <span class="text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
        {{ item.product.brand || item.product.category }}
      </span>
      <h4
        class="text-sm sm:text-base font-serif font-semibold text-stone-900 dark:text-stone-100 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer truncate"
        :title="item.product.title"
        @click="navigateToDetail"
      >
        {{ item.product.title }}
      </h4>
      <div class="text-xs text-stone-500 dark:text-stone-400 mt-1">
        Unit Price: ${{ item.product.price.toFixed(2) }}
      </div>

      <!-- Quantity controls on mobile -->
      <div class="flex sm:hidden items-center gap-3 mt-3">
        <div class="inline-flex items-center border border-stone-300 dark:border-dark-600 rounded-full bg-white dark:bg-dark-800">
          <button
            type="button"
            class="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            aria-label="Decrease quantity"
            @click="cartStore.decreaseQuantity(item.product.id)"
          >
            <Minus class="w-3.5 h-3.5" />
          </button>
          <span class="px-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
            {{ item.quantity }}
          </span>
          <button
            type="button"
            class="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            aria-label="Increase quantity"
            @click="cartStore.increaseQuantity(item.product.id)"
          >
            <Plus class="w-3.5 h-3.5" />
          </button>
        </div>

        <span class="font-bold text-sm text-stone-900 dark:text-stone-100 ml-auto">
          {{ lineTotal }}
        </span>
      </div>
    </div>

    <!-- Quantity controls on desktop -->
    <div class="hidden sm:flex items-center border border-stone-300 dark:border-dark-600 rounded-full bg-white dark:bg-dark-800">
      <button
        type="button"
        class="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
        aria-label="Decrease quantity"
        @click="cartStore.decreaseQuantity(item.product.id)"
      >
        <Minus class="w-3.5 h-3.5" />
      </button>
      <span class="px-3 text-xs font-semibold text-stone-900 dark:text-stone-100">
        {{ item.quantity }}
      </span>
      <button
        type="button"
        class="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
        aria-label="Increase quantity"
        @click="cartStore.increaseQuantity(item.product.id)"
      >
        <Plus class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Line Total Desktop -->
    <div class="hidden sm:block text-right w-24">
      <span class="text-base font-bold text-stone-900 dark:text-stone-100">
        {{ lineTotal }}
      </span>
    </div>

    <!-- Remove Button -->
    <button
      type="button"
      class="p-2 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition rounded-full hover:bg-stone-100 dark:hover:bg-dark-700"
      aria-label="Remove item"
      @click="cartStore.removeItem(item.product.id)"
    >
      <Trash2 class="w-4 h-4" />
    </button>
  </div>
</template>
