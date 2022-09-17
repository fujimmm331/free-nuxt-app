import { DiceRollType } from "@/types";
import { inject, InjectionKey, provide, reactive, readonly, toRefs } from "vue";
type DiceIndexPageStateType = {
  state: {
    result: DiceRollType[]
  }
}


const diceIndexPageStoreKey: InjectionKey<DiceIndexPageStateType> = Symbol('diceIndexPageStore')

export const provideDiceIndexPageStore = () => {
  const store = reactive<DiceIndexPageStateType>({
    state: {
      result: []
    }
  })

  provide(diceIndexPageStoreKey, store)
  return readonly(store);
}

export const useDiceIndexPageStore = () => {
  const state = inject<DiceIndexPageStateType>(diceIndexPageStoreKey);
  if (!state) throw new Error('DiceIndexPageStore is undefined')
  return state
}