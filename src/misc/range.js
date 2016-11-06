const concat = require('./concat');
const map = require('../iterable/map');

const range = (start, stop, step) => {
  if (start < stop && start + step < stop) {
    return concat([start], range(start + step, stop, step));
  } else if (start > stop && start - step > stop) {
    return concat([start], range(start - step, stop, step));
  } else if (start === stop) {
    return [];
  }
  return [start];
};

module.exports = (...args) => {
  let [start, stop] = args;
  let step = Math.abs(args[2]) || 1;
  if (!args.length) return [];
  if (args.length === 1) return range(0, start, step);
  return range(...map([start, stop, step], Math.round));
};
