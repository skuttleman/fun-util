const objectIterator = require('../utils/objectIterator');

module.exports = (item, condition) => {
  if (item.constructor === Array || item.constructor === String) {
    return Array.prototype.find.call(item, condition);
  }
  let key = objectIterator(item, 'find', condition);
  if (key === undefined) return;
  return [key, item[key]];
}
