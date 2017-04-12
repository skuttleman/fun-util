const firstRest = require('./firstRest');
const getIn = require('../misc/getIn');
const join = require('../array/join');
const rest = require('./rest');
const splitWhen = require('./splitWhen');
const type = require('../value/type');

const applyFns = (value, items, key, mappers) => {
  let values = rest(items.map(item => item[key]));
  if (mappers.length) {
    let [mapper, remaining] = firstRest(mappers);
    return applyFns(mapper(value, ...values, key, items[0]), items, key, remaining);
  }
  return value;
};

const mapObject = (objects, mappers) => {
  return Object.keys(objects[0]).reduce((object, key) => {
    return {
      ...object,
      [key]: applyFns(objects[0][key], objects, key, mappers)
    };
  }, {});
};

const mapArray = (items, mappers) => {
  return Array.prototype.map.call(items[0], (value, key) => {
    return applyFns(value, items, key, mappers);
  });
};

const map = (...args) => {
  const [items, mappers] = splitWhen(args, arg => type(arg) === 'function');
  return getIn({
    array: mapArray(items, mappers),
    string: join(mapArray(items, mappers))
  }, type(items[0])) || mapObject(items, mappers);
};

module.exports = map;
