`lz`
==

the fastest functional lazy library for JavaScript

this isn't an FP do it all library -- this is a collection of
useful functions for working with lists and text as efficiently as possible


### Fizzbuzz
    var three = lz.cycle(['', '', 'fizz'])
    var five = lz.cycle(['', '', '', '', 'buzz'])
    var fizzbuzz = lz.zipWith(function (a, b) { return a + b }, three, five)

    fizzbuzz.take(5).toArray()


### Factorial
    // Return factorial of 4
    lz([1, 2, 3, 4]).scanl(function (a, b) { return a * b }).at(5)


### ProjectEuler Problem 1

    lz.range(1, 999)
    .filter(function (n) { return n % 3 === 0 || n % 5 === 0 })
    .foldl(function (a, b) { return a + b })
