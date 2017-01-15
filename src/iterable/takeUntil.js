const takeUntil = (array, fn) => {
  let index = array.findIndex(fn);
  if (index === -1) {
    return array.slice();
  }
  return array.slice(0, index);
};

module.exports = (input, fn) => {
  if (typeof input === 'string') {
    return takeUntil(input.split(''), fn).join('');
  }
  return takeUntil(input, fn);
};
