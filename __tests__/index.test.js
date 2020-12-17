/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const table = [
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['ini', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
];

describe('Generate difference of two files', () => {
  test.each(table)('from %s to %s', (extention, format) => {
    const before = getFixturePath(`file1.${extention}`);
    const after = getFixturePath(`file2.${extention}`);
    const result = readFile(`${format}.txt`);

    expect(genDiff(before, after, format)).toEqual(result);
  });
});
