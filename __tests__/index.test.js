/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import getDiffOfTwoFiles, { getData, getDifference } from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const obj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

let expectedJson;
let expectedYaml;
let expectedIni;

beforeEach(() => {
  expectedJson = fs.readFileSync(getFixturePath('testFile.json'), 'utf-8');
  expectedYaml = fs.readFileSync(getFixturePath('testFile.yml'), 'utf-8');
  expectedIni = fs.readFileSync(getFixturePath('testFile.ini'), 'utf-8');
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

test('get difference of two objects', () => {
  expect(getDifference(obj1, obj2)).toEqual(expectedDiff);
});

test('get difference of two files', () => {
  expect(getDiffOfTwoFiles(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedDiff);
  expect(getDiffOfTwoFiles(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedDiff);
  expect(getDiffOfTwoFiles(getFixturePath('file1.ini'), getFixturePath('file2.ini'))).toEqual(expectedDiff);
});
