import { computed } from "vue"
import { useDiceIndexPageStore } from ".."

export default () => {
  const store = useDiceIndexPageStore()
  return computed(() => store.state.result)
}