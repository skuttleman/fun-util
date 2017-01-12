const invoke = require('../utils/invoke');
const type = require('../misc/type');

module.exports = (...args) => {
  if (type(args[0]) === 'object') {
    return Object.assign({}, ...args);
  }
  return invoke('concat')(...args);
};
