import { effect } from "../effect"
import { reactive } from "../reactive"

describe('effect', () => {
  it('happy path', () => {
    const state = reactive({
      count: 0
    })
    let dummy: number = -1
    effect(() => {
      dummy = state.count
    })
    expect(dummy).toBe(0)
    state.count++
    expect(dummy).toBe(1)
  })
})