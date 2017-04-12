const {
  deepCompare, deepCopy, deepEqual, deepMerge, getIn, slice, type, updateIn
} = require('../../src/misc');

describe('misc', () => {
  describe('deepCompare', () => {
    it('works on primatives', () => {
      expect(deepCompare('some string', 'some string')).toEqual(undefined);
      expect(deepCompare('some string', 'some other string')).toEqual('"some string" != "some other string"');

      expect(deepCompare(13, 13)).toEqual(undefined);
      expect(deepCompare(13, '13')).toEqual('13 != "13"');

      expect(deepCompare(false, null)).toEqual('false != null');
    });

    it('works on objects', () => {
      expect(deepCompare({ a: 'value' }, { a: 'value' })).toEqual(undefined);
      expect(deepCompare({ a: 'value' }, { a: 'another value' })).toEqual({ a: '"value" != "another value"' });
    });

    it('works on arrays', () => {
      expect(deepCompare([{ a: 'value' }], [{ a: 'value' }])).toEqual(undefined);
      expect(deepCompare([{ a: 'value' }], [{ a: 'another value' }])).toEqual([{ a: '"value" != "another value"' }]);
    });

    it('recognizes extra keys', () => {
      expect(deepCompare([1, 2, 3], [1, 2, 3, 4])).toEqual(['undefined != 4']);
      expect(deepCompare({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toEqual({ c: 'undefined != 3' });
    });

    it('matches on type', () => {
      expect(deepCompare({ '0': 'value' }, ['value'])).toEqual('type mismatch');
    });

    it('works with NaN', () => {
      expect(deepCompare(NaN, NaN)).toEqual(undefined);
      expect(deepCompare(NaN, undefined)).toEqual('NaN != undefined');
    });

    it('works on compound, nested values', () => {
      const value1 = {
        a: [1, 2, { a: 0 }],
        b: 'string',
        c: {
          d: {
            f: [{}, { a: 'b' }]
          },
          e: {
            g: -33
          }
        }
      };
      const value2 = {
        a: [1, 2, { a: 0 }],
        b: 'string',
        c: {
          d: {
            f: [{ x: 'extra' }, null, { a: 'b' }]
          },
          e: {
            g: -33
          }
        }
      };
      const expected = {
        c: {
          d: {
            f: [
              {
                x: 'undefined != "extra"'
              },
              '{"a":"b"} != null',
              'undefined != {"a":"b"}'
              ]
            }
          }
        };

      const result = deepCompare(value1, value2);

      expect(result).toEqual(expected);
    });
  });

  describe('deepCopy', () => {
    it('works on arrays', () => {
      const input = [1, 2, { 3: 4 }];
      const copy = deepCopy(input);
      expect(copy instanceof Array).toEqual(true);
      expect(copy).toEqual(input);
      expect(copy).not.toBe(input);
    });

    it('works on objects', () => {
      const input = { a() { return this.b }, b: { c: [1, 2, 3] } };
      const copy = deepCopy(input);
      expect(copy instanceof Object).toEqual(true);
      expect(copy).toEqual(input);
      expect(copy).not.toBe(input);

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
      expect(newValue).toEqual({ a: { b: { c: { d: 1 } } }, b: { c: { d: 2 } } });

      newValue = updateIn(null, 0.1, -1, 'some value');
      expect(newValue).toEqual({ '0.1': { '-1': 'some value' } });
    });

    it('creates nested arrays if positive integer key not found', () => {
      let newValue = updateIn(original, 0, 1, '2', 2);

      expect(newValue).toEqual({ a: { b: { c: { d: 1 } } }, 0: [undefined, { 2: 2 }] });
    });
  });
});
