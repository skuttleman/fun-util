const concat = require('../misc/concat');
const thread = require('../functional/thread');
const first = require('./first');
const rest = require('./rest');

const applyMappers = (value, key, item, ...mappers) => {
  if (mappers.length) {
    const newValue = first(mappers)(value, key, item);
    return applyMappers(newValue, key, item, ...rest(mappers));
  }
  return value;
};

const mapObject = (object, ...mappers) => {
  return Object.keys(object).reduce((result, key) => {
    const mapped = applyMappers(object[key], key, object, ...mappers);
    return concat(result, { [key]: mapped });
  }, {});
};

const mapArray = (array, ...mappers) => {
  return array.map((value, key, item) => {
    return applyMappers(value, key, item, ...mappers);
  });
};

module.exports = (item, ...mappers) => {
  if (item.constructor === Array) {
    return mapArray(item, ...mappers);
  } else if (item.constructor === String) {
    return mapArray(item.split(''), ...mappers).join('');
  }
  return mapObject(item, ...mappers);
};
