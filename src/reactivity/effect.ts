class ReactiveEffect {
  private _fn: any;

  constructor (fn: any) {
    this._fn = fn
  }

  run () {
    activeEffect = this
    this._fn()
  }
}

export function effect(fn: any) {
  let _effect = new ReactiveEffect(fn)
  _effect.run()
};

let activeEffect: any;
let targetMap = new Map()

export function track(target: any, key: any) {
  // targetMap => key => fn
  let keyMap = targetMap.get(target)
  if (!keyMap) {
    keyMap = new Map()
    targetMap.set(target, keyMap)
  }
  let dep = keyMap.get(key)
  if (!dep) {
    dep = new Set()
    keyMap.set(key, dep)
  }
  dep.add(activeEffect)
};

export function trigger(target: any, key: any) {
  const keyMap = targetMap.get(target)
  const effects = keyMap.get(key)
  for (const effect of effects) {
    effect.run()
  }
};
