<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import CartItem from '@/components/cart/CartItem.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import confetti from 'canvas-confetti'
import { ShoppingBag, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const toastStore = useToastStore()

const isCheckoutModalOpen = ref<boolean>(false)
const isOrderPlaced = ref<boolean>(false)
const isPlacingOrder = ref<boolean>(false)

// Simulated checkout form state
const checkoutForm = ref({
  name: 'Joanna Lynn',
  email: 'joanna@example.com',
  address: '12 St Bowling Road, Trenton West Valley',
  city: 'Akron',
  state: 'OH',
  zip: '44312',
  paymentMethod: 'credit-card'
})

const handleOpenCheckout = (): void => {
  isOrderPlaced.value = false
  isCheckoutModalOpen.value = true
}

const handleConfirmOrder = (): void => {
  isPlacingOrder.value = true

  setTimeout(() => {
    isPlacingOrder.value = false
    isOrderPlaced.value = true

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch {
      // Confetti fallback
    }

    toastStore.success('Your order has been placed successfully!')
    cartStore.clearCart()
  }, 1200)
}
</script>

<template>
  <div class="bg-stone-50 dark:bg-dark-900 transition-colors py-10 md:py-16 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb / Header -->
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
            Shopping Cart ({{ cartStore.itemCount }})
          </h1>
        </div>

        <button
          v-if="cartStore.items.length > 0"
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 transition"
          @click="cartStore.clearCart"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <!-- Empty Cart State -->
      <EmptyState
        v-if="cartStore.items.length === 0"
        title="Your Cart is Empty"
        description="Looks like you haven't added any luxury hair or beauty products to your cart yet. Explore our curated catalogue to find your perfect match."
        action-label="Explore Products"
        @action="router.push('/products')"
      >
        <template #icon>
          <ShoppingBag class="w-10 h-10" />
        </template>
      </EmptyState>

      <!-- Cart Content Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Left Column: Items List -->
        <div class="lg:col-span-8 bg-white dark:bg-dark-800 rounded-2xl p-6 border border-stone-200 dark:border-dark-700 shadow-sm">
          <div class="divide-y divide-stone-200 dark:divide-dark-700">
            <CartItem
              v-for="item in cartStore.items"
              :key="item.product.id"
              :item="item"
            />
          </div>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="lg:col-span-4 sticky top-28">
          <CartSummary @checkout="handleOpenCheckout" />
        </div>
      </div>
    </div>

    <!-- Simulated Checkout Modal -->
    <BaseModal
      :is-open="isCheckoutModalOpen"
      :title="isOrderPlaced ? 'Order Confirmed!' : 'Simulated Checkout'"
      max-width="md"
      @close="isCheckoutModalOpen = false"
    >
      <!-- Order Placed Success View -->
      <div v-if="isOrderPlaced" class="text-center py-6 space-y-4">
        <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="w-10 h-10" />
        </div>
        <h4 class="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Thank you for your order!
        </h4>
        <p class="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm mx-auto">
          Your simulated order <strong class="text-stone-900 dark:text-stone-100">#DIBU-{{ Math.floor(100000 + Math.random() * 900000) }}</strong> has been placed. A confirmation email has been dispatched to {{ checkoutForm.email }}.
        </p>
        <div class="pt-4">
          <button
            type="button"
            class="px-6 py-2.5 rounded-full bg-black text-white dark:bg-brand-500 dark:text-stone-950 text-xs font-bold uppercase tracking-wider"
            @click="isCheckoutModalOpen = false"
          >
            Done
          </button>
        </div>
      </div>

      <!-- Checkout Form View -->
      <form v-else class="space-y-4 text-xs" @submit.prevent="handleConfirmOrder">
        <div>
          <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
            Full Name
          </label>
          <input
            v-model="checkoutForm.name"
            type="text"
            required
            class="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
            Email Address
          </label>
          <input
            v-model="checkoutForm.email"
            type="email"
            required
            class="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
            Delivery Address
          </label>
          <input
            v-model="checkoutForm.address"
            type="text"
            required
            class="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">City</label>
            <input
              v-model="checkoutForm.city"
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">State</label>
            <input
              v-model="checkoutForm.state"
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">Zip Code</label>
            <input
              v-model="checkoutForm.zip"
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div class="pt-2">
          <label class="block font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">Payment Method</label>
          <div class="flex items-center gap-4 text-stone-600 dark:text-stone-300">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input v-model="checkoutForm.paymentMethod" type="radio" value="credit-card" />
              <span>Credit Card (Demo)</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input v-model="checkoutForm.paymentMethod" type="radio" value="apple-pay" />
              <span>Apple Pay (Demo)</span>
            </label>
          </div>
        </div>

        <div class="pt-4 border-t border-stone-200 dark:border-dark-700">
          <button
            type="submit"
            :disabled="isPlacingOrder"
            class="w-full py-3 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-brand-500 dark:text-stone-950 dark:hover:bg-brand-400 font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
          >
            <span>{{ isPlacingOrder ? 'Processing...' : `Pay $${cartStore.grandTotal.toFixed(2)}` }}</span>
          </button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>
