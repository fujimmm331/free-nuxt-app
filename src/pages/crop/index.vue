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
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseout="onMouseOut"
    />
    <button @click="onCropImg" v-text="'切り取り'" />
    <canvas class="canvas" ref="out" id="out" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type DrawImageArg = {
  drawCenterX: number
  drawCenterY: number
}

interface ComponentData {
  percent: number
  image: HTMLImageElement | null
  aspectRatio: number
  centerX: number
  centerY: number
  isDragging: boolean
  startDragX: number | null
  startDragY: number | null
}

export default Vue.extend({
  name: 'crop',
  data: () =>
    ({
      text: 'crop page is running',
      percent: 0,
      image: null,
      aspectRatio: 2,
      centerX: 0,
      centerY: 0,
      isDragging: false,
      startDragX: null,
      startDragY: null,
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

      if (!canvas || !this.image) {
        return
      }

      const drawImageArg: DrawImageArg = {
        drawCenterX: this.centerX,
        drawCenterY: this.centerY,
      }

      this.drawImage(this.image, canvas, drawImageArg)
      console.log('crop image')
    },
    /**
     * 拡大縮小率をもとに画像を再描画する
     */
    onInputScale(): void {
      if (!this.image) {
        return
      }

      const drawImageArg: DrawImageArg = {
        drawCenterX: this.centerX,
        drawCenterY: this.centerY,
      }

      this.drawImage(
        this.image,
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
          this.centerX = image.width / 2
          this.centerY = image.height / 2

          const drawImageArg: DrawImageArg = {
            drawCenterX: this.centerX,
            drawCenterY: this.centerY,
          }

          this.drawImage(
            image,
            this.$refs.cvs as HTMLCanvasElement,
            drawImageArg,
          )
        }
      }

      this.image = image
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
      const ctx = canvas.getContext('2d')
      const isUseOutCanvas = canvas.id === 'out'

      if (!ctx) {
        return
      }

      canvas.width = image.width
      canvas.height = isUseOutCanvas
        ? image.width / this.aspectRatio
        : image.height

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        canvas.width / 2 - arg.drawCenterX * this.scale,
        canvas.height / 2 - arg.drawCenterY * this.scale,
        image.width * this.scale,
        image.height * this.scale,
      )

      if (isUseOutCanvas) {
        return
      }

      this.strokeRect(ctx, image)
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
    onMouseDown(e: MouseEvent): void {
      this.isDragging = true
      this.startDragX = e.pageX
      this.startDragY = e.pageY
    },
    /**
     * ドラッグ終了時に発火するメソッド
     */
    onMouseUp(e: MouseEvent): void {
      this.centerX += (this.startDragX! - e.pageX) / this.scale
      this.centerY += (this.startDragY! - e.pageY) / this.scale
      this.isDragging = false
    },
    /**
     * ドラッグしたまま移動する際に発火するメソッド
     */
    onMouseMove(e: MouseEvent): void {
      if (!this.isDragging) {
        return
      }

      const drawImageArg: DrawImageArg = {
        drawCenterX: this.centerX + (this.startDragX! - e.pageX) / this.scale,
        drawCenterY: this.centerY + (this.startDragY! - e.pageY) / this.scale,
      }

      this.drawImage(
        this.image!,
        this.$refs.cvs as HTMLCanvasElement,
        drawImageArg,
      )
    },
    /**
     * 画像からでたときに発火するメソッド
     */
    onMouseOut(): void {
      this.isDragging = false
      console.log('dragend')
    },
    /**
     * 画像から赤枠を描画する
     */
    strokeRect(ctx: CanvasRenderingContext2D, image: HTMLImageElement): void {
      const whichUse =
        Math.sign(image.height - image.width / this.aspectRatio) === -1
          ? 'height'
          : 'width'
      const prop = {
        height: {
          x: (image.width - image.height * this.aspectRatio) / 2,
          y: 0,
          w: image.height * this.aspectRatio,
          h: image.height,
        },
        width: {
          x: 0,
          y: (image.height - image.width / this.aspectRatio) / 2,
          w: image.width,
          h: image.width / this.aspectRatio,
        },
      }
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 10
      ctx.strokeRect(
        prop[whichUse].x,
        prop[whichUse].y,
        prop[whichUse].w,
        prop[whichUse].h,
      ) // 赤い枠
    },
  },
})
</script>
<style lang="css">
.canvas {
  width: 400px;
}
</style>