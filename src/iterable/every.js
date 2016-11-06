const objectIterator = require('../utils/objectIterator');

module.exports = (item, condition) => {
  if (item.constructor === Array || item.constructor === String) {
    return Array.prototype.every.call(item, condition);
  }
  return objectIterator(item, 'every', condition);
}
