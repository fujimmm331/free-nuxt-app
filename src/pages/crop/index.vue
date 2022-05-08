<template>
  <div>
    <input
      type="range"
      id="volume"
      min="10"
      max="400"
      v-model="percent"
      @input="onInputScale"
    />
    <input type="file" id="file" @input="onInputFile" />
    <canvas
      class="canvas"
      ref="cvs"
      id="cvs"
      width="1000"
      height="800"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @mousemove="onMouseMove"
      @touchmove="onTouchMove"
      @mouseup="onMouseUp"
      @touchend="onTouchEnd"
      @mouseout="onMouseUp"
    />
    <button @click="onCropImg" v-text="'切り取り'" />
    <canvas class="canvas" ref="out" id="out" width="1000" height="500" />
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
      percent: 100,
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

      ctx.fillStyle = '#c8c8c8'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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
      this.setDragPoint(e.pageX, e.pageY)
    },
    /**
     * ドラッグ開始時に発火するメソッド(スマホ用)
     */
    onTouchStart(e: TouchEvent) {
      this.setDragPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    },
    /**
     * ドラッグ開始地点をセットする
     */
    setDragPoint(pageX: number, pageY: number) {
      this.isDragging = true
      this.startDragX = pageX
      this.startDragY = pageY
    },
    /**
     * ドラッグ終了時に発火するメソッド
     */
    onMouseUp(e: MouseEvent): void {
      this.drawMovingEnd(e.pageX, e.pageY)
    },
    /**
     * ドラッグ終了時に発火するメソッド(スマホ用)
     */
    onTouchEnd(e: TouchEvent): void {
      this.drawMovingEnd(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    },
    /**
     * ドラッグしたまま移動する際に発火するメソッド
     */
    onMouseMove(e: MouseEvent): void {
      this.drawMoving(e.pageX, e.pageY)
    },
    /**
     * ドラッグしたまま移動する際に発火するメソッド(スマホ用)
     */
    onTouchMove(e: TouchEvent): void {
      this.drawMoving(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    },
    /**
     * ドラッグ中に画像を描画する
     */
    drawMoving(pageX: number, pageY: number): void {
      if (!this.isDragging) {
        return
      }

      const drawImageArg: DrawImageArg = {
        drawCenterX: this.centerX + (this.startDragX! - pageX) / this.scale,
        drawCenterY: this.centerY + (this.startDragY! - pageY) / this.scale,
      }

      this.drawImage(
        this.image!,
        this.$refs.cvs as HTMLCanvasElement,
        drawImageArg,
      )
    },
    /**
     * ドラッグ中に画像を描画する
     */
    drawMovingEnd(pageX: number, pageY: number): void {
      if (!this.isDragging) {
        return
      }
      this.centerX += (this.startDragX! - pageX) / this.scale
      this.centerY += (this.startDragY! - pageY) / this.scale

      const drawImageArg: DrawImageArg = {
        drawCenterX: this.centerX,
        drawCenterY: this.centerY,
      }

      this.drawImage(
        this.image!,
        this.$refs.cvs as HTMLCanvasElement,
        drawImageArg,
      )
      this.isDragging = false
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
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 10
      ctx.strokeRect(5, 150, 990, 500) // 赤い枠
    },
  },
})
</script>
<style lang="css">
.canvas {
  width: 100%;
}
</style>