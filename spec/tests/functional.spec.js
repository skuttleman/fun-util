const {
  complement, compose, ifn, memoize, partial, partialReverse, thread
} = require('../../src/functional');

describe('functional', () => {
  describe('complement', () => {
    it('returns the complemented result when invoked', () => {
      const isNumber = input => Number(input) === 0 || !!Number(input);
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
});
