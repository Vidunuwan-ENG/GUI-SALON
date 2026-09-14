<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useToastStore } from '@/stores/toast'
import { CheckCircle2, Clock, DollarSign, Calendar, Sparkles } from 'lucide-vue-next'

const toastStore = useToastStore()

interface ServiceModalData {
  title: string
  subtitle: string
  price: string
  duration: string
  features: string[]
  description: string
}

const activeService = ref<ServiceModalData | null>(null)
const isModalOpen = ref<boolean>(false)
const bookingSuccess = ref<boolean>(false)

const openServiceModal = (service: ServiceModalData): void => {
  activeService.value = service
  bookingSuccess.value = false
  isModalOpen.value = true
}

const makeupService: ServiceModalData = {
  title: 'Editorial & Event Makeup Artistry',
  subtitle: 'Flawless, high-definition makeup tailored to your skin tone',
  price: '$120 - $250',
  duration: '60 - 90 mins',
  features: [
    'Skin prep & luxury hydration priming',
    'Custom false lash application',
    'Airbrush or satin HD foundation finish',
    'Contour, highlight & 16-hour setting veil'
  ],
  description:
    'Our professional makeup artists use hypoallergenic, ultra-pigmented luxury cosmetics to craft a radiant, camera-ready aesthetic for galas, weddings, photography, and special events.'
}

const hairService: ServiceModalData = {
  title: 'Hair Coloring & Seamless Extensions',
  subtitle: 'Custom hand-tied wefts, balayage, and restorative gloss',
  price: '$250 - $650',
  duration: '120 - 240 mins',
  features: [
    '100% Remy human hair extension matching',
    'Custom balayage, foilyage or root melt',
    'Bond-building Olaplex conditioning infusion',
    'Precision blending cut & signature blowout'
  ],
  description:
    'Experience our premier salon service. Our certified specialists custom blend colors and hand-install micro-beaded or tape-in extensions to deliver undetectable volume, length, and dimensional shine.'
}

const nailService: ServiceModalData = {
  title: 'Luxury Nail Care & Spa Manicure',
  subtitle: 'Nourishing cuticle restoration and gel artistry',
  price: '$65 - $140',
  duration: '45 - 75 mins',
  features: [
    'Botanical hand scrub & warm paraffin mask',
    'Precision cuticle trimming & nail shaping',
    'Long-wear LED gel polish or structured builder gel',
    'Hand and forearm massage with organic essential oils'
  ],
  description:
    'Pamper your hands with our signature spa manicure. We focus on natural nail health, sanitary precision, and bespoke minimalist or luxury nail art.'
}

const handleSimulatedBooking = (): void => {
  bookingSuccess.value = true
  toastStore.success(`Consultation booked for ${activeService.value?.title || 'Service'}!`)
  setTimeout(() => {
    isModalOpen.value = false
  }, 1500)
}
</script>

<template>
  <div class="bg-white dark:bg-dark-900 transition-colors py-12 md:py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto space-y-3">
        <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">
          Professional Salon Artistry
        </span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight">
          Our Services
        </h1>
        <p class="text-sm text-stone-500 dark:text-stone-400">
          Tailored hair transformations, editorial makeup, and meticulous spa care crafted with 20+ years of American salon excellence.
        </p>
      </div>

      <!-- 1. MAKEUP SECTION (Figma: Desktop - 2 Section 1) -->
      <section class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <!-- Left Content -->
        <div class="md:col-span-7 space-y-5">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#4A1235] dark:text-rose-300 uppercase tracking-wide">
            Makeup
          </h2>
          <p class="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Enhance your natural beauty with our professional makeup services, perfect for any occasion. Whether it's a subtle everyday look or a glamorous transformation, we use high-end products and expert techniques to create a flawless and long-lasting finish.
          </p>
          <div class="pt-2">
            <button
              type="button"
              class="px-6 py-2.5 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 text-xs font-semibold uppercase tracking-widest transition shadow-sm"
              @click="openServiceModal(makeupService)"
            >
              More Details
            </button>
          </div>
        </div>

        <!-- Right Photo (Editorial model in red hat) -->
        <div class="md:col-span-5">
          <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group border border-stone-200 dark:border-dark-700">
            <img
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
              alt="DIBU Makeup Artistry"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      <!-- 2. HAIR COLORING & HAIR EXTENSIONS SECTION (Figma: Desktop - 2 Section 2) -->
      <section class="bg-stone-100 dark:bg-dark-800 rounded-3xl p-6 sm:p-10 md:p-12 border border-stone-200 dark:border-dark-700">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <!-- Left Content -->
          <div class="md:col-span-6 space-y-5">
            <h2 class="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide leading-tight">
              Hair Coloring &<br />Hair Extensions
            </h2>
            <p class="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Enhance your hair with our expert coloring, extensions, and treatment services, designed to transform your look and maintain healthy, beautiful hair. Using high-quality products and advanced techniques, we create vibrant colors, seamless volume, and deeply nourished results for a flawless and long-lasting finish.
            </p>
            <div class="pt-2">
              <button
                type="button"
                class="px-6 py-2.5 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 text-xs font-semibold uppercase tracking-widest transition shadow-sm"
                @click="openServiceModal(hairService)"
              >
                More Details
              </button>
            </div>
          </div>

          <!-- Right 3-Photo Collage -->
          <div class="md:col-span-6 grid grid-cols-3 gap-3">
            <div class="rounded-xl overflow-hidden shadow-md aspect-[3/4] border border-stone-300 dark:border-dark-600">
              <img
                src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80"
                alt="Hair Extensions Volume"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="rounded-xl overflow-hidden shadow-md aspect-[3/4] border border-stone-300 dark:border-dark-600">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80"
                alt="Salon Hair Wash & Treatment"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="rounded-xl overflow-hidden shadow-md aspect-[3/4] border border-stone-300 dark:border-dark-600">
              <img
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80"
                alt="Custom Balayage & Styling"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 3. NAIL CARE SECTION (Figma: Desktop - 2 Section 3) -->
      <section class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <!-- Left Content -->
        <div class="md:col-span-7 space-y-5">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#4A1235] dark:text-rose-300 uppercase tracking-wide">
            Nail Care
          </h2>
          <p class="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Enhance your natural beauty with our professional nail care services, perfect for any occasion. Whether it's a subtle everyday manicure or a glamorous acrylic set, we use high-end products and expert techniques to create a flawless and long-lasting finish.
          </p>
          <div class="pt-2">
            <button
              type="button"
              class="px-6 py-2.5 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 text-xs font-semibold uppercase tracking-widest transition shadow-sm"
              @click="openServiceModal(nailService)"
            >
              More Details
            </button>
          </div>
        </div>

        <!-- Right Photo (Manicurist working on nails) -->
        <div class="md:col-span-5">
          <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group border border-stone-200 dark:border-dark-700">
            <img
              src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
              alt="DIBU Nail Care & Spa Manicure"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Interactive Service Details Modal -->
    <BaseModal
      :is-open="isModalOpen"
      :title="activeService?.title || 'Service Details'"
      max-width="lg"
      @close="isModalOpen = false"
    >
      <div v-if="activeService" class="space-y-5 text-sm">
        <p class="text-stone-600 dark:text-stone-300 leading-relaxed">
          {{ activeService.description }}
        </p>

        <!-- Service Specs -->
        <div class="grid grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 dark:bg-dark-700/60 border border-stone-200 dark:border-dark-600">
          <div class="flex items-center gap-2">
            <DollarSign class="w-4 h-4 text-emerald-500" />
            <div>
              <span class="text-[10px] uppercase text-stone-400 font-semibold block">Estimated Price</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">{{ activeService.price }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4 text-brand-500" />
            <div>
              <span class="text-[10px] uppercase text-stone-400 font-semibold block">Duration</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">{{ activeService.duration }}</span>
            </div>
          </div>
        </div>

        <!-- Included Highlights -->
        <div>
          <h4 class="font-semibold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-2">
            Included in this treatment:
          </h4>
          <ul class="space-y-1.5">
            <li
              v-for="(feature, idx) in activeService.features"
              :key="idx"
              class="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300"
            >
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Simulated Booking Action -->
        <div class="pt-3 border-t border-stone-200 dark:border-dark-700">
          <div v-if="bookingSuccess" class="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-center font-medium text-xs flex items-center justify-center gap-2">
            <Sparkles class="w-4 h-4" />
            Consultation scheduled! Our concierge will contact you.
          </div>
          <button
            v-else
            type="button"
            class="w-full py-3 rounded-full bg-black text-white hover:bg-stone-800 dark:bg-brand-500 dark:text-stone-950 dark:hover:bg-brand-400 font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
            @click="handleSimulatedBooking"
          >
            <Calendar class="w-4 h-4" />
            Request Consultation Appointment
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
