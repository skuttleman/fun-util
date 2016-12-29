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

#### -`identity`

Returns the first value supplied.

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

Enforces arity and simulates method overloading. This uses the `length` of the function which ignores rest parameter.
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

<a name="iterable"></a>

### 4.3\. Iterable

Methods that apply to iterable objects, arrays, and strings.

#### All Iterable methods

```js
const { iterable } = require('fun-util');
Object.keys(iterable);
// => ['concat', 'every', 'filter', 'find', 'first', 'forEach', 'hasKey', 'last', 'map', 'reduce', 'rest', 'reverse', 'size', 'sort', 'truncate']
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

The `Array.prototype` method adapted to work with strings and objects.

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

#### -`forEach`

The `Array.prototype` method adapted to work with strings and objects.

```js
const { forEach } = require('fun-util');

forEach('8675309', dialDigitOnPhoneKeyPad);
// => Jenny
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

The `Array.prototype` method adapted to work with strings and objects. It accepts multiple mapping functions.

```js
const { map } = require('fun-util');

map({ a: 1, b: 2, c: 3 }, addOne, double, addOne);
// => { a: 5, b: 7, c: 9 }
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

reduce({ a: 1, b: 2, c: 3 }, (total, value) => total + value);
// => 6
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

#### -`truncate`

Return a slice array (not mutative) or string with the last element removed.

```js
const { truncate } = require('fun-util');

truncate([1, 2, 3, 4, 5]);
// => [1, 2, 3, 4]
```

<a name="misc"></a>

### 4.4\. Misc

Useful miscellaneous methods.

#### All Misc methods

```js
const { misc } = require('fun-util');
Object.keys(misc);
// => ['deepCopy', 'deepEqual', 'getIn', 'slice']
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

#### -`getIn`

Gets a nested value from a complex object or return undefined.

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

<a name="promise"></a>

### 4.5\. Promise

Helpers built on the standard Promise library.

#### All Promise methods

```js
const { promise } = require('fun-util');
Object.keys(promise);
// => ['chain', 'rejectThrough', 'resolveThrough']
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

#### 0.7.0
  -- Added .orElse method to overload.

#### 0.6.0
  -- Added overload to functional methods.

#### 0.5.0
  - Added mapFilter to iterable methods.

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
