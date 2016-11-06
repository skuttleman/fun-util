const concat = require('../misc/concat');
const join = require('../array/join');

const filter = (object, condition) => {
  return Object.keys(object).reduce((result, key) => {
    if (condition(object[key], key, object)) {
      return concat(result, { [key]: object[key] });
    }
    return result;
  }, {});
};

module.exports = (item, condition) => {
  if (item.constructor === Array) {
    return item.filter(condition);
  } else if (item.constructor === String) {
    return join(Array.prototype.filter.call(item, condition));
  }
  return filter(item, condition);
};
