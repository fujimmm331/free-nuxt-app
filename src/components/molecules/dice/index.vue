<script setup lang="ts">
import useDiceIndexPageSetResult from '@/store/DiceIndexPageStore/actions/useDiceIndexPageSetResult';
import { DiceRollType, DiceStatusType } from '@/types';
import { computed, reactive, ref, watch } from 'vue';

type DicePropsType = {
  status: DiceStatusType
}

type DiceStateType = {
  dice: DiceRollType[]
  index: number
  timer: null | NodeJS.Timer
}

const props = defineProps<DicePropsType>()
const diceState = reactive<DiceStateType>({
  dice: ['U', 'O', 'KO', 'CHI', 'MA', 'N'],
  index: 0,
  timer: null
})

const setRandomIndex = () => {
  const randomIndex = Math.floor(Math.random() * diceState.dice.length)
  diceState.index = randomIndex
}

const setResult = useDiceIndexPageSetResult()

const currentDiceRoll = computed<DiceRollType>(() => diceState.dice[diceState.index])

watch(
  () => props.status,
  (status) => {
    if (status === 'START') {
      diceState.timer = setInterval(() => {
        setRandomIndex()
      }, 20)
      return
    }
    if (!diceState.timer) {
      return
    }
    clearInterval(diceState.timer)
    setResult(diceState.dice[diceState.index])
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
