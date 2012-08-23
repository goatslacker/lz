exports.take = function (lz, assert, _) {
  assert.deepEqual(
    lz(_.a)
    .filter(function (x) {
      return x.toString()[0] === '2'
    })
    .take(5)
    .$(),
    [20, 21, 22, 23, 24]
  )
}

exports['taking more than we can'] = function (lz, assert, _) {
  assert.deepEqual(
    lz(_.a)
    .filter(function (x) { return x > 28 })
    .take(3)
    .$(),
    [29]
  )
}

exports['taking then reusing'] = function (lz, assert, _) {
  assert.equal(
    _.a
    .lz()
    .map(function (n) {
      return n + 10
    })
    .take(10)
    .filter(function (n) {
      return n < 30
    })
    .head(),
    20
  )
}
