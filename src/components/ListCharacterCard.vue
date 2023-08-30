<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card tag="article" v-bind="props" :elevation="isHovering ? 6: 3" width="300" height="300">
        <v-img :src="img" height="250" cover />
        <v-card-title>
          {{ name }}
        </v-card-title>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
const props = defineProps({
  name: String,
  img: String,
})
</script>