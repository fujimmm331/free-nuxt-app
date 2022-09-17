<template>
  <v-app id='app'>
    <nuxt />
  </v-app>
</template>
<script setup lang="ts">
import { provideDiceStore } from '@/store';

provideDiceStore()
</script>