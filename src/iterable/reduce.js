const first = require('./first');
const identity = require('../functional/identity');
const rest = require('./rest');
const splitWhen = require('./splitWhen');
const type = require('../value/type');

const setup = (item, args) => {
  const transform = (type(item) === 'object') ? identity : Number;
  const [key, ...keys] = Object.keys(item);
  if (args.length) {
    return { transform, keys: [key, ...keys], start: first(args) };
  }
  return { transform, keys, start: item[key] };
};

const reduce = (items, reducer, ...args) => {
  let { keys, transform, start } = setup(first(items), args);
  return keys.reduce((result, key) => {
    const values = items.map(item => item[key]);
    return reducer(result, ...values, transform(key), items[0]);
  }, start);
};

module.exports = (...args) => {
  let [items, remaining] = splitWhen(args, arg => type(arg) === 'function');
  if (Object.keys(first(items)).length) {
    return reduce(items, ...remaining);
  } else if (remaining.length > 1) {
    return remaining[1];
  }
};
