<script setup lang="ts">
import { DiceRollType, DiceStatusType } from '@/types';
import { computed, reactive, watch } from 'vue';
import type { TimerType } from '@/types'
import { useAllDiceResultStore } from '@/store';
import { useDice } from '@/composable/dice/useDice';

type DicePropsType = {
  status: DiceStatusType
}

type DiceStateType = {
  dice: DiceRollType[]
  index: number
  timer: TimerType
}

const { diceState, currentDiceRoll, clearDiceStateTimer, setDiceStateTimer } = useDice()
const props = defineProps<DicePropsType>()
const allDiceResultStore = useAllDiceResultStore()

watch(
  () => props.status,
  (status) => {
    if (status === 'START') {
      setDiceStateTimer()
    } else {
      clearDiceStateTimer()
      allDiceResultStore.actions.setAllDiceResult(diceState.dice[diceState.index])
    }
  }
)


</script>
<template>
  <div>
    <v-avatar color="light-green darken-4" min-width="100" min-height="100" rounded="lg">
      <div class="white--text text-h2">
        {{ currentDiceRoll }}
      </div>
    </v-avatar>
  </div>
</template>
