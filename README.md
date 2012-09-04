`lz`
==

the fastest[¹](#speed) functional lazy library for JavaScript.

this isn't an FP do-it-all library[²](https://github.com/clux/interlude) --
this is a collection of useful functions for working with lists and text
as efficiently as possible.


## `Examples`


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

    * [all](#allfunction)
    * [and](#and)
    * [any](#anyfunction)
    * [at](#atnumber)
    * [foldl](#foldlfunction)
    * [head](#head)
    * [last](#last)
    * [nil](#nil)
    * [max](#maxfunction)
    * [min](#minfunction)
    * [or](#or)
    * [$ | toArray](#toarray)
    * [toString](#tostring)

- static

    * [cycle](#cyclearray)
    * [flatten](#flattenarray-boolean)
    * [foldl](#foldlfunction-array)
    * [iterate](#iteratefunction-number)
    * [lines](#lines-string)
    * [max](#maxarray-function)
    * [min](#minarray-function)
    * [range](#rangenumber-number)
    * [repeat](#repeatnumber)
    * [replicate](#replicatenumber-number)
    * [words](#words-string)
    * [zipWith](#zipwithfunction-array-array)


### `chainable`

The following functions return this (Object lz)


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


### `flatten(Boolean)`

Flattens a nested Array. If shallow is truthy Array is flattened to a single level.

```javascript
[[1], [2], [3]].lz().flatten().toArray()
// = [1, 2, 3]
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


### `and()`

Returns false if any element in the list is falsy, otherwise returns true.

```javascript
[null].lz().and()
// = false

lz('i am true to you').and()
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


### `foldl(Function)`

Reduces the list down to a single value from left to right.

```javascript
[1, 2, 3, 4, 5]
  .lz()
  .foldl(function (a, b) { return a + b })
// = 15
```


### `head()`

Extracts the first element of the collection.

```javascript
lz('first').head()
// = 'f'
```


### `last()`

Extracts the last element in the collection.

```javascript
lz('last').last()
// = 't'
```


### `nil()`

Returns true if the list is empty or filled with empty values. Otherwise returns false.

```javascript
[].lz().nil()
// = true

[null, null].lz().nil()
// = true

[false].lz().nil()
// = false
```


### `max(Function)`

Returns the largest element in the collection. If a function is provided the
callback function will be applied to each element before comparing.

```javascript
[1, 2, 3].lz().max()
// = 3
```


### `min(Function)`

Returns the smallest element in the collection. If a function is provided the
callback function will be applied to each element before comparing.

```javascript
[1, 2, 3].lz().min()
// = 1
```


### `or()`

Returns true if any element in the list is truthy, otherwise returns false.

```javascript
[true, false, true].lz().or()
// = true
```


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


### `static`

These functions are part of the lz Object namespace.


### `cycle(Array)`

See [lz.prototype.cycle](#cycle).


### `flatten(Array, Boolean)`

See [lz.prototype.flatten](#flattenboolean).


### `foldl(Function, Array)`

See [lz.prototype.foldl](#foldlfunction).


### `max(Function, Array)`

See [lz.prototype.max](#maxfunction).


### `min(Function, Array)`

See [lz.prototype.min](#minfunction).


### `zipWith(Function, Array, Array)`

See [lz.prototype.zipWith](#zipwithfunction-array).



## `Speed`

It's fast-as-fuck™.

I have included benchmarks in the repo so you can run them for yourself.

If you're working with small lists and/or iterating through all elements in a
collection then I recommend [lo-dash](http://lodash.com/).

If you plan on being lazy or working with infinite lists then this is the right
tool for that job.

Your mileage may vary.


## `License`

[MIT](http://josh.mit-license.org/)
