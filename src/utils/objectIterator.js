const getKeys = require('../utils/getKeys');

module.exports = (object, method, fn) => {
  return getKeys(object)[method](key => fn(object[key], key, object));
};
