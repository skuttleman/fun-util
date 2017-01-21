const forEach = require('../iterable/forEach');
const truncateLast = require('../iterable/truncateLast');
const type = require('../misc/type');

const isBadType = (value, Type) => {
  return value === undefined ||
    (value !== null && value.constructor !== Type && !(value instanceof Type));
};

const checkType = (value, Type) => {
  switch (type(Type)) {
    case 'array':
      if (value !== null && type(value) !== 'array') {
        throw new TypeError(`Expected "${value}" to be of Type "Array"`);
      }
      return forEach(value || [], item => checkType(item, Type[0]));
    case 'function':
      if (isBadType(value, Type)) {
        throw new TypeError(`Expected "${value}" to be of Type "${Type.name}"`);
      }
      return;
    default:
      throw new TypeError(`Expected Type to be a function, got "${Type}"`);
  }
};

const checkTypes = (Types, args) => {
  forEach(Types, (Type, i) => {
    const arg = args[i];
    checkType(arg, Type);
  });
};

const enforceTypes = (context, Types, fn) => (...args) => {
  while (context.RestType && Types.length < args.length) {
    Types.push(context.RestType);
  }
  checkTypes(Types, args);
  return fn(...args);
};

const theRestAre = (context, exportedFn) => RestType => {
  context.RestType = RestType;
  return exportedFn;
};

module.exports = (...args) => {
  const context = {};
  const [Types, fn] = truncateLast(args);
  const exportedFn = enforceTypes(context, Types, fn);
  exportedFn.theRestAre = theRestAre(context, exportedFn);
  return exportedFn;
};
