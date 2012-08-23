exports.take = function (lz, assert, _) {
  assert.deepEqual(
    lz(_.a)
    .filter(function (x) {
      return x.toString()[0] === '2'
    })
    .take(5)
    .list,
    [20, 21, 22, 23, 24]
  )
}

exports['taking more than we can'] = function (lz, assert, _) {
  assert.deepEqual(
    lz(_.a)
    .filter(function (x) { return x > 28 })
    .take(3)
    .list,
    [29]
  )
}
