import { mutableHandlers, readonlyHandlers } from "./baseHandler"

export function reactive(raw: any) {
  return new Proxy(raw, mutableHandlers)
};

export function readonly(raw: any) {
  return new Proxy(raw, readonlyHandlers)
}
