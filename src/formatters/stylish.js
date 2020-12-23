import _ from 'lodash';

const stringify = (obj, depth) => {
  const keys = Object.keys(obj);
  const indent = ' '.repeat(depth);
  const braceIndent = ' '.repeat(depth - 4);

  const innerPart = keys.map((key) => {
    const value = obj[key];
    if (_.isPlainObject(value)) {
      return `${indent}${key}: ${stringify(value, depth + 4)}`;
    }

    return `${indent}${key}: ${value}`;
  });

  return `{\n${innerPart.join('\n')}\n${braceIndent}}`;
};

const stylish = (diff) => {
  const iter = (node, depth) => {
    if (node.lenght === 0) {
      return '';
    }

    return node.flatMap((child) => {
      const {
        name, value, status, oldValue, children,
      } = child;
      const indent = ' '.repeat(depth);
      if (status === 'nested') {
        return `${indent}  ${name}: {\n${iter(children, depth + 4)}\n${indent}  }`.split(',');
      }
      if (_.isPlainObject(value) && status === 'updated') {
        return `${indent}- ${name}: ${oldValue}\n${indent}+ ${name}: ${stringify(value, depth + 6)}`;
      }
      if (_.isPlainObject(oldValue) && status === 'updated') {
        return `${indent}- ${name}: ${stringify(oldValue, depth + 6)}\n${indent}+ ${name}: ${value}`;
      }
      if (_.isPlainObject(value) && status === 'added') {
        return `${indent}+ ${name}: ${stringify(value, depth + 6)}`;
      }
      if (_.isPlainObject(value) && status === 'removed') {
        return `${indent}- ${name}: ${stringify(value, depth + 6)}`;
      }
      if (status === 'unchanged') {
        return `${indent}  ${name}: ${value}`;
      }
      if (status === 'added') {
        return `${indent}+ ${name}: ${value}`;
      }
      if (status === 'removed') {
        return `${indent}- ${name}: ${value}`;
      }

      return `${indent}- ${name}: ${oldValue}\n${indent}+ ${name}: ${value}`;
    });
  };

  const innerPart = iter(diff, 2);

  return `{\n${innerPart.join('\n')}\n}`;
};

export default stylish;
