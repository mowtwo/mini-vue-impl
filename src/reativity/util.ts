import { IS_REACTIVE, IS_READONLY, IS_REF } from "./enum";
import { _Reactive as Reactive, _Ref as Ref } from "./type";

export function isReactive<T>(raw: T): boolean {
  return (raw as Reactive<T>)?.[IS_REACTIVE] ?? false;
}

export function isReadonly<T>(raw: T): boolean {
  return (raw as Reactive<T>)?.[IS_READONLY] ?? false;
}

export function isProxy<T>(raw: T): boolean {
  return isReactive(raw) || isReadonly(raw);
}

export function isRef<T>(raw: T): boolean {
  return (raw as unknown as Ref<T>)?.[IS_REF] ?? false;
}