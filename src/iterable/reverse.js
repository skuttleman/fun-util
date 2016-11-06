const concat = require('../misc/concat');
const slice = require('../misc/slice');
const size = require('./size');
const truncate = require('./truncate');

const reverse = items => {
  let truncated = truncate(items);
  let nextSize = size(truncated);
  let lastItem = slice(items, nextSize);
  if (nextSize) {
    return concat(lastItem, reverse(truncated));
  }
  return lastItem;
};

module.exports = reverse;
