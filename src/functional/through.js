module.exports = fn => (first, ...inputs) => {
  fn(first, ...inputs);
  return first;
};
