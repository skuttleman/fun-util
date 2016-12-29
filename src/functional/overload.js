class Context {
  otherwise(...args) {
    throw new Error(`ArityMismatch: No function found with ${args.length} argument(s).`);
  }
}

const makeOverloaded = (context, fns) => (...args) => {
  const fn = fns.find(fn => fn.length === args.length && typeof fn === 'function');
  return fn ? fn(...args) : context.otherwise(...args);
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
