import { effect, stop } from "../effect";
import { reactive, readonly } from "../reactive";

describe('effect', () => {
  it('should sum', () => {

    let user = reactive({
      age: 10
    })

    let effectAge;

    effect(() => {
      effectAge = user.age + 1
    })
    expect(effectAge).toBe(11);
    
    user.age++;

    expect(effectAge).toBe(12);
  });
  // 先执行effect内的fn，当响应式第一次触发时执行一次scheduler函数，随后返回fn函数
  // 后续可以任意调用fn函数刷新页面
  it('scheduler', () => {
    let dummy;
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(() => {
      dummy = obj.foo
    }, {
      scheduler
    })
    expect(scheduler).not.toBeCalled();
    expect(dummy).toBe(1);
    obj.foo++
    expect(scheduler).toBeCalledTimes(1)
    expect(dummy).toBe(1);
    run()
    expect(dummy).toBe(2);
  });
  it('stop', () => {
    let dummy;
    const obj = reactive({ foo: 1 })
    const runner = effect(() => {
      dummy = obj.foo
    })
    obj.foo = 2
    expect(dummy).toBe(2);
    stop(runner)
    obj.foo = 3
    expect(dummy).toBe(2);
    runner()
    expect(dummy).toBe(3);
  });

  it('onStop', () => {
    const obj = reactive({ foo: 1 })
    const onStop = jest.fn()
    let dummy;
    const runner = effect(() => {
      dummy = obj.foo
    }, {
      onStop
    })

    stop(runner)
    expect(onStop).toBeCalledTimes(1);
  });
});