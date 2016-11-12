const {
  deepCopy, deepEqual, getIn
} = require('../../src/misc');

describe('misc', () => {
  describe('deepCopy', () => {
    it('works on arrays', () => {
      const input = [1, 2, { 3: 4 }];
      const copy = deepCopy(input);
      expect(copy instanceof Array).toEqual(true);
      expect(copy).toEqual(input);
      expect(copy === input).toEqual(false);
    });

    it('works on objects', () => {
      const input = { a() { return this.b }, b: { c: [1, 2, 3] } };
      const copy = deepCopy(input);
      expect(copy instanceof Object).toEqual(true);
      expect(copy).toEqual(input);
      expect(copy === input).toEqual(false);

      copy.b = 17;
      expect(input.a()).toEqual({ c: [1, 2, 3] });
      expect(copy.a()).toEqual(17);
    });
  });

  describe('deepEqual', () => {
    it('works on arrays', () => {
      const input = [1, 2, 3, { a: 4 }];
      expect(deepEqual(input, [1, 2, 3, { a: 4 }])).toEqual(true);
      expect(deepEqual(input, [{ a: 4 }, 3, 2, 1])).toEqual(false);
    });

    it('works on objects', () => {
      const input = { a: { b: { c: [] } } };
      expect(deepEqual(input, { a: { b: { c: [] } } })).toEqual(true);
      expect(deepEqual(input, { a: { b: { c: [], d: undefined } } })).toEqual(false);
    });
  });

  describe('getIn', () => {
    it('gets a nested value', () => {
      const result = getIn({ a: { b: [null, { c: [1, 2, 'apple'] }] } }, 'a', 'b', 1, 'c', 2);
      expect(result).toEqual('apple');
    });

    it('fails silently', () => {
      const result = getIn({ a: { b: [] } }, 'a', 'b', 1, 'c');
      expect(result).toEqual(undefined);
    });

    it('returns null values when found', () => {
      const result = getIn({ a: { b: [null, { c: [1, 2, 'apple'] }] } }, 'a', 'b', 0);
      expect(result).toEqual(null);
    });
  });
});
