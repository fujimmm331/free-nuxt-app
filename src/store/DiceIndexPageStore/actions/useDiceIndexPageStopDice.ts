import { useDiceIndexPageStore } from ".."

export default () => {
  const { state } = useDiceIndexPageStore()
  const stopDice = () => {
    state.diceStatus = 'STOP'
  }

  return stopDice
}