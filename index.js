const array = require('./lib/array');
const functional = require('./lib/functional');
const iterable = require('./lib/iterable');
const misc = require('./lib/misc');
const promise = require('./lib/promise');
const string = require('./lib/string');

module.exports = Object.assign(
  { array, functional, iterable, misc, promise, string },
  array, functional, iterable, misc, promise, string
);
