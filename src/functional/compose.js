const identity = require('./identity');
const { first, truncateLast } = require('../iterable');

const compose = (...fns) => (...inputs) => {
  if (fns.length) {
    const [truncatedFns, lastFn] = truncateLast(fns);
    return compose(...truncatedFns)(lastFn(...inputs));
  }
  return first(inputs);
};

module.exports = compose;
