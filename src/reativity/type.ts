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