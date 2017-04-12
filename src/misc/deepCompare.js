const filter = require('../iterable/filter');
const identity = require('../functional/identity');
const mapAllKeys = require('../iterable/mapAllKeys');
const isEmpty = require('../value/isEmpty');
const isEqual = require('../value/isEqual');
const isNaN = require('../value/isNaN');
const type = require('../value/type');

const stringify = value => isNaN(value) ? value : JSON.stringify(value);

const compare = (_, value1, value2) => deepCompare(value1, value2);

const deepCompare = (value1, value2) => {
  if (value1 instanceof Object && value2 instanceof Object) {
    if (type(value1) !== type(value2)) {
      return 'type mismatch';
    }
    const result = filter(mapAllKeys({}, value1, value2, compare), identity);
    if (!isEmpty(result)) {
      return result;
    }
  } else if (!isEqual(value1, value2)) {
    return `${stringify(value1)} != ${stringify(value2)}`;
  }
};

module.exports = deepCompare;