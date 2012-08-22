exports.cycle = function (lz, assert) {
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
}

exports.fizzbuzz = function (lz, assert) {
  var three = lz.cycle(['', '', 'fizz'])
  var five = lz.cycle(['', '', '', '', 'buzz'])
  var fizzbuzz = lz.zipWith(function (a, b) { return a + b }, three, five)

  assert.deepEqual(
    fizzbuzz.take(5),
    ['', '', 'fizz', '', 'buzz']
  )
}
