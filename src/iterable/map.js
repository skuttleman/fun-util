const concat = require('../iterable/concat');
const first = require('./first');
const join = require('../array/join');
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

const map = (array, ...mappers) => {
  return array.map((value, key, item) => {
    return applyMappers(value, key, item, ...mappers);
  });
};

module.exports = (item, ...mappers) => {
  if (item.constructor === Array) {
    return map(item, ...mappers);
  } else if (item.constructor === String) {
    return join(map([...item], ...mappers));
  }
  return mapObject(item, ...mappers);
};
