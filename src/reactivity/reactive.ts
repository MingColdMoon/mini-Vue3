import { track, trigger } from "./effect"

export function reactive(raw: any) {
  return new Proxy(raw, {
    get (target, key) {
      // 依赖收集
      const res = Reflect.get(target, key)
      track(target, key)
      return res
    },
    set (target, key, value) {
      // 执行依赖
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
};
