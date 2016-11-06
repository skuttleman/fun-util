const map = require('../iterable/map');

const deepCopy = item => {
  return map(item, copy);
};

const copy = item => {
  if (item instanceof Object && item.constructor !== Function) {
    return deepCopy(item);
  }
  return item;
};

module.exports = copy;
