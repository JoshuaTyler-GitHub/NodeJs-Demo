// test resource
const MyClass = require('./index.js');

describe('MyClass.add', () => {
  test('verify integer + integer = integer', () => {
    const myClass = new MyClass();
    expect(myClass.add(1, 2)).toBe(3);
    expect(myClass.add(0, 0)).toBe(0);
  });

  test('verify BigInteger + integer throws error', () => {
    const myClass = new MyClass();
    expect(() => myClass.add(151325980172359821305019283572103958, 2)).toThrow();
  });

  test('verify float + integer = float', () => {
    const myClass = new MyClass();
    expect(myClass.add(1.2, 2)).toBe(3.2);
  });

  test('verify null + undefined = ?', () => {
    const myClass = new MyClass();
    expect(myClass.add(null, undefined)).toBe(NaN);
  });
});
