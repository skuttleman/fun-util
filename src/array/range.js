const { concat, map } = require('../iterable');

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
  let [start, stop, step] = map(args, Math.round);
  step = Math.abs(step) || 1;
  if (!args.length) {
    return [];
  } else if (args.length === 1) {
    return range(0, start, step);
  }
  return range(start, stop, step);
};
