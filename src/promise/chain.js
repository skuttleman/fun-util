const { reduce } = require('../iterable');

module.exports = ([promise, ...promises]) => {
  let results = [];
  if (!promise) return Promise.resolve(results);
  return promises.reduce((chain, promise) => {
    return chain.then(result => {
      results = results.concat(result);
      return promise();
    });
  }, promise()).then(result => results.concat(result));
};
