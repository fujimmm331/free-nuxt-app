import { DiceRollType, TimerType } from "@/types";
import { computed, reactive, readonly, toRefs } from "vue";
type DiceStateType = {
  dice: DiceRollType[]
  index: number
  timer: TimerType
}

export const useDice = () => {
  const diceState = reactive<DiceStateType>({
    dice: ['U', 'O', 'KO', 'CHI', 'MA', 'N'],
    index: 0,
    timer: {
      id: null,
      ms: 20
    }
  })

  const currentDiceRoll = computed<DiceRollType>(() => diceState.dice[diceState.index])

  const setRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * diceState.dice.length)
    diceState.index = randomIndex
  }

  const setDiceStateTimer = () => {
    diceState.timer.id = setInterval(() => {
      setRandomIndex()
    }, diceState.timer.ms)
  }

  const clearDiceStateTimer = () => {
    if (!diceState.timer.id) return
    clearInterval(diceState.timer.id)
  }

  return {
    diceState: readonly(diceState),
    currentDiceRoll,
    clearDiceStateTimer,
    setDiceStateTimer
  }
}

