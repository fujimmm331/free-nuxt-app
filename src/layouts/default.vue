<template>
  <v-app id='app'>
    <nuxt />
  </v-app>
</template>
<script setup lang="ts">
import { provideAllDiceResultStore, provideDialogStore, provideHandStore } from '@/store';

provideAllDiceResultStore()
provideDialogStore()
provideHandStore()
</script>