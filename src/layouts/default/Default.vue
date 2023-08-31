<template>
  <v-app>
    <the-navbar />
    <default-view />
    <v-footer>Data provided by Marvel. © 2023 MARVEL</v-footer>
  </v-app>
</template>

<script setup>
import DefaultView from './View.vue'
import TheNavbar from '@/components/TheNavbar.vue'
</script>
