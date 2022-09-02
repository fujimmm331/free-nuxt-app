import { reactive } from "vue"

export type TargetState = {
  number: number
  status: 'UNSET' | 'SET'
}

/**
 * 止める数字に関するコンポジションファンクション
 */
export const useTarget = () => {
  const targetState = reactive<TargetState>({
    number: 0,
    status: 'UNSET',
  })

  const setTarget = () => {
    if(targetState.status === 'SET') return

    targetState.number = Math.floor( Math.random() * 200 ) + 100
    targetState.status = 'SET'
  }

  return {
    targetState,
    setTarget
  }
}