<template>
  <div>
    <DiceList :status="state.diceStatus" :length='state.displayNumber' />
    <Dialog />
    <div class="d-flex align-center justify-center">
      <v-btn @click='onClick' x-large :loading="isCollectingResult">{{ buttonText }}</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import DiceList from '@/components/template/dice/DiceList.vue';
import Dialog from '@/components/template/dice/dialog/index.vue';
import { useHandStore, useAllDiceResultStore } from '@/store';
import { DiceStatusType } from '@/types';
import { computed, reactive } from 'vue';

type IndexPageStateType = {
  displayNumber: number
  diceStatus: DiceStatusType
}

const state = reactive<IndexPageStateType>({
  displayNumber: 5,
  diceStatus: 'INITIAL'
})

const startDice = () => {
  state.diceStatus = 'START'
}

const stopDice = () => {
  state.diceStatus = 'STOP'
}

const allDiceResultStore = useAllDiceResultStore()

const buttonText = computed(() => state.diceStatus === 'INITIAL' || state.diceStatus === 'STOP' ? 'すたと' : 'すとっぷ')
const isCollectingResult = computed(() => {
  if (state.diceStatus === 'INITIAL' || state.diceStatus === 'START') {
    return false
  }

  return allDiceResultStore.state.result.length !== state.displayNumber
})

const handStore = useHandStore()

const onClick = async () => {
  if (state.diceStatus === 'INITIAL' || state.diceStatus === 'STOP') {
    allDiceResultStore.actions.initializeAllDiceResult()
    handStore.actions.resetHandState()
    startDice()
    return
  }
  stopDice()
}

</script>