<script setup>
import { useMangaStore } from '@/stores/mangaStore'; // Import the store
import MangaCard from '@/components/MangaCard.vue'; // Import the MangaCard component
import { ref, onMounted, watch,defineProps } from 'vue';
import Pagination from './Pagination.vue';

// Access the store
const  props  = defineProps({
  totalItem:Number,
  pagination:Boolean
});
const mangaStore = useMangaStore();
const { fetchMangas } = mangaStore;
const isAllMangaLoaded = ref(false);

// Pagination state
const currentPage = ref(1); // Start from page 1
const totalPages = ref(1); // Total number of pages (this will be updated after fetching mangas)

// Fetch mangas for the current page
const loadMangas = async (page = 1) => {
  isAllMangaLoaded.value = false; // Set loading state
  await fetchMangas(page, props.totalItem);
  isAllMangaLoaded.value = true;
};

// Fetch mangas when the component is mounted
onMounted(() => {
  loadMangas(currentPage.value);
});

// Watch the 'mangas' state for changes to update totalPages and currentPage
watch(
  () => mangaStore.mangas, // The property to watch
  (newMangas) => {
    totalPages.value = newMangas.totalPages; // Assume API response includes total pages
    currentPage.value = newMangas.currentPage; // Assume API response includes current page
  }
);

// Handle moving to the next page
const goToNextPage = () => {
  console.log("Go to next");
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadMangas(currentPage.value);
  }
};

// Handle moving to the previous page
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadMangas(currentPage.value);
  }
};
</script>

<template>
  <section class="py-12 bg-gray-100" v-if="isAllMangaLoaded">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-8 text-center text-gray-900">Popular Mangas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <!-- Loop through manga items and display MangaCard component -->
        <MangaCard v-for="manga in mangaStore.mangas.data" :key="manga.id" :manga="manga" size="small" />
      </div>
      <Pagination :goToNextPage="goToNextPage" :goToPreviousPage="goToPreviousPage" :totalPages="totalPages" :currentPage="currentPage" v-if="props.pagination"/>
    </div>
  </section>

  <!-- Loading Spinner -->
  <div class="flex justify-center items-center h-screen" v-else>
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-50"></div>
  </div>
</template>

<style scoped>
/* Custom styles for the parent component can go here */
.pagination-controls button {
  margin: 0 10px;
  padding: 5px 15px;
  font-size: 1.2rem;
}
</style>
