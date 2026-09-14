import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'
import type { CartItem, CartSummary } from '@/types/cart'
import { useToastStore } from './toast'

const CART_STORAGE_KEY = 'novacart_cart_items'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const toastStore = useToastStore()

  // Initialize from localStorage
  const initCart = (): void => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        if (Array.isArray(parsed)) {
          items.value = parsed
        }
      }
    } catch {
      items.value = []
    }
  }

  // Save to localStorage
  const saveCart = (): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    } catch {
      // Storage quota or disabled
    }
  }

  // Getters
  const itemCount = computed<number>(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed<number>(() => {
    const raw = items.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
    return Math.round(raw * 100) / 100
  })

  const discountTotal = computed<number>(() => {
    const raw = items.value.reduce((total, item) => {
      const discount = item.product.discountPercentage || 0
      const originalPrice = item.product.price / (1 - discount / 100)
      const saving = (originalPrice - item.product.price) * item.quantity
      return total + (saving > 0 ? saving : 0)
    }, 0)
    return Math.round(raw * 100) / 100
  })

  const shipping = computed<number>(() => {
    if (items.value.length === 0) return 0
    // Free shipping on orders over $100
    return subtotal.value >= 100 ? 0 : 15
  })

  const tax = computed<number>(() => {
    return Math.round(subtotal.value * 0.08 * 100) / 100
  })

  const grandTotal = computed<number>(() => {
    return Math.round((subtotal.value + shipping.value + tax.value) * 100) / 100
  })

  const summary = computed<CartSummary>(() => ({
    itemCount: itemCount.value,
    subtotal: subtotal.value,
    discountTotal: discountTotal.value,
    shipping: shipping.value,
    tax: tax.value,
    grandTotal: grandTotal.value
  }))

  const isInCart = (productId: number): boolean => {
    return items.value.some((item) => item.product.id === productId)
  }

  const getItemQuantity = (productId: number): number => {
    const found = items.value.find((item) => item.product.id === productId)
    return found ? found.quantity : 0
  }

  // Actions
  const addItem = (product: Product, quantity: number = 1): void => {
    const existing = items.value.find((item) => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        product,
        quantity,
        addedAt: Date.now()
      })
    }
    saveCart()
    toastStore.success(`Added "${product.title}" to cart`)
  }

  const removeItem = (productId: number): void => {
    const item = items.value.find((i) => i.product.id === productId)
    items.value = items.value.filter((i) => i.product.id !== productId)
    saveCart()
    if (item) {
      toastStore.info(`Removed "${item.product.title}" from cart`)
    }
  }

  const updateQuantity = (productId: number, quantity: number): void => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      item.quantity = quantity
      saveCart()
    }
  }

  const increaseQuantity = (productId: number): void => {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      item.quantity += 1
      saveCart()
    }
  }

  const decreaseQuantity = (productId: number): void => {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1
        saveCart()
      } else {
        removeItem(productId)
      }
    }
  }

  const clearCart = (): void => {
    items.value = []
    saveCart()
    toastStore.info('Shopping cart cleared')
  }

  // Initialize immediately
  initCart()

  return {
    items,
    itemCount,
    subtotal,
    discountTotal,
    shipping,
    tax,
    grandTotal,
    summary,
    isInCart,
    getItemQuantity,
    addItem,
    removeItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    initCart
  }
})
