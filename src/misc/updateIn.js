const deepCopy = require('./deepCopy');
const { firstRest, truncateLast } = require('../iterable');

const setup = (item, key) => {
  if (item && typeof item === 'object') {
    return item;
  }
  return parseInt(key) === key ? [] : {};
};

const updateIn = (item, keys, value) => {
  if (keys.length) {
    let [key, remaining] = firstRest(keys);
    item = setup(item, key);
    item[key] = updateIn(item[key], remaining, value);
    return item;
  }
  return value;
};

module.exports = (item, ...args) => {
  const copy = deepCopy(item);
  if (args.length) {
    return updateIn(copy, ...truncateLast(args));
  }
  return copy;
};
