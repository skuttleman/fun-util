module.exports = fn => data => {
  fn(data);
  return Promise.resolve(data);
};
