// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
    { a: 6, b: 2, action: 'no', expected: null },
    
  ]; 

  // This test case is just to run this test suite, remove it when you write your own tests
  //for(let items of testCases) {
   // expect(simpleCalculator({ items.a:unknown, items.b, items.action })).toBe(items.expected);
  
   describe('simpleCalculator', () => {
    test.each(testCases)('Array table tests', ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
    });
  });
  // Consider to use Jest table tests API to test all cases above
