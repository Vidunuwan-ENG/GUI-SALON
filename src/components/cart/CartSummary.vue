<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BaseButton from '@/components/common/BaseButton.vue'
import { ShieldCheck, Truck, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()

const emit = defineEmits<{
  (e: 'checkout'): void
}>()

const subtotalFormatted = computed<string>(() => `$${cartStore.subtotal.toFixed(2)}`)
const shippingFormatted = computed<string>(() =>
  cartStore.shipping === 0 ? 'FREE' : `$${cartStore.shipping.toFixed(2)}`
)
const taxFormatted = computed<string>(() => `$${cartStore.tax.toFixed(2)}`)
const grandTotalFormatted = computed<string>(() => `$${cartStore.grandTotal.toFixed(2)}`)
const discountFormatted = computed<string>(() => `$${cartStore.discountTotal.toFixed(2)}`)
</script>

<template>
  <div class="rounded-2xl bg-white dark:bg-dark-800 border border-stone-200 dark:border-dark-700 p-6 shadow-sm">
    <h3 class="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-5">
      Order Summary
    </h3>

    <div class="space-y-3 text-sm border-b border-stone-200 dark:border-dark-700 pb-5 mb-5">
      <div class="flex justify-between text-stone-600 dark:text-stone-400">
        <span>Items Subtotal ({{ cartStore.itemCount }})</span>
        <span class="font-medium text-stone-900 dark:text-stone-100">{{ subtotalFormatted }}</span>
      </div>

      <div
        v-if="cartStore.discountTotal > 0"
        class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium"
      >
        <span>Promotional Savings</span>
        <span>-{{ discountFormatted }}</span>
      </div>

      <div class="flex justify-between text-stone-600 dark:text-stone-400">
        <span class="flex items-center gap-1.5">
          <Truck class="w-3.5 h-3.5" />
          Standard Shipping
        </span>
        <span class="font-medium text-stone-900 dark:text-stone-100">
          {{ shippingFormatted }}
        </span>
      </div>

      <div class="flex justify-between text-stone-600 dark:text-stone-400">
        <span>Estimated Tax (8%)</span>
        <span class="font-medium text-stone-900 dark:text-stone-100">{{ taxFormatted }}</span>
      </div>
    </div>

    <!-- Grand Total -->
    <div class="flex justify-between items-baseline mb-6">
      <span class="text-base font-bold text-stone-900 dark:text-stone-100">Total</span>
      <div class="text-right">
        <span class="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
          {{ grandTotalFormatted }}
        </span>
        <p class="text-[11px] text-stone-400">USD, taxes & shipping included</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="space-y-3">
      <BaseButton
        variant="primary"
        size="lg"
        full-width
        :disabled="cartStore.items.length === 0"
        @click="emit('checkout')"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight class="w-4 h-4 ml-2" />
      </BaseButton>

      <button
        type="button"
        class="w-full text-center text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 py-2 transition"
        @click="router.push('/products')"
      >
        Continue Shopping
      </button>
    </div>

    <!-- Guarantee Badges -->
    <div class="mt-6 pt-5 border-t border-stone-100 dark:border-dark-700 flex items-center justify-center gap-4 text-xs text-stone-500 dark:text-stone-400">
      <div class="flex items-center gap-1">
        <ShieldCheck class="w-4 h-4 text-emerald-500" />
        <span>Secure 256-Bit SSL</span>
      </div>
      <div class="flex items-center gap-1">
        <Truck class="w-4 h-4 text-brand-500" />
        <span>Free Over $100</span>
      </div>
    </div>
  </div>
</template>
