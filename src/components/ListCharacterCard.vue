<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props" 
        tag="article" 
        width="300" 
        height="300"
        :elevation="isHovering ? 6: 3" 
        :to="to"
      >
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
  to: [String, Object]
})
</script>