<template>
  <div>
    <input type="range" id="volume" min='10' max='400' v-model='scale' @input='onInputScale'>
    <input type='file' id="file" @input='onInputFile'>
    <canvas ref='cvs' id='cvs' width='300' height='400' />
    <button @click='onCropImg' v-text='"切り取り"' />
    <canvas ref='out' id='out' width='200' height='200' />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'crop',
  data: () => ({
    text: 'crop page is running',
    scale: 0,
  }),
  methods: {
    onCropImg(): void {
      console.log('crop image')
    },
    onInputScale():void {
      console.log('change')
    },
    onInputFile(event: { target: HTMLInputElement }): void {
      const cvs = this.$refs.cvs
      const cw = cvs.width
      const ch = cvs.height
      const out = this.$refs.out
      const oh = out.height
      const ow = out.width
      const img  = new Image()
      img.onload = () => {   // 画像が読み込まれた
        ix = img.width  / 2
        iy = img.height / 2
        let scl = Math.floor(cw / img.width * 100)
        this.scale = scl
      }
      // const img = event.target.files[0]

      let ix = 0    // 中心座標
      let iy = 0
      let v = 1.0   // 拡大縮小率
      console.log('event', img.width)
    }
  }
})
</script>
