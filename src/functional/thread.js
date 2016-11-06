const reduce = require('../iterable/reduce');

module.exports = (...fns) => input => {
  return reduce(fns, (value, fn) => fn(value), input);
};
