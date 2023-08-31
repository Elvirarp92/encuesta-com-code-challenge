<template>
  <div>
    <v-progress-linear v-if="charactersAreLoading" indeterminate></v-progress-linear>
    <section class="card-grid ma-8">
      <div
        v-for="character in characters"
        :key="character.id" 
        class="card-grid__element"
      >
        <list-character-card
        :name="character.name"
        :img="`${character.thumbnail.path}.${character.thumbnail.extension}`"
        :to="{
          name: 'Character',
          params: {
            id: character.id
          }
        }"
        />
      </div>
    </section>
    <v-pagination v-model="page" :length="pageNumber" total-visible="9" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
import ListCharacterCard from '@/components/ListCharacterCard.vue';
import { useCharactersStore } from '@/store/characters'

const store = useCharactersStore()
const { characters, page, charactersAreLoading, pageNumber } = storeToRefs(store)
const { fetchCharacters } = store

/* Watchers */
watch(page, () => {
  fetchCharacters()
})

/* Lifecycle hooks */
onMounted(() => {
  fetchCharacters()
})

</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 1rem;
}

.card-grid__element {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
