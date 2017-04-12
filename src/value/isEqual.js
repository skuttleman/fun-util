const isNaN = require('./isNaN');

module.exports = (value1, value2) => {
  return value1 === value2 || (isNaN(value1) && isNaN(value2));
};