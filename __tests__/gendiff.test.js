import { genDiffOfTwoObj, stringify } from '../src/gendiff.js';

test('generate difference of two objects', () => {
  expect(genDiffOfTwoObj({ a: 1, b: 4 }, { a: 1, b: 3, c: 2 })).toEqual('  a: 1,- b: 4,+ b: 3,+ c: 2');
  expect(genDiffOfTwoObj({ c: { d: 3 } }, { c: { e: 1, d: 4 } })).toEqual('  c: {- d: 3,+ d: 4,+ e: 1}');
});

test('stringify object', () => {
  expect(stringify({ a: 1, b: 4 })).toBe('{  a: 1,  b: 4}');
  expect(stringify({ c: { d: 3 } })).toBe('{  c: {  d: 3}}');
});
