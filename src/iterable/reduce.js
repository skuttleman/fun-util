const identity = require('../functional/identity');
const type = require('../misc/type');

module.exports = (item, reducer, ...args) => {
  const transform = (type(item) === 'object') ? identity : Number;
  return Object.keys(item).reduce((result, key) => {
    return reducer(result, item[key], transform(key), item);
  }, ...args);
};
