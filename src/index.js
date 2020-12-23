import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import buildAST from './gendiff.js';
import switchFormat from './formatters/index.js';

const getContent = (filepath) => {
  const cwd = process.cwd();
  const absFilepath = path.resolve(cwd, filepath);

  return fs.readFileSync(absFilepath, 'utf-8');
};

export default (filepath1, filepath2, format) => {
  const content1 = getContent(filepath1);
  const content2 = getContent(filepath2);

  const parse1 = getParser(filepath1);
  const parse2 = getParser(filepath2);

  const content1Obj = parse1(content1);
  const content2Obj = parse2(content2);

  const formatter = switchFormat(format);

  return formatter(buildAST(content1Obj, content2Obj));
};
