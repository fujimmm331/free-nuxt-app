import { DiceRollType } from "@/types";
import { reactive, readonly, toRefs } from "vue";
type DiceStateType = {
  dice: DiceRollType[]
  currentDiceRoll: DiceRollType
}

export const useDice = () => {
  const state = reactive<DiceStateType>({
    dice: ['U', 'O', 'KO', 'CHI', 'MA', 'N'],
    currentDiceRoll: 'U'
  })

  const setCurrentDiceRoll = (diceRoll: DiceRollType) => {
    state.currentDiceRoll = diceRoll
  }

  return {
    state: readonly(state),
    setCurrentDiceRoll
  }
}

