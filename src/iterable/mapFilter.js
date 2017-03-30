const reduce = require('./reduce');
const getInitial = require('../utils/getInitial');
const type = require('../value/type');

const collect = (item, key, value) => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'string') {
    return item.concat(value);
  }
  return { ...item, [key]: value };
};

const mapFilter = (item, fn) => {
  return reduce(item, (newItem, value, key, item) => {
    let newValue = fn(value, key, item);
    return newValue === undefined ? newItem : collect(newItem, key, newValue);
  }, getInitial(item));
};

module.exports = mapFilter;
