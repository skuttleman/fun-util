const {
  any, concat, every, filter, find, first, firstRest, flatMap,
  forEach, last, map, mapFilter, reduce, rest, reverse, size,
  sort, takeUntil, takeWhile, truncate, truncateLast
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

  describe('firstRest', () => {
    it('works on arrays', () => {
      let [a, b] = firstRest([1, 2, 3, 4, 5]);
      expect(a).toEqual(1);
      expect(b).toEqual([2, 3, 4, 5]);
    });

    it('works on strings', () => {
      let [a, b] = firstRest('string');
      expect(a).toEqual('s');
      expect(b).toEqual('tring');
    });
  });

  describe('flatMap', () => {
    it('works on arrays', () => {
      const data = [['first', ['second'], 'third'], 'fourth'];

      expect(flatMap(data, word => word.toUpperCase())).toEqual(['FIRST', 'SECOND', 'THIRD', 'FOURTH'])
    });

    it('works with multiple mapping functions', () => {
      const spy1 = jasmine.createSpy('spy1');
      const spy2 = jasmine.createSpy('spy2').and.returnValue(8);
      let actual = flatMap([1, [2, [3]]], spy1, spy2);

      expect(spy1).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
      expect(spy1).toHaveBeenCalledWith(2, 1, [1, 2, 3]);
      expect(spy1).toHaveBeenCalledWith(3, 2, [1, 2, 3]);

      expect(spy2).toHaveBeenCalledWith(undefined, 0, [1, 2, 3]);
      expect(spy2).toHaveBeenCalledWith(undefined, 1, [1, 2, 3]);
      expect(spy2).toHaveBeenCalledWith(undefined, 2, [1, 2, 3]);

      expect(actual).toEqual([8, 8, 8]);
    });

    it('flattens the array if no mapping functions are provided', () => {
      expect(flatMap([1, [2], 3, [[4], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('forEach', () => {
    it('works on arrays', () => {
      const forEachSpy = jasmine.createSpy('forEachSpy');
      forEach([1, 2, 3, 4, 5], forEachSpy);

      expect(forEachSpy).toHaveBeenCalledWith(1, 0, [1, 2, 3, 4, 5]);
      expect(forEachSpy).toHaveBeenCalledWith(2, 1, [1, 2, 3, 4, 5]);
      expect(forEachSpy).toHaveBeenCalledWith(3, 2, [1, 2, 3, 4, 5]);
      expect(forEachSpy).toHaveBeenCalledWith(4, 3, [1, 2, 3, 4, 5]);
      expect(forEachSpy).toHaveBeenCalledWith(5, 4, [1, 2, 3, 4, 5]);
    });

    it('works on strings', () => {
      const forEachSpy = jasmine.createSpy('forEachSpy');
      forEach('string', forEachSpy);

      expect(forEachSpy).toHaveBeenCalledWith('s', 0, 'string');
      expect(forEachSpy).toHaveBeenCalledWith('t', 1, 'string');
      expect(forEachSpy).toHaveBeenCalledWith('r', 2, 'string');
      expect(forEachSpy).toHaveBeenCalledWith('i', 3, 'string');
      expect(forEachSpy).toHaveBeenCalledWith('n', 4, 'string');
      expect(forEachSpy).toHaveBeenCalledWith('g', 5, 'string');
    });

    it('works on objects', () => {
      const forEachSpy = jasmine.createSpy('forEachSpy');
      forEach({ a: 1, b: 2, c: 3 }, forEachSpy);

      expect(forEachSpy).toHaveBeenCalledWith(1, 'a', { a: 1, b: 2, c: 3 });
      expect(forEachSpy).toHaveBeenCalledWith(2, 'b', { a: 1, b: 2, c: 3 });
      expect(forEachSpy).toHaveBeenCalledWith(3, 'c', { a: 1, b: 2, c: 3 });
    });

    it('accepts multiple inputs', () => {
      const forEachSpy = jasmine.createSpy('forEachSpy');
      forEach([1, 2, 3], '', {}, forEachSpy);

      expect(forEachSpy).toHaveBeenCalledTimes(3);
    });

    it('uses keys and context from first input', () => {
      const forEachSpy = jasmine.createSpy('forEachSpy');
      forEach([1, 2, 3], 'string', {0: 'soup', ignored: 'value'}, forEachSpy);

      expect(forEachSpy).toHaveBeenCalledWith(1, 's', 'soup', 0, [1, 2, 3]);
      expect(forEachSpy).toHaveBeenCalledWith(2, 't', undefined, 1, [1, 2, 3]);
      expect(forEachSpy).toHaveBeenCalledWith(3, 'r', undefined, 2, [1, 2, 3]);
    });

    it('takes multiple functions', () => {
      const spy1 = jasmine.createSpy('spy1');
      const spy2 = jasmine.createSpy('spy2');

      forEach('thing', 'other thing', spy1, spy2);

      expect(spy1).toHaveBeenCalledTimes(5);
      expect(spy2).toHaveBeenCalledTimes(5);
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

    it('takes multiple items', () => {
      const result = map('string', [1, 2, 3, 4, 5, 6], (letter, number) => {
        return `${letter}-${number}`;
      });

      expect(result).toEqual('s-1t-2r-3i-4n-5g-6');
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

    it('works with multiple items', () => {
      const reduceSpy = jasmine.createSpy('reduceSpy');

      reduce([1, 2, 3], { a: 1, 2: 'two' }, 'st', reduceSpy, null);

      expect(reduceSpy).toHaveBeenCalledWith(null, 1, undefined, 's', 0, [1, 2, 3]);
      expect(reduceSpy).toHaveBeenCalledWith(undefined, 2, undefined, 't', 1, [1, 2, 3]);
      expect(reduceSpy).toHaveBeenCalledWith(undefined, 3, 'two', undefined, 2, [1, 2, 3]);
    });

    it('reduces without default value', () => {
      expect(reduce({ a: 1, b: 2, c: 3 }, (a, b) => a + b)).toEqual(6);
      expect(reduce('abcdefg', (_, letter) => letter)).toEqual('g');
      expect(reduce([1,2,3,4], (a, b) => a * b)).toEqual(24);
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

  describe('takeUntil', () => {
    it('works on arrays', () => {
      let result = takeUntil([1, 3, 5, 6, 7, 9, 11], number => number % 2 === 0);
      expect(result).toEqual([1, 3, 5]);
    });

    it('works on strings', () => {
      let result = takeUntil('lowerUPPERlower', letter => letter === letter.toUpperCase());
      expect(result).toEqual('lower');
    });

    it('takes everything', () => {
      let array = [1, 2, 3, 4, 5];
      let result = takeUntil(array, () => false);
      expect(result).toEqual(array);
      expect(result == array).toEqual(false);
    });

    it('takes nothing', () => {
      let result = takeUntil('lower', () => true);
      expect(result).toEqual('');
    });

    it('stops evaluating on first truthy response', () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const spy = jasmine.createSpy('spy').and.callFake(number => number > 5);

      takeUntil(array, spy);
      expect(spy).toHaveBeenCalledTimes(6);
    });
  });

  describe('takeWhile', () => {
    it('works on arrays', () => {
      let result = takeWhile([1, 3, 5, 6, 7, 9, 11], number => number % 2);
      expect(result).toEqual([1, 3, 5]);
    });

    it('works on strings', () => {
      let result = takeWhile('UPPERlowerUPPER', letter => letter === letter.toUpperCase());
      expect(result).toEqual('UPPER');
    });

    it('takes everything', () => {
      let array = [1, 2, 3, 4, 5];
      let result = takeWhile(array, () => true);
      expect(result).toEqual(array);
      expect(result == array).toEqual(false);
    });

    it('takes nothing', () => {
      let result = takeWhile('lower', () => false);
      expect(result).toEqual('');
    });

    it('stops evaluating on first falsey response', () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const spy = jasmine.createSpy('spy').and.callFake(number => number <= 5);
      takeWhile(array, spy);

      expect(spy).toHaveBeenCalledTimes(6);
    })
  });

  describe('truncate', () => {
    it('works on arrays', () => {
      expect(truncate([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
    });

    it('works on strings', () => {
      expect(truncate('string')).toEqual('strin');
    });
  });

  describe('truncateLast', () => {
    it('works on arrays', () => {
      let [a, b] = truncateLast([1, 2, 3, 4, 5]);
      expect(a).toEqual([1, 2, 3, 4]);
      expect(b).toEqual(5);
    });

    it('works on strings', () => {
      let [a, b] = truncateLast('string');
      expect(a).toEqual('strin');
      expect(b).toEqual('g');
    });
  });
});
