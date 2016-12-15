const map = require('../iterable/map');
const type = require('../utils/type');

const deepCopy = item => {
  return map(item, copy);
};

const copy = item => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'object') {
    return deepCopy(item);
  }
  return item;
};

module.exports = copy;
