<template>
  <v-container tag="article" class="ma-8">
    <v-row>
      <v-col cols="12" md="4">
        <v-img height="350px" :src="thumbnail" />
      </v-col>
      <v-col>
        <h1 class="text-h1">
          {{ name }}
        </h1>
        <p>{{ description }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getCharacter } from '@/api/index'
import { ref, computed, watch, onMounted } from 'vue'

const route = useRoute()

/* Character variables */
const character = ref({})
const name = computed(() => character.value.name)
const thumbnail = computed(() => `${character.value.thumbnail?.path}.${character.value.thumbnail?.extension}`)
const description = computed(() => character.value.description)

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