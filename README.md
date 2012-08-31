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

### `toArray()`

Forceful method which returns an Array. Alias is `$()`.

```javascript
[1, 2, 3].take(2).toArray()
// = [1, 2]
```


### `compact()`

Lazily removes falsy `(undefined, null, "", 0, NaN)` values from the list.

```javascript
[true, false, true, false].compact().take(2).toArray()
// = [true, true]
```


### `concat(arr || instanceof lz)`

Lazily concatenate the list passed in to the current list.

```javascript
['hello'].lz().concat(['laziness']).take(2).toArray()
// = ['hello', 'laziness']

lz([1]).concat(lz.cycle([2])).take(4).toArray()
/// = [1, 2, 2, 2]
```
