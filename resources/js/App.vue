<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


    
</script>

<template>
    <div class="flex flex-col min-h-screen">

    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
    </div>
    
</template>

<style>
    
</style>