/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import genDiff, { getData } from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedRecursive;
let expectedPlain;

beforeEach(() => {
  expectedRecursive = readFile('recursive.txt');
  expectedPlain = readFile('plain.txt');
});

describe('Generate difference of two files', () => {
  test('recursive.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expectedRecursive);
  });
  test('plain.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedPlain);
  });
  test('recursive.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(expectedRecursive);
  });
  test('plain.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(expectedPlain);
  });
  test('recursive.ini', () => {
    expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'stylish')).toEqual(expectedRecursive);
  });
  test('plain.ini', () => {
    expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'plain')).toEqual(expectedPlain);
  });
});
