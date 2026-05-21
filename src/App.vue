<template>
  <div id="app" class="text-center text-slate-800 antialiased font-sans flex flex-col min-h-screen">
    <div id="nav" class="p-8">
      <h1 class="flex items-end justify-center text-5xl m-0">
        <img src="/pokemon-logo.png" alt="Pokemon Logo" class="w-[200px] mr-3" />
        <span class="font-bold">Bingo</span>
      </h1>
    </div>
    <div class="page-wrapper flex-grow p-4 flex flex-col items-center">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, inject } from 'vue';
import { storeKey, type Store } from './store';

const store = inject(storeKey) as Store;

onMounted(() => {
  store?.init();
});
</script>


