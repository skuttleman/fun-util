module.exports = (object, method, fn) => {
  return Object.keys(object)[method](key => fn(object[key], key, object));
};
