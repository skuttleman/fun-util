const join = require('../array/join');
const type = require('../misc/type');

const reverse = array => {
  return [...array].reverse();
};

module.exports = item => {
  if (type(item) === 'string') {
    return join(reverse(item));
  }
  return reverse(item);
};
