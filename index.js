import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './src/parsers.js';

export const getData = (filepath) => {
  const cwd = process.cwd();
  const absFilepath = filepath.includes(cwd) ? filepath : path.resolve(`${cwd}`, `${filepath}`);

  return fs.readFileSync(absFilepath, 'utf-8');
};

export const getDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const objectsKeys = [...obj1Keys, ...obj2Keys].sort();

  const uniqObjectsKeys = _.uniq(objectsKeys);

  const difference = uniqObjectsKeys.reduce((acc, key) => {
    const firstObjValue = obj1[key];
    const secondObjValue = obj2[key];

    const hasFirstObjKey = _.has(obj1, key);
    const hasSecondObjKey = _.has(obj2, key);

    if (hasFirstObjKey && !hasSecondObjKey) {
      return [...acc, `- ${key}: ${firstObjValue}`];
    }
    if (!hasFirstObjKey && hasSecondObjKey) {
      return [...acc, `+ ${key}: ${secondObjValue}`];
    }
    if (firstObjValue !== secondObjValue) {
      return [...acc, `- ${key}: ${firstObjValue}`, `+ ${key}: ${secondObjValue}`];
    }

    return [...acc, `  ${key}: ${firstObjValue}`];
  }, []);

  return `{\n  ${difference.join('\n  ')}\n}`;
};

export default (filepath1, filepath2) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

  const parse = getParser(filepath1);

  const file1Obj = parse(file1);
  const file2Obj = parse(file2);

  return getDifference(file1Obj, file2Obj);
};
