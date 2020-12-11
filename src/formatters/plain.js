import _ from 'lodash';

const plain = (diff) => {
  const iter = (tree, path) => {
    if (tree.length === 0) {
      return [];
    }

    return tree.flatMap((node) => {
      const {
        name, value, oldValue, status, children,
      } = node;

      const outputValue = _.isPlainObject(value) ? '[complex value]' : value;
      const outputOldValue = _.isPlainObject(oldValue) ? '[complex value]' : oldValue;
      const pathToNode = `${[...path, name].join('.')}`;

      if (value === 'nested') {
        return iter(children, [...path, name]);
      }
      if (status === 'added') {
        return `Property '${pathToNode}' was added with value: '${outputValue}'`;
      }
      if (status === 'removed') {
        return `Property '${pathToNode}' was removed`;
      }
      if (status === 'updated') {
        return `Property '${pathToNode}' was updated. From '${outputOldValue}' to '${outputValue}'`;
      }
      return [];
    });
  };

  return iter(diff, []).join('\n');
};

export default plain;
