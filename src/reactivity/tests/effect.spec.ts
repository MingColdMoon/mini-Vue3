import { effect } from "../effect";
import { reactive } from "../reactive";

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
});