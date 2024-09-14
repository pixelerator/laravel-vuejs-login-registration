<script setup>
    
</script>

<template>
   <!-- Enhanced Featured Manga Section -->
<section class="py-8" style="background-color: var(--secondary-bg-color);">
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8" style="color: var(--title-color);">Featured Manga</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <!-- Manga Card 1 -->
      <div class="rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300" style="background-color: var(--manga-bg-color); box-shadow: 0 4px 6px var(--shadow-color);">
        <img src="https://via.placeholder.com/400x300" alt="Manga 1" class="w-full h-56 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold" style="color: var(--title-color);">Manga Title 1</h3>
          <p class="text-sm" style="color: var(--text-dark-color);">Brief description or genre tags.</p>
        </div>
      </div>
      <!-- Manga Card 2 -->
      <div class="rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300" style="background-color: var(--manga-bg-color); box-shadow: 0 4px 6px var(--shadow-color);">
        <img src="https://via.placeholder.com/400x300" alt="Manga 2" class="w-full h-56 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold" style="color: var(--title-color);">Manga Title 2</h3>
          <p class="text-sm" style="color: var(--text-dark-color);">Brief description or genre tags.</p>
        </div>
      </div>
      <!-- More Manga Cards... -->
    </div>
  </div>
</section>
</template>

<style>
    
</style>