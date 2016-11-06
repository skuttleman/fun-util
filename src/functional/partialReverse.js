const concat = require('../misc/concat');

module.exports = (fn, ...args) => (...moreArgs) => {
  return fn(...concat(moreArgs, args));
};
