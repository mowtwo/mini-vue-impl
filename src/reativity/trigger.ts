import { ReactiveEffect } from "./effect";
import { targetMap } from "./track";

export function trigger<T extends object>(target: T, key: string | symbol) {
  /**
   * 获取当前代理对象的所有Effect的map，然后遍历调用
   */
  const depsMap = targetMap.get(target);
  const deps = depsMap && depsMap.get(key);
  triggerEffect(deps)
}

export function triggerEffect(deps?: Set<ReactiveEffect>) {
  for (const effect of deps ?? []) {
    effect.run();
  }
}