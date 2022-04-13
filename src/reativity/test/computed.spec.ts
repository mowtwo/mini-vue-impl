import { computed } from "../computed"
import { reactive } from "../reactive"
import { ref } from "../ref"

it("computed", () => {
  const a = reactive({ n: 1 })
  const b = ref(1)
  const n = computed(() => a.n + b.value)
  expect(n.value).toBe(2)
  a.n = 2
  b.value = 3
  let dummy = 0
  expect(n.value).toBe(5)
  expect(dummy).toBe(1)
})