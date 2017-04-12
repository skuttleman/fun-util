const concat = require('../iterable/concat');
const getKeys = require('../utils/getKeys');
const join = require('../array/join');
const type = require('../value/type');

const filter = (object, condition) => {
  return getKeys(object).reduce((result, key) => {
    if (condition(object[key], key, object)) {
      return concat(result, { [key]: object[key] });
    }
    return result;
  }, {});
};

module.exports = (item, condition) => {
  switch (type(item)) {
    case 'array':
      return item.filter(condition);
    case 'string':
      return join(Array.prototype.filter.call(item, condition));
    default:
      return filter(item, condition);
  }
};
