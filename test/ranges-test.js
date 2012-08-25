exports.ranges = function (lz, assert) {
  assert.equal(
    lz.range(1, Infinity)
    .filter(function (x) { return x > 1000 })
    .head(),
    1001
  )

  assert.deepEqual(
    lz.range(1, 10)
    .map(function (n) { return n * n })
    .take(4)
    .$(),
    [1, 4, 9, 16]
  )
}

exports.step = function (lz, assert) {
  assert.deepEqual(
    lz.range(1, 10)
    .filter(function (n) { return n % 2 !== 0 })
    .$(),
    [1, 3, 5, 7, 9]
  )
}
