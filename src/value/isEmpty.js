const type = require('../misc/type');

module.exports = item => {
  if (item && typeof item === 'object') {
    return !Object.keys(item).length;
  }
  return !item;
};