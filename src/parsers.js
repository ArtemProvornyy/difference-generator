import path from 'path';
import yaml from 'js-yaml';

export default (filename) => {
  const extention = path.extname(filename).toLowerCase();

  if (extention === '.yaml' || extention === '.yml') {
    return yaml.safeLoad;
  }

  return JSON.parse;
};
