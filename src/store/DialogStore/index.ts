import { inject, InjectionKey, provide, reactive, readonly } from "vue";
type DialogStateType = ReturnType<typeof dialogStore>

const dialogStoreKey: InjectionKey<DialogStateType> = Symbol('dialogStore')

export const dialogStore = () => {
  const state = reactive({
    isShow: false
  })

  const openDialog = () => {
    state.isShow = true
  }

  const closeDialog = () => {
    state.isShow = false
  }

  return readonly({
    state,
    actions: {
      openDialog,
      closeDialog
    }
  })
}

export const provideDialogStore = () => {
  return provide(dialogStoreKey, dialogStore())
}

export const useDialogStore = () => {
  const store = inject<DialogStateType>(dialogStoreKey);
  if (!store) throw new Error('DialogStore is undefined')
  return store
}