const reduce = Array.prototype.reduce;

module.exports = (item, reducer, ...args) => {
  if (item.constructor === Array || item.constructor === String) {
    return reduce.apply(item, [reducer, ...args]);
  }
  return reduce.apply(Object.keys(item), [(result, key) => {
    return reducer(result, item[key], key, item);
  }, ...args]);
};
