<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        Marvel Frontend Challenge
      </v-app-bar-title>
    </v-app-bar>
    <default-view />
    <v-footer>Data provided by Marvel. © 2023 MARVEL</v-footer>
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
</script>
