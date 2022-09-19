import { useDiceIndexPageStore } from ".."

export default () => {
  const { state } = useDiceIndexPageStore()
  const startDice = () => {
    state.diceStatus = 'START'
  }

  return startDice
}