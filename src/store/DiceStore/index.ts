import { DiceRollType } from "@/types";
import { inject, InjectionKey, provide, reactive, readonly, toRefs } from "vue";
type DiceStateType = {
  state: {
    dice: DiceRollType[]
    currentDiceRoll: DiceRollType
    index: number
  }
}


const diceStoreKey: InjectionKey<DiceStateType> = Symbol('diceStoreKey')

export const provideDiceStore = () => {
  const store = reactive<DiceStateType>({
    state: {
      dice: ['U', 'O', 'KO', 'CHI', 'MA', 'N'],
      currentDiceRoll: 'U',
      index: 0,
    }
  })

  provide(diceStoreKey, store)
  return readonly(store);
}

export const useDiceStore = () => {
  const state = inject<DiceStateType>(diceStoreKey);
  if (!state) throw new Error('DiceStore state is undefined')
  return state
}