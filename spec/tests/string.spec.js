const { split } = require('../../src/string');

describe('string', () => {
  describe('split', () => {
    it('splits a string', () => {
      expect(split('1,2,3,4,5', ',')).toEqual(['1', '2', '3', '4', '5']);
    });

    it('defaults to every character', () => {
      expect(split('12345'), ',').toEqual(['1', '2', '3', '4', '5']);
    });
  });
});
