<template>
  <div>
    <input
      type="range"
      id="volume"
      min="100"
      max="400"
      v-model="percent"
      @input="onInputScale"
    />
    <input type="file" id="file" @input="onInputFile" />
    <canvas class="canvas" ref="cvs" id="cvs" width="300" height="400" />
    <button @click="onCropImg" v-text="'切り取り'" />
    <canvas class="canvas" ref="out" id="out" width="200" height="200" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Image = {
  element: HTMLImageElement | null
  width: number
  height: number
}

type DrawImageArg = {
  sourceWidth: number
  sourceHeight: number
  destinationWidth: number
  destinationHeight: number
}

interface ComponentData {
  percent: number
  image: Image
  aspectRatio: number
}

export default Vue.extend({
  name: 'crop',
  data: () =>
    ({
      text: 'crop page is running',
      percent: 0,
      image: {
        element: null,
        height: 0,
        width: 0,
      },
      aspectRatio: 1.2,
    } as ComponentData),
  computed: {
    scale(): number {
      return this.percent * 0.01
    },
  },
  methods: {
    initializeScale(): void {
      this.percent = 100
    },
    onCropImg(): void {
      const canvas = this.$refs.out as HTMLCanvasElement

      if (!canvas || !this.image.element) {
        return
      }

      const drawImageArg: DrawImageArg = {
        sourceWidth: this.image.element.width,
        sourceHeight: this.image.element.height / this.aspectRatio,
        destinationWidth: this.image.element.width * this.scale,
        destinationHeight:
          (this.image.element.height / this.aspectRatio) * this.scale,
      }

      this.drawImage(this.image.element, canvas, drawImageArg)
      console.log('crop image')
    },
    onInputScale(): void {
      if (!this.image.element) {
        return
      }

      const drawImageArg: DrawImageArg = {
        sourceWidth: this.image.element.width,
        sourceHeight: this.image.element.height,
        destinationWidth: this.image.element.width * this.scale,
        destinationHeight: this.image.element.height * this.scale,
      }

      this.drawImage(
        this.image.element,
        this.$refs.cvs as HTMLCanvasElement,
        drawImageArg,
      )
    },
    onInputFile(event: { target: HTMLInputElement }): void {
      if (!event.target.files) {
        return
      }

      const file = event.target.files[0]
      const image = new Image()
      const reader = new FileReader()
      this.initializeScale()

      reader.readAsDataURL(file)
      reader.onload = (e) => {
        if (!e.target) {
          return
        }

        image.src = e.target.result as string
        image.onload = () => {
          const drawImageArg: DrawImageArg = {
            sourceWidth: image.width,
            sourceHeight: image.height,
            destinationWidth: image.width,
            destinationHeight: image.height,
          }

          this.drawImage(
            image,
            this.$refs.cvs as HTMLCanvasElement,
            drawImageArg,
          )
        }
      }

      this.image.element = image
      this.image.width = image.width
      this.image.height = image.height
    },
    drawImage(
      image: HTMLImageElement,
      canvas: HTMLCanvasElement,
      arg: DrawImageArg,
    ) {
      canvas.width = arg.sourceWidth
      canvas.height = arg.sourceHeight
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }

      ctx.drawImage(
        image,
        0,
        0,
        arg.sourceWidth,
        arg.sourceHeight,
        0,
        0,
        arg.destinationWidth,
        arg.destinationHeight,
      )

      if (canvas.id === 'out') {
        return
      }

      ctx.strokeStyle = 'red'
      ctx.lineWidth = 10
      ctx.strokeRect(0, 1, image.width, image.height / this.aspectRatio) // 赤い枠
    },
    exportImage() {
      const canvas = this.$refs.cvs as HTMLCanvasElement
      const link = document.createElement('a')

      if (!canvas) {
        return
      }

      link.download = 'croppedImage.png'
      link.href = canvas.toDataURL()
      link.click()
      console.log('export')
    },
  },
})
</script>
<style lang="css">
.canvas {
  width: 400px;
}
</style>