exports.foldl = function (lz, assert) {
  assert.equal(
    [1, 2, 3, 4, 5].lz().foldl(function (a, b) {
      return a + b
    }),
    15
  )
}
