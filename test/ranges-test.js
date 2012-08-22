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
    .take(4),
    [1, 4, 9, 16]
  )
}
