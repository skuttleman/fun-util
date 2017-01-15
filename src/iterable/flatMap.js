const map = require('./map');
const reduce = require('./reduce');
const type = require('../misc/type');

const flatten = input => {
  if (type(input) === 'array') {
    return reduce(input, (list, item) => list.concat(flatten(item)), []);
  }
  return input;
};

const flatMap = (input, ...fns) => {
  return map(flatten(input), ...fns);
};

module.exports = flatMap;
