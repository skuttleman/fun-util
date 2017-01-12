const first = require('./first');
const rest = require('./rest');

module.exports = item => [first(item), rest(item)];
