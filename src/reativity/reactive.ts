import { isObject } from "../shared/type-guard"
import { RAW } from "./enum"
import { ReactiveHandle, ReadOnlyHandle, ShallowReactiveHandle, ShallowReadonlyHandle } from "./handle"
import { Reactive } from "./type"
import { isProxy } from "./util"

export function reactive<T extends object>(raw: T): Reactive<T> {
  return new Proxy<T>(raw, new ReactiveHandle()) as Reactive<T>
}

export function readonly<T extends object>(raw: T): Reactive<T> {
  return new Proxy<T>(raw, new ReadOnlyHandle()) as Reactive<T>
}

export function shallowReadonly<T extends object>(raw: T): Reactive<T> {
  return new Proxy<T>(raw, new ShallowReadonlyHandle()) as Reactive<T>
}

export function shallowReactive<T extends object>(raw: T): Reactive<T> {
  return new Proxy<T>(raw, new ShallowReactiveHandle()) as Reactive<T>
}

export function toRaw<T>(observed: Reactive<T>): T {
  if (isObject(observed)) {
    if (isProxy(observed)) {
      return observed[RAW] as T;
    } else {
      return observed
    }
  }
  return observed
}