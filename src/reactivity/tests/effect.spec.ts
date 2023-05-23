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
});