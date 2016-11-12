const hasKey = require('../iterable/hasKey');

module.exports = fn => {
  const cache = {};
  return input => {
    if (hasKey(cache, input)) {
      return cache[input];
    }
    cache[input] = fn(input);
    return cache[input];
  };
};
