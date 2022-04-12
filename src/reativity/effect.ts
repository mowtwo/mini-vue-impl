export class ReactiveEffect<T extends Function = Function> {
  /**当前effect */
  static activeEffect: ReactiveEffect
  constructor(private fn: T) { }
  run() {
    /**调用时就会将当前设置为激活的effect */
    ReactiveEffect.activeEffect = this;
    this.fn()
  }
}

export function effect<T extends Function>(fn: T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}