<template>
  <v-app id='app'>
    <nuxt />
  </v-app>
</template>
<script setup lang="ts">
import { provideDiceIndexPageStore, provideDialogStore, provideHandStore } from '@/store';

provideDiceIndexPageStore()
provideDialogStore()
provideHandStore()
</script>