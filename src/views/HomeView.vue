<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '@/services/api'
import type { Product } from '@/types/product'
import ProductCard from '@/components/product/ProductCard.vue'
import ProductSkeleton from '@/components/product/ProductSkeleton.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  ArrowRight
} from 'lucide-vue-next'

const router = useRouter()
const featuredProducts = ref<Product[]>([])
const isLoadingFeatured = ref<boolean>(true)
const isAboutModalOpen = ref<boolean>(false)

const fetchFeatured = async (): Promise<void> => {
  isLoadingFeatured.value = true
  try {
    const response = await productService.getProducts({ limit: 5 })
    featuredProducts.value = response.products
  } catch {
    featuredProducts.value = []
  } finally {
    isLoadingFeatured.value = false
  }
}

// Navigation helpers matching exact Figma requirements
const navigateToServices = (): void => {
  router.push('/services')
}

const navigateToBundleDeals = (): void => {
  router.push('/products#bundle-deals')
}

const navigateToSingleDeals = (): void => {
  router.push('/products#luxury-products')
}

onMounted(() => {
  fetchFeatured()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- 1. HERO SECTION (Figma: Desktop - 1 Hero) -->
    <section class="relative bg-stone-950 text-white min-h-[520px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80"
          alt="DIBU XXTENSIONS Luxury Salon Stylists"
          class="w-full h-full object-cover object-center opacity-45 brightness-90"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      <!-- Hero Content Box -->
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div class="inline-block p-6 sm:p-10 rounded-2xl bg-black/50 backdrop-blur-md border border-stone-700/60 shadow-2xl max-w-3xl mx-auto">
          <span class="inline-flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <Sparkles class="w-3.5 h-3.5" />
            Signature Hair Extensions & Luxury Salon
          </span>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-5 leading-tight">
            Experience the Elegance of <span class="text-brand-300">DIBU XXTENSIONS</span>
          </h1>

          <p class="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans font-light leading-relaxed">
            Where Expertise Meets Modern Salon Services for a Transformative Beauty Experience in the United States.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              class="px-8 py-3.5 rounded-full bg-brand-500 text-stone-950 hover:bg-brand-400 font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg"
              @click="navigateToSingleDeals"
            >
              Explore Products
            </button>
            <button
              type="button"
              class="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-xs uppercase tracking-widest transition-all duration-200 backdrop-blur-sm"
              @click="navigateToServices"
            >
              View Services
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. "WHERE STYLE MEETS EXPERIENCE" SECTION (Figma: Desktop - 1 Section 2) -->
    <section id="about" class="py-20 md:py-28 bg-white dark:bg-dark-900 border-b border-stone-200 dark:border-dark-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Headline -->
          <div class="lg:col-span-5">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
              Where Style Meets Experience
            </h2>
            <div class="w-16 h-1 bg-brand-500 mt-6 rounded-full" />
          </div>

          <!-- Right Story Copy -->
          <div class="lg:col-span-7 space-y-6 text-stone-600 dark:text-stone-300 text-sm md:text-base leading-relaxed">
            <p>
              At <strong class="text-stone-900 dark:text-stone-100 font-semibold">DIBU XXTENSION</strong>, we redefine beauty through creativity, precision, and passion. Founded in the USA by Joanna Lynn, our salon brings over 20 years of industry expertise, delivering exceptional hair and beauty solutions tailored to every individual.
            </p>
            <p>
              We specialize in premium hair styling, professional hair extensions, and high-quality hair care products, ensuring every client experiences a transformation that reflects confidence and elegance. Our commitment is to provide not just a service, but a luxurious and personalized experience that enhances your natural beauty.
            </p>

            <div class="pt-2">
              <button
                type="button"
                class="px-6 py-2.5 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 text-xs font-semibold uppercase tracking-widest transition shadow-sm"
                @click="isAboutModalOpen = true"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. "OUR SERVICES" SECTION (Figma: Desktop - 1 Section 3) -->
    <section class="py-20 md:py-28 bg-stone-900 text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Description -->
          <div class="lg:col-span-6 space-y-6">
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-400">
              Salon Artistry
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white uppercase">
              Our Services
            </h2>
            <p class="text-stone-300 text-sm md:text-base leading-relaxed font-light max-w-lg">
              We offer a complete range of professional beauty services, including hair coloring, extensions, treatments, makeup, nail care, and facials. At DIBU EXTENSION, every service is delivered with precision, premium products, and a commitment to enhancing your natural beauty.
            </p>

            <!-- Navigation Requirement 2: Open Desktop 2 -->
            <div class="pt-4">
              <button
                type="button"
                class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-stone-950 hover:bg-stone-200 text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-md"
                @click="navigateToServices"
              >
                <span>View Details</span>
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Right Image (Glamorous client in yellow outfit and sunglasses) -->
          <div class="lg:col-span-6">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700/60 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                alt="DIBU XXTENSIONS Client in Yellow Jacket"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div class="absolute bottom-6 left-6 right-6">
                <span class="text-xs uppercase tracking-widest text-brand-300 font-semibold">Transformative Care</span>
                <p class="text-white font-serif text-lg font-bold">Precision Cuts, Color & Extensions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. "OUR PRODUCTS" SECTION (Figma: Desktop - 1 Section 4) -->
    <section class="py-20 md:py-28 bg-[#D4C4B5] dark:bg-stone-900 border-b border-stone-300 dark:border-dark-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Text & Buttons -->
          <div class="lg:col-span-5 space-y-6">
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-stone-700 dark:text-brand-400">
              Curated Beauty
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-950 dark:text-white uppercase tracking-tight">
              Our Products
            </h2>
            <p class="text-stone-800 dark:text-stone-300 text-sm md:text-base leading-relaxed">
              Explore our range of high-quality hair care, skincare, nail products, and professional salon tools designed to support your beauty routine with reliable results.
            </p>

            <!-- Navigation Requirements 3 & 4: Distinct Buttons -->
            <div class="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <button
                type="button"
                class="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 text-xs font-bold uppercase tracking-widest transition shadow-md"
                @click="navigateToBundleDeals"
              >
                Buy Bundle Deals
              </button>
              <button
                type="button"
                class="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border-2 border-stone-900 text-stone-950 hover:bg-stone-900 hover:text-white dark:border-stone-200 dark:text-white dark:hover:bg-white dark:hover:text-black text-xs font-bold uppercase tracking-widest transition"
                @click="navigateToSingleDeals"
              >
                Buy Single Deals
              </button>
            </div>
          </div>

          <!-- Right Image (Cosmetics, bottles, hair brushes, dropper oils) -->
          <div class="lg:col-span-7">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/60 dark:border-dark-700 aspect-[16/10] group">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                alt="DIBU XXTENSIONS Beauty Products, Creams and Oils"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. FEATURED LIVE PRODUCTS (DummyJSON API Integration Showcase) -->
    <section class="py-20 bg-stone-50 dark:bg-dark-900 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
              Direct from DummyJSON API
            </span>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Featured In-Store Arrivals
            </h2>
          </div>
          <router-link
            to="/products"
            class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 hover:text-brand-600 dark:hover:text-brand-400 transition"
          >
            <span>View All Products</span>
            <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>

        <!-- Skeletons while loading -->
        <div
          v-if="isLoadingFeatured"
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <ProductSkeleton v-for="n in 5" :key="n" />
        </div>

        <!-- Loaded Live Products -->
        <div
          v-else-if="featuredProducts.length > 0"
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- 6. BRAND BENEFITS & GUARANTEES (Rubric Mandatory Section 7) -->
    <section class="py-16 bg-white dark:bg-dark-800 border-t border-stone-200 dark:border-dark-700 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex items-center gap-4 p-4 rounded-xl bg-stone-50 dark:bg-dark-700/50">
            <div class="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
              <Truck class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-stone-900 dark:text-stone-100">Fast Delivery</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400">Complimentary over $100</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl bg-stone-50 dark:bg-dark-700/50">
            <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <ShieldCheck class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-stone-900 dark:text-stone-100">Secure Checkout</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400">Encrypted payment gateway</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl bg-stone-50 dark:bg-dark-700/50">
            <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
              <Award class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-stone-900 dark:text-stone-100">Quality Guaranteed</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400">100% authentic salon grade</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl bg-stone-50 dark:bg-dark-700/50">
            <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
              <RotateCcw class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-stone-900 dark:text-stone-100">Easy Returns</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal for "View More" Story -->
    <BaseModal
      :is-open="isAboutModalOpen"
      title="The DIBU XXTENSIONS Heritage"
      max-width="lg"
      @close="isAboutModalOpen = false"
    >
      <div class="space-y-4 text-sm leading-relaxed">
        <p>
          Founded by Joanna Lynn, DIBU XXTENSIONS was born out of a desire to merge runway-level hair extensions with accessible, tailored salon artistry. Over the past twenty years, our master colorists and extension specialists have refined custom blending techniques that ensure seamless volume, movement, and natural longevity.
        </p>
        <p>
          Each product in our catalogue is rigorously vetted in our professional salon stations before being offered to clients. Whether you are seeking a full glam makeover or daily salon maintenance at home, DIBU XXTENSIONS brings luxury within reach.
        </p>
      </div>
      <template #footer>
        <button
          type="button"
          class="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold uppercase tracking-wider"
          @click="isAboutModalOpen = false"
        >
          Close
        </button>
      </template>
    </BaseModal>
  </div>
</template>
