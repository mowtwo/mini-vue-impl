import { track } from "./track"
import { trigger } from "./trigger"

export function reactive<T extends Object>(target: T): T {
  return new Proxy<T>(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      track(target, key)
      return value
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    }
  })
}