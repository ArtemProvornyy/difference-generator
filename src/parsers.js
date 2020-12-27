import yaml from 'js-yaml';

export default (fileFormat) => {
  switch (fileFormat) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad;
    case '.json':
      return JSON.parse;
    default:
      throw new Error('Unsupported content format');
  }
};
