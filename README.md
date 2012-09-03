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


### 99 Haskell Problems. Problem 14

```javascript
  // Duplicate elements of a list

  var duplicate = function (list) {
    // note you should use `new` but you don't have to
    // you could also do list.lz() to create a new instance
    return new lz(list)
      .concatMap(function (x) { return [x, x] })
  }
  duplicate([1, 2, 3])
  // = [1, 1, 2, 2, 3, 3]
```


## `API`

- chainable

    * [$ | toArray](#toarray)
    * [toString](#tostring)
    * [compact](#compact)
    * [concat](#concatarray--object-lz)
    * [cycle](#cycle)
    * [drop](#dropnumber)
    * [dropWhile](#dropwhilefunction)
    * [filter](#filterfunction)
    * [init](#init)
    * [map](#mapfunction)
    * [scanl](#scanlfunction)
    * [sort](#sort)
    * [tail](#tail)
    * [take](#takenumber)
    * [takeWhile](#takewhilefunction)
    * [zipWith](#zipwithfunction-array)

- value

    * [and](#and)
    * [all](#allfunction)
    * [any](#anyfunction)
    * [at](#atnumber)


### `chainable`

The following functions return this (Object lz)


### `toArray()`

Forceful method which returns an Array. Alias is `$()`.

```javascript
[1, 2, 3].lz().take(2).toArray()
// = [1, 2]
```


### `toString()`

Forceful method which returns the result as a String.

```javascript
lz('Bananas').toString()
// = Bananas
```


### `compact()`

Lazily removes falsy `(undefined, null, "", 0, NaN)` values from the list.

```javascript
[true, false, true, false]
  .lz()
  .compact()
  .take(2)
  .toArray()
// = [true, true]
```


### `concat(Array || [Object lz])`

Lazily concatenate the list passed in to the current list.

```javascript
['hello']
  .lz()
  .concat(['laziness'])
  .take(2)
  .toArray()
// = ['hello', 'laziness']

[1]
  .lz()
  .concat(lz.cycle([2]))
  .take(4)
  .toArray()
/// = [1, 2, 2, 2]
```


### `cycle()`

Generates an infinite loop composed of the elements of the current list.

```javascript
['Na']
  .lz()
  .cycle()
  .take(10)
  .toArray()
  .join(' ') + ' Batman!'
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
[1, 2, 3, 4, 5]
  .lz()
  .dropWhile(function (n) { return n < 4 })
  .toArray()
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


### `init()`

Returns all the elements from the collection except for the last one.

```javascript
[1, 2, 3, 4, 5].lz().init().toArray()
// = [1, 2, 3, 4]
```


### `map(Function)`

Lazily applies the function provided to each element and replaces the element
with the value returned from the function.

```javascript
['m', 'a', 'p']
  .lz()
  .map(function (a) { return a.toUpperCase() })
  .toArray()
  .join('')
// = 'MAP'
```


### `scanl(Function)`

Similar to a map and a fold. Lazily returns a list of successive reduced values from the left.

```javascript
[1, 2, 3]
  .lz()
  .scanl(function (a, b) { return a + b })
  .toArray()
// = [1, 3, 6]
```


### `sort(Function)`

Array prototype method.


### `tail()`

Extract the elements after the head of a list.

```javascript
[1, 2, 3, 4, 5].lz().last().toArray()
// = [2, 3, 4, 5]
```


### `take(Number)`

Replaces the collection with the amount taken from the current collection.

```javascript
lz('my name is lz').take(2).toString()
// = 'my'
```


### `takeWhile(Function)`

Replaces the collection with the values taken from the current collection
which when applied to the callback function return true.

```javascript
[1, 2, 3, 4, 5]
  .lz()
  .takeWhile(function (n) { return n < 4 })
  .toArray()
// = [1, 2, 3]
```


### `zipWith(Function, Array)`

Takes the current list and the list passed in and applies the function to
each element in both lists generating a new list from the result.

```javascript
[1, 2]
  .lz()
  .zipWith(function (a, b) { return a + b }, [2, 1])
  .toArray()
// = [3, 3]
```


### `value`

These functions return a value.


### `and()`

Returns false if any element in the list is falsy, otherwise returns true.

```javascript
[null].lz().and()
// = false

lz('i am true to you').and()
// = true
```


### `all(Function)`

Applies the function to each element in the collection,
returns false if the return value from the function for any of the elements
is false, otherwise returns true.

```javascript
[2, 4, 6, 8, 10]
  .lz()
  .all(function (n) { return n % 2 === 0 })
// = true
```


### `any(Function)`

Applies the function to each element in the collection,
returns true if the return value from the function for any of the elements
is true, otherwise returns false.

```javascript
[10, 9, 8, 7, 6]
  .lz()
  .any(function (n) { return n === 9 })
// = true
```


### `at(Number)`

Returns the element at the index provided. It's zero-based.

```javascript
lz('chocolate').at(3)
// = 'c'

lz([1, 2, 3]).at(0)
// = 1
```


## `License`

[MIT](http://josh.mit-license.org/)
