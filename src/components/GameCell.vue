<template>
  <div
    class="flex flex-col items-center justify-center cursor-pointer rounded-lg p-2 sm:p-4 w-full aspect-square bg-slate-100 transition-colors duration-200"
    :class="isSelected ? '!bg-[#73b7ff] shadow-inner' : 'hover:bg-slate-200 shadow'"
    @click="store?.toggleCell(index)"
  >
    <img
      v-if="pokemon"
      :src="imgUrl"
      class="max-w-[70%] max-h-[70%] object-contain mx-auto"
      :alt="pokemon.name"
    />
    <div v-if="pokemon" class="w-full mt-2 capitalize text-xs sm:text-base font-medium text-slate-700">
      {{ pokemon.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { storeKey } from '@/store';
import type { Store, Pokemon } from '@/store';

const props = defineProps<{
  index: number;
  n: number;
}>();

const store = inject(storeKey) as Store;

const pokemon = computed<Pokemon | null>(() => {
  if (!store?.state.shuffledPokemon) return null;
  return store.state.shuffledPokemon[props.index];
});

const imgUrl = computed<string>(() => {
  if (!pokemon.value) return '';
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.value.id}.svg`;
});

const isSelected = computed<boolean>(() => {
  return store?.state.selected.includes(props.index) ?? false;
});
</script>
