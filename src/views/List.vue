<template>
  <div>
    <section class="card-grid">
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
watch(page, () => {
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

<style scoped>
.card-grid {
  margin: 2rem;
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
