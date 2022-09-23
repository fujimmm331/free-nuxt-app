import { computed } from "vue"
import { useDialogStore } from ".."

export default () => {
  const store = useDialogStore()
  return computed(() => store.state)
}