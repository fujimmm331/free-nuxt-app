import { computed } from "vue"
import { useDiceIndexPageStore } from ".."

export default () => {
  const { state } = useDiceIndexPageStore()
  return computed(() => state.diceStatus === 'INITIAL' || state.diceStatus === 'STOP' ? 'すたと' : 'すとっぷ')
}