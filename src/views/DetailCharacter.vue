<template>
  <article>
    <h1 class="text-h1">
      {{ character.name }}
    </h1>
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getCharacter } from '@/api/index'
import { ref, watch, onMounted } from 'vue'

const route = useRoute()

const character = ref({}) 

/* Watchers */
watch(() => route.params.id, () => fetchCharacter() )

/* Lifecycle hooks */
onMounted(() => {
  fetchCharacter()
})

/* Functions */
const fetchCharacter = () => {
  getCharacter(route.params.id)
    .then(res => { character.value = res })
    .catch(err => console.log(err))
}
</script>