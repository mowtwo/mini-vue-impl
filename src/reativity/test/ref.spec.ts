import { effect } from "../effect"
import { proxyRefs, ref } from "../ref"

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

it("proxyRefs", () => {
  const obj = {
    a: ref(1),
  }
  const proxy = proxyRefs(obj)
  expect(proxy.a).toBe(1)
  proxy.a = 3
  expect(proxy.a).toBe(3)
  expect(obj.a.value).toBe(3)
  proxy.a = ref(4)
  expect(proxy.a).toBe(4)
  expect(obj.a.value).toBe(4)
})