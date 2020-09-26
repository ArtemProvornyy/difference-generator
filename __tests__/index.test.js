/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import genDiffOfTwoFiles, { getData } from '..';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedJson;
let expectedYaml;
let expectedIni;
let expectedDiff;

beforeEach(() => {
  expectedJson = readFile('testFile.json');
  expectedYaml = readFile('testFile.yml');
  expectedIni = readFile('testFile.ini');
  expectedDiff = readFile('result.txt');
});

describe('get data from file', () => {
  test('absolute path', () => {
    expect(getData(getFixturePath('testFile.json'))).toEqual(expectedJson);
    expect(getData(getFixturePath('testFile.yml'))).toEqual(expectedYaml);
    expect(getData(getFixturePath('testFile.ini'))).toEqual(expectedIni);
  });
  test('relative path', () => {
    expect(getData('__fixtures__/testFile.json')).toEqual(expectedJson);
    expect(getData('__fixtures__/testFile.yml')).toEqual(expectedYaml);
    expect(getData('__fixtures__/testFile.ini')).toEqual(expectedIni);
  });
});

test('generate difference of two files', () => {
  expect(genDiffOfTwoFiles(getFixturePath('file1.json'), getFixturePath('file2.json'), stylish)).toEqual(expectedDiff);
  expect(genDiffOfTwoFiles(getFixturePath('file1.yml'), getFixturePath('file2.yml'), stylish)).toEqual(expectedDiff);
  expect(genDiffOfTwoFiles(getFixturePath('file1.ini'), getFixturePath('file2.ini'), stylish)).toEqual(expectedDiff);
});
