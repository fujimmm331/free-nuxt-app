<template>
  <div class="bg-gray-50 h-auto timer-game p-2">
    <div v-show="states.count > 0" :style="style">{{ states.count }}</div>

    <div>
      <div v-show="states.target.number > 0">
        <span class="text-xl">{{ states.target.number }}</span> で止めて！！
      </div>
      <button
        class="transition bg-blue-400 text-white pt-5 pb-5 pl-10 pr-10 rounded-md text-lg ease-in-out hover:bg-indigo-500 duration-300 "
        @click="onClickButton"
        v-text='buttonText'
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

export type TimerGameStates = {
  count: number
  isCountUpping: boolean
  target: {
    number: number
    status: 'SET' | 'UNSET'
  }
  ms: number
}

const states = reactive<TimerGameStates>({
  count: 0,
  isCountUpping: false,
  target: {
    number: 0,
    status: 'UNSET'
  },
  ms:0
})

const onClickButton = () => {
  setTargetAndMs()
  states.isCountUpping = !states.isCountUpping
  const timer = setInterval(() => {
    states.count ++
    if(!states.isCountUpping) {
      clearInterval(timer)
      alert('😩😩😩😩😩')
    }
  }, states.ms)
}

const setTargetAndMs = () => {
  if(states.target.status === 'SET') return

  states.target.number = Math.floor( Math.random() * 200 ) + 100
  states.target.status = 'SET'
  states.ms = Math.floor( Math.random() * 90 ) + 10
}

const buttonText = computed(() => {
  return states.isCountUpping ? 'すとっぷ' : 'すたと'
})

const style = computed(() => {
  const x = Math.floor(Math.random() * 2) % 2 == 0 ? `left: ${states.count}px;` : `right: ${states.count}px;`
  const y = Math.floor(Math.random() * 2) % 2 == 0 ? `top: ${states.count}px;` : `bottom: ${states.count}px;`
  return `
    font-size: ${states.count}px;
    position:absolute;
    ${x}
    ${y}
  `
})

</script>
<style>
  .timer-game {
    width: 100%;
    height: 100vh;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    z-index: 999999;
  }
</style>