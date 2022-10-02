import { DiceRollType, HandType } from "@/types";
import { inject, InjectionKey, provide, reactive, readonly } from "vue";
type HandStateType = ReturnType<typeof handStore>
type WithReadonly = DiceRollType | Readonly<DiceRollType>

const handStoreKey: InjectionKey<HandStateType> = Symbol('handStore')

const handStore = () => {
  const state = reactive<{
    result: HandType[]
  }>({
    result: []
  })

  const setHandState = (hand: HandType) => {
    state.result.push(hand)
  }

  const resetHandState = () => {
    state.result = []
  }

  const judgeAndSetHands = (result: DiceRollType[]) => {
    if (result.includes('N') && result.includes('KO')) {
      judgeNkoHands(result)
    }


    if (result.includes('N') && result.includes('CHI')) {
      judgeNchiHands(result)
    }
  }

  const judgeNkoHands = (result: DiceRollType[]) => {
    if (result.includes('U')) {
      setHandState('UNKO')
    }

    if (result.includes('MA')) {
      setHandState('MANKO')
    }

    if (result.includes('CHI')) {
      setHandState('CHINKO')
    }

    if (result.includes('O') && result.includes('CHI')) {
      setHandState('OCHINKO')
    }

    if (result.includes('O') && result.includes('MA')) {
      setHandState('OMANKO')
    }

  }

  const judgeNchiHands = (result: DiceRollType[]) => {
    if (result.includes('U')) {
      setHandState('UNCHI')
    }

    const numOfCHI = result.filter((value) => value === 'CHI').length
    const numOfN = result.filter((value) => value === 'N').length

    if (numOfCHI >= 2 && numOfN >= 2 && result.includes('O')) {
      setHandState('OCHINCHIN')
    }

    if (numOfCHI >= 2 && numOfN >= 2) {
      setHandState('CHINCHIN')
    }
  }

  return readonly({
    state,
    actions: {
      resetHandState,
      judgeAndSetHands
    }
  })
}

export const provideHandStore = () => {
  provide(handStoreKey, handStore())
}

export const useHandStore = () => {
  const store = inject<HandStateType>(handStoreKey);
  if (!store) throw new Error('DialogStore is undefined')
  return store
}