const type = require('../value/type');
const splitWhen = require('./splitWhen');

const keyType = (item, key) => type(item) === 'object' ? key : Number(key);

const forEach = (...args) => {
  let [items, fns] = splitWhen(args, arg => type(arg) === 'function');
  let item = items[0];
  Object.keys(item).forEach(key => {
    let values = items.map(item => item[key]);
    fns.forEach(fn => fn(...values, keyType(item, key), item));
  });
};

module.exports = forEach;
