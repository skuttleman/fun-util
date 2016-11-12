module.exports = (fn, ...args) => (...moreArgs) => {
  return fn(...[...args, ...moreArgs]);
};
