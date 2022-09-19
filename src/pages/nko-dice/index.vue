<template>
  <div>
    <DiceList :status="state.diceStatus" :length='state.displayNumber' />
    <Dialog />
    <v-btn @click='onClick'>ボタン</v-btn>
  </div>
</template>

<script setup lang="ts">
import DiceList from '@/components/template/dice/DiceList.vue';
import { useDiceIndexPageStore } from '@/store/DiceIndexPageStore';
import useDiceIndexPageStartDice from '@/store/DiceIndexPageStore/actions/useDiceIndexPageStartDice';
import Dialog from '@/components/template/dice/dialog/index.vue';
import useDiceIndexPageStopDice from '@/store/DiceIndexPageStore/actions/useDiceIndexPageStopDice';

const { state } = useDiceIndexPageStore()
const startDice = useDiceIndexPageStartDice()
const stopDice = useDiceIndexPageStopDice()

const onClick = () => {
  if (state.diceStatus === 'INITIAL' || state.diceStatus === 'STOP') {
    return startDice()
  }
  stopDice()
}

</script>