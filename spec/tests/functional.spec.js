const {
  complement, compose, enforceTypes, ifn, memoize,
  overload, partial, partialReverse, thread, through
} = require('../../src/functional');
const { ArityMismatchError } = require('../../src/utils/errors');

describe('functional', () => {
  describe('complement', () => {
    it('returns the complemented result when invoked', () => {
      const isNumber = input => typeof input === 'number';
      const isNotNumber = complement(isNumber);

      expect(isNotNumber(3)).toEqual(false);
      expect(isNotNumber('apple')).toEqual(true);
    });
  });

  describe('compose', () => {
    it('threads input from right-to-left when invoked', () => {
      const multiplyThenAdd = compose(x => x + 3, x => x * 3);

      expect(multiplyThenAdd(2)).toEqual(9);
      expect(multiplyThenAdd(-15)).toEqual(-42);
      expect(isNaN(multiplyThenAdd('apple'))).toEqual(true);
    });
  });

  describe('enforceTypes', () => {
    it('accepts valid types', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes(Number, String, Function, Object, Array, Boolean, spy);

      fn(1, 'string', enforceTypes, {}, [{}, 111], true);
      expect(spy).toHaveBeenCalledWith(1, 'string', enforceTypes, {}, [{}, 111], true);
    });

    it('accepts null values', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes(Array, [String], spy);

      fn(null, null);
      expect(spy).toHaveBeenCalledWith(null, null);
    });

    it('throws and error if a type is invalid', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes(Number, String, spy);

      expect(() => fn('string', 1)).toThrow(new TypeError('Expected "string" to be of Type "Number"'));
    });

    it('does not accept undefined', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes(Boolean, spy);

      expect(fn).toThrow();
    });

    it('checks the items of an array', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes([String], spy);

      fn(['string', 'string', null]);
      expect(spy).toHaveBeenCalledWith(['string', 'string', null]);

      expect(() => fn(['string', 17])).toThrow(new TypeError('Expected "17" to be of Type "String"'));
    });

    it('only tests arguments with a type', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes([Number], spy);

      expect(() => fn([1, 2, 3], 'something')).not.toThrow();
      fn([7], {key: 'value'});
      expect(spy).toHaveBeenCalledWith([1, 2, 3], 'something');
    });

    it('makes sure all types are functions', () => {
      const fn = enforceTypes(1, () => null);

      expect(() => fn(1)).toThrow(new TypeError(`Expected Type to be a function, got "1"`));
    });

    it('works with custom types', () => {
      class MyType {}
      const myType1 = new MyType;
      const myType2 = new MyType;

      const fn = enforceTypes([MyType], () => null);

      expect(() => fn([myType1, myType2])).not.toThrow();
    });

    it('works with inheritance', () => {
      class MyType {}
      const myType = new MyType;

      const fn = enforceTypes(Object, MyType, () => null);

      expect(() => fn(myType, myType)).not.toThrow();
    });

    it('works with rest arguments', () => {
      const spy = jasmine.createSpy('spy');
      const fn = enforceTypes(String, Number, spy).theRestAre(Boolean);

      expect(() => fn('string', 1)).not.toThrow();
      expect(() => fn('string', 1, true, false, null, true)).not.toThrow();
      expect(() => fn('string', 1, true, false, {})).toThrow();
    });
  });

  describe('ifn', () => {
    let spy, dummy = _ => _;

    beforeEach(() => {
      spy = jasmine.createSpy('spy');
    });

    it('takes a value and applies it to the first function passed', () => {
      const fn = ifn(spy, dummy, dummy);
      fn(3);
      expect(spy).toHaveBeenCalledWith(3);
    });

    it('invokes the second arg supplied if test passes', () => {
      const result = ifn(Boolean, () => 1, dummy)(17);
      expect(result).toEqual(1);
    });

    it('invokes the third arg supplied if test fails', () => {
      const result = ifn(Boolean, dummy, () => -1)(null);
      expect(result).toEqual(-1);
    });

    it('takes multiple values', () => {
      const fn = ifn(spy, dummy, dummy);
      fn(1, 2, 3);
      expect(spy).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  describe('memoize', () => {
    it('returns cached result when it recognizes input', () => {
      const spy = jasmine.createSpy('memoizeSpy');
      const memoizedFn = memoize(spy);

      memoizedFn(5000);
      memoizedFn(1000);
      memoizedFn(5000);
      memoizedFn(1000);
      memoizedFn(5000);
      memoizedFn(1000);
      memoizedFn(5000);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('overload', () => {
    it('calls first arity-matching function', () => {
      const goodSpy = jasmine.createSpy('goodSpy').and.returnValue('returnValue');
      const badSpy = jasmine.createSpy('badSpy');
      const someFunction = (a, b, c, d) => goodSpy();
      const someOtherFunction = (a, b, c, d) => badSpy();

      const method = overload(someFunction, someOtherFunction);
      const output = method(1, 2, 3, 4);
      expect(goodSpy).toHaveBeenCalled();
      expect(badSpy).not.toHaveBeenCalled();
      expect(output).toEqual('returnValue');
    });

    it('does not call function if arity does not match', () => {
      const aritySpy = jasmine.createSpy('aritySpy');
      const someFunction = a => aritySpy();

      const method = overload(someFunction, (a, b, c, d) => null);
      method(1, 2, 3, 4);
      expect(aritySpy).not.toHaveBeenCalled();
    });

    it('throws an ArityMismatchError if no arity matches', () => {
      const method = overload();

      expect(method).toThrow(new ArityMismatchError(0));

      try {
        method(1, 2, 3);
      } catch (error) {
        expect(error.message).toEqual('No function found with 3 argument(s).');
        expect(error.name).toEqual('ArityMismatchError');
      }
    });

    it('ignores arguments that are not functions', () => {
      const aritySpy = jasmine.createSpy('aritySpy');
      const nonFunction = [1, 2, 3];
      const someFunction = (a, b, c) => aritySpy();

      const method = overload(nonFunction, someFunction);
      method(1, 2, 3);
      expect(aritySpy).toHaveBeenCalled();
    });

    it('can have an optional orElse method', () => {
      const aritySpy = jasmine.createSpy('aritySpy').and.returnValue('arity');
      const someFunction = (a, b, c) => null;

      const method = overload(someFunction).orElse(aritySpy);
      const output = method(1, 2, 3, 4);
      expect(aritySpy).toHaveBeenCalledWith(1, 2, 3, 4);
      expect(output).toEqual('arity');
    });
  });

  describe('partial', () => {
    it('invokes the arguments in the order they are given', () => {
      const spy = jasmine.createSpy('spy');
      const fn = partial(spy, 1);
      fn(2, 3);
      expect(spy).toHaveBeenCalledWith(1, 2, 3);
    });

    it('is chainable', () => {
      const spy = jasmine.createSpy('spy');
      const fn1 = partial(spy, 1);
      const fn2 = partial(fn1, 2, 3);
      fn2(4);
      expect(spy).toHaveBeenCalledWith(1, 2, 3, 4);
    });
  });

  describe('partialReverse', () => {
    it('invokes the sets of arguments in the reverse order they are given', () => {
      const spy = jasmine.createSpy('spy');
      const fn = partialReverse(spy, 1);
      fn(2, 3);
      expect(spy).toHaveBeenCalledWith(2, 3, 1);
    });

    it('is chainable', () => {
      const spy = jasmine.createSpy('spy');
      const fn1 = partialReverse(spy, 1);
      const fn2 = partialReverse(fn1, 2, 3);
      fn2(4, 5);
      expect(spy).toHaveBeenCalledWith(4, 5, 2, 3, 1);
    });
  });

  describe('thread', () => {
    it('threads input from left-to-right when invoked', () => {
      const addThenMultiply = thread(x => x + 3, x => x * 3);

      expect(addThenMultiply(2)).toEqual(15);
      expect(addThenMultiply(-15)).toEqual(-36);
      expect(isNaN(addThenMultiply('apple'))).toEqual(true);
    });
  });

  describe('through', () => {
    it('passes the inputs through the function', () => {
      const spy = jasmine.createSpy('spy');
      through(spy)(3, 4, 5);
      expect(spy).toHaveBeenCalledWith(3, 4, 5);
    });

    it('returns its first input', () => {
      const spy = jasmine.createSpy('spy').and.returnValue(17);
      const output = through(spy)(3, -3);
      expect(output).toEqual(3);
    });
  });
});
