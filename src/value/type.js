const type = value => {
  if (value instanceof Array) {
    return 'array';
  }
  return typeof value;
};

module.exports = type;
