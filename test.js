var lz = require('./')
var assert = require('assert')

var a = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

lz_tests({
  'take': function () {
    assert.deepEqual(
      lz(a)
      .filter(function (x) {
        return x.toString()[0] === '2'
      })
      .take(5),
      [20, 21, 22, 23, 24]
    )
  },

  'map': function () {
    assert.equal(
      lz(a)
      .map(function (x) { return x * 10 })
      .head(),
      100
    )
  },

  'filter': function () {
    assert.equal(
      lz(a)
      .filter(function (x) { return x === 20 })
      .head(),
      20
    )
  },

  'map and filter': function () {
    assert.equal(
      lz(a)
      .map(function (x) { return x * 10 })
      .filter(function (x) { return x === 200 })
      .head(),
      200
    )
  },

  'taking more than we can take': function () {
    assert.deepEqual(
      lz(a)
      .filter(function (x) { return x > 28 })
      .take(3),
      [29]
    )
  },

  'ranges': function () {
    assert.equal(
      lz.range(1, Infinity)
      .filter(function (x) { return x > 1000 })
      .head(),
      1001
    )

    assert.deepEqual(
      lz.range(1, 10)
      .map(function (n) { return n * n })
      .take(4),
      [1, 4, 9, 16]
    )
  },

  'fizzbuzz': function () {
    var three = lz.cycle(['', '', 'fizz'])
    var five = lz.cycle(['', '', '', '', 'buzz'])
    var fizzbuzz = lz.zipWith(function (a, b) { return a + b }, three, five)

    assert.deepEqual(
      fizzbuzz.take(5),
      ['', '', 'fizz', '', 'buzz']
    )
  },

  'empty': function () {
    // empty string list
    assert.equal(
      lz(['']).head(),
      ''
    )

    // null
    assert.equal(
      lz([null]).head(),
      null
    )

    // false
    assert.equal(
      lz([false]).head(),
      false
    )

    // undefined
    assert.deepEqual(
      lz([false, null, 2]).take(3),
      [false, null, 2]
    )
  },

  'result that does not exist': function () {
    assert.equal(
      lz([1, 2])
      .filter(function (n) { return n === 3 })
      .head(),
      null
    )
  },

  'cycle': function () {
    assert.deepEqual(
      lz
      .cycle([1, 2, 3])
      .take(6),
      [1, 2, 3, 1, 2, 3]
    )

    assert.equal(
      lz
      .cycle([1, 2, 3])
      .head(),
      1
    )
  },

  'valueof': function () {
    console.log(
    lz(a)
    .filter(function (n) { return n % 10 === 0 })
    );
    assert.deepEqual(
      lz(a)
      .filter(function (n) { return n % 10 === 0 }),
      [10, 20]
    )
  },

  'zipWith': function () {
    assert.deepEqual(
      lz.zipWith(
        function (a, b) { return a - b },
        lz([1, 2, 3]),
        lz([3, 2, 1])
      )
      .take(3),
      [-2, 0, 2]
    )

    // regular Array
    assert.equal(
      lz.zipWith(
        function (a, b) { return a - b },
        [1, 2, 3],
        [3, 2, 1]
      )
      .head(),
      -2
    )

    assert.deepEqual(
      lz.zipWith(
        function (a, b) { return a - b },
        [1, 2, 3, 4, 6, 8],
        [3, 2, 1]
      )
      .take(3),
      [-2, 0, 2]
    )
  }
})


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: \\


function lz_tests(tests) {
  var start = Date.now()
  var test

  if (test = process.argv[2]) {
    console.log('Running', test)
    tests[test]()
  } else {
    console.log('Running All Tests')
    Object.keys(tests).forEach(function (test) {
      tests[test]()
    })
  }

  console.log('Done!')
  console.log('Time ' + (Date.now() - start) + 'ms')
}
