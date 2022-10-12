<template>
  <v-list>
    <v-list-item class="d-flex justify-center align-center">
      <!-- <v-btn icon>
        <v-icon>mdi-rewind</v-icon>
      </v-btn> -->

      <v-btn height="100" width="100" icon @click="onClickPlayIcon">
        <v-icon size="100">{{ playIcon }}</v-icon>
      </v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-fast-forward</v-icon>
      </v-btn> -->

    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

type PlayerStateType = {
  isPlaying: boolean
}

const emits = defineEmits(['play', 'pause'])
const state = reactive<PlayerStateType>({
  isPlaying: false
})

const playIcon = computed(() => state.isPlaying ? 'mdi-pause' : 'mdi-arrow-right-drop-circle')

const onClickPlayIcon = () => {
  state.isPlaying = !state.isPlaying

  if (state.isPlaying) {
    return emits('play')
  }
  emits('pause')
}
</script>