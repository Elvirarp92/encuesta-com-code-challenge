<template>
  <h1>Hola Mundo</h1>
</template>

<script setup>
import { getCharacters } from '@/api/index'
import { ref, onMounted } from 'vue'

const page = ref(1)
const itemsPerPage = ref(20)

onMounted(() => {
  const params = {
    page: page.value,
    itemsPerPage: itemsPerPage.value
  }

  getCharacters(params)
    .then(res => console.log(res))
    .catch(err => console.log(err))
})
</script>
