import { isObject } from "../shared/type-guard"
import { FLAG, RAW, IS_REACTIVE, IS_READONLY } from "./enum"
import { reactive, readonly as readonlyReactive } from "./reactive"
import { track } from "./track"
import { trigger } from "./trigger"

type Get<T extends object> = ProxyHandler<T>['get']
type Set<T extends object> = ProxyHandler<T>['set']

interface Getter<T extends object> {
  get: Get<T>
}

interface Setter<T extends object> {
  set: Set<T>
}

interface Handler<T extends object> extends Getter<T>, Setter<T> { }


export abstract class BaseHandle<T extends object> implements Handler<T> {
  constructor(readonly readonly = false, readonly shallow = false) { }
  get(target: T, p: string | symbol, receiver: any): T | boolean {
    // todo
    if (p === IS_REACTIVE || p === IS_READONLY) {
      // 如果是reactive或者readnoly，则根据当前的readonly判断返回
      return flagValue(p as FLAG, this)
    } else if (p === RAW) {
      // 这里直接返回raw的值
      return target
    }
    const res = Reflect.get(target, p, receiver) as T
    if (this.shallow) {
      // 浅层代理，不再进行深层代理
      return res
    }
    if (isObject(res)) {
      // 如果是对象，则进行深层代理
      if (this.readonly) {
        return readonlyReactive<T>(res)
      } else {
        return reactive<T>(res)
      }
    }
    // 依赖收集
    if (!this.readonly) {
      track(target, p)
    }
    return res
  }

  set(target: T, p: string | symbol, value: any, receiver: any) {
    const res = Reflect.set(target, p, value, receiver)
    trigger(target, p)
    return res
  }
}

function flagValue(flag: FLAG, handle: BaseHandle<object>) {
  switch (flag) {
    case FLAG.IS_REACTIVE: return !handle.readonly
    case FLAG.IS_READONLY: return handle.readonly
  }
  return false
}

export class ReadonlyHandle<T extends object> extends BaseHandle<T> {
  constructor() {
    super(true)
  }
  set() {
    return false
  }
}

export class ReactiveHandle<T extends object> extends BaseHandle<T> {
  constructor() {
    super(false, false)
  }
}

export class ShallowReadonlyHandle<T extends object> extends BaseHandle<T> {
  constructor() {
    super(true, true)
  }
}

export class ShallowReactiveHandle<T extends object> extends BaseHandle<T> {
  constructor() {
    super(false, true)
  }
}