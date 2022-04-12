import { IS_REACTIVE, IS_READONLY } from "./enum";
import { Reactive } from "./type";

export function isReactive<T>(raw: T): boolean {
  return (raw as Reactive<T>)?.[IS_REACTIVE] ?? false;
}

export function isReadonly<T>(raw: T): boolean {
  return (raw as Reactive<T>)?.[IS_READONLY] ?? false;
}

export function isProxy<T>(raw: T): boolean {
  return isReactive(raw) || isReadonly(raw);
}