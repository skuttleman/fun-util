module.exports = (test, successValue, failValue) => (...input) => {
  if (test(...input)) return successValue(...input);
  return failValue(...input);
};
