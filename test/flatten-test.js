var arr = [1, [2, 3], 4, [5, [6, 7], 8], 9, 10]

exports.flatten = function (lz, assert) {
  assert.deepEqual(
    arr
    .lz()
    .flatten(),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  )
}
