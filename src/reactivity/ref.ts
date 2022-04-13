import { isObject } from "../shared/type-guard";
import { hasChanged } from "../shared/util";
import { ReactiveEffect } from "./effect";
import { IS_REF } from "./enum";
import { reactive } from "./reactive";
import { trackEffect } from "./track";
import { triggerEffect } from "./trigger";
import { ProxyRefs, UnWrapRefsDeep, _Ref as Ref } from "./type";
import { isRef } from "./util"

class RefImpl<T> {
  private _deps = new Set<ReactiveEffect>();
  constructor(private val: T) { this.init() }
  private init() {
    if (isObject(this.val)) {
      this.val = reactive(this.val);
    }
  }
  get value() {
    trackEffect(this._deps);
    return this.val
  }

  set value(newVal) {
    if (hasChanged(newVal, this.val)) {
      this.val = newVal;
      triggerEffect(this._deps);
    }
  }

  get [IS_REF]() {
    return true as const
  }
}

export function ref<T>(initVal: T): Ref<T> {
  return new RefImpl(initVal)
}

export function unRef<T>(wrapper: Ref<T>): T {
  if (isRef(wrapper)) {
    return wrapper.value
  }
  // 懒得写类型守卫了
  return wrapper as unknown as T
}

export function proxyRefs<T extends object>(obj: T): ProxyRefs<T> {
  return new Proxy<ProxyRefs<T>>(obj as ProxyRefs<T>, {
    get(target, p, receiver) {
      return unRef(Reflect.get(target, p, receiver)) as T[keyof T]
    },
    set(target, p, value, receiver) {
      type K = keyof T
      if (isRef(target[p as K]) && !isRef(value)) {
        return (target[p as K] as unknown as Ref<T[K]>).value = value
      } else {
        return Reflect.set(target, p, value, receiver)
      }
    }
  })
}