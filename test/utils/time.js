module.exports = action => {
  const start = Date.now();
  action();
  const stop = Date.now();
  return stop - start;
};
