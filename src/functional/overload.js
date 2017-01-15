const { ArityMismatchError } = require('../utils/errors');

class Context {
  otherwise(...args) {
    throw new ArityMismatchError(args.length);
  }
}

const makeOverloaded = (context, fns) => {
  const onlyFns = fns.filter(fn => typeof fn === 'function');
  return (...args) => {
    const fn = onlyFns.find(fn => fn.length === args.length);
    return fn ? fn(...args) : context.otherwise(...args);
  };
};

const overload = (...fns) => {
  const context = new Context;
  const overloaded = makeOverloaded(context, fns);
  overloaded.orElse = fn => {
    context.otherwise = fn;
    return overloaded;
  };
  return overloaded;
};

module.exports = overload;
