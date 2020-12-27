import _ from 'lodash';

const addQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

const renderPlain = (diff) => {
  const iter = (tree, path) => {
    if (tree.length === 0) {
      return [];
    }

    return tree.flatMap((node) => {
      const {
        name, value, oldValue, status, children,
      } = node;

      const outputValue = _.isPlainObject(value) ? '[complex value]' : addQuotes(value);
      const outputOldValue = _.isPlainObject(oldValue) ? '[complex value]' : addQuotes(oldValue);
      const currentPath = [...path, name];
      const currentPathStr = currentPath.join('.');

      if (status === 'nested') {
        return iter(children, currentPath);
      }
      if (status === 'added') {
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      }
      if (status === 'removed') {
        return `Property '${currentPathStr}' was removed`;
      }
      if (status === 'updated') {
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      }
      return [];
    });
  };

  return iter(diff, []).join('\n');
};

export default renderPlain;
