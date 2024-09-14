<template>
    <a :href="`/manga/${manga.id}`" class="block group">
      <div :class="['manga-card', cardSizeClasses]">
        <!-- Manga Thumbnail -->
        <div class="relative overflow-hidden rounded-lg">
          <img :src="manga.thumb" alt="Manga thumbnail" :class="thumbnailSizeClasses" class="object-cover w-full transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          
          <!-- Status Badge on Image -->
          <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {{ manga.status }}
          </span>
  
          <!-- Favorite & Add to List Icons -->
          <div class="absolute top-2 right-2 flex space-x-3">
            <!-- Favorite Button -->
            <button @click.prevent="toggleFavorite" class="focus:outline-none">
              <HeartIcon :class="{'text-red-500': isFavorite, 'text-white': !isFavorite}" class="h-6 w-6 hover:text-red-500 transition" />
            </button>
  
            <!-- Add to List Button -->
            <button @click.prevent="addToList" class="focus:outline-none">
              <ClipboardDocumentListIcon class="h-6 w-6 text-white hover:text-blue-400 transition" />
            </button>
          </div>
        </div>
  
        <div :class="paddingSizeClasses" class="bg-white rounded-b-lg p-4">
          <!-- Title -->
          <h3 :class="titleSizeClasses" class="font-bold text-gray-900 truncate">{{ manga.title }}</h3>
  
          <!-- Subtitle (if available) -->
          <p v-if="manga.sub_title" class="text-sm text-gray-600 italic mb-2 truncate">{{ manga.sub_title }}</p>
  
          <!-- Manga Genres -->
          <div class="mb-4">
            <span v-for="genre in manga.genres" :key="genre" class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-2 py-1 mr-1 mb-1">{{ genre }}</span>
          </div>
  
          <!-- Additional Info -->
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500">Chapters: {{ manga.total_chapter }}</span>
          </div>
        </div>
      </div>
    </a>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { HeartIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'; // Correct v2 imports
  
  const props = defineProps({
    manga: Object,
    size: {
      type: String,
      default: 'medium', // Default size is 'medium'
    },
  });
  
  // Adjust styles dynamically based on size prop
  const cardSizeClasses = computed(() => {
    switch (props.size) {
      case 'small':
        return 'h-auto w-full sm:w-64'; // Full width on mobile, 64 units on small screens
      case 'large':
        return 'h-auto w-full sm:w-96'; // Full width on mobile, 96 units on small screens
      default:
        return 'h-auto w-full sm:w-72'; // Full width on mobile, 72 units on small screens
    }
  });
  
  const thumbnailSizeClasses = computed(() => {
    switch (props.size) {
      case 'small':
        return 'h-36'; // 9rem height for small
      case 'large':
        return 'h-72'; // 18rem height for large
      default:
        return 'h-56'; // 14rem height for medium
    }
  });
  
  const paddingSizeClasses = computed(() => {
    switch (props.size) {
      case 'small':
        return 'p-4'; // Smaller padding for small cards
      case 'large':
        return 'p-8'; // Larger padding for large cards
      default:
        return 'p-6'; // Default padding for medium cards
    }
  });
  
  const titleSizeClasses = computed(() => {
    switch (props.size) {
      case 'small':
        return 'text-lg'; // Smaller font size for small cards
      case 'large':
        return 'text-3xl'; // Larger font size for large cards
      default:
        return 'text-2xl'; // Default font size for medium cards
    }
  });
  
  // Favorite and Add to List logic
  const isFavorite = ref(false);
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
  };
  
  const addToList = () => {
    alert("Added to your list!");
  };
  </script>
  
  <style scoped>
  .manga-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 0.75rem; /* Rounded corners */
    background-color: #ffffff; /* Ensure a clean white background */
  }
  
  .manga-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* Softer shadow for hover */
  }
  
  /* Image hover effect */
  img:hover {
    transform: scale(1.05);
  }
  
  svg {
    color: white; /* Ensures that the icons are visible */
  }
  
  /* Clamp text for summary */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  </style>
  