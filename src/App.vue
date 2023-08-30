<template>
  <router-view />
</template>

<script setup>
import { getCharacters } from '@/api/index'
import { onMounted } from 'vue'

onMounted(() => {
  getCharacters()
    .then(res => console.log(res))
    .catch(err => console.log(err))
})
</script>
