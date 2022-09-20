import { useDialogStore } from ".."

export default () => {
  const store = useDialogStore()
  const open = () => {
    store.state.isShow = true
  }

  return open
}