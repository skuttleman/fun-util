const { toArray, join, range } = require('../../src/array');

describe('array', () => {
  describe('join', () => {
    it('joins an array', () => {
      expect(join([1, 2, 3], '|')).toEqual('1|2|3');
    });

    it('defaults to no separator', () => {
      expect(join([1, 2, 3])).toEqual('123');
    });
  });

  describe('toArray', () => {
    it('returns an empty array if no items are supplied', () => {
      expect(toArray()).toEqual([]);
    });

    it('returns the argument list as an array', () => {
      expect(toArray(1, 2, 3, [4, 5, 6])).toEqual([1, 2, 3, [4, 5, 6]]);
    });
  });

  describe('range', () => {
    it('creates a sequential range', () => {
      const output = range(5, 10);
      expect(output).toEqual([5, 6, 7, 8, 9]);
    });

    it('starts at zero if only one input is provided', () => {
      const output = range(5);
      expect(output).toEqual([0, 1, 2, 3, 4]);
    });

    it('creates a range in reverse order if end is less than start', () => {
      const output = range(10, 5);
      expect(output).toEqual([10, 9, 8, 7, 6]);
    });

    it('accepts a step parameter', () => {
      const output = range(1, 10, 3);
      expect(output).toEqual([1, 4, 7]);
    });

    it('uses absolute value of step', () => {
      const output = range(1, 10, -3);
      expect(output).toEqual([1, 4, 7]);
    });

    it('ignores step if 0 or not a number', () => {
      let output = range(1, 10, 0);
      expect(output).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      output = range(1, 10, 'this is not a step');
      expect(output).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('works in reverse with step', () => {
      const output = range(10, 1, 3);
      expect(output).toEqual([10, 7, 4]);
    });
  });
});
