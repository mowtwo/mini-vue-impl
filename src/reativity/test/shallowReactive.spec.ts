import { shallowReactive, shallowReadonly } from "../reactive";
import { isReactive, isReadonly } from "../util";

it('shallowReactiveAndReadonly', () => {
  const reactive = shallowReactive({
    foo: 1,
    bar: {
      baz: 2,
    },
  });

  const readonly = shallowReadonly({
    a: 1
  })
  expect(isReactive(reactive)).toBe(true)
  expect(isReactive(reactive.bar)).toBe(false)
  expect(isReadonly(readonly)).toBe(true)
  expect(isReadonly(reactive)).toBe(false)
})
