const firstRest = require('./firstRest');
const getIn = require('../misc/getIn');
const getKeys = require('../utils/getKeys');
const join = require('../array/join');
const map = require('../iterable/map');
const rest = require('./rest');
const splitWhen = require('./splitWhen');
const sort = require('../iterable/sort');
const type = require('../value/type');

const getAllKeys = items => {
  return sort(Array.from(new Set(items.reduce((keys, item) => {
    return keys.concat(getKeys(item));
  }, []))));
};

const onlyArrayKeys = key => Math.abs(Number(key)) === Number(key);

const determineReturnType = (valueType, allKeys, mapped) => {
  if (valueType === 'array' || valueType === 'string') {
    let result = allKeys.filter(onlyArrayKeys).map(key => mapped[key]);
    return valueType === 'string' ? join(result) : result;
  }
  return mapped;
};

const mapAllKeys = (items, mappers) => {
  const valueType = type(items[0]);
  const allKeys = getAllKeys(items);
  const combined = allKeys.reduce((object, key) => ({ ...object, [key]: null }), {});
  const newMappers = mappers.map(fn => (_, ...args) => fn(...args));
  const mapped = map(combined, ...items, ...newMappers);
  return determineReturnType(valueType, allKeys, mapped);
};

module.exports = (...args) => {
  const [items, mappers] = splitWhen(args, arg => type(arg) === 'function');
  return mapAllKeys(items, mappers);
};