<template>
  <v-app-bar color="primary">
    <v-app-bar-title>
      <router-link class="text-white text-decoration-none" :to="{name: 'Home'}">
        Marvel Frontend Challenge
      </router-link>
    </v-app-bar-title>
    <template #append>
        <v-btn icon="mdi-magnify" @click="toggleSearchMenu" />
        <v-btn 
          :icon="theme.global.name.value === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'" 
          @click="toggleTheme"
        />
    </template>
    <template #extension v-if="searchMenuIsShowing">
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-debounce="fetchCharacters"
              v-model="name"
              density="comfortable"
              prepend-inner-icon="mdi-magnify"
              label="Search heroes by name"
              :loading="charactersAreLoading"
            />
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              return-object
              clearable
              v-model="series"
              v-model:search="seriesSearch"
              prepend-inner-icon="mdi-filter"
              item-title="title"
              item-value="id"
              density="comfortable"
              label="Series"
              :loading="seriesAreLoading"
              :items="seriesList"
            />
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              return-object
              clearable
              v-model="comics"
              v-model:search="comicsSearch"
              prepend-inner-icon="mdi-filter"
              item-title="title"
              item-value="id"
              density="comfortable"
              label="Comics"
              :loading="comicsAreLoading"
              :items="comicsList"
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
import { useTheme } from 'vuetify'
import { getComics, getSeries }  from '@/api'
import { debounce } from 'vue-debounce'

const store = useCharactersStore()
const { name, comics, series, charactersAreLoading } = storeToRefs(store)
const { fetchCharacters } = store

const theme = useTheme()

const searchMenuIsShowing = ref(true)

const comicsAreLoading = ref(false)
const comicsList = ref([])
const comicsSearch = ref('')

const seriesAreLoading = ref(false)
const seriesList = ref([])
const seriesSearch = ref('')

/* Watchers */
watch(comicsSearch, debounce(title => fetchComics(title), 500))
watch(seriesSearch, debounce(title => fetchSeries(title), 500))
watch(comics,  () => fetchCharacters())
watch(series, () => fetchCharacters())

/* Functions */
const toggleSearchMenu = () => {
  searchMenuIsShowing.value = !searchMenuIsShowing.value
}

const fetchComics = title => {
  comicsAreLoading.value = true

  getComics({ title })
    .then(res => {
      comicsList.value = res.results
    })
    .catch(err => console.log(err))
    .finally(() => {
      comicsAreLoading.value = false
    })
}

const fetchSeries = title => {
  seriesAreLoading.value = true

  getSeries({ title })
    .then(res => {
      seriesList.value = res.results
    })
    .catch(err => console.log(err))
    .finally(() => {
      seriesAreLoading.value = false
    })
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>