module.exports = (timeout = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
