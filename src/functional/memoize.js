const hasKey = require('../object/hasKey');

module.exports = fn => {
  const results = {};
  return input => {
    if (hasKey(results, input)) {
      return results[input];
    }
    results[input] = fn(input);
    return results[input];
  };
};
