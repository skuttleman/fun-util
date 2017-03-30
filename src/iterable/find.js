const objectIterator = require('../utils/objectIterator');
const type = require('../value/type');

module.exports = (item, condition) => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'string') {
    return Array.prototype.find.call(item, condition);
  }
  let key = objectIterator(item, 'find', condition);
  return key === undefined ? undefined : [key, item[key]];
}
