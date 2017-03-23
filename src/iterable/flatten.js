import reduce from './reduce';
const type = require('../misc/type');

const flatten = (input, depth = -1) => {
  if (type(input) === 'array' && depth !== 0) {
    return reduce(input, (list, item) => list.concat(flatten(item, depth - 1)), []);
  }
  return input;
};

module.exports = flatten;
