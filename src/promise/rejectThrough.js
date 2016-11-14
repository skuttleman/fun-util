module.exports = fn => data => {
  fn(data);
  return Promise.reject(data);
};
