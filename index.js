import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const getData = (filepath) => {
  const cwd = process.cwd();
  const absFilepath = filepath.includes('/') ? filepath : path.resolve(`${cwd}`, `${filepath}`);

  return fs.readFileSync(absFilepath, 'utf-8');
};

export default (filepath1, filepath2) => {
  const jsonFile1 = getData(filepath1);
  const jsonFile2 = getData(filepath2);

  const jsonFile1Obj = JSON.parse(jsonFile1);
  const jsonFile2Obj = JSON.parse(jsonFile2);

  const jsonFile1Keys = Object.keys(jsonFile1Obj);
  const jsonFile2Keys = Object.keys(jsonFile2Obj);

  const filesKeys = [...jsonFile1Keys, ...jsonFile2Keys].sort();

  const uniqFilesKeys = _.uniq(filesKeys);

  const difference = uniqFilesKeys.reduce((acc, key) => {
    const firstFileValue = jsonFile1Obj[key];
    const secondFileValue = jsonFile2Obj[key];
    const firstFileHasKey = _.has(jsonFile1Obj, key);
    const secondFileHasKey = _.has(jsonFile2Obj, key);

    if (firstFileHasKey && secondFileHasKey) {
      if (firstFileValue === secondFileValue) {
        return [...acc, `  ${key}: ${firstFileValue}`];
      }
      if (firstFileValue !== secondFileValue) {
        return [...acc, `- ${key}: ${firstFileValue}`, `+ ${key}: ${secondFileValue}`];
      }
    }
    if (firstFileHasKey && !secondFileHasKey) {
      return [...acc, `- ${key}: ${firstFileValue}`];
    }

    return [...acc, `+ ${key}: ${secondFileValue}`];
  }, []);

  return `{\n  ${difference.join('\n  ')}\n}`;
};
