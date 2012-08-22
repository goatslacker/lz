exports.filter = function (lz, assert, _) {
  assert.equal(
    lz(_.a)
    .filter(function (x) { return x === 20 })
    .head(),
    20
  )
}
