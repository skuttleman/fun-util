const type = require('../value/type');

const getInitial = item => {
  switch (type(item)) {
    case 'array':
      return [];
    case 'object':
      return {};
    case 'string':
      return '';
    case 'number':
      return 0;
    default:
      return item;
  }
};

module.exports = getInitial;
