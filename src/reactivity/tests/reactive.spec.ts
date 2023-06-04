import { isReactive } from "../baseHandler";
import { reactive } from "../reactive";

describe('reactive', () => {
  it('happy path', () => {
    const user = { age: 10, info: { name: 'xx' } }
    const effectUser = reactive(user)
    expect(effectUser.age).toBe(10);
    user.age++
    expect(effectUser.age).toBe(11);
    expect(isReactive(effectUser.info)).toBe(true);
  });
});