const identity = require('./identity');
const { first, last, truncate } = require('../iterable');

const compose = (...fns) => (...inputs) => {
  if (fns.length) {
    const lastFn = last(fns);
    const truncatedFns = truncate(fns);
    return compose(...truncatedFns)(lastFn(...inputs));
  }
  return first(inputs);
};

module.exports = compose;
