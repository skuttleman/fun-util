const objectIterator = require('../utils/objectIterator');
const type = require('../misc/type');

module.exports = (item, condition) => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'string') {
    return Array.prototype.every.call(item, condition);
  }
  return objectIterator(item, 'every', condition);
}
