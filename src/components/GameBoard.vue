<template>
  <div class="box w-full max-w-3xl mx-auto mt-4 p-2 sm:p-4 inline-block">
    <div
      class="grid grid-cols-4 gap-2 sm:gap-4 place-items-center"
      :style="`grid-template-columns: repeat(${dimensions[1]}, minmax(0, 1fr))`"
    >
      <game-cell
        v-for="n in dimensions[0] * dimensions[1]"
        :key="n"
        :index="n"
        :n="n"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import GameCell from '@/components/GameCell.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

// dimensions[0] = rows, dimensions[1] = cols
const dimensions: Ref<[number, number]> = ref([4, 4]);
</script>
