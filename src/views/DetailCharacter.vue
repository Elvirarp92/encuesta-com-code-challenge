<template>
  <v-container tag="article" class="my-8">
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
    <v-row>
      <v-card flat>
        <v-tabs bg-color="primary" v-model="tab">
          <v-tab 
            value="series"
          >
            Series
          </v-tab>
          <v-tab 
            value="comics"
          >
            Comics
          </v-tab>
        </v-tabs>
        <v-card-text>
            <v-window v-model="tab">
              <v-window-item 
                value="series"
              >
                {{ series }}
              </v-window-item>
              <v-window-item 
                value="comics"
              >
                {{ comics }}
              </v-window-item>
            </v-window>
          </v-card-text>
      </v-card>
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

/* Tab variables */
const tab = ref('events')
const tabList = [
  {
    value: 'series',
    name: 'Series',
  },
  {
    value: 'comics',
    name: 'Comics',
  },
]

/* Character appearances variables */
const totalSeries = ref(0)
const series = ref([])

const totalComics = ref(0)
const comics = ref([])

/* Watchers */
watch(() => route.params.id, () => fetchCharacter() )

/* Lifecycle hooks */
onMounted(() => {
  fetchCharacter()
})

/* Functions */
const fetchCharacter = () => {
  getCharacter(route.params.id)
    .then(res => {
      character.value = res
      series.value = res.series.items
      totalSeries.value = res.series.available
      comics.value = res.comics.items
      totalComics.value = res.comics.available
    })
    .catch(err => console.log(err))
}
</script>