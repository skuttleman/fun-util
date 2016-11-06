const { join } = require('../../src/array');

describe('array', () => {
  describe('join', () => {
    it('joins an array', () => {
      expect(join([1, 2, 3], '|')).toEqual('1|2|3');
    });

    it('defaults to no separator', () => {
      expect(join([1, 2, 3])).toEqual('123');
    });
  });
});
