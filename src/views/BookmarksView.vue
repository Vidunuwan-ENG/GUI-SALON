<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBookmarkStore } from '@/stores/bookmark'
import ProductGrid from '@/components/product/ProductGrid.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { Heart, Trash2, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const bookmarkStore = useBookmarkStore()
</script>

<template>
  <div class="bg-stone-50 dark:bg-dark-900 transition-colors py-10 md:py-16 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Bar -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 mb-2 transition"
            @click="router.push('/products')"
          >
            <ArrowLeft class="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <h1 class="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            My Wishlist ({{ bookmarkStore.count }})
          </h1>
        </div>

        <button
          v-if="bookmarkStore.count > 0"
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 transition"
          @click="bookmarkStore.clearBookmarks"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-if="bookmarkStore.count === 0"
        title="Your Wishlist is Empty"
        description="Save your favorite hair extensions, luxury styling tools, and beauty formulations here for easy ordering later."
        action-label="Browse Products"
        @action="router.push('/products')"
      >
        <template #icon>
          <Heart class="w-10 h-10 text-rose-400" />
        </template>
      </EmptyState>

      <!-- Bookmarked Products Grid -->
      <div v-else>
        <ProductGrid :products="bookmarkStore.bookmarks" />
      </div>
    </div>
  </div>
</template>
