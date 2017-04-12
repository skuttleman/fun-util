const size = require('../iterable/size');

module.exports = item => item instanceof Object ? !size(item) : !item;