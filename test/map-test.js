exports.map = function (lz, assert, _) {
  assert.equal(
    lz(_.a)
    .map(function (x) { return x * 10 })
    .head(),
    100
  )
}

exports['map and filter'] = function (lz, assert, _) {
  assert.equal(
    lz(_.a)
    .map(function (x) { return x * 10 })
    .filter(function (x) { return x === 200 })
    .head(),
    200
  )
}
