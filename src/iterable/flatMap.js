const flatten = require('./flatten');
const map = require('./map');

const flatMap = (input, ...fns) => {
  return map(flatten(input), ...fns);
};

module.exports = flatMap;
