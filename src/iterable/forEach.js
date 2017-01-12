const objectIterator = require('../utils/objectIterator');
const type = require('../misc/type');

module.exports = (item, action) => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'string') {
    Array.prototype.forEach.call(item, action);
  } else {
    objectIterator(item, 'forEach', action);
  }
};
