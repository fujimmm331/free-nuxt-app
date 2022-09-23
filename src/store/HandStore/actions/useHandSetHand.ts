import { HandKeyType } from "@/const"
import { useHandStore } from ".."

export default () => {
  const store = useHandStore()

  const setHandState = (hand: HandKeyType) => {
    store.state.result.push(hand)
  }

  return setHandState
}