const thread = require('../functional/thread');
const join = require('../array/join');

const defaultSorter = (a, b) => {
  switch (true) {
    case a < b:
      return - 1;
    case a > b:
      return 1;
    default:
      return 0;
  }
};

const sort = (item, sorter) => {
  let result = [...item];
  if (sorter instanceof Function) {
    result.sort(sorter);
  } else {
    result.sort(defaultSorter);
  }
  return result;
};

module.exports = (item, sorter) => {
  if (item.constructor === String) {
    return thread(sort, join)(item, sorter);
  }
  return sort(item, sorter);
};
