exports.takeWhile = function (lz, assert, _) {
  assert.deepEqual(
    _.a.lz().takeWhile(function (n) {
      return (n - 10) < 10
    })
    .$(),
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  )
}
