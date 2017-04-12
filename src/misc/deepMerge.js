const mapAllKeys = require('../iterable/mapAllKeys');

const deepMerge = (value1, value2) => {
  if (value1 instanceof Object && value2 instanceof Object) {
    return mapAllKeys(value1, value2, deepMerge);
  }
  return value2 === undefined ? value1 : value2;
};

module.exports = deepMerge;