import { useDiceStore } from ".."

export default () => {
  const { state } = useDiceStore()
  const stop = () => {
    state.status = 'STOP'
  }

  return stop
}