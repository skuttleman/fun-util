const { objectIterator, type } = require('../utils');

module.exports = (item, action) => {
  let itemType = type(item);
  if (itemType === 'array' || itemType === 'string') {
    Array.prototype.forEach.call(item, action);
  } else {
    objectIterator(item, 'forEach', action);
  }
};
