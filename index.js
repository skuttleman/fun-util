const array = require('./src/array');
const functional = require('./src/functional');
const iterable = require('./src/iterable');
const misc = require('./src/misc');
const promise = require('./src/promise');
const string = require('./src/string');

module.exports = Object.assign(
  { array, functional, iterable, misc, promise, string },
  array, functional, iterable, misc, promise, string
);
