import { HandType } from "@/types"
import { useHandStore } from ".."

export default () => {
  const store = useHandStore()

  const setHandState = (hand: HandType) => {
    store.state.result.push(hand)
  }

  return setHandState
}