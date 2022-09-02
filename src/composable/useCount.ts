import { reactive, toRefs } from "vue"

export type CountState = {
  count: number
  status: 'COUNTING' | 'STOP'
}

/**
 * カウントに関するコンポジションファンクション
 */
export const useCount = () => {
  const countState = reactive<CountState>({
    count: 0,
    status: 'STOP',
  })


  const incrementCount = () => {
    countState.count ++
  }

  const countStart = () => {
    countState.status = 'COUNTING'
  }

  const countStop = () => {
    countState.status = 'STOP'
  }

  return {
    countState,
    incrementCount,
    countStart,
    countStop
  }
}