import _ from 'lodash';

const stringify = (inputValue, depth) => {
  if (!_.isPlainObject(inputValue)) {
    return inputValue;
  }

  const obj = inputValue;
  const keys = Object.keys(obj);
  const indent = ' '.repeat(depth);
  const braceIndent = ' '.repeat(depth - 4);

  const innerPart = keys.map((key) => {
    const currentValue = obj[key];
    if (_.isPlainObject(currentValue)) {
      return `${indent}${key}: ${stringify(currentValue, depth + 4)}`;
    }

    return `${indent}${key}: ${currentValue}`;
  });

  return `{\n${innerPart.join('\n')}\n${braceIndent}}`;
};

const renderStylish = (diff) => {
  const iter = (depth, node) => node.flatMap((child) => {
    const {
      name, value, status, oldValue, children,
    } = child;
    const indent = ' '.repeat(depth);
    const nextLevelDepth = status === 'nested' ? depth + 4 : depth + 6;

    switch (status) {
      case 'nested':
        return `${indent}  ${name}: {\n${iter(nextLevelDepth, children)}\n${indent}  }`.split(',');
      case 'updated':
        return `${indent}- ${name}: ${stringify(oldValue, nextLevelDepth)}\n${indent}+ ${name}: ${stringify(value, nextLevelDepth)}`;
      case 'added':
        return `${indent}+ ${name}: ${stringify(value, nextLevelDepth)}`;
      case 'removed':
        return `${indent}- ${name}: ${stringify(value, nextLevelDepth)}`;
      case 'unchanged':
        return `${indent}  ${name}: ${value}`;
      default:
        throw new Error(`Unexpected condition ${status}. Please check the input data.`);
    }
  });

  const startDepth = 2;
  const innerPart = iter(startDepth, diff);

  return `{\n${innerPart.join('\n')}\n}`;
};

export default renderStylish;
