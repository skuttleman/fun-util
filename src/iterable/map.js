const concat = require('../iterable/concat');
const first = require('./first');
const join = require('../array/join');
const rest = require('./rest');
const type = require('../utils/type');

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
  switch (type(item)) {
    case 'array':
      return map(item, ...mappers);
    case 'string':
      return join(map([...item], ...mappers));
    default:
      return mapObject(item, ...mappers);
  }
};
