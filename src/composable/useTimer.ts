import { reactive } from "vue"
import { CountState } from "./useCount"

type TimerState = {
  ms: number
}

/**
 * タイマーに関するコンポジションファンクション
 */
export const useTimer = () => {
  const timerState = reactive<TimerState>({
    ms: 0,
  })

  const setMs = () => {
    timerState.ms = Math.floor( Math.random() * 100 )
  }

  return {
    timerState,
    setMs,
  }
}