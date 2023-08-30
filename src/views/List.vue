<template>
  <section>
    <p v-for="character in characters" :key="character.id">
      {{ character.name }}
    </p>
  </section>
</template>

<script setup>
import { getCharacters } from '@/api/index'
import { ref, onMounted } from 'vue'

const characters = ref([])

/* Pagination variables */
const page = ref(1)
const itemsPerPage = ref(20)
const totalCharacters = ref(0)

onMounted(() => {
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
})
</script>
