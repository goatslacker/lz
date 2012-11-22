var arr = [1, 2, 3, 4, 5, 6]

exports.splitWith = function (lz, assert) {
  assert.deepEqual(
    arr
    .lz()
    .splitWith(function (n) {
      return n <= 3
    })
    .$(),
    [[1, 2, 3], [4, 5, 6]]
  )
}
