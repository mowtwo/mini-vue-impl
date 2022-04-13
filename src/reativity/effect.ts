interface OnStop {
  onStop: () => void;
}

interface ReactiveEffectOption {

}

interface Runner {
  effect: ReactiveEffect;
  (): void;
}

type ReactiveEffectOptionKey = keyof ReactiveEffectOption

class ReactiveEffectOptionValue {
  constructor(private options: ReactiveEffectOption) { }
  get<T extends ReactiveEffectOptionKey>(key: T, defaultValue?: ReactiveEffectOption[T]): ReactiveEffectOption[T] | undefined {
    return (this.options[key] || defaultValue) ?? undefined
  }
}

export class ReactiveEffect<T extends Function = Function> {
  /**当前effect */
  static activeEffect: ReactiveEffect | undefined = undefined
  /**是否应该track的标记 */
  static shouldTrack = true
  /**是否可以track */
  static get isTrackable() {
    return ReactiveEffect.shouldTrack && ReactiveEffect.activeEffect !== undefined
  }

  static cleanup(effect: ReactiveEffect) {
    if (ReactiveEffect.activeEffect) {
      for (const deps of effect.deps) {
        deps.delete(effect)
      }
      effect.deps = []
    }
  }

  deps: Array<Set<ReactiveEffect>> = []
  active = true
  _onStop?: () => void

  constructor(private fn: T, private _options: Partial<ReactiveEffectOption> = {}) { }
  get options() {
    return new ReactiveEffectOptionValue(this._options)
  }
  set onStop(fn: (() => void) | undefined) {
    this._onStop = fn
  }
  run() {
    if (!this.active) {
      return this.fn()
    }
    ReactiveEffect.shouldTrack = true
    ReactiveEffect.activeEffect = this
    const res = this.fn()
    ReactiveEffect.shouldTrack = false
    return res
  }

  stop() {
    ReactiveEffect.cleanup(this)
    this._onStop?.()
    this.active = false
  }
}

export function effect<T extends Function>(fn: T, options?: Partial<ReactiveEffectOption & OnStop>) {
  // 分解options
  const { onStop, ...EffectOptions } = options ?? {}
  const _effect = new ReactiveEffect(fn, EffectOptions)
  _effect.onStop = onStop
  _effect.run()

  const runner = (() => {
    _effect.run()
  }) as Runner
  runner.effect = _effect
  return runner
}

export function stop(effect: ReactiveEffect) {
  effect.stop()
}