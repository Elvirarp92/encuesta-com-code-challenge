<template>
  <v-app-bar color="primary">
    <v-app-bar-title>
      <router-link class="text-white text-decoration-none" :to="{name: 'Home'}">
        Marvel Frontend Challenge
      </router-link>
    </v-app-bar-title>
    <template #append>
      <v-btn icon="mdi-magnify" @click="toggleSearchMenu" />
    </template>
    <template #extension v-if="searchMenuIsShowing">
      <v-container fluid>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="searchName"
              density="comfortable"
              prepend-inner-icon="mdi-magnify"
              label="Search heroes by name"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCharactersStore } from '@/store/characters'

const store = useCharactersStore()
const { searchName } = storeToRefs(store)
const { fetchCharacters } = store

const searchMenuIsShowing = ref(false)

watch(searchName, () => { fetchCharacters() })

/* Functions */
const toggleSearchMenu = () => {
  searchMenuIsShowing.value = !searchMenuIsShowing.value
}
</script>