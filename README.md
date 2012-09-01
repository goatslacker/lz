`lz`
==

the fastest functional lazy library for JavaScript

this isn't an FP do it all library -- this is a collection of
useful functions for working with lists and text as efficiently as possible


### Fizzbuzz
```javascript
var three = lz.cycle(['', '', 'fizz'])
var five = lz.cycle(['', '', '', '', 'buzz'])
var fizzbuzz = lz.zipWith(function (a, b) { return a + b }, three, five)

fizzbuzz.take(5).toArray()
```


### Factorial
```javascript
  // Return factorial of 4
  lz([1, 2, 3, 4]).scanl(function (a, b) { return a * b }).at(5)
```


### ProjectEuler Problem 1

```javascript
  lz.range(1, 999)
  .filter(function (n) { return n % 3 === 0 || n % 5 === 0 })
  .foldl(function (a, b) { return a + b })
```



## `API`

* [$ | toArray](#toarray)
* [compact](#compact)
* [concat](#concat)
* [cycle](#cycle)
* [drop](#drop)
* [dropWhile](#dropWhile)
* [filter](#filter)

### `toArray()`

Forceful method which returns an Array. Alias is `$()`.

```javascript
[1, 2, 3].lz().take(2).toArray()
// = [1, 2]
```


### `compact()`

Lazily removes falsy `(undefined, null, "", 0, NaN)` values from the list.

```javascript
[true, false, true, false].lz().compact().take(2).toArray()
// = [true, true]
```


### `concat(Array || [Object lz])`

Lazily concatenate the list passed in to the current list.

```javascript
['hello'].lz().concat(['laziness']).take(2).toArray()
// = ['hello', 'laziness']

[1].lz().concat(lz.cycle([2])).take(4).toArray()
/// = [1, 2, 2, 2]
```


### `cycle()`

Generates an infinite loop composed of the elements of the current list.

```javascript
['Na'].lz().cycle().take(10).toArray().join(' ') + ' Batman!'
// = Na Na Na Na Na Na Na Na Na Na Batman!
```


### `drop(Number)`

Removes the amount provided, starting from the current position, from
the collection.

```javascript
[null, null, 1, 2, 3].lz().drop(2).toArray()
// = [1, 2, 3]
```


### `dropWhile(Function)`

Drops elements from the collection until the function provided returns false.

```javascript
[1, 2, 3, 4, 5].lz().dropWhile(function (n) { return n < 4 }).toArray()
// = [4, 5]
```


### `filter(Function)`

Lazily removes elements from the collection if the return value from the
function provided is not true.

```javascript
[{ color: 'red' }, { color: 'blue' }, { color: 'pink' }, { color: 'red' }]
.lz()
.filter(function (x) { return x.color === 'red' })
.toArray()
// = [{ color: 'red' }, { color: 'red' }]
```
