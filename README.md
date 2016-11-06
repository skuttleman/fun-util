# Fun-Util

1\. [Synopsis](#synopsis)  
2\. [Installation](#installation)  
3\. [How To Use](#usage)  
4\. [Available Methods](#available-methods)  
4.1\. [Array](#array)  
4.2\. [Functional](#functional)  
4.3\. [Iterable](#iterable)  
4.4\. [Misc](#misc)  
4.5\. [Object](#object)  
4.6\. [String](#string)  
5\. [Testing](#testing)  
6\. [Contributions](#contributions)  
7\. [License](#license)  

<a name="synopsis"></a>

## 1\. Synopsis

A one stop shop for my functional utility needs. This project was designed for me to have a place to get the kinds of functions I use a lot. This is designed to evolve over time.

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

#### `join`

Joins an `array` to a `string`.

```js
const join = require('fun-util/array/join');

join([1, 2, 3, 4, 'apple']);
// => '1234apple'
```

#### `range`

Creates an array from the starting number (inclusive) to the ending number (exclusive) with an optional step.

```js
const range = require('fun-util/array/range');

range(10);
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(1, -12);
// => [1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11]
range(0, 12, 3);
// => [0, 3, 6, 9]
```

#### `toArray`

Returns the passed parameters as an `array`.

```js
const toArray = require('fun-util/array/toArray');

toArray(1, 2, 3);
// => [1, 2, 3]
toArray([1, 2, 3]);
// => [[1, 2, 3]]
```

<a name="functional"></a>

### 4.2\. Functional

#### `apply`

Applies an array to a function as individual arguments.

```js
const apply = require('fun-util/functional/apply');

apply(a => a, [1, 2, 3]);
// => 1
```

#### `complement`

Creates a function that return the negated value of the function supplied.

```js
const complement = require('fun-util/functional/complement');

const isThree = x => x === 3;
const notThree = complement(isThree);
isThree(3);
// => true
notThree(3);
// => false
```

#### `compose`

Creates a function that takes inputs and passes them to last function supplied and then passes the return value to the previous function and so forth, returning the final result.

```js
const compose = require('fun-util/functional/compose');

const fn = compose(f, g, h);
fn(3);
// => f(g(h(3)));
```

#### `identity`

Returns the first value supplied.

```js
const identity = require('fun-util/functional/identity');

identity(17);
// => 17
```

#### `ifn`

Creates a function with a testFn, successFn, and failFn. The function then takes inputs. If the result of passing those inputs through testFn are truthy, it returns the value of passing those inputs to successFn. Otherwise it returns the value of passing those inputs to failFn.

```js
const ifn = require('fun-util/functional/ifn');

const fn = ifn(condition, successFn, failFn);

fn(1, 2, 3)
// => condition(1, 2, 3) ? successFn(1, 2, 3) : failFn(1, 2, 3)
```

#### `memoize`

Memoizes a function and returns cached results on subsequent calls with the same input.

```js
const memoize = require('fun-util/functional/memoize');

const memoizedProceedure = memoize(complicatedProceedure);
memoizedProceedure(impossiblyComplicatedInput);
// => Process Completed in 5,000 earth years.
memoizedProceedure(impossiblyComplicatedInput);
//  => Process Completed in 0.0013 miliseconds.
```

#### `partial`

Partially applies a function.

```js
const partial = require('fun-util/functional/partial');

const infoLogger = partial(console.log, 'INFO:');
infoLogger('Hello, world!');
//  => INFO: Hello, world!
```

#### `partialReverse`

Applies initial arguments after the subsequent arguments.

```js
const partialReverse = require('fun-util/functional/partialReverse');
const { map, last } = require('fun-util/iterable');
const toArray = require('fun-util/array/toArray');

const hallOfMirrors = partialReverse(map, toArray, last);
hallOfMirrors([1, 2, 3]);
// => map([1, 2, 3], toArray, last);
// => [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
```

#### `thread`

Similar to compose, creates a function threads the response of the first function through to the next and so on.

```js
const thread = require('fun-util/functional/thread');

const fn = thread(addOne, double, addOne);
fn(7);
// => 17
```

<a name="iterable"></a>

### 4.3\. Iterable

#### `concat`

The `Array.prototype` method adapted to work with strings and objects.

```js
const concat = require('fun-util/iterable/concat');

concat({ a: 1 }, { b: 2 });
// => { a: 1, b: 2 }
```

#### `every`

The `Array.prototype` method adapted to work with strings and objects.

```js
const every = require('fun-util/iterable/every');
const match = require('fun-util/string/match');
const partialReverse = require('fun-util/functional/partialReverse');

every('asdfghj0', partialReverse(match, /[a-z]/));
// => false
```

#### `filter`

The `Array.prototype` method adapted to work with strings and objects.

```js
const filter = require('fun-util/iterable/filter');

filter({ a: 1, b: 2 c: 'c' }, Number);
// => { a: 1, b: 2 }
```

#### `find`

The `Array.prototype` method adapted to work with strings and objects.

```js
const find = require('fun-util/iterable/find');
const match = require('fun-util/string/match');
const partialReverse = require('fun-util/functional/partialReverse');

find('asdfghjk', partialReverse(match, /[A-Z]/));
// => undefined
```

#### `first`

Returns the first element of an array or string.

```js
const first = require('fun-util/iterable/first');

first([1, 2, 3]);
// => 1
```

#### `forEach`

The `Array.prototype` method adapted to work with strings and objects.

```js
const forEach = require('fun-util/iterable/forEach');

forEach('8675309', dialDigitOnPhoneKeyPad);
// => Jenny
```

#### `last`

Returns the last element of an array or string.

```js
const last = require('fun-util/iterable/last');

last([1, 2, 3]);
// => 3
```

#### `map`

The `Array.prototype` method adapted to work with strings and objects. Accepts multiple mapping functions.

```js
const map = require('fun-util/iterable/map');

map({ a: 1, b: 2, c: 3 }, addOne, double, addOne);
// => { a: 5, b: 7, c: 9 }
```

#### `reduce`

The `Array.prototype` method adapted to work with strings and objects.

```js
const reduce = require('fun-util/iterable/reduce');

reduce({ a: 1, b: 2, c: 3 }, (total, value) => total + value);
// => 6
```

#### `rest`

Return a slice array or string with the first element removed.

```js
const rest = require('fun-util/iterable/rest');

rest('value');
// => 'alue'
```

#### `reverse`

Returns a new array (not mutative) or string with the values reversed.

```js
const reverse = require('fun-util/iterable/reverse');
const array = [1, 2, 3];

reverse(array);
// => [3, 2, 1]
array;
// => [1, 2, 3]
```

#### `size`
The length of a string or array, or the number of an objects keys.

```js
const size = require('fun-util/iterable/size');
size('123456');
// => 6
```

#### `sort`

Returns a new array (not mutative) or string with the values sorted. It takes a method, but by default sorts by `>` and `<` comparisons.

```js
const sort = require('fun-util/iterable/sort');
const array = [10, 3, 2 ,1];

sort(array);
// => [1, 2, 3, 10]
array;
// => [10, 3, 2, 1]
```

#### `truncate`

Return a slice array (not mutative) or string with the last element removed.

```js
const truncate = require('fun-util/iterable/truncate');

truncate([1, 2, 3, 4, 5]);
// => [1, 2, 3, 4]
```

<a name="misc"></a>

### 4.4\. Misc

#### `deepCopy`

Preforms a deep copy of all nested objects and arrays. Functions are still copied by reference.

```js
const deepCopy = require('fun-util/misc/deepCopy');

const x = { a: 1, b: { c: [1, 2, 3], d() { return this.c } } };
const y = deepCopy(x);
x.b.c.push(4);
x.b.d();
// => [1, 2, 3, 4]
y.b.d();
// => [1, 2, 3]
```

#### `deepEqual`

Preforms a deep comparison of all nested objects, arrays, and functions.

```js
const deepEqual = require('fun-util/misc/deepEqual');

const x = { a: 1, b: ['apple', () => null] };
const y = { a: 1, b: ['apple', () => null] };
deepEqual(x, y);
// => true
```

#### `getIn`

Gets a nested value from a complex object or return undefined.

```js
const getIn = require('fun-util/misc/getIn');

getIn({ a: { b: [{ c: 17 }] } }, 'a', 'b', 0, 'c');
// => 17
getIn({ a: 1 }, 'b', 'c', 3, 'd');
// undefined
```

#### `slice`

The existing `slice` method for strings and arrays in "call" form.

```js
const slice = require('fun-util/misc/slice');

slice([1, 2, 3, 4], 2);
// => [3, 4]
```

<a name="object"></a>

### 4.5\. Object

#### `hasKey`

The existing `hasOwnProperty` method for strings, arrays, and objects.

```js
const hasKey = require('fun-util/misc/hasKey');

hasKey([1, 2, 3, 4], 2);
// => true
hasKey([1, 2, 3, 4], 17);
// => false
```

<a name="string"></a>

### 4.6\. String

Several string methods have also been duplicated in call form to make them easier to use as mapping methods.

These include: `lowerCase`, `match`, `replace`, `trim`, and `upperCase`.

#### `split`

The split string method has been wrapped to split on each character by default.

```js
const split = require('fun-util/string/split');

'string'.split();
// => ['string']
split('string');
// => ['s', 't', 'r', 'i', 'n', 'g']
split('string', 't');
// => ['s', 'ring']
```

<a name="testing"></a>

## 5\. Testing

Tests are written using jasmine-node.

```bash
$ npm i
$ npm test
```

<a name="contributions"></a>

## 6\. Contributions
_Fun-Util_ is open source. Contribute today at [http://www.github.com/skuttleman/fun-util](http://www.github.com/skuttleman/fun-util)!

<a name="license"></a>

## 7\. License

ISC Lisense

Copyright (c)2016, Ben Allred <skuttleman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
