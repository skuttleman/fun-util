const silent = fn => arg => {
  try {
    return fn(arg);
  } catch (err) {
    return arg;
  }
};

module.exports = silent;