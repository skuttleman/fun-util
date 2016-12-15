const { invoke, type } = require('../utils');

module.exports = (...args) => {
  if (type(args[0]) === 'object') {
    return Object.assign({}, ...args);
  }
  return invoke('concat')(...args);
};
