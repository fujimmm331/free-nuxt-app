import { useDiceStore } from ".."

export default () => {
  const { state } = useDiceStore()
  const start = () => {
    state.status = 'START'
  }

  return start
}