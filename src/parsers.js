import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filename) => {
  const extention = path.extname(filename).toLowerCase();

  if (extention === '.yaml' || extention === '.yml') {
    return yaml.safeLoad;
  }
  if (extention === '.ini') {
    return ini.parse;
  }

  return JSON.parse;
};
