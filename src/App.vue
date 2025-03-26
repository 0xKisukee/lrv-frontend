<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>
