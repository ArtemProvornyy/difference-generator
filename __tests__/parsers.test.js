import yaml from 'js-yaml';
import getParser from '../src/parsers.js';

test('get parser', () => {
  expect(getParser('file.json')).toBe(JSON.parse);
  expect(getParser('file.JSON')).toBe(JSON.parse);
  expect(getParser('file.yml')).toBe(yaml.safeLoad);
  expect(getParser('file.yaml')).toBe(yaml.safeLoad);
});
