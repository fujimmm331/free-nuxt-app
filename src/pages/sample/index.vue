<template>
  <div class="bg-gray-50 h-auto timer-game p-2">
    <div v-show="states.count > 0" :style="style">{{ states.count }}</div>
    <div>
      <span>{{ states.target.number }}</span> で止めて！！
    </div>
    <button
      class="transition bg-blue-400 text-white pt-5 pb-5 pl-10 pr-10 rounded-md text-lg ease-in-out hover:bg-indigo-500 duration-300 "
      @click="onClickButton"
      v-text='buttonText'
    />
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
    if(!states.isCountUpping) clearInterval(timer)
  }, states.ms)
}

const setTargetAndMs = () => {
  if(states.target.status === 'SET') return

  states.target.number = Math.floor( Math.random() * 300 )
  states.target.status = 'SET'
  states.ms = Math.floor( Math.random() * 60 ) + 10
}

const buttonText = computed(() => {
  return states.isCountUpping ? 'すとっぷ' : 'すたと'
})

const style = computed(() => {
  return `font-size: ${states.count}px;`
})

</script>
<style>
  .timer-game {
    width: 100%;
    height: 100vh;
    text-align: center;
  }
</style>