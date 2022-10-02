import { DiceRollType, DiceStatusType } from "@/types";
import { inject, InjectionKey, provide, reactive, readonly, toRefs } from "vue";
type AllDiceResultStoreType = ReturnType<typeof allDiceResultStore>


const allDiceResultStoreKey: InjectionKey<AllDiceResultStoreType> = Symbol('diceIndexPageStore')

const allDiceResultStore = () => {
  const state = reactive<{
    result: DiceRollType[]
  }>({
    result: []
  })

  const setAllDiceResult = (result: DiceRollType) => {
    state.result = [...state.result, result]
  }

  const initializeAllDiceResult = () => {
    state.result = []
  }

  return readonly({
    state,
    actions: {
      setAllDiceResult,
      initializeAllDiceResult,
    }
  })
}

export const provideAllDiceResultStore = () => {
  return provide(allDiceResultStoreKey, allDiceResultStore())
}

export const useAllDiceResultStore = () => {
  const state = inject<AllDiceResultStoreType>(allDiceResultStoreKey);
  if (!state) throw new Error('AllDiceResultStore is undefined')
  return state
}