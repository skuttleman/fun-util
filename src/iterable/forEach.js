const objectIterator = require('../utils/objectIterator');

module.exports = (item, action) => {
  if (item.constructor === Array || item.constructor === String) {
    Array.prototype.forEach.call(item, action);
  } else {
    objectIterator(item, 'forEach', action);
  }
}
