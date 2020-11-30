import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const objectsKeys = [...obj1Keys, ...obj2Keys].sort();

  const uniqObjectsKeys = _.uniq(objectsKeys);

  const difference = uniqObjectsKeys.map((key) => {
    const firstObjValue = obj1[key];
    const secondObjValue = obj2[key];

    const hasFirstObjKey = _.has(obj1, key);
    const hasSecondObjKey = _.has(obj2, key);

    if (hasFirstObjKey && !hasSecondObjKey) {
      return { name: key, value: firstObjValue, status: 'deleted' };
    }
    if (!hasFirstObjKey && hasSecondObjKey) {
      return { name: key, value: secondObjValue, status: 'added' };
    }
    if (_.isPlainObject(firstObjValue) && _.isPlainObject(secondObjValue)) {
      return {
        name: key, value: 'nested', status: 'changed', children: buildAST(firstObjValue, secondObjValue),
      };
    }
    if (firstObjValue !== secondObjValue) {
      return {
        name: key, value: secondObjValue, status: 'changed', oldValue: firstObjValue,
      };
    }

    return { name: key, value: firstObjValue, status: 'unchanged' };
  }, []);

  return difference;
};

export default buildAST;
