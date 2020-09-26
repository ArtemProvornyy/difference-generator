import _ from 'lodash';

export const stringify = (obj) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }

  const objKeys = Object.keys(obj);
  const string = objKeys.map((key) => {
    const objValue = obj[key];
    if (_.isPlainObject(objValue)) {
      return `  ${key}: ${stringify(objValue)}`;
    }
    return `  ${key}: ${objValue}`;
  });

  return `{${string.join(',')}}`;
};

export const genDiffOfTwoObj = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const objectsKeys = [...obj1Keys, ...obj2Keys].sort();

  const uniqObjectsKeys = _.uniq(objectsKeys);

  const difference = uniqObjectsKeys.map((key) => {
    const firstObjValue = obj1[key];
    const secondObjValue = obj2[key];

    const firstObjValueStringify = stringify(firstObjValue);
    const secondObjValueStringify = stringify(secondObjValue);

    const hasFirstObjKey = _.has(obj1, key);
    const hasSecondObjKey = _.has(obj2, key);

    if (hasFirstObjKey && !hasSecondObjKey) {
      return `- ${key}: ${firstObjValueStringify}`;
    }
    if (!hasFirstObjKey && hasSecondObjKey) {
      return `+ ${key}: ${secondObjValueStringify}`;
    }
    if (_.isPlainObject(firstObjValue) && _.isPlainObject(secondObjValue)) {
      return `  ${key}: {${genDiffOfTwoObj(firstObjValue, secondObjValue)}}`;
    }
    if (firstObjValue !== secondObjValue) {
      return `- ${key}: ${firstObjValueStringify},+ ${key}: ${secondObjValueStringify}`;
    }

    return `  ${key}: ${firstObjValueStringify}`;
  }, []);

  return difference.join(',');
};
