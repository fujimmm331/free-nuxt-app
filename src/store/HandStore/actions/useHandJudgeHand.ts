import useDiceIndexPageGetResult from "@/store/DiceIndexPageStore/selector/useDiceIndexPageGetResult"
import useHandSetHand from "./useHandSetHand"

export default () => {
  const diceResult = useDiceIndexPageGetResult()
  const setHandState = useHandSetHand()
  const judgeHands = () => {
    if (diceResult.value.includes('N') && diceResult.value.includes('KO')) {
      judgeNkoHands()
    }


    if (diceResult.value.includes('N') && diceResult.value.includes('CHI')) {
      judgeNchiHands()
    }
  }

  const judgeNkoHands = () => {
    if (diceResult.value.includes('U')) {
      setHandState('UNKO')
    }

    if (diceResult.value.includes('MA')) {
      setHandState('MANKO')
    }

    if (diceResult.value.includes('CHI')) {
      setHandState('CHINKO')
    }

    if (diceResult.value.includes('O') && diceResult.value.includes('CHI')) {
      setHandState('OCHINKO')
    }

    if (diceResult.value.includes('O') && diceResult.value.includes('MA')) {
      setHandState('OMANKO')
    }

  }

  const judgeNchiHands = () => {
    if (diceResult.value.includes('U')) {
      setHandState('UNCHI')
    }

    const numOfCHI = diceResult.value.filter((value) => value === 'CHI').length
    const numOfN = diceResult.value.filter((value) => value === 'N').length

    if (numOfCHI >= 2 && numOfN >= 2 && diceResult.value.includes('O')) {
      setHandState('OCHINCHIN')
    }

    if (numOfCHI >= 2 && numOfN >= 2) {
      setHandState('CHINCHIN')
    }
  }

  return judgeHands
}