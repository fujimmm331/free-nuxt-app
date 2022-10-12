<template>
  <v-sheet class="h-full">
    <div class="d-flex justify-center align-center">
      <v-avatar size="600" class="icon">
        <v-img :src="require(`@/assets/images/kun.jpg`)" />
      </v-avatar>
    </div>
    <Player @play="onPlay" @pause="onPause" class='player' />
  </v-sheet>
</template>

<script setup lang="ts">
import Player from "../../components/organisms/music/player/index.vue";
import BGM from '@/assets/audios/呼び込み君.mp3'

const music = new Audio(BGM);
const onPlay = () => {
  music.play()
}

const onPause = () => {
  music.pause()
}

music.addEventListener('ended', () => onPlay())

</script>

<style>
.icon {
  cursor: pointer;
}
</style>