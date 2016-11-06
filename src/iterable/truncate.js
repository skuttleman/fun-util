const size = require ('./size');
const slice = require ('../misc/slice');

module.exports = item => slice(item, 0, size(item) - 1);
