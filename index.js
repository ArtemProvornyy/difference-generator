import fs from 'fs';
import path from 'path';
import getParser from './src/parsers.js';
import { genDiffOfTwoObj } from './src/gendiff.js';
import recursive from './src/stylish.js';

export const getData = (filepath) => {
  const cwd = process.cwd();
  const absFilepath = filepath.includes(cwd) ? filepath : path.resolve(`${cwd}`, `${filepath}`);

  return fs.readFileSync(absFilepath, 'utf-8');
};

export default (filepath1, filepath2, format) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

  const parse = getParser(filepath1);

  const file1Obj = parse(file1);
  const file2Obj = parse(file2);

  if (format === 'recursive') {
    return recursive(genDiffOfTwoObj(file1Obj, file2Obj));
  }

  return recursive(genDiffOfTwoObj(file1Obj, file2Obj));
};
