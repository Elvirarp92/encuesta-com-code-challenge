<template>
  <section>
    <list-character-card
      v-for="character in characters"
      :key="character.id" 
      :name="character.name"
      :img="`${character.thumbnail.path}.${character.thumbnail.extension}`"
    />
    <v-pagination v-model="page" :length="pageNumber" total-visible="9" />
  </section>
</template>

<script setup>
import { getCharacters } from '@/api/index'
import { ref, computed, watch, onMounted } from 'vue'
import ListCharacterCard from '@/components/ListCharacterCard.vue';

const characters = ref([])

/* Pagination variables */
const page = ref(1)
const itemsPerPage = ref(20)
const totalCharacters = ref(0)
const pageNumber = computed(() => Math.ceil(totalCharacters.value / itemsPerPage.value))

/* Watchers */
watch(page, newPage => {
  fetchCharacters()
})

/* Lifecycle hooks */
onMounted(() => {
  fetchCharacters()
})

/* Functions */
const fetchCharacters = () => {
  const params = {
    page: page.value,
    itemsPerPage: itemsPerPage.value
  }

  getCharacters(params)
    .then(res => {
      characters.value = res.results
      totalCharacters.value = res.total
    })
    .catch(err => console.log(err))
}
</script>
