exports.max = function (lz, assert, _) {
  assert.equal(
    lz(_.a)
    .max(),
    29
  )
}

exports.min = function (lz, assert, _) {
  assert.equal(
    lz(_.a)
    .min(),
    10
  )
}

exports['filter and min'] = function (lz, assert, _) {
  assert.equal(
    lz(_.a)
    .filter(function (x) { return x > 15 })
    .min(),
    16
  )
}

exports['map and max'] = function (lz, assert, _) {
  assert.equal(
    _.a
    .lz()
    .take(3)
    .map(function (n) {
      return n
    })
    .max(),
    12
  )
}
