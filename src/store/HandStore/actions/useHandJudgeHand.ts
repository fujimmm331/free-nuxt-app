import useDiceIndexPageGetResult from "@/store/DiceIndexPageStore/selector/useDiceIndexPageGetResult"
import useHandSetHand from "./useHandSetHand"

export default () => {
  const diceResult = useDiceIndexPageGetResult()
  const setHandState = useHandSetHand()
  const judgeHands = () => {
    if (diceResult.value.includes('U') && diceResult.value.includes('N') && diceResult.value.includes('KO')) {
      setHandState('UNKO')
    }

    if (diceResult.value.includes('MA') && diceResult.value.includes('N') && diceResult.value.includes('KO')) {
      setHandState('MANKO')
    }

    if (diceResult.value.includes('CHI') && diceResult.value.includes('N') && diceResult.value.includes('KO')) {
      setHandState('CHINKO')
    }

    if (diceResult.value.includes('O') && diceResult.value.includes('CHI') && diceResult.value.includes('N') && diceResult.value.includes('KO')) {
      setHandState('OCHINKO')
    }

    if (diceResult.value.includes('O') && diceResult.value.includes('MA') && diceResult.value.includes('N') && diceResult.value.includes('KO')) {
      setHandState('OMANKO')
    }

    if (diceResult.value.includes('U') && diceResult.value.includes('N') && diceResult.value.includes('CHI')) {
      setHandState('UNCHI')
    }
  }

  return judgeHands
}