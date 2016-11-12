module.exports = (condition, succeed, fail) => (...inputs) => {
  if (condition(...inputs)) {
    return succeed(...inputs);
  }
  return fail(...inputs);
};
