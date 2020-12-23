import yaml from 'js-yaml';
import ini from 'ini';

export default (format) => {
  switch (format) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad;
    case '.json':
      return JSON.parse;
    case '.ini':
      return ini.parse;
    default:
      throw new Error('Unexpected content format');
  }
};
