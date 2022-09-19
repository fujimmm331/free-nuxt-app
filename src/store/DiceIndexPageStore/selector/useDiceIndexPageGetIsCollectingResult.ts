import { computed } from "vue"
import { useDiceIndexPageStore } from ".."

export default () => {
  const { state } = useDiceIndexPageStore()
  return computed<boolean>(() => {
    if (state.diceStatus === 'INITIAL' || state.diceStatus === 'START') {
      return false
    }

    return state.result.length !== state.displayNumber
  })
}