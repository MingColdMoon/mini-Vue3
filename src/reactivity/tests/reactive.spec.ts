import { reactive } from "../reactive";

describe('reactive', () => {
  it('happy path', () => {
    const user = { age: 10 }
    const effectUser = reactive(user)
    expect(effectUser.age).toBe(10);
    user.age++
    expect(effectUser.age).toBe(11);
  });
});