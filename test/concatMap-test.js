var arr = [1, 2, 3]

exports.concatMap = function (lz, assert) {
  assert.deepEqual(
    lz.concatMap(function (n) {
      return [n, n]
    }, arr),
    [1, 1, 2, 2, 3, 3]
  )
}
