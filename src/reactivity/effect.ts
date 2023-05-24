import type { options } from './types/index';
// 接受一个fn，存为私有变量中，将当前fn的作用域存起来，暴露出一个run方法来执行该fn，后续trigger触发时会执行这个fn
class ReactiveEffect {
  private _fn: any;

  constructor (fn: any, public scheduler?: () => void) {
    this._fn = fn
  }

  run () {
    activeEffect = this
    return this._fn()
  }
}

// 将当前fn实例化并执行一次
export function effect(fn: any, options: options = {}) {
  let _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()
  const runner = _effect.run.bind(_effect)
  return runner
};

// 定义一个当前作用域变量，后续当trigger触发时可以去作用域中拿到run方法
let activeEffect: any;
let targetMap = new Map()

/**
 * 依赖收集，将被reactive的对象存为target，访问target的每个key存为target对应的value，key的value对应存为被effect包裹的函数
 * { age: 10 }: age: fn(被effect包裹的函数)
 * 相当于，你给我一个响应式对象，每当fn中访问响应式对象中的属性时，我存下当前属性并将涉及该属性的函数也映射存下来，后续该属性值变了，涉及到的函数也要重新变
 * @param target 
 * @param key 
 */
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

/**
 * 触发依赖，当属性被修改时触发，从targetMap中拿到触发属性更新的fn作用域并执行。
 * 相当于外部的属性值已经变化了，现在需要刷新fn中引用了该属性的值
 * @param target 
 * @param key 
 */
export function trigger(target: any, key: any) {
  const keyMap = targetMap.get(target)
  const effects = keyMap.get(key)
  for (const effect of effects) {
    // 判断是否有scheduler，如果有则执行，否则则执行run
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
};
