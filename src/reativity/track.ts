import { ReactiveEffect } from "./effect";

export const targetMap = new WeakMap<object, Map<string | symbol, Set<ReactiveEffect>>>();

export function track<T extends object>(target: T, key: string | symbol) {
  // if (!ReactiveEffect.isTrackable) {
  //   return
  // }
  /**
   * 获取当前代理对象的所有Effect的map，若不存在则创建
   */
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  /**
   * 获取当前key对应的Effect，若不存在则创建 
   */
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, deps = new Set());
  }
  /**
   * 添加当前Effect
   */
  // deps.add(ReactiveEffect.activeEffect!);
  trackEffect(deps)
}

export function trackEffect(deps: Set<ReactiveEffect>) {
  if (deps.has(ReactiveEffect.activeEffect!) || !ReactiveEffect.activeEffect) {
    return
  }
  deps.add(ReactiveEffect.activeEffect!)
  ReactiveEffect.activeEffect.deps.push(deps)
}