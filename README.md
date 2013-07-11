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
  // note you should use `new` but you don't have to
  new lz([1, 2, 3, 4]).scanl(function (a, b) { return a * b }).at(3)
```


### ProjectEuler Problem 1

```javascript
  lz.range(1, 999)
  .filter(function (n) { return n % 3 === 0 || n % 5 === 0 })
  .foldl(function (a, b) { return a + b })
```



## `API`

- chainable

    * [compact](#compact)
    * [concat](#concatarray--object-lz)
    * [cycle](#cycle)
    * [drop](#dropnumber)
    * [dropWhile](#dropwhilefunction)
    * [filter](#filterfunction)
    * [flatten](#flattenboolean)
    * [init](#init)
    * [map](#mapfunction)
    * [scanl](#scanlfunction)
    * [sort](#sortfunction)
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
    * [elem](#elemgeneric)
    * [head](#head)
    * [last](#last)
    * [nil](#nil)
    * [max](#maxfunction)
    * [min](#minfunction)
    * [or](#or)
    * [$ | toArray](#toarray)
    * [toString](#tostring)

- static

    * [concatMap](#concatmapfunction-array)
    * [cycle](#cyclearray)
    * [flatten](#flattenarray-boolean)
    * [foldl](#foldlfunction-array)
    * [iterate](#iteratefunction-number)
    * [lines](#linesstring)
    * [max](#maxarrayfunction)
    * [min](#minarray-function)
    * [range](#rangenumber-number)
    * [repeat](#repeatnumber)
    * [replicate](#replicatenumber-number)
    * [words](#wordsstring)
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
  .toString(' ') + ' Batman!'
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


### `elem(Generic)`

Returns true if the list contains the item provided.

```javascript
[1, 2, 3, 4, 5]
  .lz()
  .elem(6)
// = false

[null, 0, false, NaN, undefined]
  .lz()
  .elem(NaN)
// = true
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


### `concatMap(Function, Array)`

Returns a list by applying the function provided to all elements in the list
and then concatenating the returned list into the result.

```javascript
lz.concatMap(function (a) { return [a, a] }, [1, 2, 3])
// = [1, 1, 2, 2, 3, 3]
```


### `cycle(Array)`

See [lz.prototype.cycle](#cycle).


### `flatten(Array, Boolean)`

See [lz.prototype.flatten](#flattenboolean).


### `foldl(Function, Array)`

See [lz.prototype.foldl](#foldlfunction).


### `iterate(Function, Number)`

Creates an infinite list by applying the function repeatedly
to the last element in the list, starting with the number provided.

```javascript
lz.iterate(function (x) { return x + 1 }, 1).take(5).toArray()
// = [1, 2, 3, 4, 5]
```


### `lines(String)`

Convert a string into a list split by lines.

```javascript
lz.lines('1. One\n2. Two').toArray()
// = ['1. One', '2. Two']
```


### `max(Array, Function)`

See [lz.prototype.max](#maxfunction).


### `min(Array, Function)`

See [lz.prototype.min](#minfunction).


### `range(Number, Number)`

Create a finite or infinite list from a range of numbers.

```javascript
lz.range(1, Infinity).take(5).toArray()
// = [1, 2, 3, 4, 5]

lz.range(5, 10).toArray()
// = [5, 6, 7, 8, 9, 10]

lz.range(1, 10).filter(function (x) { return x % 3 === 0 }).toArray()
// = [3, 6, 9]
```


### `repeat(Number)`

Creates an infinite list with just a single Number as the value.
Same as `lz.cycle([Number])`

```javascript
lz.repeat(4).take(7).toArray()
// = [4, 4, 4, 4, 4, 4, 4]

lz.repeat('ya').take(3).toString(' ')
// = 'ya ya ya'
```


### `replicate(Number, Number)`

Creates a finite list with just a single Number as the value.
Similar to `lz.repeat(Number).take(Number)`

```javascript
lz.replicate(3, 1).toArray()
// = [1, 1, 1]

lz.replicate(1, 3).toArray()
// = [3]
```


### `words(String)`

Convert a string into a list split by words.

```javascript
lz.lines('My cat is also lazy').toArray()
// = ['My', 'cat', 'is', 'also', 'lazy']
```


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
