import reduce from './reduce';
const type = require('../misc/type');

const flatten = input => {
  if (type(input) === 'array') {
    return reduce(input, (list, item) => list.concat(flatten(item)), []);
  }
  return input;
};

module.exports = flatten;
