/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let beforeStylish;
let firstExpectedStylish;

beforeAll(() => {
  beforeStylish = readFile('diff.txt');
  firstExpectedStylish = readFile('result.txt');
});

const secondExpectedStylish = `{
    c: {
      - d: 3
      + d: 4
      + e: 1
    }
  + f: {
        g: 2
    }
}`;

test('stylish a string', () => {
  expect(stylish(beforeStylish)).toBe(firstExpectedStylish);
  expect(stylish('  c: {- d: 3,+ d: 4,+ e: 1},+ f: {  g: 2}')).toBe(secondExpectedStylish);
});
