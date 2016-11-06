const { join, toArray } = require('../../src/array');

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
});
