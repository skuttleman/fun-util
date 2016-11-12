module.exports = (fn, ...args) => (...moreArgs) => {
  return fn(...[...moreArgs, ...args]);
};
