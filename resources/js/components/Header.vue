<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/UserStore';
const UserStore = useUserStore();
</script>

<template>
  <!-- Header with clean and simple design -->
  <header class="p-4 bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo or Site Name -->
      <h1 class="text-2xl font-bold text-gray-800">MangaVanga</h1>
      
      <!-- Navigation Menu -->
      <nav class="flex items-center space-x-4">
        <ul class="flex space-x-6">
          <li><router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link></li>
          <li><router-link to="/contact" class="text-gray-700 hover:text-blue-600">Contact</router-link></li>
          <li><router-link to="/about" class="text-gray-700 hover:text-blue-600">About</router-link></li>

          <!-- Show Login and Register when not logged in -->
          <li v-if="!UserStore.getUser.id">
            <router-link to="/login" class="text-gray-700 hover:text-blue-600">Login</router-link>
          </li>
          <li v-if="!UserStore.getUser.id">
            <router-link to="/register" class="text-gray-700 hover:text-blue-600">Register</router-link>
          </li>

          <!-- Show Profile dropdown when logged in -->
          <li v-if="UserStore.getUser.id" class="relative group">
            <button class="text-gray-700 hover:text-blue-600 flex items-center focus:outline-none">
              <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid" alt="Avatar" class="w-8 h-8 rounded-full mr-2"/>
              <span>{{ UserStore.getUser.name }}</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown content -->
            <ul class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 ease-in-out opacity-0 focus-within:visible focus-within:opacity-100">
              <li>
                <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</router-link>
              </li>
              <li>
                <router-link to="/settings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</router-link>
              </li>
              <li>
                <a href="#" @click="UserStore.logout()" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Adjust padding and space between items */
ul {
  padding: 0;
}

li {
  list-style-type: none;
}

header {
  border-bottom: 1px solid #e5e7eb;
}

/* Dropdown menu */
.relative:hover ul,
.group:hover ul,
.group:focus-within ul {
  display: block;
  visibility: visible;
  opacity: 1;
}

/* Hide dropdown by default */
.group ul {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

nav ul li a {
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #2563eb;
}

button:focus {
  outline: none;
}

/* Dropdown item hover */
ul li a:hover {
  background-color: #f3f4f6;
}
</style>
