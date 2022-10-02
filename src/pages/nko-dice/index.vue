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
import { useDiceIndexPageStore } from '@/store/DiceIndexPageStore';
import useDiceIndexPageStartDice from '@/store/DiceIndexPageStore/actions/useDiceIndexPageStartDice';
import Dialog from '@/components/template/dice/dialog/index.vue';
import useDiceIndexPageStopDice from '@/store/DiceIndexPageStore/actions/useDiceIndexPageStopDice';
import useDiceIndexPageGetButtonText from '@/store/DiceIndexPageStore/selector/useDiceIndexPageGetButtonText';
import useDiceIndexPageGetIsCollectingResult from '@/store/DiceIndexPageStore/selector/useDiceIndexPageGetIsCollectingResult';
import useDiceIndexPageInitializeResult from '@/store/DiceIndexPageStore/actions/useDiceIndexPageInitializeResult'
import { useHandStore } from '@/store';

const { state } = useDiceIndexPageStore()
const startDice = useDiceIndexPageStartDice()
const stopDice = useDiceIndexPageStopDice()
const initializeResult = useDiceIndexPageInitializeResult()
const buttonText = useDiceIndexPageGetButtonText()
const isCollectingResult = useDiceIndexPageGetIsCollectingResult()
const handStore = useHandStore()

const onClick = async () => {
  if (state.diceStatus === 'INITIAL' || state.diceStatus === 'STOP') {
    initializeResult()
    handStore.actions.resetHandState()
    startDice()
    return
  }
  stopDice()
}

</script>