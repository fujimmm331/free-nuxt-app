import { useDiceStore } from ".."

export default () => {
  const { state } = useDiceStore()
  const setDiceIndex = (index: number) => {
    state.index = index
  }

  return setDiceIndex
}