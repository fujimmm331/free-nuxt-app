<template>
  <div>
    <input type="range" id="volume" min='100' max='400' v-model='scale' @input='onInputScale'>
    <input type='file' id="file" @input='onInputFile'>
    <canvas class='canvas' ref='cvs' id='cvs' width='300' height='400' />
    <button @click='exportImage' v-text='"切り取り"' />
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
    image: null,
  }),
  methods: {
    onCropImg(): void {
      console.log('crop image')
    },
    onInputScale():void {
      console.log('change', this.scale / 100)
      this.drawImage(this.image, this.scale / 100)
    },
    onInputFile(event: { target: HTMLInputElement }): void {
      const file = event.target.files[0]
      const image = new Image()
      const reader = new FileReader()

      this.scale = 100
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        image.src = e.target.result as string
        image.onload = () => {
          this.drawImage(image)
        }
      }

      this.image = image
    },
    drawImage(image: HTMLImageElement, scale = 1) {
      const canvas = this.$refs.cvs
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * scale, image.height * scale)
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 10
      ctx.strokeRect( 0, 1, image.width, image.height / 1.2 ) // 赤い枠
    },
    exportImage() {
      const canvas = this.$refs.cvs
      const link = document.createElement('a');

      link.download = 'croppedImage.png';
      link.href = canvas.toDataURL()
      link.click();
      console.log('export')
    }
  }
})
</script>
<style lang="css">
.canvas {
  width: 400px;
}
</style>