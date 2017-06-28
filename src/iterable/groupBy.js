const concat = require('./concat');
const getInitial = require('../utils/getInitial');
const reduce = require('./reduce');
const type = require('../value/type');

module.exports = (collection, grouper) => {
  return reduce(collection, (grouped, value, key) => {
    const resultKey = grouper(value, key, collection);
    return {
      ...grouped,
      [resultKey]: merge(collection, grouped[resultKey], key, value)
    };
  }, {});
};

const merge = (collection, group, key, value) => {
  const tail = getTail(collection, key, value);
  if (group) {
    return concat(group, tail);
  }
  return concat(getInitial(collection), tail);
};

const getTail = (collection, key, value) => {
  return type(collection) === 'object' ? { [key]: value } : value;
};