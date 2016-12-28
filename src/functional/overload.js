const overload = (...fns) => (...args) => {
  const fn = fns.find(fn => fn.length === args.length && typeof fn === 'function');
  if (fn) {
    return fn(...args);
  }
  throw new Error(`ArityMismatch: No function found with ${args.length} argument(s).`);
};

module.exports = overload;
