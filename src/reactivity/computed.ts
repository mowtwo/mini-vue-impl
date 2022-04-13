import { ReactiveEffect } from "./effect";
import { Ref } from "./type";

class Computed<T> {
  private dirty = true
  private effect: ReactiveEffect;
  private val: T | undefined

  constructor(private getter: () => T) {
    this.effect = new ReactiveEffect(this.getter, {
      scheduler: () => {
        this.dirty = true
      }
    })
  }

  get value(): T {
    if (this.dirty) {
      this.val = this.effect.run()
      this.dirty = false
    }
    return this.val!
  }
}

export function computed<T>(getter: () => T): Readonly<Ref<T>> {
  return new Computed(getter) as Readonly<Ref<T>>
}