const MathUtils = require('../src/MathUtils.js');

describe('add(number1, number2)', () => {
  // test 1
  test('test #1 - confirm 1 + 1 = 2', () => {
    const testCase = {
      number1: Number('7'),
      number2: Number('10'),
      expectedResult: Number('17'),
    };

    expect(MathUtils.add(testCase.number1, testCase.number2)).toEqual(
      testCase.expectedResult,
    );
  });

  // test 2
  test('test #2 - confirm -1 + 1 = 0', () => {
    const testCase = {
      number1: Number('-1'),
      number2: Number('1'),
      expectedResult: Number('0'),
    };

    expect(MathUtils.add(testCase.number1, testCase.number2)).toEqual(
      testCase.expectedResult,
    );
  });
});
