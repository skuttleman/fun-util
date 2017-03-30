const { isEmpty, isNothing } = require('../../src/value');

describe('value', () => {
  describe('isEmpty', () => {
    it('works on strings', () => {
      expect(isEmpty('some string')).toEqual(false);

      expect(isEmpty('')).toEqual(true);
    });

    it('works on null and undefined', () => {
      expect(isEmpty(null)).toEqual(true);

      expect(isEmpty(undefined)).toEqual(true);
    });

    it('works on numbers', () => {
      expect(isEmpty(13)).toEqual(false);

      expect(isEmpty(0)).toEqual(true);
    });

    it('works on arrays', () => {
      expect(isEmpty([1, 2, 3])).toEqual(false);

      expect(isEmpty([])).toEqual(true);
    });

    it('works on objects', () => {
      expect(isEmpty({a: 1, b: 2, c: 3})).toEqual(false);

      expect(isEmpty({})).toEqual(true);
    });
  });

  describe('isNothing', () => {
    it('works on null and undefined', () => {
      expect(isNothing(null)).toEqual(true);

      expect(isNothing(undefined)).toEqual(true);
    });

    it('works on other value types', () => {
      const tests = [0, 1, '', 'string', [], [1, 2, 3], {}, {a: 1}, () => null, NaN];

      tests.forEach(test => expect(isNothing(test)).toEqual(false));
    });
  });
});