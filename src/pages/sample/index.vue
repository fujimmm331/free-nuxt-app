<template>
  <div class="bg-gray-50 h-auto timer-game p-2">
    <div v-show="countState.count > 0" :style="style">{{ countState.count }}</div>

    <div>
      <div v-show="targetState.number > 0">
        <span class="text-xl">{{ targetState.number }}</span> で止めて！！
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
import { useCount } from '@/composable/useCount'
import { useTarget } from '@/composable/useTarget'
import { useTimer } from '@/composable/useTimer'
import { computed, reactive, } from 'vue'

const { countState, incrementCount, countStart, countStop } = useCount()
const { targetState, setTarget } = useTarget()
const { timerState, setMs } = useTimer()


const onClickButton = () => {
  setTarget()
  setMs()
  countState.status === 'STOP' ? countStart() : countStop()

  const timer = setInterval(() => {
    incrementCount()
    if(countState.status === 'STOP') {
      clearInterval(timer)
      alert('😩😩😩😩😩')
    }
  }, timerState.ms)
}

const buttonText = computed(() => {
  return countState.status === 'COUNTING' ? 'すとっぷ' : 'すたと'
})

const style = computed(() => {
  const x = Math.floor(Math.random() * 2) % 2 == 0 ? `left: ${countState.count}px;` : `right: ${countState.count}px;`
  const y = Math.floor(Math.random() * 2) % 2 == 0 ? `top: ${countState.count}px;` : `bottom: ${countState.count}px;`
  return `
    font-size: ${countState.count}px;
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