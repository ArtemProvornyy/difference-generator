import _ from 'lodash';

const addQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

const renderPlain = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const {
      name, value, oldValue, status, children,
    } = node;

    const outputValue = _.isPlainObject(value) ? '[complex value]' : addQuotes(value);
    const outputOldValue = _.isPlainObject(oldValue) ? '[complex value]' : addQuotes(oldValue);
    const currentPath = [...path, name];
    const currentPathStr = currentPath.join('.');

    switch (status) {
      case 'nested':
        return iter(children, currentPath);
      case 'added':
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      case 'removed':
        return `Property '${currentPathStr}' was removed`;
      case 'updated':
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      default:
        return [];
    }
  });

  return iter(diff, []).join('\n');
};

export default renderPlain;
