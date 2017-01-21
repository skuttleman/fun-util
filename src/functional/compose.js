const first = require('../iterable/first');
const truncateLast = require('../iterable/truncateLast');

const compose = (...fns) => (...inputs) => {
  if (fns.length) {
    const [truncatedFns, lastFn] = truncateLast(fns);
    return compose(...truncatedFns)(lastFn(...inputs));
  }
  return first(inputs);
};

module.exports = compose;
