const objectIterator = require('../utils/objectIterator');
const type = require('../value/type');

module.exports = (item, condition) => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'string') {
    return Array.prototype.some.call(item, condition);
  }
  return objectIterator(item, 'some', condition);
};
