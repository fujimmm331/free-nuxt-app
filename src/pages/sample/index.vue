<template>
  <div class="bg-gray-50 h-auto timer-game p-2">
    <div v-show="states.count > 0" :style="style">{{ states.count }}</div>
    <button
      class="transition bg-blue-400 text-white pt-5 pb-5 pl-10 pr-10 rounded-md text-lg ease-in-out hover:bg-indigo-500 duration-300 "
      @click="onClickButton"
      v-text='buttonText'
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

type States = {
  count: number
  isCountUpping: boolean
}

const states = reactive<States>({
  count: 0,
  isCountUpping: false,
})

const onClickButton = () => {
  states.isCountUpping = !states.isCountUpping
  const timer = setInterval(() => {
    states.count ++
    if(!states.isCountUpping) clearInterval(timer)
  }, 100)
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