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
  expectedJson = fs.readFileSync('/home/artem/study/hexlet-projects/gendiff/testFile.json', 'utf-8');
});

test('get data from file', () => {
  expect(getData('testFile.json')).toEqual(expectedJson);
  expect(getData('/home/artem/study/hexlet-projects/gendiff/testFile.json')).toEqual(expectedJson);
});

test('get difference of two json files', () => {
  expect(getJSONDiff('file1.json', 'file2.json')).toEqual(jsonDiff);
  expect(getJSONDiff('/home/artem/study/hexlet-projects/gendiff/file1.json', '/home/artem/study/hexlet-projects/gendiff/file2.json')).toEqual(jsonDiff);
});
