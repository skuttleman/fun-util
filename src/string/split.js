module.exports = (string, ...args) => {
  if (args.length) {
    return string.split(...args);
  }
  return [...string];
}
