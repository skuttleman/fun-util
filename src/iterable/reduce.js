const identity = require('../functional/identity');

module.exports = (item, reducer, ...args) => {
  const transform = (item.constructor === Object) ? identity : Number;
  return Object.keys(item).reduce((result, key) => {
    return reducer(result, item[key], transform(key), item);
  }, ...args);
};
