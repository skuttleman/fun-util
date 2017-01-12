const last = require('./last');
const truncate = require('./truncate');

module.exports = item => [truncate(item), last(item)];
