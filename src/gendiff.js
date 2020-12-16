import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  const difference = keys.map((key) => {
    const firstObjValue = obj1[key];
    const secondObjValue = obj2[key];

    const hasFirstObjKey = _.has(obj1, key);
    const hasSecondObjKey = _.has(obj2, key);

    if (hasFirstObjKey && !hasSecondObjKey) {
      return {
        name: key, value: firstObjValue, status: 'removed',
      };
    }
    if (!hasFirstObjKey && hasSecondObjKey) {
      return {
        name: key, value: secondObjValue, status: 'added',
      };
    }
    if (_.isPlainObject(firstObjValue) && _.isPlainObject(secondObjValue)) {
      return {
        name: key, value: 'nested', status: 'updated', children: buildAST(firstObjValue, secondObjValue),
      };
    }
    if (firstObjValue !== secondObjValue) {
      return {
        name: key, value: secondObjValue, status: 'updated', oldValue: firstObjValue,
      };
    }

    return {
      name: key, value: firstObjValue, status: 'outdated',
    };
  }, []);

  return difference;
};

export default buildAST;
