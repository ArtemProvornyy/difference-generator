/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import getJSONDiff, { getData } from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

const expectedJson = fs.readFileSync(getFixturePath('testFile.json'), 'utf-8');
const jsonDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('get data from file', () => {
  expect(getData(getFixturePath('testFile.json'))).toEqual(expectedJson);
  expect(getData('__fixtures__/testFile.json')).toEqual(expectedJson);
});

test('get difference of two json files', () => {
  expect(getJSONDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(jsonDiff);
  expect(getJSONDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(jsonDiff);
});
