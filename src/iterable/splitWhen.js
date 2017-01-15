const takeUntil = require('./takeUntil');

const splitWhen = (item, splitter) => {
  let before = takeUntil(item, splitter);
  return [before, item.slice(before.length)];
};

module.exports = splitWhen;
