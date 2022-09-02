import { useCount } from "@/composable/useCount"


describe('useCount', () => {
  describe('#incrementCount', () => {
    const { incrementCount, countState } = useCount()

    it('1個加算されること', () => {
      expect(countState.count).toBe(0)
      incrementCount()
      expect(countState.count).toBe(1)
    })
  })

  describe('#countStart', () => {
    const { countStart, countState } = useCount()
    beforeEach(() => {
      countState.status = 'STOP'
    })

    it('status が COUNTING になること', () => {
      expect(countState.status).toBe('STOP')
      countStart()
      expect(countState.status).toBe('COUNTING')
    })
  })

  describe('#countStop', () => {
    const { countStop, countState } = useCount()

    beforeEach(() => {
      countState.status = 'COUNTING'
    })

    it('status が STOP になること', () => {
      expect(countState.status).toBe('COUNTING')
      countStop()
      expect(countState.status).toBe('STOP')
    })
  })
})