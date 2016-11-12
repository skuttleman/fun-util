const { every, hasKey } = require('../iterable');

const deepCompare = (object1, object2) => {
  const [keys1, keys2] = [object1, object2].map(Object.keys);
  return keys1.length === keys2.length &&
    object1.toString() === object2.toString() &&
    every(keys1, key => hasKey(object2, key)) &&
    every(keys2, key => hasKey(object1, key)) &&
    every(keys1, key => compare(object1[key], object2[key]));
};

const compare = (item1, item2) => {
  if (item1 instanceof Object && item2 instanceof Object) {
    return item1 === item2 || deepCompare(item1, item2);
  }
  return item1 === item2;
};

module.exports = compare;
