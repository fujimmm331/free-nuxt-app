import { DiceRollType } from "@/types"
import { useDiceIndexPageStore } from ".."

export default () => {
  const { state } = useDiceIndexPageStore()
  const initializeResult = () => {
    state.result = []
  }

  return initializeResult
}