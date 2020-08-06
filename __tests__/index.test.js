import fs from 'fs';
import getJSONDiff, { getData } from '..';

const jsonDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

let expectedJson;

beforeAll(() => {
  expectedJson = fs.readFileSync('__tests__/testFile.json', 'utf-8');
});

test('get data from file', () => {
  expect(getData('__tests__/testFile.json')).toEqual(expectedJson);
});

test('get difference of two json files', () => {
  expect(getJSONDiff('__tests__/file1.json', '__tests__/file2.json')).toEqual(jsonDiff);
});
