import yaml from 'js-yaml';
import ini from 'ini';

export default (extention) => {
  if (extention === '.yaml' || extention === '.yml') {
    return yaml.safeLoad;
  }
  if (extention === '.ini') {
    return ini.parse;
  }

  return JSON.parse;
};
