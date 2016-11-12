const invoke = require('../utils/invoke');

module.exports = (...args) => {
  if (args[0].constructor === Object) {
    return Object.assign({}, ...args);
  }
  return invoke('concat')(...args);
};
