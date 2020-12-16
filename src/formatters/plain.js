import _ from 'lodash';

const addQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

const plain = (diff) => {
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

      if (value === 'nested') {
        return iter(children, currentPath);
      }
      if (status === 'added') {
        return `Property '${currentPath.join('.')}' was added with value: ${outputValue}`;
      }
      if (status === 'removed') {
        return `Property '${currentPath.join('.')}' was removed`;
      }
      if (status === 'updated') {
        return `Property '${currentPath.join('.')}' was updated. From ${outputOldValue} to ${outputValue}`;
      }
      return [];
    });
  };

  return iter(diff, []).join('\n');
};

export default plain;
