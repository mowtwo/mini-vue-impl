import { IS_REACTIVE, IS_READONLY, IS_REF, RAW } from "./enum";

export interface ReactiveObject<T> {
  [IS_REACTIVE]: boolean;
  [IS_READONLY]: boolean;
  [RAW]: T;
}

export type _Reactive<T> = T & ReactiveObject<T>;

export type _Ref<T> = {
  value: T;
  [IS_REF]: true
}

export type Reactive<T> = T

export type Ref<T> = { value: T }

export type UnWrapRef<T> = T extends Ref<infer V> ? V : T

export type UnWrapRefs<T> = {
  [K in keyof T]: UnWrapRef<T[K]>
}

export type UnWrapRefsDeep<T> = {
  [K in keyof T]: T[K] extends Ref<infer V> ? UnWrapRefsDeep<V> : T[K]
}

export type ProxyRefs<T> = {
  [K in keyof T]: T[K] extends Ref<infer V> ? V | Ref<V> : T[K] | Ref<T[K]>
}