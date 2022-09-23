import { HandKeyType } from "@/const"
import { useHandStore } from ".."

export default () => {
  const store = useHandStore()

  const resetHandState = () => {
    store.state.result = []
  }

  return resetHandState
}