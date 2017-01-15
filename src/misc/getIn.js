const firstRest = require('../iterable/firstRest');

const isNotNullOrUndefined = value => {
  return value !== null && value !== undefined;
};

const isDigable = (object, key) => {
  return (isNotNullOrUndefined(object) || undefined) &&
    (isNotNullOrUndefined(object[key]) || object[key]);
};

const getIn = (object, ...paths) => {
  let [key, remaining] = firstRest(paths);
  if (paths.length) {
    return isDigable(object, key) && getIn(object[key], ...remaining);
  }
  return object;
};

module.exports = getIn;
