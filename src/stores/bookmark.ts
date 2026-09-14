import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'
import { useToastStore } from './toast'

const BOOKMARK_STORAGE_KEY = 'novacart_bookmarks'

export const useBookmarkStore = defineStore('bookmark', () => {
  const bookmarks = ref<Product[]>([])
  const toastStore = useToastStore()

  const initBookmarks = (): void => {
    try {
      const stored = localStorage.getItem(BOOKMARK_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Product[]
        if (Array.isArray(parsed)) {
          bookmarks.value = parsed
        }
      }
    } catch {
      bookmarks.value = []
    }
  }

  const saveBookmarks = (): void => {
    try {
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks.value))
    } catch {
      // Storage quota or disabled
    }
  }

  const count = computed<number>(() => bookmarks.value.length)

  const isBookmarked = (productId: number): boolean => {
    return bookmarks.value.some((item) => item.id === productId)
  }

  const addBookmark = (product: Product): void => {
    if (!isBookmarked(product.id)) {
      bookmarks.value.push(product)
      saveBookmarks()
      toastStore.success(`Saved "${product.title}" to wishlist`)
    }
  }

  const removeBookmark = (productId: number): void => {
    const item = bookmarks.value.find((b) => b.id === productId)
    bookmarks.value = bookmarks.value.filter((b) => b.id !== productId)
    saveBookmarks()
    if (item) {
      toastStore.info(`Removed "${item.title}" from wishlist`)
    }
  }

  const toggleBookmark = (product: Product): void => {
    if (isBookmarked(product.id)) {
      removeBookmark(product.id)
    } else {
      addBookmark(product)
    }
  }

  const clearBookmarks = (): void => {
    bookmarks.value = []
    saveBookmarks()
    toastStore.info('Wishlist cleared')
  }

  // Initialize immediately
  initBookmarks()

  return {
    bookmarks,
    count,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearBookmarks,
    initBookmarks
  }
})
