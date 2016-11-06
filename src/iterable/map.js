const concat = require('../misc/concat');

module.exports = (item, mapper) => {
  if (item.constructor === Array) {
    return item.map(mapper);
  } else if (item.constructor === String) {
    return item.split('').map(mapper).join('');
  }
  return Object.keys(item).reduce((result, key) => {
    return concat(result, { [key]: mapper(item[key], key, item) });
  }, {});
};
