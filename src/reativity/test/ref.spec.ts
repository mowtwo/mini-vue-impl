import { effect } from "../effect"
import { ref } from "../ref"

it("ref", () => {
  const v = ref(1)
  expect(v.value).toBe(1)
  let dummy = 0
  effect(() => {
    console.log('effect')
  })
  v.value += 2
  expect(v.value).toBe(3)
  expect(dummy).toBe(0)
})