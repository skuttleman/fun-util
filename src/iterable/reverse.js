const join = require('../array/join');

const reverse = array => {
  return [...array].reverse();
};

module.exports = item => {
  if (item.constructor === String) {
    return join(reverse(item));
  }
  return reverse(item);
};
