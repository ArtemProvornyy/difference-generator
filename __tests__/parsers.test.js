import yaml from 'js-yaml';
import ini from 'ini';
import getParser from '../src/parsers.js';

test('get parser', () => {
  expect(getParser('file.json')).toBe(JSON.parse);
  expect(getParser('file.JSON')).toBe(JSON.parse);
  expect(getParser('file.yml')).toBe(yaml.safeLoad);
  expect(getParser('file.yaml')).toBe(yaml.safeLoad);
  expect(getParser('file.ini')).toBe(ini.parse);
});
