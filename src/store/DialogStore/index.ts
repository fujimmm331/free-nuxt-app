import { inject, InjectionKey, provide, reactive, readonly } from "vue";
type DialogStateType = {
  state: {
    isShow: boolean
  }
}


const dialogStoreKey: InjectionKey<DialogStateType> = Symbol('dialogStore')

export const provideDialogStore = () => {
  const store = reactive<DialogStateType>({
    state: {
      isShow: false
    }
  })

  provide(dialogStoreKey, store)
  return readonly(store);
}

export const useDialogStore = () => {
  const store = inject<DialogStateType>(dialogStoreKey);
  if (!store) throw new Error('DialogStore is undefined')
  return store
}