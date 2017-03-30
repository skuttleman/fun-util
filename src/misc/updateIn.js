const firstRest = require('../iterable/firstRest');
const truncateLast = require('../iterable/truncateLast');
const type = require('./type');

const setup = (item, key) => {
  switch (type(item)) {
    case 'array':
      return [...item];
    case 'object':
      return {...item};
    default:
      return parseInt(key) === key ? [] : {};
  }
};

const updateIn = (item, keys, value) => {
  const [key, remaining] = firstRest(keys);
  if (keys.length) {
    const newItem = setup(item, key);
    newItem[key] = updateIn(newItem[key], remaining, value);
    return newItem;
  }
  return value;
};

module.exports = (item, ...args) => {
  if (args.length) {
    return updateIn(item, ...truncateLast(args));
  }
  return item;
};
