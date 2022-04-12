import { IS_REACTIVE, IS_READONLY, RAW } from "./enum";

export interface ReactiveObject<T> {
  [IS_REACTIVE]: boolean;
  [IS_READONLY]: boolean;
  [RAW]: T;
}

export type Reactive<T> = T & ReactiveObject<T>;