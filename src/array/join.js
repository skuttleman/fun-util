module.exports = (array, ...args) => {
  if (args.length) {
    return array.join(...args);
  }
  return array.join('');
};
