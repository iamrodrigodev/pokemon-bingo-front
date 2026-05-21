<template>
  <div class="admin max-w-5xl mx-auto mt-8 px-4 w-full">
    <button class="w-full sm:w-auto px-8 py-3 text-2xl text-[#3c68ac] bg-[#f8cc46] border-4 border-[#3c68ac] rounded-lg uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors shadow-lg" @click="store?.call()">
      {{ lastCalled ? 'Next Pokemon' : 'Start Game' }}
    </button>

    <div class="box flex flex-col md:flex-row max-w-5xl mx-auto mt-8 md:justify-between items-start gap-8">
      <div class="next-up w-full md:w-2/3 text-4xl flex flex-col items-center">
        <div v-if="lastCalled" class="w-full flex flex-col items-center">
          <h1 class="capitalize m-0 font-bold text-slate-800 mb-4 text-center">
            {{ lastCalled.name }}
          </h1>
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${lastCalled.id}.svg`"
            :alt="lastCalled.name"
            class="h-[250px] sm:h-[375px] max-w-full object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <div class="running-list w-full md:w-1/3 h-[400px] md:h-[550px] overflow-auto bg-slate-100 rounded-lg shadow-inner flex flex-col">
        <div class="p-2 sticky top-0 bg-slate-100 border-b border-slate-200">
          <input
            type="text"
            v-model="search"
            placeholder="Search called Pokemon..."
            class="w-full p-3 text-base rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <ul class="m-0 p-4 list-none flex-grow">
          <li v-if="!filtered.length" class="text-slate-500 text-center mt-4">
            No pokemon called yet
          </li>
          <li
            v-for="pokemon in filtered"
            :key="pokemon.id"
            class="flex items-center mb-4 bg-white p-2 rounded shadow-sm"
          >
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
              :alt="pokemon.name"
              class="w-12 h-12 object-contain"
            />
            <span class="inline-block ml-4 capitalize font-semibold text-slate-700 text-lg">
              {{ pokemon.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { storeKey } from '@/store';
import type { Store, Pokemon } from '@/store';

const search = ref<string | null>(null);
const store = inject(storeKey) as Store;

const reversed = computed<Pokemon[]>(() => {
  if (!store) return [];
  const clone = [...store.state.calledPokemon];
  return clone.reverse();
});

const filtered = computed<Pokemon[]>(() => {
  if (!search.value) return reversed.value;
  return reversed.value.filter((pokemon) =>
    pokemon.name.includes(search.value?.toLowerCase() ?? '')
  );
});

const lastCalled = computed<Pokemon | null>(() => {
  if (!store) return null;
  const called = store.state.calledPokemon;
  if (!called || called.length === 0) return null;
  return called[called.length - 1];
});
</script>
