<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        <router-link class="text-white text-decoration-none" :to="{name: 'Home'}">
          Marvel Frontend Challenge
        </router-link>
      </v-app-bar-title>
    </v-app-bar>
    <default-view />
    <v-footer>Data provided by Marvel. © 2023 MARVEL</v-footer>
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
</script>
