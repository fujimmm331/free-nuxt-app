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
    <canvas
      class="canvas"
      ref="cvs"
      id="cvs"
      width="300"
      height="400"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseout="onMouseOut"
    />
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
  destinationWidth: number
  destinationHeight: number
}

interface ComponentData {
  percent: number
  image: Image
  aspectRatio: number
  centerX: number
  centerY: number
  isDragging: boolean
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
      centerX: 0,
      centerY: 0,
      isDragging: false,
    } as ComponentData),
  computed: {
    scale(): number {
      return this.percent * 0.01
    },
  },
  methods: {
    /**
     * 拡大縮小率をリセットする
     */
    initializeScale(): void {
      this.percent = 100
    },
    /**
     * 画像を切り取る処理
     */
    onCropImg(): void {
      const canvas = this.$refs.out as HTMLCanvasElement

      if (!canvas || !this.image.element) {
        return
      }

      const drawImageArg: DrawImageArg = {
        destinationWidth: this.image.element.width * this.scale,
        destinationHeight:
          (this.image.element.height / this.aspectRatio) * this.scale,
      }

      this.drawImage(this.image.element, canvas, drawImageArg)
      console.log('crop image')
    },
    /**
     * 拡大縮小率をもとに画像を再描画する
     */
    onInputScale(): void {
      if (!this.image.element) {
        return
      }

      const drawImageArg: DrawImageArg = {
        destinationWidth: this.image.element.width * this.scale,
        destinationHeight: this.image.element.height * this.scale,
      }

      this.drawImage(
        this.image.element,
        this.$refs.cvs as HTMLCanvasElement,
        drawImageArg,
      )
    },
    /**
     * 入力された画像ファイルをもとに、画面に描画する
     * @param event イベント引数。画像が格納されている
     */
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
            destinationWidth: image.width,
            destinationHeight: image.height,
          }

          this.centerX = image.width / 2
          this.centerY = image.height / 2

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
    /**
     * 画像を描画する
     * @param image 画像
     * @param canvas 描画するcanvas
     * @param arg drawImageに使用する引数
     */
    drawImage(
      image: HTMLImageElement,
      canvas: HTMLCanvasElement,
      arg: DrawImageArg,
    ) {
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        canvas.width / 2 - this.centerX * this.scale,
        canvas.height / 2 - this.centerY * this.scale,
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
    /**
     * 画像を出力する
     */
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
    /**
     * ドラッグ開始時に発火するメソッド
     */
    onMouseDown(): void {
      this.isDragging = true
      console.log('dragStart')
    },
    /**
     * ドラッグ終了時に発火するメソッド
     */
    onMouseUp(): void {
      this.isDragging = false
      console.log('dragEnd')
    },
    /**
     * ドラッグしたまま移動する際に発火するメソッド
     */
    onMouseMove(): void {
      if (!this.isDragging) {
        return
      }
      console.log('moving')
    },
    /**
     * 画像からでたときに発火するメソッド
     */
    onMouseOut(): void {
      this.isDragging = false
      console.log('dragend')
    },
  },
})
</script>
<style lang="css">
.canvas {
  width: 400px;
}
</style>