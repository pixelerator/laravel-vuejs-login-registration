<script setup>
    import { defineProps } from 'vue';
    defineProps({
        goToNextPage:Function,
        goToPreviousPage:Function,
        totalPages:Number,
        currentPage:Number

    });
</script>

<template>
      <!-- Pagination Controls -->
      <div class="pagination-controls text-center mt-8">
        <button 
          @click="goToPreviousPage" 
          :disabled="currentPage === 1" 
          class="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          @click="goToNextPage" 
          :disabled="currentPage === totalPages" 
          class="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
</template>

<style>
    
</style>