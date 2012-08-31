var arr = [1, 2, 3]

exports.scanl = function (lz, assert) {
  assert.deepEqual(
    lz(arr)
    .scanl(function (a, b) { return a + b })
    .$(),
    [1, 3, 6]
  )

  assert.deepEqual(
    arr
    .lz()
    .scanl(function (a, b) { return b - a })
    .take(3)
    .$(),
    [1, 1, 2]
  )
}
