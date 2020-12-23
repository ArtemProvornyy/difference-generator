import fs from 'fs';
import path from 'path';
import getParser from './src/parsers.js';
import buildAST from './src/gendiff.js';
import switchFormat from './src/formatters/index.js';

const getContent = (filepath) => {
  const cwd = process.cwd();
  const absFilepath = path.resolve(cwd, filepath);

  return fs.readFileSync(absFilepath, 'utf-8');
};

export default (filepath1, filepath2, format) => {
  const content1 = getContent(filepath1);
  const content2 = getContent(filepath2);

  const parse = getParser(filepath1);

  const file1Obj = parse(content1);
  const file2Obj = parse(content2);

  const formatter = switchFormat(format);

  return formatter(buildAST(file1Obj, file2Obj));
};
