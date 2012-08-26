exports.dropWhile = function (lz, assert, _) {
  assert.deepEqual(
    _.a.lz().dropWhile(function (n) {
      return n < 25
    })
    .$(),
    [25, 26, 27, 28, 29]
  )
}

exports['dropping more than you can'] = function (lz, assert) {
  assert.deepEqual(
    [1, 2, 3].lz()
    .dropWhile(function (n) { return n < 5 })
    .$(),
    []
  )
}

exports['dropping more than you can'] = function (lz, assert) {
  assert.deepEqual(
    [1, 2, 3].lz()
    .dropWhile(function (n) { return n < 5 })
    .$(),
    []
  )
}

exports['dropping then reusing'] = function (lz, assert, _) {
  assert.equal(
    _.a
    .lz()
    .dropWhile(function (n) { return n < 20 })
    .filter(function (n) { return n % 2 === 0 })
    .map(function (n) { return n * 2 })
    .dropWhile(function (n) { return n < 50 })
    .map(function (n) { return n - 50 })
    .last(),
    6
  )
}
