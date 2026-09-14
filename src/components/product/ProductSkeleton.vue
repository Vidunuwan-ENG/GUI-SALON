<template>
  <div
    class="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-dark-800 border border-stone-200 dark:border-dark-700 animate-pulse p-4 shadow-sm"
    role="status"
    aria-label="Loading product"
  >
    <!-- Image placeholder -->
    <div class="w-full aspect-square bg-stone-200 dark:bg-dark-700 rounded-lg mb-4"></div>

    <!-- Category tag -->
    <div class="h-3 w-1/4 bg-stone-200 dark:bg-dark-700 rounded mb-2"></div>

    <!-- Title -->
    <div class="h-4 w-3/4 bg-stone-200 dark:bg-dark-700 rounded mb-3"></div>

    <!-- Rating -->
    <div class="h-3 w-1/3 bg-stone-200 dark:bg-dark-700 rounded mb-4"></div>

    <!-- Price and button row -->
    <div class="mt-auto pt-2 flex items-center justify-between">
      <div class="h-5 w-16 bg-stone-200 dark:bg-dark-700 rounded"></div>
      <div class="h-8 w-24 bg-stone-200 dark:bg-dark-700 rounded-full"></div>
    </div>
  </div>
</template>
