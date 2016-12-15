const {
  any, concat, every, filter, find, first, forEach, last,
  map, mapFilter, reduce, rest, reverse, size, sort, truncate
} = require('../../src/iterable');

describe('iterable', () => {
  describe('any', () => {
    it('works on arrays', () => {
      expect(any(['pig', 'bear', 'zebra'], animal => animal === 'pig')).toEqual(true)
      expect(any(['pig', 'bear', 'zebra'], animal => animal === 'lion')).toEqual(false)
    })

    it('works on strings', () => {
      expect(any('pig, bear, zebra', character => character === ',')).toEqual(true)
      expect(any('pig, bear, zebra', character => character === '-')).toEqual(false)
    })

    it('works on objects', () => {
      expect(any({ a: 'pig', b: 'bear', c: 'zebra' }, animal => animal === 'pig')).toEqual(true)
      expect(any({ a: 'pig', b: 'bear', c: 'zebra' }, animal => animal === 'lion')).toEqual(false)
    })
  })

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

  describe('every', () => {
    it('works on arrays', () => {
      let result = every([1, 'string', () => null, {}], Boolean);
      expect(result).toEqual(true);

      result = every([0, '', null, undefined, false, NaN], value => !value);
      expect(result).toEqual(true);

      result = every([true, true, true, false, true], x => x);
      expect(result).toEqual(false);
    });

    it('works on strings', () => {
      let result = every('sdfghjklqwertghn', letter => letter.match(/[a-z]/));
      expect(result).toEqual(true);

      result = every('sdfghjklqwertghnA', letter => letter.match(/[a-z]/));
      expect(result).toEqual(false);
    });

    it('works on objects', () => {
      let result = every({ a: 'a', '3': '3', monkey: 'monkey' }, (value, key) => value === key);
      expect(result).toEqual(true);

      result = every({ monkey: 'banana' }, (value, key) => value === key);
      expect(result).toEqual(false);
    });
  });

  describe('filter', () => {
    it('works on arrays', () => {
      let input = [1, 'string', () => null, {}];
      let result = filter(input, Boolean);
      expect(result).toEqual(input);

      input= [0, '', null, undefined, false, NaN];
      result = filter(input, value => !value);
      expect(result).toEqual(input);

      result = filter([true, true, true, false, true], x => x);
      expect(result).toEqual([true, true, true, true]);
    });

    it('works on strings', () => {
      let input = 'sdfghjklqwertghn';
      let result = filter('sdfghjklqwertghn', letter => letter.match(/[a-z]/));
      expect(result).toEqual(input);

      result = filter('sdfghjk0lqw-ertghnA', letter => letter.match(/[a-z]/));
      expect(result).toEqual('sdfghjklqwertghn');
    });

    it('works on objects', () => {
      let input = { a: 'a', '3': '3', monkey: 'monkey' };
      let result = filter(input, (value, key) => value === key);
      expect(result).toEqual(input);

      result = filter({ a: 'a', 'null': null, monkey: 'banana' }, (value, key) => value === key);
      expect(result).toEqual({ a: 'a' });
    });
  });

  describe('find', () => {
    it('works on arrays', () => {
      let input = [1, 'string', () => null, {}];
      let result = find(input, input => input.constructor === String);
      expect(result).toEqual('string');

      input= [0, '', null, undefined, false, NaN];
      result = find(input, value => value === false);
      expect(result).toEqual(false);

      result = find([true, true, true, true], value => value === false);
      expect(result).toEqual(undefined);
    });

    it('works on strings', () => {
      let input = 'sdfghjklqwertghn';
      let result = find('sdfghjklqwertghn', letter => letter === 'g');
      expect(result).toEqual('g');

      result = find('sdfghjk0lqw-ertghnA', letter => letter === 'R');
      expect(result).toEqual(undefined);
    });

    it('works on objects', () => {
      let input = { a: 'a', '3': '3', monkey: 'monkey' };
      let result = find(input, (value, key) => key === 'monkey');
      expect(result).toEqual(['monkey', 'monkey']);

      result = find(input, (value, key) => key !== value);
      expect(result).toEqual(undefined);
    });
  });

  describe('first', () => {
    it('works on arrays', () => {
      expect(first([1, 2, 3, 4])).toEqual(1);
      expect(first([])).toEqual(undefined);
    });

    it('works on strings', () => {
      expect(first('string')).toEqual('s');
      expect(first('')).toEqual(undefined);
    });
  });

  describe('forEach', () => {
    it('works on arrays', () => {
      const countSpy = jasmine.createSpy('countSpy');
      forEach([1, 2, 3, 4, 5], countSpy);
      expect(countSpy).toHaveBeenCalledTimes(5);
    });

    it('works on strings', () => {
      const countSpy = jasmine.createSpy('countSpy');
      forEach('this is a string', countSpy);
      expect(countSpy).toHaveBeenCalledTimes(16);
    });

    it('works on objects', () => {
      const countSpy = jasmine.createSpy('countSpy');
      forEach({ a: 1, b: 2, c: 3 }, countSpy);
      expect(countSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('last', () => {
    it('works on arrays', () => {
      expect(last([1, 2, 3, 4])).toEqual(4);
      expect(last([])).toEqual(undefined);
    });

    it('works on strings', () => {
      expect(last('string')).toEqual('g');
      expect(last('')).toEqual(undefined);
    });
  });

  describe('map', () => {
    it('works on arrays', () => {
      const result = map([1, 2, 3, 4, 5], number => number * 2);
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    it('works on strings', () => {
      const result = map('this is a string', letter => letter.toUpperCase());
      expect(result).toEqual('THIS IS A STRING');
    });

    it('works on objects', () => {
      const result = map({ a: 1, b: 2, c: 3 }, (value, key) => key);
      expect(result).toEqual({ a: 'a', b: 'b', c: 'c' });
    });

    it('maps through multiple mapping functions', () => {
      const doubleIt = number => number * 2;
      const tripleIt = number => number * 3;
      const addOne = number => number + 1;
      const result = map([1, 2, 3, 4, 5], doubleIt, addOne, tripleIt);
      expect(result).toEqual([9, 15, 21, 27, 33]);
    });
  });

  describe('mapFilter', () => {
    it('works on arrays', () => {
      const fn = number => number % 2 === 0 ? number * 2 : undefined;
      const result = mapFilter([1, 2, 3, 4, 5, 6], fn);
      expect(result).toEqual([4, 8, 12]);
    });

    it('works on strings', () => {
      const fn = letter => letter === letter.toUpperCase() ? letter.toLowerCase() : undefined;
      const result = mapFilter('This Is the Song That Never Ends!', fn);
      expect(result).toEqual('t i  s t n e!');
    });

    it('works on objects', () => {
      const fn = value => value % 2 !== 0 ? value % 3 === 0 : undefined;
      const result = mapFilter({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, fn);
      expect(result).toEqual({ a: false, c: true, e: false });
    });
  });

  describe('reduce', () => {
    it('works on arrays', () => {
      const result = reduce([1, 2, 3, 4, 5], (string, value) => string + value, '');
      expect(result).toEqual('12345');
    });

    it('works on strings', () => {
      const result = reduce('abc', (object, letter, index) => {
        return {...object, [letter]: index };
      }, {});
      expect(result).toEqual({ a: 0, b: 1, c: 2 });
    });

    it('works on objects', () => {
      const result = reduce({ a: 1, b: 2, c: 3 }, (total, value) => total + value, 6);
      expect(result).toEqual(12);
    });
  });

  describe('rest', () => {
    it('works on arrays', () => {
      expect(rest([1, 2, 3, 4, 5])).toEqual([2, 3, 4, 5]);
    });

    it('works on strings', () => {
      expect(rest('string')).toEqual('tring');
    });
  });

  describe('reverse', () => {
    it('works on arrays', () => {
      const result = reverse([1, 2, 3, 4, 5]);
      expect(result).toEqual([5, 4, 3, 2, 1]);
    });

    it('doesn\'t mutate the original array', () => {
      const input = [1, 2, 3, 4, 5];
      reverse(input);
      expect(input).toEqual([1, 2, 3, 4, 5]);
    });

    it('works on strings', () => {
      const result = reverse('this is a string');
      expect(result).toEqual('gnirts a si siht');
    });
  });

  describe('size', () => {
    it('works on arrays', () => {
      expect(size([1, 2, 3, 4, 5])).toEqual(5);
      expect(size([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(9);
    });

    it('works on strings', () => {
      expect(size('string')).toEqual(6);
      expect(size('')).toEqual(0);
    });

    it('works on objects', () => {
      expect(size({ a: 1, b: 2, c: 3 })).toEqual(3);
    });
  });

  describe('sort', () => {
    it('works on arrays', () => {
      let result = sort([10, 100, 1, -5, 15, 2]);
      expect(result).toEqual([-5, 1, 2, 10, 15, 100]);

      result = sort([10, 100, 1, -5, 15, 2], (a, b) => b - a);
      expect(result).toEqual([100, 15, 10, 2, 1, -5]);
    });

    it('doesn\'t mutate the original array', () => {
      const input = [5, 4, 1, 2, 3];
      sort(input);
      expect(input).toEqual([5, 4, 1, 2, 3]);
    });

    it('works on strings', () => {
      const result = sort('this is a string');
      expect(result).toEqual('   aghiiinrssstt');
    });
  });

  describe('truncate', () => {
    it('works on arrays', () => {
      expect(truncate([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
    });

    it('works on strings', () => {
      expect(truncate('string')).toEqual('strin');
    });
  });
});
