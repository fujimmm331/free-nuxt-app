<template>
  <v-app id='app'>
    <nuxt />
  </v-app>
</template>
<script setup lang="ts">
import { provideDiceIndexPageStore, provideDialogStore } from '@/store';

provideDiceIndexPageStore()
provideDialogStore()
</script>