import { useDialogStore } from ".."

export default () => {
  const store = useDialogStore()
  const close = () => {
    store.state.isShow = false
  }

  return close
}