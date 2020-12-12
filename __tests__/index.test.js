/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedRecursive;
let expectedPlain;
let expectedJson;

beforeEach(() => {
  expectedRecursive = readFile('recursive.txt');
  expectedPlain = readFile('plain.txt');
  expectedJson = readFile('json.txt');
});

describe('Generate difference of two files', () => {
  test('recursive.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expectedRecursive);
  });
  test('plain.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedPlain);
  });
  test('json.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(expectedJson);
  });
  test('recursive.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(expectedRecursive);
  });
  test('plain.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(expectedPlain);
  });
  test('json.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(expectedJson);
  });
  test('recursive.ini', () => {
    expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'stylish')).toEqual(expectedRecursive);
  });
  test('plain.ini', () => {
    expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'plain')).toEqual(expectedPlain);
  });
  test('json.ini', () => {
    expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'json')).toEqual(expectedJson);
  });
});
