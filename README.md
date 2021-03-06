# Fun-Util

1\. [Synopsis](#synopsis)  
2\. [Installation](#installation)  
3\. [How To Use](#usage)  
4\. [Available Methods](#available-methods)  
4.1\. [Array](#array)  
4.2\. [Functional](#functional)  
4.3\. [Iterable](#iterable)  
4.4\. [Misc](#misc)  
4.5\. [Promise](#promise)  
4.6\. [String](#string)  
4.7\. [Value](#value)  
5\. [Testing](#testing)  
6\. [Contributions](#contributions)  
6.1\. [Change Notes](#change-notes)  
7\. [License](#license)  

<a name="synopsis"></a>

## 1\. Synopsis

A one stop shop for functional utility needs. This project was designed for me to have a place to get the kinds of functions I use a lot. This is designed to evolve over time.

Many of these functions are existing methods in javascript, written to accept the context as the first parameter. Some functions, such as `map` and `reduce` have been extended to work with strings and objects.

<a name="installation"></a>

## 2\. Installation

Install with npm as a dependency to your project.

```bash
$ npm i --save fun-util
```

<a name="usage"></a>

## 3\. How To Use

```js
const {
  string: { upperCase },
  functional: { ifn, identity },
  iterable: { map }
} = require('fun-util');

const isIndexDivisibleByTwo = (_, index) => number % 2 === 0;

map('this is a string', ifn(isIndexDivisibleByTwo, upperCase, identity));
// => 'ThIs iS A StRiNg'
```

<a name="available-methods"></a>

## 4\. Available Methods

<a name="array"></a>

### 4.1\. Array

Methods related to arrays.

### All Array Methods

```js
const { array } = require('fun-util');
Object.keys(array);
// => ['join', 'range', 'toArray']
```

#### -`join`

The `Array.prototype` method that defaults to no character between items instead of a comma.

```js
const { join } = require('fun-util');

join([1, 2, 3, 4, 'apple']);
// => '1234apple'
```

#### -`range`

Creates an array from the starting number (inclusive) to the ending number (exclusive) with an optional step.

```js
const { range } = require('fun-util');

range(10);
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(1, -12);
// => [1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11]
range(0, 12, 3);
// => [0, 3, 6, 9]
```

#### -`toArray`

Returns the passed parameters as an `array`.

```js
const { toArray } = require('fun-util');

toArray(1, 2, 3);
// => [1, 2, 3]
toArray([1, 2, 3]);
// => [[1, 2, 3]]
```

<a name="functional"></a>

### 4.2\. Functional

Basic operations that either accept a function, return a function, or do not care what type of value it receives.

#### All Functional Methods

```js
const { functional } = require('fun-util');
Object.keys(functional);
// => ['apply', 'complement', 'compose', 'enforceTypes', 'identity', 'ifn', 'memoize', 'overload', 'partial', 'partialReverse', 'silent', 'thread', 'through', 'truncateArgs']
```

#### -`apply`

Applies an array to a function as individual arguments.

```js
const { apply } = require('fun-util');

apply(a => a, [1, 2, 3]);
// => 1
```

#### -`complement`

Creates a function that returns the negated value of the function supplied.

```js
const { complement } = require('fun-util');

const isThree = x => x === 3;
const notThree = complement(isThree);
isThree(3);
// => true
notThree(3);
// => false
```

#### -`compose`

Creates a function that takes inputs and passes them to last function supplied and then passes the return value to the previous function and so forth, returning the final result.

```js
const { compose } = require('fun-util');

const fn = compose(f, g, h);
fn(3);
// => f(g(h(3)));
```

#### -`enforceTypes`

Throws an error if the types passed into the function do no match the type list. The value `null` matches any type.

```js
const { enforceTypes } = require('fun-util');
class MyType {}
const myType = new MyType;

const fn = enforceTypes(Number, [String], MyType, (number, stringArray, myType) => {
  return 'this works';
}).theRestAre(Function);

fn(1, ['a', 'b', 'c'], myType);
// => 'this works'
fn(null, [], null, () => 'apples', () => 'oranges');
// => 'this works'
fn(0, ['string']);
// => TypeError: Expected "undefined" to be of Type "MyType"
fn(null, null, null, 'not a function', () => 'function');
// => TypeError: Expected "not a function" to be of Type "Function"
```

#### -`identity`

Returns the value supplied and ignores extra arguments.

```js
const { identity } = require('fun-util');

identity(17, 3);
// => 17
```

#### -`ifn`

Creates a function with a testFn, successFn, and failFn. The function then takes inputs. If the result of passing those inputs through testFn are truthy, it returns the value of passing those inputs to successFn. Otherwise it returns the value of passing those inputs to failFn.

```js
const { ifn } = require('fun-util');

const condition = (a, b, c) => a === b && a === c;
const successFn = (a, b, c) => a + b + c;
const failFn = (a, b, c) => a - b - c;
const fn = ifn(condition, successFn, failFn);

fn(1, 2, 3);
// => -4
fn(4, 4, 4);
// => 12
```

#### -`memoize`

Memoizes a function and returns cached results on subsequent calls with the same input.

```js
const { memoize } = require('fun-util');

const memoizedProceedure = memoize(complicatedProceedure);
memoizedProceedure(impossiblyComplicatedInput);
// => Process Completed in 5,000 earth years.
memoizedProceedure(impossiblyComplicatedInput);
// => Process Completed in 0.0013 miliseconds.
```

#### -`overload`

Enforces arity and simulates method overloading. This uses the `length` of the function which ignores the "rest" parameter and any arguments with default values.

```js
((a, ...args) => {}).length
// => 1
((a, b, c = {}, d = 14) => {}).length
// => 2
```

See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length) for more information.
Add an `orElse` clause to overwrite default error throwing.

```js
const { overload, toArray } = require('fun-util');

const addNumbers = (a, b) => a + b;
const addTwo = a => add(a, 2);
const add = overload(addNumbers, addTwo);
const addOrElse = overload(addNumbers, addTwo).orElse(toArray);

add(2);
// => 4
add(1, 7);
// => 8
add(1, 2, 3, 4);
// => Error: ArityMismatch: No function found with 4 argument(s).
addOrElse(1, 2, 3, 4);
// => [1, 2, 3, 4]
```

#### -`partial`

Partially applies a function.

```js
const { partial } = require('fun-util');

const infoLogger = partial(console.log, 'INFO:');
infoLogger('Hello, world!');
//  => INFO: Hello, world!
```

#### -`partialReverse`

Applies initial arguments after the subsequent arguments.

```js
const { last, map, partialReverse, toArray } = require('fun-util');

const hallOfMirrors = partialReverse(map, toArray, last);
hallOfMirrors([1, 2, 3]);
// => map([1, 2, 3], toArray, last);
// => [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
```

#### -`silent`

Applies initial arguments after the subsequent arguments.

```js
const { silent } = require('fun-util');

const parseJSON = silent(JSON.parse);
parseJSON('{"some":"data"}');
// => { some: 'data' }
parseJSON('not {{json}}');
// => 'not {{json}}'
```

#### -`thread`

Similar to compose, creates a function threads the response of the first function through to the next and so on.

```js
const { thread } = require('fun-util');

const fn = thread(addOne, double, addOne);
fn(7);
// => 17
```

#### -`through`

Returns a function that passes arguments through a function but returns the original input.

```js
const { map, through } = require('fun-util');

map([1, 2, 3], console.log, number => number * 2);
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
// => [ NaN, NaN, NaN ]
map([1, 2, 3], through(console.log), number => number * 2);
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
// => [2, 4, 6]
```

#### -`truncateArgs`

Returns a function that limits the number of args passed to the suplied function.

```js
const { forEach, truncateArgs } = require('fun-util');

forEach(['a', 'b', 'c'], console.log);
// a 0 ['a', 'b', 'c']
// b 1 ['a', 'b', 'c']
// c 2 ['a', 'b', 'c']
forEach(['a', 'b', 'c'], truncateArgs(console.log, 1));
// a
// b
// c
```

<a name="iterable"></a>

### 4.3\. Iterable

Methods that apply to iterable objects, arrays, and strings.

#### All Iterable methods

```js
const { iterable } = require('fun-util');
Object.keys(iterable);
// => ['any', 'concat', 'every', 'filter', 'find', 'first', 'firstRest', 'flatMap', 'flatten', 'forEach', 'groupBy', 'hasKey', 'last', 'map', 'mapAllKeys', 'mapFilter', 'reduce', 'rest', 'reverse', 'size', 'sort', 'splitWhen', 'takeUntil', 'takeWhile', 'truncate', 'truncateLast']
```

#### -`any`

The `Array.prototype` method adapted to work with strings and objects.

```js
const { any } = require('fun-util');

any({ a: 1, b: 2, c: '3' }, value => value === String(value));
// => true
```

#### -`concat`

The `Array.prototype` method adapted to work with strings and objects.

```js
const { concat } = require('fun-util');

concat({ a: 1 }, { b: 2 });
// => { a: 1, b: 2 }
```

#### -`every`

The `Array.prototype` method adapted to work with strings and objects.

```js
const { every } = require('fun-util');

every('asdfghj0', character => character.match(/[a-z]/));
// => false
```

#### -`filter`

The `Array.prototype` method adapted to work with strings and objects.

```js
const { filter } = require('fun-util');

filter({ a: 1, b: 2, c: 'c' }, Number);
// => { a: 1, b: 2 }
```

#### -`find`

The `Array.prototype` method adapted to work with strings and objects. Note that finding something in an object may return varying results as the order of keys being iterated over is not guaranteed.

```js
const { find } = require('fun-util');

find('asdfghjk', character => character.match(/[A-Z]/));
// => undefined
```

#### -`first`

Returns the first element of an array or string.

```js
const { first } = require('fun-util');

first([1, 2, 3]);
// => 1
```

#### -`firstRest`

Combines `first` and `rest` for convenience.

```js
const { firstRest } = require('fun-util');

let [item, items] = firstRest([1, 2, 3, 4, 5]);
item
// => 1
items
// => [2, 3, 4, 5]
```

#### -`flatMap`

This flattens a 2 or more dimensional array and maps the result through mapping functions if provided.

```js
const { flatMap } = require('fun-util');

flatMap([[1], [[2], 3], 4]);
// => [1, 2, 3, 4]
flatMap([[1], [[2], 3], 4], number => number * 2, number => number + 3);
// => [5, 7, 9, 11]
```

### -`flatten`

Flattens a multi-dimensional array. It completely falttens by default or to a specified depth.

```js
const { flatten } = require('fun-util');

flatten([1, [2, [3, [4, [5, [6]]]]]]);
// => [1, 2, 3, 4, 5, 6]

flatten([1, [2, [3, [4, [5, [6]]]]]], 2);
// => [1, 2, 3, [4, [5, [6]]]]
```

#### -`forEach`

The `Array.prototype` method adapted to work with strings and objects. Takes multiple items and multiple functions.

```js
const { forEach } = require('fun-util');

forEach('123' [4, 5, 6], (digit1, digit2) => {
  console.log(digit1, digit2);
});
// => '1 4'
// => '2 5'
// => '3 6'
```

#### = `groupBy`

Splits an object, array, or string by a grouping function and produces an object keyed off the different values the grouping function returns.

```js
const { groupBy } = require('fun-util');

groupBy([1, 2, 3, 4, 5, 6, 7, 8], number => number % 2 ? 'odd' : 'even');
// => { odd: [1, 3, 5, 7], even: [2, 4, 6, 8] }
```

#### -`hasKey`

The existing `hasOwnProperty` method for strings, arrays, and objects.

```js
const { hasKey } = require('fun-util');

hasKey([1, 2, 3, 4], 2);
// => true
hasKey('apples', 17);
// => false
```

#### -`last`

Returns the last element of an array or string.

```js
const { last } = require('fun-util');

last([1, 2, 3]);
// => 3
```

#### -`map`

The `Array.prototype` method adapted to work with strings and objects. It accepts multiple items and multiple mapping functions. It maps to the type of the first supplied value.

```js
const { map } = require('fun-util');

map({ a: 1, b: 2, c: 3 }, addOne, double, addOne);
// => { a: 5, b: 7, c: 9 }
```

#### -`mapAllKeys`

Unlike `map` which only iterates over the first value's keys, `mapAllKeys` iterates over every unique key of all values. Like `map`, `mapAllKeys` returns the type of the first supplied value. When mapping to a string or an array, keys which are not whole numbers are dropped on the floor in the result.

```js
const { mapAllKeys } = require('fun-util');

mapAllKeys({ a: 1, b: 2}, [0, 1, 2], 'abc', (value1, value2, value3) => value1 || value2 || value3);
// => { a: 1, b: 2, '0': 'a', '1': 1, '2': 2 }
```

#### -`mapFilter`

A combination of `map` and `filter`. If the map-filtering function returns `undefined`, the value is filtered
out. Otherwise it is mapped to the new output. This works with objects, arrays, and strings.

```js
const { mapFilter } = require('fun-util');

mapFilter({ a: 1, b: 2, c: 3 }, (value, key) => {
  if (key !== 'b') {
    return value - 1;
  }
});
// => { a: 0, c: 2 }
```

#### -`reduce`

The `Array.prototype` method adapted to work with strings and objects.

```js
const { reduce } = require('fun-util');

reduce({ a: 1, b: 2, c: 3 }, [4, 5, 6], (total, value1, value2) => total + value1 + value2);
// => 21
```

#### -`rest`

Returns a new array or string with the first element removed.

```js
const { rest } = require('fun-util');

rest('value');
// => 'alue'
```

#### -`reverse`

Returns a new array (not mutative) or string with the values reversed.

```js
const { reverse } = require('fun-util');
const array = [1, 2, 3];

reverse(array);
// => [3, 2, 1]
array;
// => [1, 2, 3]
```

#### -`size`
The length of a string or array, or the number of an object's keys.

```js
const { size } = require('fun-util');
size('123456');
// => 6
```

#### -`sort`

Returns a new array (not mutative) or string with the values sorted. It takes a method, but by default sorts by `>` and `<` comparisons.

```js
const { sort } = require('fun-util');
const array = [10, 3, 2 ,1];

sort(array);
// => [1, 2, 3, 10]
array;
// => [10, 3, 2, 1]
```

#### -`splitWhen`

Splits an array or string starting the second item when an element meets the criteria.

```js
const { splitWhen } = require('fun-util');

splitWhen('abcdEFGH', letter => letter === letter.toUpperCase());
// => ['abcd', 'EFGH']
```

#### -`takeUntil`

Takes each element in an array or string until the supplied callback returns a truthy value.

```js
const { takeUntil } = require('fun-util');

takeUntil([1, 2, 3, 4, 5], number => number > 3);
// => [1, 2, 3]
```


#### -`takeWhile`

Takes each element in an array or string until the supplied callback returns a falsey value.

```js
const { takeWhile } = require('fun-util');

takeWhile('this is a string', character => character.match(/\w/));
// => 'this'
```

#### -`truncate`

Return a slice array (not mutative) or string with the last element removed.

```js
const { truncate } = require('fun-util');

truncate([1, 2, 3, 4, 5]);
// => [1, 2, 3, 4]
```

#### -`truncateLast`

Combines `truncate` and `last` for convenience.

```js
const { truncateLast } = require('fun-util');

let [items, item] = truncateLast([1, 2, 3, 4, 5]);
items
// => [1, 2, 3, 4]
item
// => 5
```

<a name="misc"></a>

### 4.4\. Misc

Useful miscellaneous methods.

#### All Misc methods

```js
const { misc } = require('fun-util');
Object.keys(misc);
// => ['deepCompare', 'deepCopy', 'deepEqual', 'deepMerge', 'getIn', 'slice', 'updateIn']
```

#### -`deepCompare`

Generates a representation of all differences when comparing two values. This was designed more for debugging purposes.

```js
const { deepCompare } = require('fun-util');

const object1 = {
  list: [1, 2, 3],
  data: {
    favoriteNumber: -11
  },
  favoriteColor: 'blue'
};
const object2 = {
  list: [1, 2, 3, 4],
  data: {
    favoriteNumber: -11
  },
  favoriteColor: 'yellow'
};

deepCompare(object1, object2);
// => { list: { '3': 'undefined != 4' }, favoriteColor: '"blue" != "yellow"' }
```

#### -`deepCopy`

Preforms a deep copy of all nested objects and arrays. Functions are still copied by reference.

```js
const { deepCopy } = require('fun-util');

const x = { a: 1, b: { c: [1, 2, 3], d() { return this.c } } };
const y = deepCopy(x);
x.b.c.push(4);
x.b.d();
// => [1, 2, 3, 4]
y.b.d();
// => [1, 2, 3]
```

#### -`deepEqual`

Preforms a deep comparison of all nested objects, arrays, and functions.

```js
const { deepEqual } = require('fun-util');

const x = { a: 1, b: ['apple', () => null] };
const y = { a: 1, b: ['apple', () => null] };
deepEqual(x, y);
// => true
```

#### -`deepMerge`

Merges two values with right-hand precedence.

```js
const { deepMerge } = require('fun-util');

deepMerge({ a: 1, b: [{ c: 2, d: 3 }, 'old string'] }, { e: 4, b: [{ c: 5 }, 'new string'] });
// => { a: 1, b: [{ c: 5, d: 3 }, 'new string'], e: 4 }
```

#### -`getIn`

Gets a nested value from a complex object or returns undefined.

```js
const { getIn } = require('fun-util');

getIn({ a: { b: [{ c: 17 }] } }, 'a', 'b', 0, 'c');
// => 17
getIn({ a: 1 }, 'b', 'c', 3, 'd');
// undefined
```

#### -`slice`

The existing `slice` method for strings and arrays in "call" form.

```js
const { slice } = require('fun-util');

slice([1, 2, 3, 4], 2);
// => [3, 4]
```

#### - `updateIn`

Copies and sets nested value where the first argument is the starting data structure, the last
argument is the value to set, and the remaining arguments identify the location to set the value.
Creates nested arrays and objects as needed.

```js

const { updateIn } = require('fun-util');

updateIn({ x: 'x' }, 'a', 0, 'b', { c: 17 });
// => { a: [{ b: { c: 17 } }], x: 'x' }
```

<a name="promise"></a>

### 4.5\. Promise

Helpers built on the standard Promise library.

#### All Promise methods

```js
const { promise } = require('fun-util');
Object.keys(promise);
// => ['asyncWhile', 'chain', 'rejectThrough', 'resolveThrough', 'sleep']
```

#### -`asyncWhile`

Takes a promise and a function to be run repeatedly until the promise resolves. This returns a promise that resolves or rejects the same data/error resolved or rejected by the supplied promise. Note that the function is run using `setInterval`. For more on how that will be run, see [documentation for NodeJS](https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_args).

```js
const { asyncWhile } = require('fun-util');

asyncWhile(fetchApiData(), updateProgressBar)
  .then(processApiData)
  .catch(handleApiError);
```

#### -`chain`

Chain promises that run in the order provided. A simpler way to write a promise chain if your
promises are order dependent but do not require data from each other.

```js
const { chain } = require('fun-util');

const reseedTestData() => {
  return chain([
    () => sql('DELETE * FROM TABLE'),
    () => sql('DELETE * FROM OTHER TABLE'),
    () => sql('INSERT INTO TABLE...'),
    () => sql('INSERT INTO OTHER TABLE...')
  ]);
};
```

#### -`rejectThrough`

A version of `through` that works with promises. This rejects the data passed through it.

```js
const { rejectThrough } = require('fun-util');

doSomethingImportant()
  .catch(rejectThrough(writeToLogFile))
  .then(finishSuccessfully, finishUnsuccessfully);
// => finishUnsuccessfully(error)
```

#### -`resolveThrough`

A version of `through` that works with promises. This resolves the data passed through it.

```js
const { resolveThrough } = require('fun-util');

doSomethingImportant()
  .then(resolveThrough(debugLog))
  .then(finishSuccessfully, finishUnsuccessfully);
// => finishSuccessfully(data)
```

#### -`sleep`

A promise wrapper around `setTimeout`. For more on how that will be run, see [documentation for NodeJS](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args).

```js
const { sleep } = require('fun-util');

sleep(1000).then(() => console.log('it has been (at least) one second'));
```

<a name="string"></a>

### 4.6\. String

Methods that act on strings.

Several string methods have also been duplicated in call form to make them easier to use as mapping methods.

These include: `lowerCase`, `match`, `replace`, `trim`, and `upperCase`.

#### All String methods

```js
const { string } = require('fun-util');
Object.keys(string);
// => ['lowerCase', 'match', 'replace', 'split', 'trim', 'upperCase']
```

#### -`split`

The split string method has been wrapped to split on each character by default.

```js
const { split } = require('fun-util');

'string'.split();
// => ['string']
split('string');
// => ['s', 't', 'r', 'i', 'n', 'g']
split('string', 't');
// => ['s', 'ring']
```

<a name="value"></a>

### 4.7\. Value

Functions that qualify an input's value.

#### All Value methods

```js
const { string } = require('fun-util');
Object.keys(string);
// => ['isEmpty', 'isEqual', 'isNaN', 'isNothing', 'type']
```

#### -`isEmpty`

Returns `true` or `false` for any values based on their "truthiness" or "falsiness". Also returns `false` for empty arrays or empty objects.

```js
const { isEmpty } = require('fun-util');

isEmpty([]);
// => true
isEmpty([1, 2, 3]);
// => false
```

#### -`isEqual`

Returns the direct equality comparison of two inputs. The only difference between `isEqual` and `===` is that `isEqual` recognizes that `NaN` and `NaN` are equal.

```js
const { isEqual } = require('fun-util');

isEqual(NaN, NaN);
// true
isEqual({}, {});
// false
```

#### -`isNaN`

An improved `isNaN` function that doesn't recognize `undefined` as being `NaN`.

```js
const betterIsNaN = require('fun-util').isNaN;

isNaN(undefined);
// true
betterIsNaN();
// false
```

#### -`isNothing`

Returns `true` for `null` and `undefined`. Returns `false` for all other values.

```js
const { isNothing } = require('fun-util');

isNothing(false);
// => false
isNothing(null);
// => true
```

#### -`type`

An improved version of `typeof` which differentiates between `array` and `object`.

```js
const { type } = require('fun-util');

typeof [1, 2, 3];
// => 'object'
type([1, 2, 3]);
// => 'array'
```

<a name="testing"></a>

## 5\. Testing

Tests are written using [jasmine](https://jasmine.github.io/).

```bash
$ npm i
$ npm test
```

<a name="contributions"></a>

## 6\. Contributions
_Fun-Util_ is open source. Contribute today at [http://www.github.com/skuttleman/fun-util](http://www.github.com/skuttleman/fun-util)!

<a name="change-notes"></a>

### 6.1\. Change Notes

#### 1.2.0
  - Add iterable/groupBy

#### 1.1.0
  - Add misc/deepCompare and misc/deepMerge
  - Add iterable/mapAllKeys
  - Add value/isEqual and value/isNaN

#### 1.0.0
  - Move misc/type to value/type
  - Add promise/sleep and promise/asyncWhile
  - Add value/isEmpty and value/isNothing
  - Improve misc/updateIn performance and tests
  - Add functional/truncateArgs

#### 0.13.1
  - Update iterable/flatten to flatten to a specified deptha

#### 0.13.0
  - Add iterable/flatten

#### 0.12.1
  - Fix bug with iterable/reduce when calling on empty collection

#### 0.12.0
  - Add functional/silent

#### 0.11.0
  - Add functional/enforceTypes

#### 0.10.0
  - Add iterable/splitWhen
  - iterable/forEach, iterable/map, and iterable/reduce take multiple items, and iterable/forEach takes multiple functions

#### 0.9.0
  - Add 'iterable/firstRest' 'iterable/flatMap', 'iterable/truncateLast', 'misc/type', and 'misc/updateIn'
  - Add error output when transpiling fails

#### 0.8.0
  - Add 'iterable/takeWhile' and 'iterable/takeUntil'
  - Create shell script to update change log from commit messages

#### 0.7.0
  - Add .orElse method to overload.

#### 0.6.0
  - Add overload to functional methods.

#### 0.5.0
  - Add mapFilter to iterable methods.

#### 0.4.2
  - Transpile to ES5 before publishing module.

#### 0.4.0
  - Add Promise methods.

#### 0.2.0
  - All methods are optionally accessible by name without referencing the group.
  ```js
  const { iterable, forEach } = require('fun-util');
  iterable.forEach === forEach;
  // => true
  ```

<a name="license"></a>

## 7\. License

ISC Lisense

Copyright (c)2016, Ben Allred <skuttleman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
