import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import buildDiff from './gendiff.js';
import switchFormat from './formatters/index.js';

const getContent = (filepath) => {
  const cwd = process.cwd();
  const absFilepath = path.resolve(cwd, filepath);

  return fs.readFileSync(absFilepath, 'utf-8');
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = getContent(filepath1);
  const content2 = getContent(filepath2);

  const extention1 = path.extname(filepath1).toLowerCase();
  const extention2 = path.extname(filepath2).toLowerCase();

  const parse1 = getParser(extention1);
  const parse2 = getParser(extention2);

  const content1Obj = parse1(content1);
  const content2Obj = parse2(content2);

  const format = switchFormat(formatName);

  return format(buildDiff(content1Obj, content2Obj));
};
