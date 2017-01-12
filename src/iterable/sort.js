const join = require('../array/join');
const type = require('../misc/type');

const defaultSorter = (a, b) => {
  if (a < b) {
    return - 1;
  } else if (a > b) {
    return 1;
  }
  return 0;
};

const sort = (items, sorter) => [...items].sort(sorter || defaultSorter);

module.exports = (item, sorter) => {
  if (type(item) === 'string') {
    return join(sort(item, sorter));
  }
  return sort(item, sorter);
};
