import { isObject } from "../utils"
import { track, trigger } from "./effect"
import { reactive, readonly } from "./reactive"

const BASE_ENUM = {
  '_v_isReactive': '_v_isReactive',
  '_v_isReadOnly': '_v_isReadOnly'
}

// 封装getter和setter
const set = createSetter()
const get = createGetter()
const readonlyFn = createGetter(true)

export function createGetter (isReadOnly = false) {
  return function get (target: any, key: any): any {
    // isReactive方法的判断
    if (key === BASE_ENUM._v_isReactive) {
      return true
    }
     // isReadOnly方法的判断
    if (key === BASE_ENUM._v_isReadOnly) {
      return isReadOnly
    }

    const res = Reflect.get(target, key)

    // 依赖收集
    if (!isReadOnly) {
      track(target, key)
    }

    // 判断是否是个嵌套的对象
    if (isObject(res)) {
      return isReadOnly ? readonly(res) : reactive(res)
    }
    return res
  }
}

export function createSetter () {
  return function set (target: any, key: any, value: any) {
    // 执行依赖
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

export function isReactive (reactiveObj: { [x: string]: any }) {
  return !!reactiveObj[BASE_ENUM._v_isReactive]
}

export function isReadOnly (reactiveObj: { [x: string]: any }) {
  return !!reactiveObj[BASE_ENUM._v_isReadOnly]
}

export const mutableHandlers = {
  set,
  get
}

export const readonlyHandlers = {
  get: readonlyFn,
  set (target: any, key: string, value: any) {
    console.warn(`key: ${key} setter 失败，因为target是一个只读对象`)
    return true
  }
}