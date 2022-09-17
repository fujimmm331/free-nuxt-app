import { DiceRollType } from "@/types"
import { useDiceIndexPageStore } from ".."

export default () => {
  const { state } = useDiceIndexPageStore()
  const setResult = (result: DiceRollType) => {
    state.result = [...state.result, result]
  }

  return setResult
}