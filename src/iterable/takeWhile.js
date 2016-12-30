const takeUntil = require('./takeUntil');
const complement = require('../functional/complement');

module.exports = (input, fn) => takeUntil(input, complement(fn));
