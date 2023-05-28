import { isReactive, isReadOnly } from "../baseHandler";
import { reactive, readonly } from "../reactive";

describe('readonly', () => {
  it('readonly', () => {
    const original = { foo: 1 }
    const obj = readonly(original)
    expect(obj).not.toBe(original);
    expect(obj.foo).toBe(1);
  });
  it('throw waring', () => {
    console.warn = jest.fn()

    const user = readonly({ age: 10 })
    user.age = 11
    expect(user.age).toBe(10);
    expect(console.warn).toBeCalled();
  });
  it('isReactive', () => {
    const obj = reactive({ foo: 1 })
    expect(isReactive(obj)).toBe(true);
  });
  it('isReadOnly', () => {
    const obj = reactive({ foo: 1 })
    const rObj = readonly(obj)
    expect(isReadOnly(rObj)).toBe(true);
  });
});