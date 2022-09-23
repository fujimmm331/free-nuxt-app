import { computed } from "vue"
import { useHandStore } from ".."

export default () => {
  const store = useHandStore()
  return computed(() => store.state)
}