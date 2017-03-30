const {
  deepCopy, deepEqual, getIn, slice, type, updateIn
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

  describe('slice', () => {
    it('works on arrays', () => {
      expect(slice([1, 2, 3], 1)).toEqual([2, 3]);
      expect(slice([1, 2, 3], 0, -1)).toEqual([1, 2]);
    });

    it('works on strings', () => {
      expect(slice('lone string', 1)).toEqual('one string');
      expect(slice('lone string', 0, -1)).toEqual('lone strin');
    });
  });

  describe('type', () => {
    it('recognizes an array', () => {
      expect(type([])).toEqual('array');
    });

    it('recognizes a function', () => {
      expect(type(() => null)).toEqual('function');
    });

    it('recognizes a number', () => {
      expect(type(1)).toEqual('number');
    });

    it('recognizes an object', () => {
      expect(type({})).toEqual('object');
      expect(type(null)).toEqual('object');
    });

    it('recognizes a string', () => {
      expect(type('something')).toEqual('string');
    });

    it('recognizes undefined', () => {
      expect(type(undefined)).toEqual('undefined');
    });
  });

  describe('updateIn', () => {
    let original;
    beforeEach(() => {
      original = { a: { b: { c: { d: 1 } } } };
    });

    it('sets a value', () => {
      let newValue = updateIn(original, 'a', 'b', 'c', 'd', 2);

      expect(newValue).toEqual({ a: { b: { c: { d: 2 } } } });
    });

    it('works with arrays', () => {
      let newValue = updateIn([1, [2, [3, [4]]]], 1, 1, 1, 0, 7);

      expect(newValue).toEqual([1, [2, [3, [7]]]]);
    });

    it('does not mutate original object', () => {
      const someObject = { a: 1 };
      const newObject = updateIn(original, 'a', 'b', 'c', 'd', 2);

      expect(original).toEqual({ a: { b: { c: { d: 1 } } } });
    });

    it('creates nested objects if key not found', () => {
      let newValue = updateIn(original, 'b', 'c', 'd', 2);

      expect(newValue).toEqual({ a: { b: { c: { d: 1 } } }, b: { c: { d: 2} } });
    });

    it('creates nested arrays if integer key not found', () => {
      let newValue = updateIn(original, 0, 1, '2', 2);

      expect(newValue).toEqual({ a: { b: { c: { d: 1 } } }, 0: [undefined, { 2: 2 }] });
    });
  });
});
