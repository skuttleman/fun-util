const {
  concat, deepCopy, deepEqual, getIn, range
} = require('../../src/misc');

describe('misc', () => {
  describe('concat', () => {
    it('works on arrays', () => {
      expect(concat([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('works on strings', () => {
      expect(concat('this is', ' ', 'a string')).toEqual('this is a string');
    });

    it('works on objects', () => {
      expect(concat({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
  });

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
