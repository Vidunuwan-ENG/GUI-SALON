<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import { Sparkles, Home } from 'lucide-vue-next'

const router = useRouter()
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4 bg-stone-50 dark:bg-dark-900 transition-colors">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="relative inline-block">
        <span class="text-8xl sm:text-9xl font-serif font-bold text-stone-300 dark:text-dark-700 select-none">
          404
        </span>
        <div class="absolute inset-0 flex items-center justify-center">
          <Sparkles class="w-12 h-12 text-brand-500 animate-pulse" />
        </div>
      </div>

      <div class="space-y-2">
        <h1 class="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Page Not Found
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          The luxury salon service or product page you were looking for doesn't exist or has moved.
        </p>
      </div>

      <div class="pt-4 flex items-center justify-center gap-4">
        <BaseButton variant="primary" size="md" @click="router.push('/')">
          <Home class="w-4 h-4 mr-2" />
          <span>Return Home</span>
        </BaseButton>
        <BaseButton variant="outline" size="md" @click="router.push('/products')">
          Browse Products
        </BaseButton>
      </div>
    </div>
  </div>
</template>
