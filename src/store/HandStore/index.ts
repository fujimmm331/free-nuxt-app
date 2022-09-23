import { HandKeyType } from "@/const";
import { inject, InjectionKey, provide, reactive, readonly } from "vue";
type HandStateType = {
  state: {
    result: HandKeyType[]
  }
}


const handStoreKey: InjectionKey<HandStateType> = Symbol('handStore')

export const provideHandStore = () => {
  const store = reactive<HandStateType>({
    state: {
      result: []
    }
  })

  provide(handStoreKey, store)
  return readonly(store);
}

export const useHandStore = () => {
  const store = inject<HandStateType>(handStoreKey);
  if (!store) throw new Error('DialogStore is undefined')
  return store
}