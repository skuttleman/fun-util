const concat = require('../iterable/concat');

module.exports = (fn, ...args) => (...moreArgs) => {
  return fn(...concat(args, moreArgs));
};
