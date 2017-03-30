'use strict';

function exp(modules) {
  return Object.keys(modules).reduce(function(object, moduleName) {
    object[moduleName] = modules[moduleName];
    Object.keys(modules[moduleName]).forEach(function(method) {
      object[method] = modules[moduleName][method];
    });
    return object;
  }, {});
}

module.exports = exp({
  array: require('./lib/array'),
  functional: require('./lib/functional'),
  iterable: require('./lib/iterable'),
  misc: require('./lib/misc'),
  promise: require('./lib/promise'),
  string: require('./lib/string'),
  value: require('./lib/value')
});
