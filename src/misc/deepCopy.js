const map = require('../iterable/map');

const copy = item => {
  if (typeof item === 'object') {
    return item && map(item, copy);
  }
  return item;
};

module.exports = copy;
